
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Employee, User, FilterOptions } from './types';
import { MOCK_EMPLOYEES } from './constants';
import Layout from './components/Layout';
import EmployeeForm from './components/EmployeeForm';
import LoginForm from './components/LoginForm';
import DashboardHeader from './components/DashboardHeader';
import StatsCards from './components/StatsCards';
import Filters from './components/Filters';
import EmployeeTable from './components/EmployeeTable';
import ConfirmModal from './components/ConfirmModal';
import AlertModal from './components/AlertModal';

const App: React.FC = () => {
  // Auth State
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Data State
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem('nexus_employees');
    return saved ? JSON.parse(saved) : MOCK_EMPLOYEES;
  });

  // UI State
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [alertInfo, setAlertInfo] = useState<{ title: string; message: string } | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    gender: 'All',
    status: 'All'
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('nexus_employees', JSON.stringify(employees));
  }, [employees]);

  // Filtered List
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = emp.fullName.toLowerCase().includes(filters.search.toLowerCase());
      const matchesGender = filters.gender === 'All' || emp.gender === filters.gender;
      const matchesStatus = filters.status === 'All' || 
                           (filters.status === 'Active' ? emp.isActive : !emp.isActive);
      return matchesSearch && matchesGender && matchesStatus;
    });
  }, [employees, filters]);

  // Statistics
  const stats = useMemo(() => ({
    total: employees.length,
    active: employees.filter(e => e.isActive).length,
    inactive: employees.filter(e => !e.isActive).length
  }), [employees]);

  // Handlers
  const handleLogin = useCallback((name: string, email: string) => {
    const newUser = { id: Date.now().toString(), name, email };
    setUser(newUser);
    localStorage.setItem('auth_user', JSON.stringify(newUser));
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('auth_user');
  }, []);

  const handleSaveEmployee = useCallback((data: any) => {
    if (editingEmployee) {
      setEmployees(prev => prev.map(e => e.id === editingEmployee.id ? { ...e, ...data } : e));
    } else {
      const maxId = employees.reduce((max, e) => {
        const num = parseInt(e.id.replace('EMP', '')) || 0;
        return num > max ? num : max;
      }, 0);
      
      const newEmp: Employee = {
        ...data,
        id: `EMP${String(maxId + 1).padStart(3, '0')}`,
        createdAt: new Date().toISOString()
      };
      setEmployees(prev => [newEmp, ...prev]);
    }
    setShowModal(false);
    setEditingEmployee(null);
  }, [editingEmployee, employees]);

  const initiateDelete = useCallback((id: string) => {
    setDeletingId(id);
  }, []);

  const confirmDelete = useCallback(() => {
    if (deletingId) {
      setEmployees(prev => prev.filter(e => e.id !== deletingId));
      setDeletingId(null);
    }
  }, [deletingId]);

  const toggleStatus = useCallback((id: string) => {
    setEmployees(prev => prev.map(e => e.id === id ? { ...e, isActive: !e.isActive } : e));
  }, []);

  // Sandbox-aware Print Handling
  const handlePrint = useCallback(() => {
    setAlertInfo({
      title: "Print Instructions",
      message: "Browser sandbox restrictions prevent direct print commands.\n\nTo print this list:\n1. Use Ctrl + P (Windows/Linux) or Cmd + P (Mac).\n2. Alternatively, use the 'Export CSV' button for a spreadsheet version."
    });
  }, []);

  const handleExport = useCallback(() => {
    const headers = ['ID', 'Full Name', 'Gender', 'DOB', 'State', 'Status'];
    const rows = filteredEmployees.map(e => [
      e.id,
      e.fullName,
      e.gender,
      e.dob,
      e.state,
      e.isActive ? 'Active' : 'Inactive'
    ]);
    
    const csvContent = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `nexus_employees_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [filteredEmployees]);

  // Auth Guard
  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <Layout user={user} onLogout={handleLogout}>
      {/* Dashboard Actions */}
      <DashboardHeader 
        onPrint={handlePrint} 
        onExport={handleExport}
        onAdd={() => {
          setEditingEmployee(null);
          setShowModal(true);
        }} 
      />

      {/* Statistics */}
      <StatsCards 
        total={stats.total} 
        active={stats.active} 
        inactive={stats.inactive} 
      />

      {/* Filtering */}
      <Filters 
        filters={filters} 
        setFilters={setFilters} 
      />

      {/* Content Table */}
      <EmployeeTable 
        employees={filteredEmployees} 
        onEdit={(emp) => {
          setEditingEmployee(emp);
          setShowModal(true);
        }}
        onDelete={initiateDelete}
        onToggleStatus={toggleStatus}
      />

      {/* Print View Only Content (Useful for manual browser print) */}
      <div className="print-only mt-8 pt-8 border-t border-gray-200">
        <h2 className="text-xl font-bold mb-4">Employee Roster - {new Date().toLocaleDateString()}</h2>
        <div className="flex space-x-12 text-sm text-gray-600">
          <p><strong>Total Employees:</strong> {stats.total}</p>
          <p><strong>Active:</strong> {stats.active}</p>
          <p><strong>Inactive:</strong> {stats.inactive}</p>
        </div>
      </div>

      {/* Modals Container */}
      
      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm no-print">
          <EmployeeForm 
            employee={editingEmployee} 
            onSave={handleSaveEmployee} 
            onCancel={() => {
              setShowModal(false);
              setEditingEmployee(null);
            }} 
          />
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      {deletingId && (
        <ConfirmModal
          title="Delete Employee"
          message="Are you sure you want to remove this employee from the records? This action is permanent and cannot be reversed."
          onConfirm={confirmDelete}
          onCancel={() => setDeletingId(null)}
        />
      )}

      {/* Custom Alert/Instruction Modal */}
      {alertInfo && (
        <AlertModal
          title={alertInfo.title}
          message={alertInfo.message}
          onClose={() => setAlertInfo(null)}
        />
      )}
    </Layout>
  );
};

export default App;
