import {
  calculateTotalStock,
  calculateTotalDemand,
  calculateFillRate,
  getProductStatus,
  getStatusColor,
  formatNumber,
  formatPercentage
} from '../calculations';
import { mockProducts } from '../../test/mocks';

describe('Calculation Utilities', () => {
  describe('calculateTotalStock', () => {
    it('should calculate total stock correctly', () => {
      const total = calculateTotalStock(mockProducts);
      expect(total).toBe(334); // 180 + 50 + 80 + 24
    });

    it('should return 0 for empty array', () => {
      const total = calculateTotalStock([]);
      expect(total).toBe(0);
    });
  });

  describe('calculateTotalDemand', () => {
    it('should calculate total demand correctly', () => {
      const total = calculateTotalDemand(mockProducts);
      expect(total).toBe(400); // 120 + 80 + 80 + 120
    });

    it('should return 0 for empty array', () => {
      const total = calculateTotalDemand([]);
      expect(total).toBe(0);
    });
  });

  describe('calculateFillRate', () => {
    it('should calculate fill rate correctly', () => {
      const fillRate = calculateFillRate(mockProducts);
      // min(stock, demand) for each product: 120 + 50 + 80 + 24 = 274
      // total demand: 400
      // fill rate: (274 / 400) * 100 = 68.5% rounded to 69%
      expect(fillRate).toBe(69);
    });

    it('should return 100 for zero demand', () => {
      const productsWithZeroDemand = mockProducts.map(p => ({ ...p, demand: 0 }));
      const fillRate = calculateFillRate(productsWithZeroDemand);
      expect(fillRate).toBe(100);
    });
  });

  describe('getProductStatus', () => {
    it('should return Healthy when stock > demand', () => {
      const status = getProductStatus(100, 50);
      expect(status).toBe('Healthy');
    });

    it('should return Low when stock === demand', () => {
      const status = getProductStatus(80, 80);
      expect(status).toBe('Low');
    });

    it('should return Critical when stock < demand', () => {
      const status = getProductStatus(30, 100);
      expect(status).toBe('Critical');
    });
  });

  describe('getStatusColor', () => {
    it('should return correct CSS class for each status', () => {
      expect(getStatusColor('Healthy')).toBe('status-healthy');
      expect(getStatusColor('Low')).toBe('status-low');
      expect(getStatusColor('Critical')).toBe('status-critical');
    });
  });

  describe('formatNumber', () => {
    it('should format numbers with commas', () => {
      expect(formatNumber(1000)).toBe('1,000');
      expect(formatNumber(1234567)).toBe('1,234,567');
    });
  });

  describe('formatPercentage', () => {
    it('should format numbers as percentages', () => {
      expect(formatPercentage(85)).toBe('85%');
      expect(formatPercentage(0)).toBe('0%');
    });
  });
});
