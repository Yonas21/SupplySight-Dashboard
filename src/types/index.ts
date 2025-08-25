export interface Warehouse {
  code: string;
  name: string;
  city: string;
  country: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  warehouse: string;
  stock: number;
  demand: number;
}

export interface KPI {
  date: string;
  stock: number;
  demand: number;
}

export interface ProductStatus {
  id: string;
  name: string;
  sku: string;
  warehouse: string;
  stock: number;
  demand: number;
  status: 'Healthy' | 'Low' | 'Critical';
}

export interface UpdateDemandInput {
  id: string;
  demand: number;
}

export interface TransferStockInput {
  id: string;
  from: string;
  to: string;
  qty: number;
}

export interface ProductsQueryVariables {
  search?: string;
  status?: string;
  warehouse?: string;
}

export interface KPIsQueryVariables {
  range: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
}
