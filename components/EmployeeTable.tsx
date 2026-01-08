
import React from 'react';
import { Edit2, Trash2, Users } from 'lucide-react';
import { Employee } from '../types';

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (emp: Employee) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, onEdit, onDelete, onToggleStatus }) => {
  if (employees.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 py-20 flex flex-col items-center justify-center text-gray-500 space-y-4">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
          <Users size={40} className="text-gray-300" />
        </div>
        <div className="text-center">
          <h3 className="font-bold text-lg text-gray-700">No employees found</h3>
          <p className="text-sm">Try adjusting your filters or add a new record.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden print:shadow-none print:border-none">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Employee</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Gender</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">DOB</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">State</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right no-print">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {employees.map(emp => (
              <tr key={emp.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={emp.profileImage} 
                      alt={emp.fullName} 
                      className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <span className="font-semibold text-gray-900">{emp.fullName}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 font-mono">{emp.id}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{emp.gender}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{emp.dob}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{emp.state}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onToggleStatus(emp.id);
                    }}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium no-print cursor-pointer transition-colors ${
                      emp.isActive 
                        ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' 
                        : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                    }`}
                  >
                    {emp.isActive ? 'Active' : 'Inactive'}
                  </button>
                  <span className="hidden print:inline text-sm">
                    {emp.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2 no-print md:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      onEdit(emp);
                    }}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      onDelete(emp.id);
                    }}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
