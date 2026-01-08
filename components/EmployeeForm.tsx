
import React, { useState, useEffect, useRef } from 'react';
import { Camera, X, Upload } from 'lucide-react';
import { Employee, Gender } from '../types';
import { US_STATES } from '../constants';

interface EmployeeFormProps {
  employee?: Employee | null;
  onSave: (employee: Omit<Employee, 'id' | 'createdAt'> & { id?: string }) => void;
  onCancel: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    fullName: employee?.fullName || '',
    gender: (employee?.gender || 'Male') as Gender,
    dob: employee?.dob || '',
    state: employee?.state || '',
    isActive: employee !== undefined ? employee?.isActive : true,
    profileImage: employee?.profileImage || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (!formData.state) newErrors.state = 'Please select a state';
    if (!formData.profileImage) newErrors.profileImage = 'Profile image is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profileImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <h2 className="text-xl font-bold text-gray-800">
          {employee ? 'Edit Employee' : 'Add New Employee'}
        </h2>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Profile Image Section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-100 bg-gray-100 flex items-center justify-center">
              {formData.profileImage ? (
                <img src={formData.profileImage} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <Camera size={48} className="text-gray-400" />
              )}
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-1 right-1 bg-indigo-600 text-white p-2 rounded-full shadow-lg hover:bg-indigo-700 transition-transform hover:scale-110"
            >
              <Upload size={18} />
            </button>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
          {errors.profileImage && <p className="text-red-500 text-xs mt-1">{errors.profileImage}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={e => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
              placeholder="e.g. John Doe"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${
                errors.fullName ? 'border-red-400' : 'border-gray-300'
              }`}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>

          {/* DOB */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Date of Birth</label>
            <input
              type="date"
              value={formData.dob}
              onChange={e => setFormData(prev => ({ ...prev, dob: e.target.value }))}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${
                errors.dob ? 'border-red-400' : 'border-gray-300'
              }`}
            />
            {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
          </div>

          {/* Gender */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Gender</label>
            <select
              value={formData.gender}
              onChange={e => setFormData(prev => ({ ...prev, gender: e.target.value as Gender }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* State */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">State</label>
            <select
              value={formData.state}
              onChange={e => setFormData(prev => ({ ...prev, state: e.target.value }))}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white transition-all ${
                errors.state ? 'border-red-400' : 'border-gray-300'
              }`}
            >
              <option value="">Select State</option>
              {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={e => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-700">
              Employee is {formData.isActive ? 'Active' : 'Inactive'}
            </span>
          </label>
        </div>

        <div className="flex space-x-4 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-shadow shadow-md hover:shadow-lg font-semibold"
          >
            {employee ? 'Save Changes' : 'Create Employee'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
