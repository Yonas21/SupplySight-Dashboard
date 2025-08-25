import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PRODUCTS, GET_WAREHOUSES, GET_KPIS, UPDATE_DEMAND, TRANSFER_STOCK } from '../graphql/queries';
import type { Product } from '../types';
import { calculateTotalStock, calculateTotalDemand, calculateFillRate } from '../utils/calculations';
import KpiCard from './KpiCard';
import LineChart from './LineChart';
import Filters from './Filters';
import ProductsTable from './ProductsTable';
import SideDrawer from './SideDrawer';
import { Package, TrendingUp, Percent } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [search, setSearch] = useState('');
  const [warehouse, setWarehouse] = useState('');
  const [status, setStatus] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [kpiRange, setKpiRange] = useState('30d');

  // GraphQL Queries
  const { data: productsData, loading: productsLoading } = useQuery(GET_PRODUCTS, {
    variables: { search, status: status === 'All' ? undefined : status, warehouse: warehouse || undefined }
  });

  const { data: warehousesData } = useQuery(GET_WAREHOUSES);

  const { data: kpisData, loading: kpisLoading } = useQuery(GET_KPIS, {
    variables: { range: kpiRange }
  });

  // GraphQL Mutations
  const [updateDemand] = useMutation(UPDATE_DEMAND);
  const [transferStock] = useMutation(TRANSFER_STOCK);

  const products = productsData?.products || [];
  const warehouses = warehousesData?.warehouses || [];
  const kpis = kpisData?.kpis || [];

  // Calculate KPIs
  const totalStock = calculateTotalStock(products);
  const totalDemand = calculateTotalDemand(products);
  const fillRate = calculateFillRate(products);

  const handleProductRowClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedProduct(null);
  };

  const handleUpdateDemand = async (id: string, demand: number) => {
    try {
      await updateDemand({
        variables: { id, demand },
        refetchQueries: [{ query: GET_PRODUCTS, variables: { search, status: status === 'All' ? undefined : status, warehouse: warehouse || undefined } }]
      });
    } catch (error) {
      console.error('Error updating demand:', error);
      throw error;
    }
  };

  const handleTransferStock = async (id: string, from: string, to: string, qty: number) => {
    try {
      await transferStock({
        variables: { id, from, to, qty },
        refetchQueries: [{ query: GET_PRODUCTS, variables: { search, status: status === 'All' ? undefined : status, warehouse: warehouse || undefined } }]
      });
    } catch (error) {
      console.error('Error transferring stock:', error);
      throw error;
    }
  };

  const handleRangeChange = (range: string) => {
    setKpiRange(range);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">SupplySight</h1>
              <p className="text-gray-600">Supply Chain Dashboard</p>
            </div>
            
            {/* Date Range Chips */}
            <div className="flex space-x-2">
              {['7d', '14d', '30d'].map((range) => (
                <button
                  key={range}
                  onClick={() => handleRangeChange(range)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    kpiRange === range
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <KpiCard
            title="Total Stock"
            value={totalStock}
            icon={<Package className="h-8 w-8" />}
          />
          <KpiCard
            title="Total Demand"
            value={totalDemand}
            icon={<TrendingUp className="h-8 w-8" />}
          />
          <KpiCard
            title="Fill Rate"
            value={fillRate}
            isPercentage={true}
            icon={<Percent className="h-8 w-8" />}
          />
        </div>

        {/* Line Chart */}
        <div className="mb-8">
          <LineChart data={kpis} loading={kpisLoading} />
        </div>

        {/* Filters */}
        <Filters
          search={search}
          warehouse={warehouse}
          status={status}
          warehouses={warehouses}
          onSearchChange={setSearch}
          onWarehouseChange={setWarehouse}
          onStatusChange={setStatus}
        />

        {/* Products Table */}
        <ProductsTable
          products={products}
          warehouses={warehouses}
          loading={productsLoading}
          onRowClick={handleProductRowClick}
        />

        {/* Side Drawer */}
        <SideDrawer
          product={selectedProduct}
          warehouses={warehouses}
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
          onUpdateDemand={handleUpdateDemand}
          onTransferStock={handleTransferStock}
        />
      </main>
    </div>
  );
};

export default Dashboard;
