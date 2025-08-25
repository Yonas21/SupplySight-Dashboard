import { MockedResponse } from '@apollo/client/testing';
import { GET_PRODUCTS, GET_WAREHOUSES, GET_KPIS, UPDATE_DEMAND, TRANSFER_STOCK } from '../graphql/queries';
import type { Product, Warehouse, KPI } from '../types';

export const mockProducts: Product[] = [
  {
    id: "P-1001",
    name: "12mm Hex Bolt",
    sku: "HEX-12-100",
    warehouse: "BLR-A",
    stock: 180,
    demand: 120
  },
  {
    id: "P-1002",
    name: "Steel Washer",
    sku: "WSR-08-500",
    warehouse: "BLR-A",
    stock: 50,
    demand: 80
  },
  {
    id: "P-1003",
    name: "M8 Nut",
    sku: "NUT-08-200",
    warehouse: "PNQ-C",
    stock: 80,
    demand: 80
  },
  {
    id: "P-1004",
    name: "Bearing 608ZZ",
    sku: "BRG-608-50",
    warehouse: "DEL-B",
    stock: 24,
    demand: 120
  }
];

export const mockWarehouses: Warehouse[] = [
  {
    code: "BLR-A",
    name: "Bangalore Central",
    city: "Bangalore",
    country: "India"
  },
  {
    code: "DEL-B",
    name: "Delhi North",
    city: "Delhi",
    country: "India"
  },
  {
    code: "PNQ-C",
    name: "Pune West",
    city: "Pune",
    country: "India"
  }
];

export const mockKPIs: KPI[] = [
  { date: "2024-01-01", stock: 1000, demand: 800 },
  { date: "2024-01-02", stock: 1100, demand: 850 },
  { date: "2024-01-03", stock: 950, demand: 900 },
  { date: "2024-01-04", stock: 1200, demand: 750 },
  { date: "2024-01-05", stock: 1050, demand: 820 }
];

// GraphQL Mock Responses
export const mockGetProductsResponse: MockedResponse = {
  request: {
    query: GET_PRODUCTS,
    variables: {}
  },
  result: {
    data: {
      products: mockProducts
    }
  }
};

export const mockGetWarehousesResponse: MockedResponse = {
  request: {
    query: GET_WAREHOUSES
  },
  result: {
    data: {
      warehouses: mockWarehouses
    }
  }
};

export const mockGetKPIsResponse: MockedResponse = {
  request: {
    query: GET_KPIS,
    variables: { range: "7d" }
  },
  result: {
    data: {
      kpis: mockKPIs
    }
  }
};

export const mockUpdateDemandResponse: MockedResponse = {
  request: {
    query: UPDATE_DEMAND,
    variables: { id: "P-1001", demand: 150 }
  },
  result: {
    data: {
      updateDemand: {
        ...mockProducts[0],
        demand: 150
      }
    }
  }
};

export const mockTransferStockResponse: MockedResponse = {
  request: {
    query: TRANSFER_STOCK,
    variables: { id: "P-1001", from: "BLR-A", to: "DEL-B", qty: 50 }
  },
  result: {
    data: {
      transferStock: {
        ...mockProducts[0],
        stock: 130,
        warehouse: "DEL-B"
      }
    }
  }
};
