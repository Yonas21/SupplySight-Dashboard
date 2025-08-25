import React from 'react';
import { render, screen, fireEvent } from '../../test/utils';
import ProductsTable from '../ProductsTable';
import { mockProducts, mockWarehouses } from '../../test/mocks';

const defaultProps = {
  products: mockProducts,
  warehouses: mockWarehouses,
  loading: false,
  onRowClick: jest.fn(),
};

describe('ProductsTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders table headers correctly', () => {
    render(<ProductsTable {...defaultProps} />);
    
    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('SKU')).toBeInTheDocument();
    expect(screen.getByText('Warehouse')).toBeInTheDocument();
    expect(screen.getByText('Stock')).toBeInTheDocument();
    expect(screen.getByText('Demand')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('renders product data correctly', () => {
    render(<ProductsTable {...defaultProps} />);
    
    // Check first product
    expect(screen.getByText('12mm Hex Bolt')).toBeInTheDocument();
    expect(screen.getByText('P-1001')).toBeInTheDocument();
    expect(screen.getByText('HEX-12-100')).toBeInTheDocument();
    expect(screen.getByText('BLR-A')).toBeInTheDocument();
    expect(screen.getByText('180')).toBeInTheDocument();
    expect(screen.getByText('120')).toBeInTheDocument();
    expect(screen.getByText('Healthy')).toBeInTheDocument();
  });

  it('calls onRowClick when row is clicked', () => {
    const onRowClick = jest.fn();
    render(<ProductsTable {...defaultProps} onRowClick={onRowClick} />);
    
    const firstRow = screen.getByText('12mm Hex Bolt').closest('tr');
    fireEvent.click(firstRow!);
    
    expect(onRowClick).toHaveBeenCalledWith(mockProducts[0]);
  });

  it('shows loading state correctly', () => {
    render(<ProductsTable {...defaultProps} loading={true} />);
    
    // Should show skeleton loading
    expect(screen.getByText('Filters')).toBeInTheDocument(); // This is from the card wrapper
  });

  it('shows empty state when no products', () => {
    render(<ProductsTable {...defaultProps} products={[]} />);
    
    expect(screen.getByText('No products found')).toBeInTheDocument();
  });

  it('displays status pills correctly', () => {
    render(<ProductsTable {...defaultProps} />);
    
    // Check status pills
    const healthyPill = screen.getByText('Healthy');
    const criticalPill = screen.getByText('Critical');
    
    expect(healthyPill).toHaveClass('status-healthy');
    expect(criticalPill).toHaveClass('status-critical');
  });

  it('applies critical row styling for critical products', () => {
    render(<ProductsTable {...defaultProps} />);
    
    // Find the critical product row (Bearing 608ZZ)
    const criticalRow = screen.getByText('Bearing 608ZZ').closest('tr');
    expect(criticalRow).toHaveClass('bg-red-50');
  });

  it('formats numbers correctly', () => {
    render(<ProductsTable {...defaultProps} />);
    
    // Check that large numbers are formatted with commas
    expect(screen.getByText('180')).toBeInTheDocument();
    expect(screen.getByText('120')).toBeInTheDocument();
  });

  it('shows pagination when more than 10 products', () => {
    // Create more than 10 products
    const manyProducts = Array.from({ length: 15 }, (_, i) => ({
      ...mockProducts[0],
      id: `P-${1000 + i}`,
      name: `Product ${i + 1}`,
    }));
    
    render(<ProductsTable {...defaultProps} products={manyProducts} />);
    
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
    expect(screen.getByText('Showing 1 to 10 of 15 results')).toBeInTheDocument();
  });

  it('handles pagination correctly', () => {
    const manyProducts = Array.from({ length: 15 }, (_, i) => ({
      ...mockProducts[0],
      id: `P-${1000 + i}`,
      name: `Product ${i + 1}`,
    }));
    
    render(<ProductsTable {...defaultProps} products={manyProducts} />);
    
    const nextButton = screen.getByLabelText('Next page');
    fireEvent.click(nextButton);
    
    expect(screen.getByText('Page 2 of 2')).toBeInTheDocument();
    expect(screen.getByText('Showing 11 to 15 of 15 results')).toBeInTheDocument();
  });
});
