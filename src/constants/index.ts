/**
 * Application Constants
 * Static data and configuration values
 */

import { Employee } from '../types';

// US States list for dropdown
export const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 
  'Wisconsin', 'Wyoming'
];

// Mock employee data for initial setup
export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: 'EMP001',
    fullName: 'Jane Doe',
    gender: 'Female',
    dob: '1992-05-15',
    profileImage: 'https://picsum.photos/seed/jane/200',
    state: 'California',
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'EMP002',
    fullName: 'John Smith',
    gender: 'Male',
    dob: '1988-11-22',
    profileImage: 'https://picsum.photos/seed/john/200',
    state: 'New York',
    isActive: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'EMP003',
    fullName: 'Alex Rivera',
    gender: 'Other',
    dob: '1995-02-10',
    profileImage: 'https://picsum.photos/seed/alex/200',
    state: 'Texas',
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

// LocalStorage keys
export const STORAGE_KEYS = {
  EMPLOYEES: 'nexus_employees',
  AUTH_USER: 'auth_user'
} as const;

