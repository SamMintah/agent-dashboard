import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DashboardHeader from './components/DashboardHeader';
import Dashboard from './pages/Dashboard';
import Agents from './pages/Agents';
import AgentProfile from './pages/AgentProfile';
import Training from './pages/Training';
import Financials from './pages/Financials';
import Tasks from './pages/Tasks';
import Recruitment from './pages/Recruitment';
import Performance from './pages/Performance';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Help from './pages/Help';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <DashboardHeader />
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/agents/:id" element={<AgentProfile />} />
              <Route path="/training" element={<Training />} />
              <Route path="/recruitment" element={<Recruitment />} />
              <Route path="/financials" element={<Financials />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/performance" element={<Performance />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
