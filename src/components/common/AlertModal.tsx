import React from "react";
import { Info } from "lucide-react";
import Modal from "./Modal";
import Button from "./Button";

interface AlertModalProps {
  title: string;
  message: string;
  onClose: () => void;
}

/**
 * Alert Modal component for displaying informational messages
 */
const AlertModal: React.FC<AlertModalProps> = ({ title, message, onClose }) => {
  return (
    <Modal onClose={onClose} maxWidth="md" zIndex={110}>
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
          <Info size={24} />
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <div className="text-gray-600 text-sm leading-relaxed mb-6 whitespace-pre-wrap">
        {message}
      </div>

      <Button onClick={onClose} variant="primary" fullWidth>
        Got it
      </Button>
    </Modal>
  );
};

export default AlertModal;
