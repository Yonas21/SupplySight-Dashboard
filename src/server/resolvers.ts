import { productsData, warehousesData, generateKPIData } from './mockData';
import type { Product } from '../types';

// Helper function to determine product status
const getProductStatus = (stock: number, demand: number): 'Healthy' | 'Low' | 'Critical' => {
  if (stock > demand) return 'Healthy';
  if (stock === demand) return 'Low';
  return 'Critical';
};

// Helper function to filter products
const filterProducts = (
  products: Product[],
  search?: string,
  status?: string,
  warehouse?: string
): Product[] => {
  return products.filter(product => {
    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      const matchesSearch = 
        product.name.toLowerCase().includes(searchLower) ||
        product.sku.toLowerCase().includes(searchLower) ||
        product.id.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Warehouse filter
    if (warehouse && product.warehouse !== warehouse) {
      return false;
    }

    // Status filter
    if (status && status !== 'All') {
      const productStatus = getProductStatus(product.stock, product.demand);
      if (productStatus !== status) return false;
    }

    return true;
  });
};

export const resolvers = {
  Query: {
    products: (_: any, { search, status, warehouse }: { search?: string; status?: string; warehouse?: string }) => {
      return filterProducts(productsData, search, status, warehouse);
    },
    
    warehouses: () => {
      return warehousesData;
    },
    
    kpis: (_: any, { range }: { range: string }) => {
      return generateKPIData(range);
    }
  },

  Mutation: {
    updateDemand: (_: any, { id, demand }: { id: string; demand: number }) => {
      const productIndex = productsData.findIndex(p => p.id === id);
      if (productIndex === -1) {
        throw new Error(`Product with id ${id} not found`);
      }
      
      productsData[productIndex].demand = demand;
      return productsData[productIndex];
    },

    transferStock: (_: any, { id, from, to, qty }: { id: string; from: string; to: string; qty: number }) => {
      const productIndex = productsData.findIndex(p => p.id === id);
      if (productIndex === -1) {
        throw new Error(`Product with id ${id} not found`);
      }

      const product = productsData[productIndex];
      
      // Check if the product is in the source warehouse
      if (product.warehouse !== from) {
        throw new Error(`Product ${id} is not in warehouse ${from}`);
      }

      // Check if there's enough stock
      if (product.stock < qty) {
        throw new Error(`Insufficient stock for product ${id}`);
      }

      // Update the product
      product.stock -= qty;
      product.warehouse = to;

      return product;
    }
  }
};
