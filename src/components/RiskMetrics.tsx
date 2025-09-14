import React from 'react';
import { AlertTriangle, TrendingUp, Users, Shield } from 'lucide-react';

interface RiskStats {
  total: number;
  high: number;
  moderate: number;
  low: number;
}

interface RiskMetricsProps {
  stats: RiskStats;
}

const RiskMetrics: React.FC<RiskMetricsProps> = ({ stats }) => {
  const metrics = [
    {
      label: 'Total Students',
      value: stats.total,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      label: 'High Risk',
      value: stats.high,
      percentage: stats.total > 0 ? Math.round((stats.high / stats.total) * 100) : 0,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
    },
    {
      label: 'Moderate Risk',
      value: stats.moderate,
      percentage: stats.total > 0 ? Math.round((stats.moderate / stats.total) * 100) : 0,
      icon: TrendingUp,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
    },
    {
      label: 'Low Risk',
      value: stats.low,
      percentage: stats.total > 0 ? Math.round((stats.low / stats.total) * 100) : 0,
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <div
            key={metric.label}
            className={`bg-white p-6 rounded-lg shadow-sm border ${metric.borderColor}`}
          >
            <div className="flex items-center">
              <div className={`${metric.bgColor} rounded-md p-3`}>
                <Icon className={`h-6 w-6 ${metric.color}`} />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
                  {metric.percentage !== undefined && (
                    <p className={`ml-2 text-sm ${metric.color}`}>
                      ({metric.percentage}%)
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RiskMetrics;