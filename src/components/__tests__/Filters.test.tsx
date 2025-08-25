import React from 'react';
import { render, screen, fireEvent } from '../../test/utils';
import { userEvent } from '@testing-library/user-event';
import Filters from '../Filters';
import { mockWarehouses } from '../../test/mocks';

const defaultProps = {
  search: '',
  warehouse: '',
  status: 'All',
  warehouses: mockWarehouses,
  onSearchChange: jest.fn(),
  onWarehouseChange: jest.fn(),
  onStatusChange: jest.fn(),
};

describe('Filters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all filter elements', () => {
    render(<Filters {...defaultProps} />);
    
    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByLabelText('Search')).toBeInTheDocument();
    expect(screen.getByLabelText('Warehouse')).toBeInTheDocument();
    expect(screen.getByLabelText('Status')).toBeInTheDocument();
  });

  it('displays search value correctly', () => {
    render(<Filters {...defaultProps} search="test search" />);
    
    const searchInput = screen.getByLabelText('Search');
    expect(searchInput).toHaveValue('test search');
  });

  it('calls onSearchChange when search input changes', async () => {
    const user = userEvent.setup();
    const onSearchChange = jest.fn();
    
    render(<Filters {...defaultProps} onSearchChange={onSearchChange} />);
    
    const searchInput = screen.getByLabelText('Search');
    await user.type(searchInput, 'new search');
    
    expect(onSearchChange).toHaveBeenCalledWith('new search');
  });

  it('displays warehouse options correctly', () => {
    render(<Filters {...defaultProps} />);
    
    const warehouseSelect = screen.getByLabelText('Warehouse');
    expect(warehouseSelect).toBeInTheDocument();
    
    // Check for default option
    expect(screen.getByText('All Warehouses')).toBeInTheDocument();
    
    // Check for warehouse options
    mockWarehouses.forEach(warehouse => {
      expect(screen.getByText(`${warehouse.code} - ${warehouse.name}`)).toBeInTheDocument();
    });
  });

  it('calls onWarehouseChange when warehouse selection changes', () => {
    const onWarehouseChange = jest.fn();
    
    render(<Filters {...defaultProps} onWarehouseChange={onWarehouseChange} />);
    
    const warehouseSelect = screen.getByLabelText('Warehouse');
    fireEvent.change(warehouseSelect, { target: { value: 'BLR-A' } });
    
    expect(onWarehouseChange).toHaveBeenCalledWith('BLR-A');
  });

  it('displays status options correctly', () => {
    render(<Filters {...defaultProps} />);
    
    const statusSelect = screen.getByLabelText('Status');
    expect(statusSelect).toBeInTheDocument();
    
    // Check for status options
    expect(screen.getByText('All Status')).toBeInTheDocument();
    expect(screen.getByText('Healthy')).toBeInTheDocument();
    expect(screen.getByText('Low')).toBeInTheDocument();
    expect(screen.getByText('Critical')).toBeInTheDocument();
  });

  it('calls onStatusChange when status selection changes', () => {
    const onStatusChange = jest.fn();
    
    render(<Filters {...defaultProps} onStatusChange={onStatusChange} />);
    
    const statusSelect = screen.getByLabelText('Status');
    fireEvent.change(statusSelect, { target: { value: 'Critical' } });
    
    expect(onStatusChange).toHaveBeenCalledWith('Critical');
  });

  it('displays current filter values', () => {
    render(
      <Filters
        {...defaultProps}
        search="test"
        warehouse="BLR-A"
        status="Critical"
      />
    );
    
    expect(screen.getByLabelText('Search')).toHaveValue('test');
    expect(screen.getByLabelText('Warehouse')).toHaveValue('BLR-A');
    expect(screen.getByLabelText('Status')).toHaveValue('Critical');
  });
});
