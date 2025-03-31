import React, { useState } from 'react';
import { Download, DollarSign, TrendingUp, AlertCircle, CreditCard, BarChart2, TrendingDown } from 'lucide-react';
import Pagination from '../components/Pagination';
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
    type: 'Sales Commission',
    region: 'Eastern'
  },
  {
    id: 2,
    date: '2024-03-14',
    agent: 'Michael Johnson',
    amount: 9800,
    status: 'Pending',
    type: 'Referral Commission',
    region: 'Western'
  },
  {
    id: 3,
    date: '2024-03-13',
    agent: 'Emily Rodriguez',
    amount: 11200,
    status: 'Overdue',
    type: 'Sales Commission',
    region: 'Northern'
  },
  {
    id: 4,
    date: '2024-03-12',
    agent: 'David Kim',
    amount: 8700,
    status: 'Paid',
    type: 'Performance Bonus',
    region: 'Southern'
  },
  {
    id: 5,
    date: '2024-03-10',
    agent: 'Lisa Wong',
    amount: 10300,
    status: 'Paid',
    type: 'Sales Commission',
    region: 'Eastern'
  }
];

const loanData = [
  {
    id: 1,
    farmer: 'John Mbeki',
    amount: 5000,
    interestRate: 4.5,
    status: 'Approved',
    purpose: 'Fertilizer',
    date: '2024-03-18'
  },
  {
    id: 2,
    farmer: 'Amara Okafor',
    amount: 7500,
    interestRate: 5.0,
    status: 'Processing',
    purpose: 'Seeds',
    date: '2024-03-17'
  },
  {
    id: 3,
    farmer: 'Ibrahim Hassan',
    amount: 3200,
    interestRate: 4.5,
    status: 'Approved',
    purpose: 'Equipment',
    date: '2024-03-15'
  },
  {
    id: 4,
    farmer: 'Grace Muthoni',
    amount: 6000,
    interestRate: 4.8,
    status: 'Rejected',
    purpose: 'Irrigation',
    date: '2024-03-14'
  }
];

const commodityPrices = [
  { name: 'Maize', price: 380, change: +2.5, volume: '12,500 tons' },
  { name: 'Rice', price: 520, change: -1.2, volume: '8,300 tons' },
  { name: 'Coffee', price: 1250, change: +4.7, volume: '5,600 tons' },
  { name: 'Tea', price: 890, change: +0.8, volume: '7,200 tons' },
  { name: 'Wheat', price: 410, change: -0.5, volume: '9,100 tons' }
];

const commodityTrends = [
  { month: 'Jan', maize: 350, rice: 510, coffee: 1180 },
  { month: 'Feb', maize: 360, rice: 525, coffee: 1200 },
  { month: 'Mar', maize: 370, rice: 515, coffee: 1220 },
  { month: 'Apr', maize: 380, rice: 520, coffee: 1250 }
];

