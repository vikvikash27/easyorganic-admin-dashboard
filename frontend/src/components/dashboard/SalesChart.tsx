import React from 'react';
import Card from '../ui/Card';

const mockSalesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
];

// A simple bar chart component to visualize sales data.
// In a real application, this would be replaced with a more robust charting library.
const SalesChart: React.FC = () => {
  const maxSales = Math.max(...mockSalesData.map(d => d.sales));

  return (
    <Card>
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Sales Overview</h3>
      <div className="flex justify-around items-end h-64 space-x-4">
        {mockSalesData.map((data) => (
          <div key={data.name} className="flex flex-col items-center flex-1">
            <div
              className="w-full bg-brand-primary rounded-t-md hover:bg-indigo-700 transition-colors"
              style={{ height: `${(data.sales / maxSales) * 100}%` }}
              title={`Sales: ₹${data.sales}`}
            ></div>
            <span className="text-xs font-medium text-slate-500 mt-2">{data.name}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SalesChart;