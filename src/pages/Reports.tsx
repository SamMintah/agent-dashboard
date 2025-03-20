import React, { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell 
} from 'recharts';
 
// Sample data for charts
const performanceData = [
  { month: 'Jan', calls: 120, meetings: 20, deals: 5 },
  { month: 'Feb', calls: 150, meetings: 25, deals: 8 },
  { month: 'Mar', calls: 180, meetings: 30, deals: 12 },
  { month: 'Apr', calls: 170, meetings: 28, deals: 10 },
  { month: 'May', calls: 200, meetings: 35, deals: 15 },
  { month: 'Jun', calls: 220, meetings: 40, deals: 18 },
];
 
const revenueData = [
  { month: 'Jan', revenue: 15000 },
  { month: 'Feb', revenue: 25000 },
  { month: 'Mar', revenue: 35000 },
  { month: 'Apr', revenue: 30000 },
  { month: 'May', revenue: 40000 },
  { month: 'Jun', revenue: 50000 },
];
 
const agentPerformanceData = [
  { name: 'John Doe', performance: 85 },
  { name: 'Jane Smith', performance: 92 },
  { name: 'Robert Johnson', performance: 78 },
  { name: 'Emily Davis', performance: 88 },
  { name: 'Michael Brown', performance: 95 },
];
 
const taskCompletionData = [
  { name: 'Completed', value: 75, color: '#4CAF50' },
  { name: 'In Progress', value: 15, color: '#2196F3' },
  { name: 'Overdue', value: 10, color: '#F44336' },
];
 
const Reports = () => {
  const [dateRange, setDateRange] = useState<string>('last30days');
  const [reportType, setReportType] = useState<string>('all');
  
  // Filter handlers
  const handleDateRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDateRange(e.target.value);
  };
  
  const handleReportTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setReportType(e.target.value);
  };
  
  // Export handlers
  const handleExportPDF = () => {
    alert('Exporting as PDF...');
    // Implementation would go here
  };
  
  const handleExportCSV = () => {
    alert('Exporting as CSV...');
    // Implementation would go here
  };
 
  return (
    <div className="reports-container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reports Dashboard</h1>
        <div className="flex space-x-4">
          <div className="filter-group">
            <label htmlFor="dateRange" className="mr-2 text-gray-600">Date Range:</label>
            <select 
              id="dateRange" 
              value={dateRange} 
              onChange={handleDateRangeChange}
              className="border rounded p-2 text-gray-700"
            >
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="last90days">Last 90 Days</option>
              <option value="lastYear">Last Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="reportType" className="mr-2 text-gray-600">Report Type:</label>
            <select 
              id="reportType" 
              value={reportType} 
              onChange={handleReportTypeChange}
              className="border rounded p-2 text-gray-700"
            >
              <option value="all">All Reports</option>
              <option value="performance">Performance</option>
              <option value="financial">Financial</option>
              <option value="tasks">Tasks</option>
              <option value="agents">Agents</option>
            </select>
          </div>
          <div className="export-buttons">
            <button 
              onClick={handleExportPDF}
              className="bg-blue-600 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700"
            >
              Export PDF
            </button>
            <button 
              onClick={handleExportCSV}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Export CSV
            </button>
          </div>
        </div>
      </div>
 
      {/* Performance Reports Section */}
      <div className="report-section mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Performance Metrics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-3 text-gray-700">Agent Activity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="calls" fill="#8884d8" name="Calls Made" />
                <Bar dataKey="meetings" fill="#82ca9d" name="Meetings Set" />
                <Bar dataKey="deals" fill="#ffc658" name="Deals Closed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-3 text-gray-700">Agent Performance Ranking</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart 
                data={agentPerformanceData} 
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="performance" fill="#8884d8" name="Performance Score" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
 
      {/* Financial Reports Section */}
      <div className="report-section mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Financial Reports</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-3 text-gray-700">Revenue Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#2196F3" 
                  activeDot={{ r: 8 }} 
                  name="Monthly Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-3 text-gray-700">Revenue by Agent</h3>
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <p className="mt-2">Detailed agent revenue data will be available soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
 
      {/* Task Reports Section */}
      <div className="report-section mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Task Reports</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-3 text-gray-700">Task Completion Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={taskCompletionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {taskCompletionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-3 text-gray-700">Task Completion Trends</h3>
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p className="mt-2">Historical task completion data will be available soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
 
      {/* Custom Report Builder Section */}
      <div className="report-section">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Custom Report Builder</h2>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 mb-4">
            Build custom reports by selecting metrics, dimensions, and filters to analyze your data in detail.
          </p>
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            Create Custom Report
          </button>
        </div>
      </div>
    </div>
  );
};
 
export default Reports;