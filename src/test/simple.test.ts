import { calculateTotalStock, calculateTotalDemand, calculateFillRate } from '../utils/calculations';
import { mockProducts } from './mocks';

describe('Simple Test Suite', () => {
  it('should calculate total stock correctly', () => {
    const total = calculateTotalStock(mockProducts);
    expect(total).toBe(334);
  });

  it('should calculate total demand correctly', () => {
    const total = calculateTotalDemand(mockProducts);
    expect(total).toBe(400);
  });

  it('should calculate fill rate correctly', () => {
    const fillRate = calculateFillRate(mockProducts);
    expect(fillRate).toBe(69);
  });
});
