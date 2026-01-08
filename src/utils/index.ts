/**
 * Utility Functions
 * Helper functions used across the application
 */

import { Employee } from '../types';

/**
 * Generate next employee ID
 * @param employees - Current employee list
 * @returns Next sequential employee ID (e.g., EMP004)
 */
export const generateEmployeeId = (employees: Employee[]): string => {
  const maxId = employees.reduce((max, e) => {
    const num = parseInt(e.id.replace('EMP', '')) || 0;
    return num > max ? num : max;
  }, 0);
  
  return `EMP${String(maxId + 1).padStart(3, '0')}`;
};

/**
 * Export employees to CSV format
 * @param employees - List of employees to export
 * @returns CSV content as string
 */
export const exportToCSV = (employees: Employee[]): string => {
  const headers = ['ID', 'Full Name', 'Gender', 'DOB', 'State', 'Status'];
  const rows = employees.map(e => [
    e.id,
    e.fullName,
    e.gender,
    e.dob,
    e.state,
    e.isActive ? 'Active' : 'Inactive'
  ]);
  
  return [headers, ...rows].map(r => r.join(',')).join('\n');
};

/**
 * Download content as file
 * @param content - File content
 * @param filename - Name of the file
 * @param mimeType - MIME type of the file
 */
export const downloadFile = (content: string, filename: string, mimeType: string = 'text/csv'): void => {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Format date to readable string
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

/**
 * Get initials from name
 * @param name - Full name
 * @returns Initials (e.g., "John Doe" -> "JD")
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

