import React from 'react';
import { formatNumber, formatPercentage } from '../utils/calculations';

interface KpiCardProps {
  title: string;
  value: number;
  unit?: string;
  isPercentage?: boolean;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  unit,
  isPercentage = false,
  icon,
  trend
}) => {
  const formattedValue = isPercentage ? formatPercentage(value) : formatNumber(value);
  const displayValue = unit ? `${formattedValue} ${unit}` : formattedValue;

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{displayValue}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`text-sm font-medium ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last period</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="text-gray-400">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default KpiCard;
