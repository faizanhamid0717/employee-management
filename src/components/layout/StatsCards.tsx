import React from "react";
import { Users, UserCheck, UserX } from "lucide-react";

interface StatsProps {
  total: number;
  active: number;
  inactive: number;
}

/**
 * Stats Cards Component
 * Displays key employee statistics in card format
 */
const StatsCards: React.FC<StatsProps> = ({ total, active, inactive }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 no-print">
      <StatsCard
        icon={<Users className="text-indigo-600" />}
        label="Total Employees"
        value={total}
        color="bg-indigo-50"
      />
      <StatsCard
        icon={<UserCheck className="text-emerald-600" />}
        label="Active Staff"
        value={active}
        color="bg-emerald-50"
      />
      <StatsCard
        icon={<UserX className="text-rose-600" />}
        label="Inactive Staff"
        value={inactive}
        color="bg-rose-50"
      />
    </div>
  );
};

/**
 * Individual Stat Card Component
 * Reusable card for displaying a single stat
 */
const StatsCard = ({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) => (
  <div
    className={`p-6 rounded-2xl ${color} border border-white shadow-sm flex items-center space-x-4 transition-transform hover:scale-[1.02]`}
  >
    <div className="p-3 bg-white rounded-xl shadow-sm">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

export default StatsCards;
