import React from "react";

interface RejectPopupProps {
  isOpen: boolean;
  review: string;
  onReviewChange: (v: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export default function RejectPopup({
  isOpen,
  review,
  onReviewChange,
  onSubmit,
  onClose,
}: RejectPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md rounded-2xl shadow-xl bg-white px-[40px] py-[30px]">
        <div className="space-y-6 p-0">
          <h2 className="text-[20px] font-semibold text-center">
            Please provide a reason for rejection
          </h2>

          <div className="space-y-2">
            <label className="text-[18px] font-medium">Write your review</label>
            <input
              type="text"
              className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Scheduled time does not comply with system rules."
              value={review}
              onChange={(e) => onReviewChange(e.target.value)}
            />
          </div>

          <div className="flex gap-3 mt-4 font-semibold">
            <button
              className="flex-1 rounded-full py-2 bg-support1 text-support3 hover:bg-support2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="flex-1 rounded-full py-2 bg-night-default text-white hover:bg-night-hover"
              onClick={onSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
