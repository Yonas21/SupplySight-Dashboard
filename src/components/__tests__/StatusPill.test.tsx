import React from 'react';
import { render, screen } from '../../test/utils';
import StatusPill from '../StatusPill';

describe('StatusPill', () => {
  it('renders Healthy status correctly', () => {
    render(<StatusPill status="Healthy" />);
    
    const pill = screen.getByText('Healthy');
    expect(pill).toBeInTheDocument();
    expect(pill).toHaveClass('status-healthy');
  });

  it('renders Low status correctly', () => {
    render(<StatusPill status="Low" />);
    
    const pill = screen.getByText('Low');
    expect(pill).toBeInTheDocument();
    expect(pill).toHaveClass('status-low');
  });

  it('renders Critical status correctly', () => {
    render(<StatusPill status="Critical" />);
    
    const pill = screen.getByText('Critical');
    expect(pill).toBeInTheDocument();
    expect(pill).toHaveClass('status-critical');
  });

  it('has correct base classes', () => {
    render(<StatusPill status="Healthy" />);
    
    const pill = screen.getByText('Healthy');
    expect(pill).toHaveClass('status-pill');
  });
});
