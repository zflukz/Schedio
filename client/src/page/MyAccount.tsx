import React, { useState, useRef, useEffect } from "react";
import Navbar from "../component/Navbar";
import { useNavigate } from "react-router-dom";
import PopupModal from "../component/PopupAlert";
import { useUser } from "../App";
const MyAccount: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  

  // state สำหรับแก้ไขเบอร์โทร
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // auto focus เมื่อเริ่มแก้ไข
  useEffect(() => {
    if (isEditingPhone && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditingPhone]);

  const handleSavePhone = () => {
    setShowSavePopupPhone(true);
  };

  const confirmSavePhone = () => {
    setIsEditingPhone(false);
    setShowSavePopupPhone(false);
  };

const [isEditingName, setIsEditingName] = useState(false);
const nameInputRef = useRef<HTMLInputElement>(null);
const [showSavePopupName, setShowSavePopupName] = useState(false);
const [showSavePopupPhone, setShowSavePopupPhone] = useState(false);

// auto focus ตอนแก้ชื่อ
useEffect(() => {
  if (isEditingName && nameInputRef.current) {
    nameInputRef.current.focus();
  }
}, [isEditingName]);

const handleSaveName = () => {
  setShowSavePopupName(true);
};

const confirmSaveName = () => {
  // เมื่อผู้ใช้กดยืนยันใน popup
  setIsEditingName(false);
  setShowSavePopupName(false);
};
  return (
    <div className="flex min-h-screen bg-bg-light font-sans flex-col pt-[50px] px-[15px] sm:px-[25px] lg:px-[60px]">
      {/* Top Navbar + Back button */}
      <div className="w-full flex flex-col lg:flex-row lg:items-center relative mb-6">
        <div className="flex justify-start mb-4 lg:mb-0">
          <button
            onClick={() => navigate("/")}
            className="flex items-center bg-white text-black py-[8px] px-[20px] rounded-full font-semibold text-[16px] hover:shadow-md transition z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-[10px]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            Back
          </button>
        </div>

        <div className="flex justify-center w-full lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
          <Navbar />
        </div>
      </div>

      {/* Main container */}
      <div className="flex flex-col lg:flex-row gap-6 bg-white px-[30px] py-[30px] rounded-[20px] max-w-[940px] w-full mx-auto my-[60px]">
        {/* Sidebar */}
        <div className="bg-white rounded-[12px] shadow-md px-[25px] py-[15px] flex flex-col gap-[10px] self-start">
          <button className="flex items-center gap-[10px] px-[15px] py-[5px] bg-primary text-text-white font-semibold rounded-[8px] shadow-sm transition">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-text-white">
              <path
                fillRule="evenodd"
                d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
                clipRule="evenodd"
              />
            </svg>
            My Account
          </button>
          <button className="flex items-center gap-[10px] px-[15px] py-[5px] text-text-black font-semibold rounded-[8px] hover:bg-[#3EBAD0]/45 transition"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userData");
            setUser(null);
            navigate("/");
          }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
            </svg>
            Log out
          </button>
        </div>

        {/* Main content */}
        <main className="flex-1 sm:pl-[50px]">
          <h1 className="text-[30px] font-semibold mb-[20px]">My Account</h1>

          <div className="flex flex-col gap-4">
            {/* Name, Role */}
            <div className="flex items-center gap-6">
              <img src="/MyuserProfile.svg" alt="Avatar" className="w-16 h-16 rounded-full" />
              <div>
                <div className="flex items-center gap-2 font-semibold">
                  {isEditingName ? (
                    <>
                      <input
                        ref={nameInputRef}
                        type="text"
                        value={user?.userName}
                        onChange={(e) => {
                          if (user) {
                            setUser({ ...user, userName: e.target.value });
                          }
                        }}
                        className="bg-support1 rounded-[12px] px-3 py-1 text-[16px] focus:ring-2 focus:ring-primary outline-none"
                        style={{ width: `${(user?.userName?.length || 0) + 4}ch` }}
                      />
                      {/* ปุ่ม Save */}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" 
                       fill="none" className="text-black hover:text-primary transition-colors duration-200 cursor-pointer"
                       onClick={handleSaveName}
                      >
                          <path d="M16.9017 6.12874C18 7.25748 18 9.07416 18 12.7075V14.2925C18 17.9258 18 19.7425 16.9017 20.8713C15.8033 22 14.0355 22 10.5 22C6.96447 22 5.1967 22 4.09835 20.8713C3 19.7425 3 17.9258 3 14.2925V12.7075C3 9.07416 3 7.25748 4.09835 6.12874C5.1967 5 6.96447 5 10.5 5C14.0355 5 15.8033 5 16.9017 6.12874Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M7.5 5.5V10.3693C7.5 11.3046 7.5 11.7722 7.78982 11.9396C8.35105 12.2638 9.4038 11.1823 9.90375 10.8567C10.1937 10.6678 10.3387 10.5734 10.5 10.5734C10.6613 10.5734 10.8063 10.6678 11.0962 10.8567C11.5962 11.1823 12.6489 12.2638 13.2102 11.9396C13.5 11.7722 13.5 11.3046 13.5 10.3693V5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M9 2H11C15.714 2 18.0711 2 19.5355 3.46447C21 4.92893 21 7.28595 21 12V18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </>
                  ) : (
                    <>
                      <h2 className="text-[18px] font-semibold">{user?.userName}</h2>
                      {/* ปุ่มแก้ไข */}
                      <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="none"
                      className="text-black hover:text-primary transition-colors duration-200 cursor-pointer"
                      onClick={() => setIsEditingName(true)}
                    >
                      <path
                        d="M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    </>
                  )}
                </div>
                <p className="text-support3 text-[16px] mt-1 capitalize">{user?.userRole}</p>
              </div>
            </div>


            <hr className="border-support1 max-w-[380px]" />

            {/* Email */}
            <div className="flex items-center gap-2 text-[18px] font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              <span>{user?.userEmail}</span>
            </div>

            {/* 📱 Phone (เฉพาะ organizer) */}
            {user?.userRole === "organizer" && (
              <div className="flex items-center gap-2 text-[18px] font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>

                {isEditingPhone ? (
                  <>
                    <input
                      ref={inputRef}
                      type="text"
                      value={user?.userPhone}
                      onChange={(e) => {
                        if (user) {
                          setUser({ ...user, userPhone: e.target.value });
                        }
                      }}
                      className="bg-support1 rounded-[12px] px-2 py-1 text-[16px] focus:ring-2 focus:ring-primary outline-none"
                    />
                    
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" 
                       fill="none" className="text-black hover:text-primary transition-colors duration-200 cursor-pointer"
                       onClick={handleSavePhone}
                      >
                          <path d="M16.9017 6.12874C18 7.25748 18 9.07416 18 12.7075V14.2925C18 17.9258 18 19.7425 16.9017 20.8713C15.8033 22 14.0355 22 10.5 22C6.96447 22 5.1967 22 4.09835 20.8713C3 19.7425 3 17.9258 3 14.2925V12.7075C3 9.07416 3 7.25748 4.09835 6.12874C5.1967 5 6.96447 5 10.5 5C14.0355 5 15.8033 5 16.9017 6.12874Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M7.5 5.5V10.3693C7.5 11.3046 7.5 11.7722 7.78982 11.9396C8.35105 12.2638 9.4038 11.1823 9.90375 10.8567C10.1937 10.6678 10.3387 10.5734 10.5 10.5734C10.6613 10.5734 10.8063 10.6678 11.0962 10.8567C11.5962 11.1823 12.6489 12.2638 13.2102 11.9396C13.5 11.7722 13.5 11.3046 13.5 10.3693V5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M9 2H11C15.714 2 18.0711 2 19.5355 3.46447C21 4.92893 21 7.28595 21 12V18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                  </>
                ) : (
                  <>
                    <span>{user?.userPhone}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="none"
                      className="text-black hover:text-primary transition-colors duration-200 cursor-pointer"
                      onClick={() => setIsEditingPhone(true)}
                    >
                      <path
                        d="M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
      {showSavePopupName && (
        <PopupModal
          title="Save Changes?"
          message={
            <>
              This will update your name.<br />
              Do you want to continue?
            </>
          }
          confirmText="Save"
          cancelText="Cancel"
          onConfirm={confirmSaveName}
          onCancel={() => setShowSavePopupName(false)}
          confirmColor="green"
        />
      )}
      {showSavePopupPhone && (
        <PopupModal
          title="Save Changes?"
          message={
            <>
              This will update your phone number.<br />
              Do you want to continue?
            </>
          }
          confirmText="Save"
          cancelText="Cancel"
          onConfirm={confirmSavePhone}
          onCancel={() => setShowSavePopupPhone(false)}
          confirmColor="green"
        />
      )}
    </div>
  );
};

export default MyAccount;
