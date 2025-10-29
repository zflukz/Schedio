import React, { useState } from "react";
import PopupModal from "./PopupAlert";

interface JoinButtonProps {
  initiallyJoined?: boolean;
  user?: { name: string; role: string } | null; // รับ user
  totalSeats?: number;
  currentParticipants?: number;
  onJoin?: () => void;
  onCancel?: () => void;
}

const JoinButton: React.FC<JoinButtonProps> = ({
  initiallyJoined = false,
  user,
  totalSeats,
  currentParticipants,
  onJoin,
  onCancel,
}) => {
  const [joined, setJoined] = useState(initiallyJoined);
  const [showCancelPopup, setShowCancelPopup] = useState(false);

  const isSignedIn = !!user;
  const isFull =
    totalSeats !== undefined &&
    currentParticipants !== undefined &&
    currentParticipants >= totalSeats;

  const handleJoin = () => {
    if (!isSignedIn || isFull) return;
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
          isFull ? (
            <button
              disabled
              className="w-full bg-white text-text-black border-[1.5px] border-dashed border-text-black cursor-not-allowed font-bold text-[18px] py-[8px] rounded-[10px]"
            >
              No Seats Available
            </button>
          ) : (
            <button
              onClick={handleJoin}
              disabled={!isSignedIn}
              className={`w-full font-bold text-[18px] py-[8px] rounded-[10px] transition ${
                isSignedIn
                  ? "bg-night-default text-white hover:bg-night-hover"
                  : "bg-white text-text-black border-[1.5px] border-dashed border-primary cursor-not-allowed"
              }`}
            >
              {isSignedIn ? "Join Now" : "Please sign in to join this event."}
            </button>
          )
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
              className="w-full bg-fail text-white font-bold transition text-[18px] py-[8px] rounded-[10px]"
            >
              Cancel
            </button>
          </>
        )}
      </div>

      {showCancelPopup && (
        <PopupModal
          title="Cancel Booking?"
          message={
            <>
              This will cancel the booking.<br />
              Do you want to continue?
            </>
          }
          confirmText="Yes"
          cancelText="Back"
          onConfirm={confirmCancel}
          onCancel={() => setShowCancelPopup(false)}
        />
      )}
    </>
  );
};

export default JoinButton;
