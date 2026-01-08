/**
 * TypeScript Type Definitions
 * All application types and interfaces
 */

export type Gender = 'Male' | 'Female' | 'Other';

export interface Employee {
  id: string;
  fullName: string;
  gender: Gender;
  dob: string;
  profileImage: string;
  state: string;
  isActive: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface FilterOptions {
  search: string;
  gender: Gender | 'All';
  status: 'All' | 'Active' | 'Inactive';
}

