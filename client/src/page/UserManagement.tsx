import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import { useUser } from "../App";
import PopupModal from "../component/PopupAlert";
import { Pagination, Dropdown, Button, Checkbox } from "antd";
import "../App.css";

type Role = "Admin" | "Organizer" | "User";
type Status = "active" | "banned";

interface UMUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: Status;
}

const rolePill = (role: Role) => {
  switch (role) {
    case "Admin":
      return "bg-[#FDE2F3] text-[#EE73C0]";
    case "Organizer":
      return "bg-[#F3E5F5] text-[#6A1B9A]";
    default:
      return "bg-[#DBEAFE] text-[#3B82F6]";
  }
};

const UserManagement: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);
  const [searchKeyword, setSearchKeyword] = useState("");

  const [users, setUsers] = useState<UMUser[]>([
    { id: "u1", name: "Wongsakorn", email: "wongsakorn.yuc@gmail.com", role: "Admin", status: "active" },
    { id: "u2", name: "Thanaphat", email: "thanaphat.pom@gmail.com", role: "Organizer", status: "active" },
    { id: "u3", name: "Woramate", email: "woramate.sir@gmail.com", role: "User", status: "banned" },
    { id: "u4", name: "Thanrada", email: "thanrada.fai@gmail.com", role: "User", status: "active" },
  ]);

  const [confirmUserId, setConfirmUserId] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<"ban" | "unban" | null>(null);

  const roles: Role[] = ["Admin", "Organizer", "User"];


  const handleChangeRole = (id: string, role: Role) => {
    setUsers(prev => prev.map(u => (u.id === id ? { ...u, role } : u)));
  };

  const handleBan = (id: string) => {
    setConfirmUserId(id);
    setConfirmAction("ban");
  };

  const handleUnban = (id: string) => {
    setConfirmUserId(id);
    setConfirmAction("unban");
  };

  const performConfirm = () => {
    if (!confirmUserId || !confirmAction) return;
    setUsers(prev =>
      prev.map(u =>
        u.id === confirmUserId
          ? { ...u, status: confirmAction === "ban" ? "banned" : "active" }
          : u
      )
    );
    setConfirmUserId(null);
    setConfirmAction(null);
  };



  
  
    const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);
  const dropdownContent = ["Admin", "Organizer", "User"].map((roleItem) => (
  <div
    key={roleItem}
    className="flex items-center rounded-md px-2 py-1 cursor-pointer hover:bg-[#3EBAD080] whitespace-nowrap"
    onClick={() => {
      setSelectedRoles((prev: Role[]) =>
        prev.includes(roleItem as Role)
          ? prev.filter((r) => r !== roleItem)
          : [...prev, roleItem as Role]
      );
    }}
  >
    <Checkbox checked={selectedRoles.includes(roleItem as Role)}>
      {roleItem}
    </Checkbox>
  </div>
));



  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    u.email.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const pagedUsers = filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
