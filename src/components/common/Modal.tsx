import React, { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  children: ReactNode;
  onClose?: () => void;
  showCloseButton?: boolean;
  maxWidth?: "sm" | "md" | "lg" | "xl";
  zIndex?: number;
}

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

/**
 * Reusable Modal component
 * Base modal wrapper for consistent modal behavior across the app
 */
const Modal: React.FC<ModalProps> = ({
  children,
  onClose,
  showCloseButton = true,
  maxWidth = "md",
  zIndex = 100,
}) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      style={{ zIndex }}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl ${maxWidthClasses[maxWidth]} w-full overflow-hidden border border-gray-100 transform animate-in zoom-in-95 duration-200`}
      >
        <div className="relative p-6">
          {showCloseButton && onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
