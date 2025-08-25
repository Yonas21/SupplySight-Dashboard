import type { Product } from '../types';

export const calculateTotalStock = (products: Product[]): number => {
  return products.reduce((total, product) => total + product.stock, 0);
};

export const calculateTotalDemand = (products: Product[]): number => {
  return products.reduce((total, product) => total + product.demand, 0);
};

export const calculateFillRate = (products: Product[]): number => {
  const totalDemand = calculateTotalDemand(products);
  if (totalDemand === 0) return 100;

  const filledDemand = products.reduce((total, product) => {
    return total + Math.min(product.stock, product.demand);
  }, 0);

  return Math.round((filledDemand / totalDemand) * 100);
};

export const getProductStatus = (stock: number, demand: number): 'Healthy' | 'Low' | 'Critical' => {
  if (stock > demand) return 'Healthy';
  if (stock === demand) return 'Low';
  return 'Critical';
};

export const getStatusColor = (status: 'Healthy' | 'Low' | 'Critical'): string => {
  switch (status) {
    case 'Healthy':
      return 'status-healthy';
    case 'Low':
      return 'status-low';
    case 'Critical':
      return 'status-critical';
    default:
      return 'status-critical';
  }
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

export const formatPercentage = (num: number): string => {
  return `${num}%`;
};
