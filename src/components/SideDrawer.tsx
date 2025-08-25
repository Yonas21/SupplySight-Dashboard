import React, { useState } from 'react';
import type { Product, Warehouse } from '../types';
import { X, TrendingUp, ArrowRight } from 'lucide-react';
import StatusPill from './StatusPill';
import { getProductStatus, formatNumber } from '../utils/calculations';

interface SideDrawerProps {
  product: Product | null;
  warehouses: Warehouse[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateDemand: (id: string, demand: number) => Promise<void>;
  onTransferStock: (id: string, from: string, to: string, qty: number) => Promise<void>;
}

const SideDrawer: React.FC<SideDrawerProps> = ({
  product,
  warehouses,
  isOpen,
  onClose,
  onUpdateDemand,
  onTransferStock
}) => {
  const [demandValue, setDemandValue] = useState('');
  const [transferTo, setTransferTo] = useState('');
  const [transferQty, setTransferQty] = useState('');
  const [isUpdatingDemand, setIsUpdatingDemand] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);

  if (!product) return null;

  const status = getProductStatus(product.stock, product.demand);
  const availableWarehouses = warehouses.filter(w => w.code !== product.warehouse);

  const handleUpdateDemand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!demandValue || isNaN(Number(demandValue))) return;

    setIsUpdatingDemand(true);
    try {
      await onUpdateDemand(product.id, Number(demandValue));
      setDemandValue('');
    } catch (error) {
      console.error('Error updating demand:', error);
    } finally {
      setIsUpdatingDemand(false);
    }
  };

  const handleTransferStock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferTo || !transferQty || isNaN(Number(transferQty))) return;

    setIsTransferring(true);
    try {
      await onTransferStock(product.id, product.warehouse, transferTo, Number(transferQty));
      setTransferTo('');
      setTransferQty('');
    } catch (error) {
      console.error('Error transferring stock:', error);
    } finally {
      setIsTransferring(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Product Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Product Info */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Product Name</h3>
                <p className="text-lg font-semibold text-gray-900">{product.name}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">SKU</h3>
                  <p className="text-sm text-gray-900">{product.sku}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Product ID</h3>
                  <p className="text-sm text-gray-900">{product.id}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Current Warehouse</h3>
                <p className="text-sm text-gray-900">{product.warehouse}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Current Stock</h3>
                  <p className="text-lg font-semibold text-gray-900">{formatNumber(product.stock)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Current Demand</h3>
                  <p className="text-lg font-semibold text-gray-900">{formatNumber(product.demand)}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <StatusPill status={status} />
              </div>
            </div>

            {/* Update Demand Form */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Update Demand
              </h3>
              <form onSubmit={handleUpdateDemand} className="space-y-4">
                <div>
                  <label htmlFor="demand" className="block text-sm font-medium text-gray-700 mb-1">
                    New Demand Value
                  </label>
                  <input
                    type="number"
                    id="demand"
                    value={demandValue}
                    onChange={(e) => setDemandValue(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter new demand value"
                    min="0"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!demandValue || isUpdatingDemand}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUpdatingDemand ? 'Updating...' : 'Update Demand'}
                </button>
              </form>
            </div>

            {/* Transfer Stock Form */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <ArrowRight className="h-5 w-5 mr-2" />
                Transfer Stock
              </h3>
              <form onSubmit={handleTransferStock} className="space-y-4">
                <div>
                  <label htmlFor="transferTo" className="block text-sm font-medium text-gray-700 mb-1">
                    Transfer To Warehouse
                  </label>
                  <select
                    id="transferTo"
                    value={transferTo}
                    onChange={(e) => setTransferTo(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select warehouse</option>
                    {availableWarehouses.map((warehouse) => (
                      <option key={warehouse.code} value={warehouse.code}>
                        {warehouse.code} - {warehouse.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="transferQty" className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity to Transfer
                  </label>
                  <input
                    type="number"
                    id="transferQty"
                    value={transferQty}
                    onChange={(e) => setTransferQty(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter quantity"
                    min="1"
                    max={product.stock}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Maximum available: {formatNumber(product.stock)}
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={!transferTo || !transferQty || isTransferring}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isTransferring ? 'Transferring...' : 'Transfer Stock'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
