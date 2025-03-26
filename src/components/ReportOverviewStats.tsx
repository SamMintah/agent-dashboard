import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, FileText, Clock3, CheckCircle, XCircle } from 'lucide-react';

interface ReportStatsProps {
  reportStats: {
    total: number;
    pending: number;
    submitted: number;
    rejected: number;
  };
  statsUpdatedAt: Date;
}

const ReportOverviewStats: React.FC<ReportStatsProps> = ({
  reportStats,
  statsUpdatedAt,
}) => {
  const navigate = useNavigate();
  const { total, pending, submitted, rejected } = reportStats;

  const statsCards = [
    {
      label: 'Total Reports',
      value: total,
      change: '+5%',
      icon: FileText,
      color: 'blue',
      path: '/reports',
      lastUpdate: statsUpdatedAt,
    },
    {
      label: 'Pending',
      value: pending,
      change: '+2%',
      icon: Clock3,
      color: 'yellow',
      path: '/reports/pending',
      lastUpdate: statsUpdatedAt,
    },
    {
      label: 'Submitted',
      value: submitted,
      change: '+8%',
      icon: CheckCircle,
      color: 'green',
      path: '/reports/submitted',
      lastUpdate: statsUpdatedAt,
    },
    {
      label: 'Rejected',
      value: rejected,
      change: '-3%',
      icon: XCircle,
      color: 'red',
      path: '/reports/rejected',
      lastUpdate: statsUpdatedAt,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {statsCards.map((stat, index) => {
        const Icon = stat.icon;
        const isPositiveChange = stat.change.startsWith('+');
        
        return (
          <div
            key={index}
            onClick={() => navigate(stat.path)}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-300 cursor-pointer"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-2">
                <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
                <div className={`flex items-center justify-center p-2 rounded-full bg-${stat.color}-100`}>
                  <Icon className={`h-5 w-5 text-${stat.color}-600`} />
                </div>
              </div>
              <div className={`text-2xl font-bold text-${stat.color}-600 mb-2`}>{stat.value}</div>
              <div className="flex items-center mb-2">
                <span className={`text-sm font-medium ${isPositiveChange ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </span>
              </div>
              <div className="mt-auto flex items-center text-xs text-gray-400">
                <Clock className="h-3 w-3 mr-1" />
                <span>Last updated: {new Date(stat.lastUpdate).toLocaleString()}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReportOverviewStats;
