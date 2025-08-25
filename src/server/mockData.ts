import { Product, Warehouse, KPI } from '../types';

// Sample products data as provided
export const productsData: Product[] = [
  { id: "P-1001", name: "12mm Hex Bolt", sku: "HEX-12-100", warehouse: "BLR-A", stock: 180, demand: 120 },
  { id: "P-1002", name: "Steel Washer", sku: "WSR-08-500", warehouse: "BLR-A", stock: 50, demand: 80 },
  { id: "P-1003", name: "M8 Nut", sku: "NUT-08-200", warehouse: "PNQ-C", stock: 80, demand: 80 },
  { id: "P-1004", name: "Bearing 608ZZ", sku: "BRG-608-50", warehouse: "DEL-B", stock: 24, demand: 120 },
  { id: "P-1005", name: "Aluminum Plate", sku: "ALM-10-200", warehouse: "BLR-A", stock: 150, demand: 90 },
  { id: "P-1006", name: "Copper Wire", sku: "COP-16-100", warehouse: "DEL-B", stock: 200, demand: 180 },
  { id: "P-1007", name: "Rubber Gasket", sku: "RUB-25-50", warehouse: "PNQ-C", stock: 30, demand: 45 },
  { id: "P-1008", name: "Steel Rod", sku: "STE-20-150", warehouse: "BLR-A", stock: 75, demand: 100 },
  { id: "P-1009", name: "Plastic Housing", sku: "PLA-30-80", warehouse: "DEL-B", stock: 60, demand: 70 },
  { id: "P-1010", name: "Ceramic Insulator", sku: "CER-15-120", warehouse: "PNQ-C", stock: 40, demand: 35 },
  { id: "P-1011", name: "Titanium Screw", sku: "TIT-06-300", warehouse: "BLR-A", stock: 120, demand: 140 },
  { id: "P-1012", name: "Carbon Fiber Sheet", sku: "CAR-05-60", warehouse: "DEL-B", stock: 25, demand: 30 }
];

// Warehouse data
export const warehousesData: Warehouse[] = [
  { code: "BLR-A", name: "Bangalore Central", city: "Bangalore", country: "India" },
  { code: "DEL-B", name: "Delhi North", city: "Delhi", country: "India" },
  { code: "PNQ-C", name: "Pune West", city: "Pune", country: "India" },
  { code: "MUM-D", name: "Mumbai South", city: "Mumbai", country: "India" },
  { code: "CHN-E", name: "Chennai East", city: "Chennai", country: "India" }
];

// Generate KPI data for the last 30 days
export const generateKPIData = (range: string): KPI[] => {
  const days = range === '7d' ? 7 : range === '14d' ? 14 : 30;
  const kpis: KPI[] = [];
  
  const baseStock = 1200;
  const baseDemand = 800;
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Add some realistic variation
    const stockVariation = Math.floor(Math.random() * 200) - 100;
    const demandVariation = Math.floor(Math.random() * 150) - 75;
    
    kpis.push({
      date: date.toISOString().split('T')[0],
      stock: Math.max(0, baseStock + stockVariation),
      demand: Math.max(0, baseDemand + demandVariation)
    });
  }
  
  return kpis;
};
