import React from 'react';
import { getStatusColor } from '../utils/calculations';

interface StatusPillProps {
  status: 'Healthy' | 'Low' | 'Critical';
}

const StatusPill: React.FC<StatusPillProps> = ({ status }) => {
  const statusClass = getStatusColor(status);

  return (
    <span className={`status-pill ${statusClass}`}>
      {status}
    </span>
  );
};

export default StatusPill;
