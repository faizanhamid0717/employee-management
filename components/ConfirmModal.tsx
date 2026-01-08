
import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden border border-gray-100 transform animate-in zoom-in-95 duration-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600">
              <AlertTriangle size={24} />
            </div>
            <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X size={20} />
            </button>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {message}
          </p>
          
          <div className="flex flex-col space-y-3">
            <button
              onClick={onConfirm}
              className="w-full py-3 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 transition-all shadow-md active:scale-[0.98]"
            >
              Confirm Delete
            </button>
            <button
              onClick={onCancel}
              className="w-full py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all active:scale-[0.98]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
