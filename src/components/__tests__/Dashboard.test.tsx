import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../test/utils';
import Dashboard from '../Dashboard';
import {
  mockGetProductsResponse,
  mockGetWarehousesResponse,
  mockGetKPIsResponse,
  mockUpdateDemandResponse,
  mockTransferStockResponse,
} from '../../test/mocks';

const mocks = [
  mockGetProductsResponse,
  mockGetWarehousesResponse,
  mockGetKPIsResponse,
];

describe('Dashboard', () => {
  it('renders dashboard header correctly', async () => {
    render(<Dashboard />, { mocks });
    
    expect(screen.getByText('SupplySight')).toBeInTheDocument();
    expect(screen.getByText('Supply Chain Dashboard')).toBeInTheDocument();
  });

  it('renders date range chips', async () => {
    render(<Dashboard />, { mocks });
    
    expect(screen.getByText('7d')).toBeInTheDocument();
    expect(screen.getByText('14d')).toBeInTheDocument();
    expect(screen.getByText('30d')).toBeInTheDocument();
  });

  it('renders KPI cards with correct values', async () => {
    render(<Dashboard />, { mocks });
    
    await waitFor(() => {
      expect(screen.getByText('Total Stock')).toBeInTheDocument();
      expect(screen.getByText('Total Demand')).toBeInTheDocument();
      expect(screen.getByText('Fill Rate')).toBeInTheDocument();
    });
  });

  it('renders line chart', async () => {
    render(<Dashboard />, { mocks });
    
    await waitFor(() => {
      expect(screen.getByText('Stock vs Demand Trend')).toBeInTheDocument();
    });
  });

  it('renders filters section', async () => {
    render(<Dashboard />, { mocks });
    
    await waitFor(() => {
      expect(screen.getByText('Filters')).toBeInTheDocument();
      expect(screen.getByLabelText('Search')).toBeInTheDocument();
      expect(screen.getByLabelText('Warehouse')).toBeInTheDocument();
      expect(screen.getByLabelText('Status')).toBeInTheDocument();
    });
  });

  it('renders products table', async () => {
    render(<Dashboard />, { mocks });
    
    await waitFor(() => {
      expect(screen.getByText('12mm Hex Bolt')).toBeInTheDocument();
      expect(screen.getByText('Steel Washer')).toBeInTheDocument();
      expect(screen.getByText('M8 Nut')).toBeInTheDocument();
      expect(screen.getByText('Bearing 608ZZ')).toBeInTheDocument();
    });
  });

  it('handles date range changes', async () => {
    render(<Dashboard />, { mocks });
    
    const sevenDayButton = screen.getByText('7d');
    fireEvent.click(sevenDayButton);
    
    expect(sevenDayButton).toHaveClass('bg-blue-600');
  });

  it('handles search filter changes', async () => {
    render(<Dashboard />, { mocks });
    
    await waitFor(() => {
      const searchInput = screen.getByLabelText('Search');
      fireEvent.change(searchInput, { target: { value: 'test search' } });
      expect(searchInput).toHaveValue('test search');
    });
  });

  it('handles warehouse filter changes', async () => {
    render(<Dashboard />, { mocks });
    
    await waitFor(() => {
      const warehouseSelect = screen.getByLabelText('Warehouse');
      fireEvent.change(warehouseSelect, { target: { value: 'BLR-A' } });
      expect(warehouseSelect).toHaveValue('BLR-A');
    });
  });

  it('handles status filter changes', async () => {
    render(<Dashboard />, { mocks });
    
    await waitFor(() => {
      const statusSelect = screen.getByLabelText('Status');
      fireEvent.change(statusSelect, { target: { value: 'Critical' } });
      expect(statusSelect).toHaveValue('Critical');
    });
  });

  it('opens side drawer when product row is clicked', async () => {
    render(<Dashboard />, { mocks });
    
    await waitFor(() => {
      const firstProductRow = screen.getByText('12mm Hex Bolt').closest('tr');
      fireEvent.click(firstProductRow!);
      
      expect(screen.getByText('Product Details')).toBeInTheDocument();
    });
  });

  it('calculates KPIs correctly', async () => {
    render(<Dashboard />, { mocks });
    
    await waitFor(() => {
      // Total Stock: 180 + 50 + 80 + 24 = 334
      expect(screen.getByText('334')).toBeInTheDocument();
      
      // Total Demand: 120 + 80 + 80 + 120 = 400
      expect(screen.getByText('400')).toBeInTheDocument();
      
      // Fill Rate: (120 + 50 + 80 + 24) / 400 * 100 = 69%
      expect(screen.getByText('69%')).toBeInTheDocument();
    });
  });
});
