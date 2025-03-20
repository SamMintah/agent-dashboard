import React from 'react';
import OverviewStats from '../components/OverviewStats';
import PerformanceChart from '../components/PerformanceChart';
// import TasksList from '../components/TasksList';
import AgentsList from '../components/AgentsList';
import RecentActivities from '../components/RecentActivities';

const Dashboard = () => {
  return (
    <>
      <OverviewStats />
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
        <PerformanceChart />
        {/* <TasksList /> */}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AgentsList />
        </div>
        <RecentActivities />
      </div>
    </>
  );
};

export default Dashboard;