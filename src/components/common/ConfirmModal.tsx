import React from "react";
import { AlertTriangle } from "lucide-react";
import Modal from "./Modal";
import Button from "./Button";

interface ConfirmModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

/**
 * Confirmation Modal component for destructive actions
 */
const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm Delete",
  cancelText = "Cancel",
}) => {
  return (
    <Modal onClose={onCancel} maxWidth="sm" zIndex={100}>
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600">
          <AlertTriangle size={24} />
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-6">{message}</p>

      <div className="flex flex-col space-y-3">
        <Button onClick={onConfirm} variant="danger" fullWidth>
          {confirmText}
        </Button>
        <Button onClick={onCancel} variant="secondary" fullWidth>
          {cancelText}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
