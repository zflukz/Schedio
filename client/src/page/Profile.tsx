import React from "react";
import { useNavigate } from "react-router";
import { useUser } from "../App";
import Navbar from "../component/Navbar";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="font-sans bg-background min-h-screen pt-[50px]">
      <Navbar />
      <div className='flex red justify-center pt-[50px]'>mock page, wait for ui design</div>
      <div className="flex justify-center pt-[35px]">
        <div className="bg-white px-[50px] py-[50px] rounded-[20px] shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center mb-[30px]">User Profile</h2>
          
          <div className="mb-[20px]">
            <label className="block mb-[5px] text-[18px] font-semibold">Username</label>
            <div className="w-full border border-support4 rounded-[8px] px-[11px] py-[8px] bg-gray-50">
              {user.userName}
            </div>
          </div>

          <div className="mb-[30px]">
            <label className="block mb-[5px] text-[18px] font-semibold">Email</label>
            <div className="w-full border border-support4 rounded-[8px] px-[11px] py-[8px] bg-gray-50">
              {user.userEmail}
            </div>
          </div>

          <button
            className="w-full mb-[20px] text-[20px] font-bold bg-primary hover:bg-primaryhover text-white py-2 rounded-full transition"
            onClick={() => alert("Edit functionality not implemented yet")}
          >
            Edit Profile
          </button>

          <button
            className="w-full text-[20px] font-bold bg-red-500 hover:bg-red-600 text-white py-2 rounded-full transition"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("userData");
              setUser(null);
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;