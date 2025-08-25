import React from 'react';
import { render, screen } from '../../test/utils';
import KpiCard from '../KpiCard';
import { Package } from 'lucide-react';

describe('KpiCard', () => {
  it('renders with title and value', () => {
    render(<KpiCard title="Total Stock" value={1000} />);
    
    expect(screen.getByText('Total Stock')).toBeInTheDocument();
    expect(screen.getByText('1,000')).toBeInTheDocument();
  });

  it('renders percentage values correctly', () => {
    render(<KpiCard title="Fill Rate" value={85} isPercentage={true} />);
    
    expect(screen.getByText('Fill Rate')).toBeInTheDocument();
    expect(screen.getByText('85%')).toBeInTheDocument();
  });

  it('renders with icon', () => {
    render(<KpiCard title="Total Stock" value={1000} icon={<Package data-testid="package-icon" />} />);
    
    expect(screen.getByTestId('package-icon')).toBeInTheDocument();
  });

  it('renders with trend information', () => {
    const trend = { value: 5, isPositive: true };
    render(<KpiCard title="Total Stock" value={1000} trend={trend} />);
    
    expect(screen.getByText('+5%')).toBeInTheDocument();
    expect(screen.getByText('vs last period')).toBeInTheDocument();
  });

  it('renders negative trend correctly', () => {
    const trend = { value: 3, isPositive: false };
    render(<KpiCard title="Total Stock" value={1000} trend={trend} />);
    
    expect(screen.getByText('-3%')).toBeInTheDocument();
  });

  it('renders with unit', () => {
    render(<KpiCard title="Total Stock" value={1000} unit="units" />);
    
    expect(screen.getByText('1,000 units')).toBeInTheDocument();
  });
});
