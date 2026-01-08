import React from "react";
import { Plus, Printer, Download } from "lucide-react";

interface DashboardHeaderProps {
  onPrint: () => void;
  onAdd: () => void;
  onExport: () => void;
}

/**
 * Dashboard Header Component
 * Action buttons and title for the dashboard
 */
const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onPrint,
  onAdd,
  onExport,
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 space-y-4 lg:space-y-0 no-print">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Employee Management
        </h1>
        <p className="text-gray-500">Manage your workforce efficiently.</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={onExport}
          type="button"
          className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm active:bg-gray-100"
        >
          <Download size={18} />
          <span>Export CSV</span>
        </button>
        <button
          onClick={onPrint}
          type="button"
          className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm active:bg-gray-100"
        >
          <Printer size={18} />
          <span>Print List</span>
        </button>
        <button
          onClick={onAdd}
          type="button"
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-md active:scale-95"
        >
          <Plus size={18} />
          <span>Add Employee</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
