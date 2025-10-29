import React from "react";

interface PopupModalProps {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const PopupModal: React.FC<PopupModalProps> = ({
  title,
  message,
  confirmText = "ตกลง",
  cancelText = "ยกเลิก",
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[15px] p-6 w-[90%] max-w-[400px] shadow-lg animate-fadeIn">
        <h2 className="text-xl font-bold text-center mb-3">{title}</h2>
        <p className="text-center text-gray-700 mb-6">{message}</p>

        <div className="flex justify-center gap-3">
          {onCancel && (
            <button
              onClick={onCancel}
              className="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-4 py-2 rounded-[8px] transition"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={onConfirm}
            className="bg-night-default hover:bg-night-hover text-white font-semibold px-4 py-2 rounded-[8px] transition"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
