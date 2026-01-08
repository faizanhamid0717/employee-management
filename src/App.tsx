import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Employee, User, FilterOptions } from "./types";
import { MOCK_EMPLOYEES, STORAGE_KEYS } from "./constants";
import { generateEmployeeId, exportToCSV, downloadFile } from "./utils";
import {
  Layout,
  LoginForm,
  DashboardHeader,
  StatsCards,
  Filters,
  EmployeeTable,
  EmployeeForm,
  ConfirmModal,
  AlertModal,
} from "./components";

/**
 * Main Application Component
 * Handles all employee management logic and state
 */
const App: React.FC = () => {
  // ==================== State Management ====================

  // Auth State
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
    return saved ? JSON.parse(saved) : null;
  });

  // Data State
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EMPLOYEES);
    return saved ? JSON.parse(saved) : MOCK_EMPLOYEES;
  });

  // UI State
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [alertInfo, setAlertInfo] = useState<{
    title: string;
    message: string;
  } | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    gender: "All",
    status: "All",
  });

  // ==================== Effects ====================

  // Sync employees to LocalStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(employees));
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "QuotaExceededError"
      ) {
        console.error(
          "LocalStorage quota exceeded. Consider using external image URLs instead of base64."
        );
        setAlertInfo({
          title: "Storage Limit Reached",
          message:
            "The browser's storage limit has been exceeded. This usually happens when uploading large images.\n\nPlease use image URLs instead of uploading files, or delete some employees to free up space.",
        });
      }
    }
  }, [employees]);

  // ==================== Computed Values ====================

  // Filtered employee list based on search and filter criteria
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch = emp.fullName
        .toLowerCase()
        .includes(filters.search.toLowerCase());
      const matchesGender =
        filters.gender === "All" || emp.gender === filters.gender;
      const matchesStatus =
        filters.status === "All" ||
        (filters.status === "Active" ? emp.isActive : !emp.isActive);
      return matchesSearch && matchesGender && matchesStatus;
    });
  }, [employees, filters]);

  // Employee statistics
  const stats = useMemo(
    () => ({
      total: employees.length,
      active: employees.filter((e) => e.isActive).length,
      inactive: employees.filter((e) => !e.isActive).length,
    }),
    [employees]
  );

  // ==================== Event Handlers ====================

  /**
   * Handle user login
   */
  const handleLogin = useCallback((name: string, email: string) => {
    const newUser = { id: Date.now().toString(), name, email };
    setUser(newUser);
    localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(newUser));
  }, []);

  /**
   * Handle user logout
   */
  const handleLogout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
  }, []);

  /**
   * Save employee (create or update)
   */
  const handleSaveEmployee = useCallback(
    (data: any) => {
      if (editingEmployee) {
        // Update existing employee
        setEmployees((prev) =>
          prev.map((e) => (e.id === editingEmployee.id ? { ...e, ...data } : e))
        );
      } else {
        // Create new employee
        const newEmp: Employee = {
          ...data,
          id: generateEmployeeId(employees),
          createdAt: new Date().toISOString(),
        };
        setEmployees((prev) => [newEmp, ...prev]);
      }
      setShowModal(false);
      setEditingEmployee(null);
    },
    [editingEmployee, employees]
  );

  /**
   * Initiate employee deletion
   */
  const initiateDelete = useCallback((id: string) => {
    setDeletingId(id);
  }, []);

  /**
   * Confirm and execute employee deletion
   */
  const confirmDelete = useCallback(() => {
    if (deletingId) {
      setEmployees((prev) => prev.filter((e) => e.id !== deletingId));
      setDeletingId(null);
    }
  }, [deletingId]);

  /**
   * Toggle employee active status
   */
  const toggleStatus = useCallback((id: string) => {
    setEmployees((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isActive: !e.isActive } : e))
    );
  }, []);

  /**
   * Handle print action (shows alert due to sandbox restrictions)
   */
  const handlePrint = useCallback(() => {
    setAlertInfo({
      title: "Print Instructions",
      message:
        "Browser sandbox restrictions prevent direct print commands.\n\nTo print this list:\n1. Use Ctrl + P (Windows/Linux) or Cmd + P (Mac).\n2. Alternatively, use the 'Export CSV' button for a spreadsheet version.",
    });
  }, []);

  /**
   * Export filtered employees to CSV
   */
  const handleExport = useCallback(() => {
    const csvContent = exportToCSV(filteredEmployees);
    const filename = `nexus_employees_${
      new Date().toISOString().split("T")[0]
    }.csv`;
    downloadFile(csvContent, filename, "text/csv");
  }, [filteredEmployees]);

  // ==================== Render ====================

  // Show login form if user is not authenticated
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
      <Filters filters={filters} setFilters={setFilters} />

      {/* Employee Table */}
      <EmployeeTable
        employees={filteredEmployees}
        onEdit={(emp) => {
          setEditingEmployee(emp);
          setShowModal(true);
        }}
        onDelete={initiateDelete}
        onToggleStatus={toggleStatus}
      />

      {/* Print View Only Content (for manual browser print) */}
      <div className="print-only mt-8 pt-8 border-t border-gray-200">
        <h2 className="text-xl font-bold mb-4">
          Employee Roster - {new Date().toLocaleDateString()}
        </h2>
        <div className="flex space-x-12 text-sm text-gray-600">
          <p>
            <strong>Total Employees:</strong> {stats.total}
          </p>
          <p>
            <strong>Active:</strong> {stats.active}
          </p>
          <p>
            <strong>Inactive:</strong> {stats.inactive}
          </p>
        </div>
      </div>

      {/* Modals */}

      {/* Add/Edit Employee Modal */}
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

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <ConfirmModal
          title="Delete Employee"
          message="Are you sure you want to remove this employee from the records? This action is permanent and cannot be reversed."
          onConfirm={confirmDelete}
          onCancel={() => setDeletingId(null)}
        />
      )}

      {/* Alert/Info Modal */}
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