const Financials = () => {
  const [activeTab, setActiveTab] = useState('inputs');
  const [currentLoanPage, setCurrentLoanPage] = useState(1);
  const [currentTransPage, setCurrentTransPage] = useState(1);
  
  const loansPerPage = 3;
  const transactionsPerPage = 3;
  
  // Calculate current loans to display
  const indexOfLastLoan = currentLoanPage * loansPerPage;
  const indexOfFirstLoan = indexOfLastLoan - loansPerPage;
  const currentLoans = loanData.slice(indexOfFirstLoan, indexOfLastLoan);
  
  // Calculate current transactions to display
  const indexOfLastTrans = currentTransPage * transactionsPerPage;
  const indexOfFirstTrans = indexOfLastTrans - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTrans, indexOfLastTrans);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

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

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => handleTabChange('inputs')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'inputs'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Inputs
          </button>
          <button
            onClick={() => handleTabChange('commissions')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'commissions'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Commissions
          </button>
          <button
            onClick={() => handleTabChange('commodities')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'commodities'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Commodities
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'inputs' && (
            <div className="space-y-6">
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Loan Distribution Insights</h4>
                <p className="text-sm text-blue-700">
                  Fertilizer loans have increased by 15% this quarter, while equipment financing requests 
                  have decreased by 8%. The average loan amount has grown by GHS 750 compared to last quarter.
                </p>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Input Loans</h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="font-medium">Total Active Loans:</span>
                  <span className="font-bold text-gray-900">32</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-green-100">
                      <CreditCard className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">GHS 21,700</h3>
                  <p className="text-sm text-gray-500">Total Loan Amount</p>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-blue-100">
                      <BarChart2 className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">4.7%</h3>
                  <p className="text-sm text-gray-500">Average Interest Rate</p>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-purple-100">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">75%</h3>
                  <p className="text-sm text-gray-500">Approval Rate</p>
                </div>
              </div>
              
              <h3 className="text-md font-medium text-gray-900 mb-3">Recent Loan Applications</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Farmer</th>
                      <th className="pb-3 font-medium">Amount</th>
                      <th className="pb-3 font-medium">Interest Rate</th>
                      <th className="pb-3 font-medium">Purpose</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentLoans.map((loan) => (
                      <tr key={loan.id} className="border-b border-gray-100 last:border-0">
                        <td className="py-3 text-sm text-gray-900">
                          {new Date(loan.date).toLocaleDateString()}
                        </td>
                        <td className="py-3 text-sm text-gray-900">{loan.farmer}</td>
                        <td className="py-3 text-sm font-medium text-gray-900">
                          GHS {loan.amount.toLocaleString()}
                        </td>
                        <td className="py-3 text-sm text-gray-900">{loan.interestRate}%</td>
                        <td className="py-3 text-sm text-gray-500">{loan.purpose}</td>
                        <td className="py-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            loan.status === 'Approved' ? 'bg-green-100 text-green-800' :
                            loan.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {loan.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination for Loan Applications */}
              <Pagination 
                currentPage={currentLoanPage} 
                totalPages={Math.ceil(loanData.length / loansPerPage)} 
                onPageChange={setCurrentLoanPage} 
              />
            </div>
          )}

          {activeTab === 'commodities' && (
            <div className="space-y-6">
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Market Insights</h4>
                <p className="text-sm text-blue-700">
                  Coffee prices continue their upward trend due to supply constraints in major producing regions. 
                  Maize has shown steady growth this quarter, while rice prices have experienced minor volatility 
                  due to changing export policies in key Asian markets.
                </p>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Commodity Pricing</h2>
                <div className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleDateString()}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-amber-100">
                      <TrendingUp className="w-5 h-5 text-amber-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">GHS 380</h3>
                  <p className="text-sm text-gray-500">Maize (per ton)</p>
                  <span className="text-xs font-medium text-green-600">+2.5% this week</span>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-green-100">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">GHS 1,250</h3>
                  <p className="text-sm text-gray-500">Coffee (per ton)</p>
                  <span className="text-xs font-medium text-green-600">+4.7% this week</span>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-red-100">
                      <TrendingDown className="w-5 h-5 text-red-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">GHS 520</h3>
                  <p className="text-sm text-gray-500">Rice (per ton)</p>
                  <span className="text-xs font-medium text-red-600">-1.2% this week</span>
                </div>
              </div>
              
              <h3 className="text-md font-medium text-gray-900 mb-3">Current Market Prices</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                      <th className="pb-3 font-medium">Commodity</th>
                      <th className="pb-3 font-medium">Price (GHS/ton)</th>
                      <th className="pb-3 font-medium">Change</th>
                      <th className="pb-3 font-medium">Trading Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commodityPrices.map((commodity, index) => (
                      <tr key={index} className="border-b border-gray-100 last:border-0">
                        <td className="py-3 text-sm font-medium text-gray-900">{commodity.name}</td>
                        <td className="py-3 text-sm text-gray-900">GHS {commodity.price}</td>
                        <td className="py-3 text-sm">
                          <span className={commodity.change > 0 ? 'text-green-600' : 'text-red-600'}>
                            {commodity.change > 0 ? '+' : ''}{commodity.change}%
                          </span>
                        </td>
                        <td className="py-3 text-sm text-gray-500">{commodity.volume}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
                
                  {/* Pagination for Transactions */}
                  <Pagination 
                currentPage={currentTransPage} 
                totalPages={Math.ceil(transactions.length / transactionsPerPage)} 
                onPageChange={setCurrentTransPage} 
              />
              
              <div className="mt-6">
                <h3 className="text-md font-medium text-gray-900 mb-3">Price Trends (Q1 2024)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={commodityTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="maize" fill="#F59E0B" name="Maize" />
                      <Bar dataKey="rice" fill="#10B981" name="Rice" />
                      <Bar dataKey="coffee" fill="#6366F1" name="Coffee" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'commissions' && (
            <div className="space-y-6">
               <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Commission Insights</h4>
                <p className="text-sm text-blue-700">
                  Eastern region agents have shown the highest performance this quarter with 28% of total commissions. 
                  Sales commissions continue to be the primary earnings source, accounting for 65% of all payouts.
                </p>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Agent Commissions</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    <span className="text-sm text-gray-600">Paid: GHS 33,500</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    <span className="text-sm text-gray-600">Pending: GHS 9,800</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="text-sm text-gray-600">Overdue: GHS 11,200</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-indigo-100">
                      <DollarSign className="w-5 h-5 text-indigo-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">GHS 54,500</h3>
                  <p className="text-sm text-gray-500">Total Commissions</p>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-emerald-100">
                      <TrendingUp className="w-5 h-5 text-emerald-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">GHS 10,900</h3>
                  <p className="text-sm text-gray-500">Average per Agent</p>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-blue-100">
                      <BarChart2 className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">+12.3%</h3>
                  <p className="text-sm text-gray-500">Growth from Last Month</p>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                      <th className="pb-4 font-medium">Date</th>
                      <th className="pb-4 font-medium">Agent</th>
                      <th className="pb-4 font-medium">Commission Amount</th>
                      <th className="pb-4 font-medium">Type</th>
                      <th className="pb-4 font-medium">Region</th>
                      <th className="pb-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTransactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b border-gray-100 last:border-0">
                        <td className="py-4 text-sm text-gray-900">
                          {new Date(transaction.date).toLocaleDateString()}
                        </td>
                        <td className="py-4 text-sm text-gray-900">{transaction.agent}</td>
                        <td className="py-4 text-sm font-medium text-gray-900">
                          GHS {transaction.amount.toLocaleString()}
                        </td>
                        <td className="py-4 text-sm text-gray-500">{transaction.type}</td>
                        <td className="py-4 text-sm text-gray-500">{transaction.region}</td>
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

                  {/* Pagination for Transactions */}
                  <Pagination 
                currentPage={currentTransPage} 
                totalPages={Math.ceil(transactions.length / transactionsPerPage)} 
                onPageChange={setCurrentTransPage} 
              />
              
             
            </div>
          )}
        </div>
      </div>



    </div>
  );
};

export default Financials;
