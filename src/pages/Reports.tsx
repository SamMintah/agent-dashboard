import React, { useState, useMemo, useEffect } from 'react';

// Sample data for agent reports with farmer-related content
const sampleReportsData = [
  { id: 1, agentName: 'John Doe', title: 'Farmer Registration - Samuel Mwangi', date: '2025-03-15', status: 'pending' },
  { id: 2, agentName: 'Jane Smith', title: 'Crop Production Report - Wanjiku Farms', date: '2025-03-14', status: 'submitted' },
  { id: 3, agentName: 'Robert Johnson', title: 'New Farmer Onboarding - Ochieng Family', date: '2025-03-12', status: 'rejected' },
  { id: 4, agentName: 'Emily Davis', title: 'Farmer Training Completion - Kamau Group', date: '2025-03-10', status: 'submitted' },
  { id: 5, agentName: 'Michael Brown', title: 'Farm Inspection Results - Mutua Plantation', date: '2025-03-08', status: 'pending' },
  { id: 6, agentName: 'Sarah Wilson', title: 'Farmer Feedback Analysis - Otieno Cooperative', date: '2025-03-05', status: 'submitted' },
  { id: 7, agentName: 'David Thompson', title: 'Soil Testing Results - Njoroge Farm', date: '2025-03-03', status: 'rejected' },
  { id: 8, agentName: 'Lisa Anderson', title: 'Seed Distribution Report - Kimani Region', date: '2025-03-01', status: 'submitted' },
  { id: 9, agentName: 'James Martinez', title: 'Harvest Forecast - Wekesa Cooperative', date: '2025-02-28', status: 'pending' },
  { id: 10, agentName: 'Jennifer Taylor', title: 'Farmer Retention Strategy - Arunga District', date: '2025-02-25', status: 'submitted' },
];
 
const Reports = () => {
  const [dateRange, setDateRange] = useState<string>('last30days');
  const [reportStatus, setReportStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [reports, setReports] = useState(sampleReportsData);
  const [statsUpdatedAt, setStatsUpdatedAt] = useState<Date>(new Date());
  
  // Calculate report statistics
  const reportStats = useMemo(() => {
    const pending = reports.filter(report => report.status === 'pending').length;
    const submitted = reports.filter(report => report.status === 'submitted').length;
    const rejected = reports.filter(report => report.status === 'rejected').length;
    
    return { pending, submitted, rejected, total: reports.length };
  }, [reports]);
  
  // Filter handlers
  const handleDateRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDateRange(e.target.value);
    // In a real app, this would filter the reports based on date range
  };
  
  const handleReportStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    setReportStatus(status);
    applyFilters(status, searchQuery);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    applyFilters(reportStatus, query);
  };
  
  // Initialize stats timestamp when component loads
  useEffect(() => {
    setStatsUpdatedAt(new Date());
  }, []);

  // Combined filter function
  const applyFilters = (status: string, query: string) => {
    let filteredReports = sampleReportsData;
    setStatsUpdatedAt(new Date());
    
    // Apply status filter
    if (status !== 'all') {
      filteredReports = filteredReports.filter(report => report.status === status);
    }
    
    // Apply search filter
    if (query.trim() !== '') {
      const searchLower = query.toLowerCase();
      filteredReports = filteredReports.filter(report => 
        report.agentName.toLowerCase().includes(searchLower) || 
        report.title.toLowerCase().includes(searchLower)
      );
    }
    
    setReports(filteredReports);
  };
  
  // Export handlers
  const handleExportPDF = () => {
    alert('Exporting reports as PDF...');
    // Implementation would go here
  };
  
  const handleExportCSV = () => {
    alert('Exporting reports as CSV...');
    // Implementation would go here
  };
 
  return (
    <div className="reports-container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Agent Reports</h1>
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

      {/* Report Statistics Section */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Total Reports</h3>
            <p className="text-2xl font-bold text-gray-800">{reportStats.total}</p>
            <p className="text-xs text-gray-500 mt-2">Last updated: {statsUpdatedAt.toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Pending</h3>
            <p className="text-2xl font-bold text-yellow-500">{reportStats.pending}</p>
            <p className="text-xs text-gray-500 mt-2">Last updated: {statsUpdatedAt.toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Submitted</h3>
            <p className="text-2xl font-bold text-green-500">{reportStats.submitted}</p>
            <p className="text-xs text-gray-500 mt-2">Last updated: {statsUpdatedAt.toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Rejected</h3>
            <p className="text-2xl font-bold text-red-500">{reportStats.rejected}</p>
            <p className="text-xs text-gray-500 mt-2">Last updated: {statsUpdatedAt.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-wrap gap-4">
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
            <label htmlFor="reportStatus" className="mr-2 text-gray-600">Report Status:</label>
            <select 
              id="reportStatus" 
              value={reportStatus} 
              onChange={handleReportStatusChange}
              className="border rounded p-2 text-gray-700"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="submitted">Submitted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by agent name or report title..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
 
      {/* Reports Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agent Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{report.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.agentName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(report.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        report.status === 'submitted' ? 'bg-green-100 text-green-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                    <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {reports.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No reports found matching the selected filters.
          </div>
        )}
      </div>
    </div>
  );
};
 
export default Reports;
