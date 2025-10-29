import React, { useState } from "react";
import PopupModal from "./PopupAlert";

interface JoinButtonProps {
  initiallyJoined?: boolean;
  isSignedIn?: boolean;
  onJoin?: () => void;
  onCancel?: () => void;
}

const JoinButton: React.FC<JoinButtonProps> = ({
  initiallyJoined = false,
  isSignedIn = false,
  onJoin,
  onCancel,
}) => {
  const [joined, setJoined] = useState(initiallyJoined);
  const [showCancelPopup, setShowCancelPopup] = useState(false);

  const handleJoin = () => {
    if (!isSignedIn) return;
    setJoined(true);
    onJoin?.();
  };

  const handleCancel = () => {
    setShowCancelPopup(true);
  };

  const confirmCancel = () => {
    setJoined(false);
    setShowCancelPopup(false);
    onCancel?.();
  };

  return (
    <>
      <div className="w-full flex flex-col sm:flex-row gap-3">
        {!joined ? (
          <button
            onClick={handleJoin}
            disabled={!isSignedIn}
            className={`w-full font-bold text-[18px] py-[8px] rounded-[10px] transition ${
              isSignedIn
                ? "bg-night-default text-white hover:bg-night-hover"
                : "bg-white text-text-black border-[1.5px] border-dashed border-primary cursor-not-allowed"
            }`}
          >
            {isSignedIn
              ? "Join Now"
              : "Please sign in to join this event."}
          </button>
        ) : (
          <>
            <button
              disabled
              className="w-full bg-support2 text-support3 font-bold text-[18px] py-[8px] rounded-[10px] cursor-default"
            >
              You’ve Joined!
            </button>
            <button
              onClick={handleCancel}
              className="w-full bg-fail text-white font-bold hover:bg-red-600 transition text-[18px] py-[8px] rounded-[10px]"
            >
              Cancel
            </button>
          </>
        )}
      </div>

      {showCancelPopup && (
        <PopupModal
          title="ยืนยันการยกเลิก"
          message="คุณต้องการยกเลิกการจองกิจกรรมนี้ใช่ไหม?"
          confirmText="ยืนยัน"
          cancelText="กลับ"
          onConfirm={confirmCancel}
          onCancel={() => setShowCancelPopup(false)}
        />
      )}
    </>
  );
};

export default JoinButton;
