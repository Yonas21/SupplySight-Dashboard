import React from 'react';
import type { Warehouse } from '../types';
import { Search } from 'lucide-react';

interface FiltersProps {
  search: string;
  warehouse: string;
  status: string;
  warehouses: Warehouse[];
  onSearchChange: (value: string) => void;
  onWarehouseChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  search,
  warehouse,
  status,
  warehouses,
  onSearchChange,
  onWarehouseChange,
  onStatusChange
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        {/* Search Box */}
        <div className="relative">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="search"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search products..."
            />
          </div>
        </div>

        {/* Warehouse Dropdown */}
        <div>
          <label htmlFor="warehouse" className="block text-sm font-medium text-gray-700 mb-1">
            Warehouse
          </label>
          <select
            id="warehouse"
            value={warehouse}
            onChange={(e) => onWarehouseChange(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Warehouses</option>
            {warehouses.map((warehouse) => (
              <option key={warehouse.code} value={warehouse.code}>
                {warehouse.code} - {warehouse.name}
              </option>
            ))}
          </select>
        </div>

        {/* Status Dropdown */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All Status</option>
            <option value="Healthy">Healthy</option>
            <option value="Low">Low</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
