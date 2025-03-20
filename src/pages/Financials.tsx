import React from 'react';
import { Download, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { month: 'Jan', revenue: 65000 },
  { month: 'Feb', revenue: 59000 },
  { month: 'Mar', revenue: 80000 },
  { month: 'Apr', revenue: 81000 },
  { month: 'May', revenue: 56000 },
  { month: 'Jun', revenue: 55000 },
];

const transactions = [
  {
    id: 1,
    date: '2024-03-15',
    agent: 'Sarah Chen',
    amount: 12500,
    status: 'Paid',
    type: 'Commission'
  },
  {
    id: 2,
    date: '2024-03-14',
    agent: 'Michael Johnson',
    amount: 9800,
    status: 'Pending',
    type: 'Commission'
  },
  {
    id: 3,
    date: '2024-03-13',
    agent: 'Emily Rodriguez',
    amount: 11200,
    status: 'Overdue',
    type: 'Commission'
  }
];

const Financials = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Financials</h1>
        <div className="flex gap-4">
          <button className="flex items-center px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
            <Download className="w-5 h-5 mr-2" />
            Export CSV
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
            <Download className="w-5 h-5 mr-2" />
            Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-green-100">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+12.5%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">$234,567</h3>
          <p className="text-sm text-gray-500">Total Revenue</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-blue-100">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-600">+8.2%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">$45,678</h3>
          <p className="text-sm text-gray-500">Pending Payments</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-red-100">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-sm font-medium text-red-600">3 overdue</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">$12,345</h3>
          <p className="text-sm text-gray-500">Overdue Payments</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Revenue Overview</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                <th className="pb-4 font-medium">Date</th>
                <th className="pb-4 font-medium">Agent</th>
                <th className="pb-4 font-medium">Amount</th>
                <th className="pb-4 font-medium">Type</th>
                <th className="pb-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100 last:border-0">
                  <td className="py-4 text-sm text-gray-900">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="py-4 text-sm text-gray-900">{transaction.agent}</td>
                  <td className="py-4 text-sm font-medium text-gray-900">
                    ${transaction.amount.toLocaleString()}
                  </td>
                  <td className="py-4 text-sm text-gray-500">{transaction.type}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      transaction.status === 'Paid' ? 'bg-green-100 text-green-800' :
                      transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Financials;