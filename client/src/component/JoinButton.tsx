import React, { useState, useEffect } from "react";
import PopupModal from "./PopupAlert";

interface JoinButtonProps {
  status?: "upcoming" | "joined" | "full"; // event status
  user?: { name: string; role: string } | null;
  onJoin?: () => void;
  onCancel?: () => void;
}

const JoinButton: React.FC<JoinButtonProps> = ({
  status = "upcoming",
  user,
  onJoin,
  onCancel,
}) => {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [showCancelPopup, setShowCancelPopup] = useState(false);

  const isSignedIn = !!user;

  // Update local status if prop changes
  useEffect(() => {
    setCurrentStatus(status);
  }, [status]);

  const handleJoin = () => {
    if (!isSignedIn || currentStatus === "full") return;
    setCurrentStatus("joined");
    onJoin?.();
  };

  const handleCancel = () => {
    setShowCancelPopup(true);
  };

  const confirmCancel = () => {
    setCurrentStatus("upcoming");
    setShowCancelPopup(false);
    onCancel?.();
  };

  return (
    <>
      <div className="w-full flex flex-col sm:flex-row gap-3">
        {currentStatus === "upcoming" && (
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
        )}

        {currentStatus === "joined" && (
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

        {currentStatus === "full" && (
          <button
            disabled
            className="w-full bg-white text-text-black border-[1.5px] border-dashed border-text-black cursor-not-allowed font-bold text-[18px] py-[8px] rounded-[10px]"
          >
            No Seats Available
          </button>
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