<div className="flex flex-col min-h-screen bg-bg-light">
      {/* Top section */}
  <div className="w-full px-[15px] sm:px-[25px] lg:px-[60px] lg:top-[50px] pt-[25px] flex flex-col lg:flex-row lg:items-center relative">
        <div className="flex justify-start mb-4 lg:mb-0 ">
          <button
            onClick={() => navigate(-1)}
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

      {/* Main content */}
      <div className="flex-1 flex justify-center items-center pt-[80px]">
        <div className="px-4 sm:px-6 w-full">
          <div className="max-w-[1200px] mx-auto bg-white p-[25px] rounded-2xl shadow-sm ">
            <h1 className="text-[28px] sm:text-[30px] font-semibold text-text-black">Users Management</h1>

            {/* Search Bar */}
            <div className="mt-4 flex flex-wrap gap-4 items-center">
              <div className="bg-white flex items-center rounded-[12px] px-[16px] py-[12px] shadow-sm border border-support1 w-full sm:w-[400px] md:w-[350px] lg:w-[400px] min-h-[62px] hover:shadow-md transition-shadow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="size-6 md:size-8 pr-[8px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search your events."
                  className="outline-none w-full text-text-black placeholder:text-support3 text-[18px]"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </div>
              {/* Role Dropdown (Updated with your custom button layout) */}
              <div className="relative w-full sm:w-auto">
                <Dropdown
                  dropdownRender={() => (
                    <div className="bg-white rounded-[12px] shadow-md p-2 min-w-[160px]">
                      {["Admin", "Organizer", "User"].map((roleItem) => (
                        <div
                          key={roleItem}
                          className="flex items-center rounded-md px-2 py-1 cursor-pointer hover:bg-[#3EBAD080] whitespace-nowrap"
                          onClick={() =>
                            setSelectedRoles((prev: Role[]) =>
                              prev.includes(roleItem as Role)
                                ? prev.filter((r) => r !== roleItem)
                                : [...prev, roleItem as Role]
                            )
                          }
                        >
                          <Checkbox
                            className="custom-checkbox"
                            checked={selectedRoles.includes(roleItem as Role)}
                          >
                            {roleItem}
                          </Checkbox>
                        </div>
                      ))}
                    </div>
                  )}
                  trigger={["click"]}
                  placement="bottomCenter"
                >
                  <Button
                    className={`custom-dropdown-button !h-[62px] md:!h-[62px] !py-[10px] !px-[12px] flex items-center justify-between bg-white font-sans font-semibold text-[18px] rounded-[12px] shadow-sm border border-support1 w-full sm:w-[200px] md:w-[160px] lg:w-[200px] hover:!bg-gray-50 hover:!shadow-md transition-shadow ${
                      selectedRoles.length > 0 ? "text-text-black" : "text-support3"
                    }`}
                  >
                    <div className="flex items-center flex-1 overflow-hidden">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5 mr-[10px] md:size-6 text-text-black shrink-0"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 1 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a.75.75 0 0 1-3 0m3 0a.75.75 0 0 0-3 0m-9.75 0h9.75"
                        />
                      </svg>

                      <span className="truncate block max-w-full">
                        {selectedRoles.length > 0 ? selectedRoles.join(", ") : "Select role"}
                      </span>
                    </div>


                    {/* Clear Button (Preserved 100%) */}
                    {selectedRoles.length > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRoles([]);
                        }}
                        className="ml-1 p-0.5 hover:bg-support2 rounded-full transition-colors flex-shrink-0"
                        title="Clear all selections"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-support3 hover:text-text-black">
                          <path
                            fillRule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    )}
                  </Button>
                </Dropdown>
              </div>
            </div>

            {/* Users Table */}
            <div className="mt-6 overflow-x-auto rounded-[8px] border border-support2">
            <div className="min-w-[600px]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-support1 text-left text-text-black font-semibold">
                    <th className="px-6 py-4 font-medium">Name</th>
                    <th className="px-6 py-4 font-medium">Email</th>
                    <th className="px-6 py-4 font-medium">Role</th>
                    <th className="px-6 py-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="text-[#1F1F1F]">
                  {pagedUsers.map(u => (
                    <tr key={u.id} className="border-t border-support2">
                      <td className="px-6 py-5">{u.name}</td>
                      <td className="px-6 py-5">{u.email}</td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex rounded-full px-3 py-1 text-[14px] font-semibold ${rolePill(u.role)}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          {u.status === "active" ? (
                            <button
                              onClick={() => handleBan(u.id)}
                              className="rounded-[10px] bg-[#FFE5E5] px-6 py-2 text-[14px] font-semibold text-[#E25A5A] hover:bg-[#FFD9D9] transition"
                            >
                              Ban
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUnban(u.id)}
                              className="rounded-[10px] bg-[#F2F2F2] px-4 py-2 text-[14px] font-semibold text-[#9B9B9B]"
                            >
                              Unban
                            </button>
                          )}

                          {/* Change Role Dropdown */}
                          <Dropdown
                            dropdownRender={() => (
                              <div className="bg-white rounded-[12px] shadow-md p-2 min-w-[140px]">
                                {roles.map(role => (
                                  <div
                                    key={role}
                                    className="cursor-pointer hover:bg-[#3EBAD080] px-2 py-1 rounded dropdown-item"
                                    onClick={() => handleChangeRole(u.id, role)}
                                  >
                                    <Checkbox
                                      className="custom-checkbox"
                                      checked={u.role === role}
                                    >
                                      {role}
                                    </Checkbox>
                                  </div>
                                ))}
                              </div>
                            )}
                            trigger={["click"]}
                          >
                            <Button 
                              style={{ fontWeight: 600 }}
                              className="font-sans text-[16px] px-[20px] py-[8px] border-none rounded-[12px] w-[140px] flex justify-between items-center my-role-button"
                              >
                                {u.role} 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                              </Button>
                          </Dropdown>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center pt-[20px]">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredUsers.length}
                onChange={(page, size) => {
                  setCurrentPage(page);
                  if (size) setPageSize(size);
                }}
                showSizeChanger
                pageSizeOptions={["3","6","9","12"]}
                className="custom-pagination"
              />
            </div>
          </div>
        </div>
      </div>
        <footer className="flex items-center justify-center py-[20px] text-[14px] font-normal mt-auto bg-bg-light">
        © 2025 Schedio. All rights reserved.
      </footer>

      {/* Confirm Modal */}
      {confirmUserId && confirmAction && (
        <PopupModal
          title={confirmAction === "ban" ? "Ban this user?" : "Unban this user?"}
          message={
            confirmAction === "ban" ? (
              <>This will remove all user data. <br /> Do you want to continue?</>
            ) : (
              <>Their account will be reactivated.<br /> Do you want to continue?</>
            )
          }
          confirmText="Yes"
          cancelText="Cancel"
          confirmColor={confirmAction === "ban" ? "red" : "green"}
          onConfirm={performConfirm}
          onCancel={() => { setConfirmUserId(null); setConfirmAction(null); }}
        />
      )}
    </div>
  );
};

export default UserManagement;
