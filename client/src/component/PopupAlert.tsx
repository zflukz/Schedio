import React from "react";

interface PopupModalProps {
  title: string;
  message: string | React.ReactNode;
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
      <div className="bg-white rounded-[15px] px-[30px] py-[40px] w-[90%] max-w-[350px] shadow-lg animate-fadeIn">
        <h2 className="text-[24px] font-bold text-center mb-3">{title}</h2>
        <p className="text-center text-[16px] text-support3 mb-6">{message}</p>

        <div className="flex justify-center gap-3 text-[18px]">
          {onCancel && (
            <button
              onClick={onCancel}
              className="bg-support2 hover:bg-support4 min-w-[100px] text-black font-semibold px-[40px] py-[3px] rounded-[8px] transition rounded-full"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={onConfirm}
            className="bg-fail hover:bg-[#DC2626] min-w-[100px] text-white font-semibold px-[40px] py-[3px] rounded-[8px] transition rounded-full"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
