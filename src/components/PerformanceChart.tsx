import React from 'react';
import { BarChart3 } from 'lucide-react';

const PerformanceChart = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Performance Overview</h2>
        <select className="text-sm border border-gray-200 rounded-lg px-3 py-2">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 3 months</option>
        </select>
      </div>
      
      <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
        <div className="text-center">
          <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">Chart visualization would go here</p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;