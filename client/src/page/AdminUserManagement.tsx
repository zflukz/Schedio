import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

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

const AdminUserManagement: React.FC = () => {
  const navigate = useNavigate();
  const adminUser = {
    name: "Thanaphat",
    role: "admin" as const,
    image: "/MyuserProfile.svg",
  };

  const [users, setUsers] = useState<UMUser[]>([
    { id: "u1", name: "Wongsakorn", email: "wongsakorn.yuc@gmail.com", role: "Admin",     status: "active" },
    { id: "u2", name: "Thanaphat",  email: "thanaphat.pom@gmail.com",   role: "Organizer", status: "active" },
    { id: "u3", name: "Woramate",   email: "woramate.sir@gmail.com",    role: "User",      status: "banned" },
    { id: "u4", name: "Thanrada",   email: "thanrada.fai@gmail.com",    role: "User",      status: "active" },
  ]);
  const [page] = useState(1);
  const [roleFocusId, setRoleFocusId] = useState<string | null>(null);

  const [confirmUserId, setConfirmUserId] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<"ban" | "unban" | null>(null);

  const data = useMemo(() => users, [users]);

  const handleChangeRole = (id: string, role: Role) => {
    setUsers(prev => prev.map(u => (u.id === id ? { ...u, role } : u)));
  };

  const handleBan = (id: string) => {
    setConfirmUserId(id);
    setConfirmAction("ban");
  };

  const performConfirm = () => {
    if (!confirmUserId || !confirmAction) return;
    if (confirmAction === "ban") {
      setUsers(prev =>
        prev.map(u => (u.id === confirmUserId ? { ...u, status: "banned" } : u))
      );
    } else {
      setUsers(prev =>
        prev.map(u => (u.id === confirmUserId ? { ...u, status: "active" } : u))
      );
    }
    setConfirmUserId(null);
    setConfirmAction(null);
  };

  const handleUnban = (id: string) => {
    setConfirmUserId(id);
    setConfirmAction("unban");
  };

  return (
    <div className="bg-bg-light min-h-screen pb-12 pt-10">
      {/* Top section with Navbar and Back button (same pattern as AdminEventManagement.tsx) */}
      <div className="w-full px-[15px] sm:px-[25px] lg:px-[60px] pt-[25px] flex flex-col lg:flex-row lg:items-center relative">
        {/* Back Button */}
        <div className="flex justify-start mb-4 lg:mb-0">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center bg-white text-black py-[8px] px-[20px] rounded-full font-semibold text-[16px] hover:shadow-md transition z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-[10px]"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            Back
          </button>
        </div>

        {/* Navbar Centered */}
        <div className="flex justify-center w-full lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
          <Navbar user={adminUser} />
        </div>
      </div>

      {/* Content card */}
      <main className="mx-auto mt-[75px] w-full max-w-[1040px] rounded-[24px] bg-white px-6 py-8 shadow-[0px_24px_48px_rgba(16,24,40,0.06)]">
        <h1 className="text-[28px] sm:text-[32px] font-semibold text-[#1F1F1F]">Users Management</h1>

        {/* Table */}
        <div className="mt-6 overflow-hidden rounded-[16px] border border-[#E2E2E2] border-1">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#F7F7F7] text-left text-[#6B6B6B]">
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="text-[#1F1F1F]">
              {data.map(u => (
                <tr key={u.id} className="border-t border-[#E2E2E2]">
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
                          className="rounded-[10px] bg-[#FFE5E5] px-6 py-2 text-[14px] font-semibold text-[#E25A5A] hover:bg-[#ffd9d9] transition"
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

                      {/* Change Role dropdown */}
                      <div className="relative">
                        <select
                          aria-label="Change Role"
                          value={roleFocusId === u.id ? u.role : ""}
                          onChange={e => {
                            const next = e.target.value as Role | "";
                            if (next === "") return; // keep current value when selecting placeholder
                            handleChangeRole(u.id, next as Role);
                          }}
                          onFocus={() => setRoleFocusId(u.id)}
                          onBlur={() => setRoleFocusId(null)}
                          className="appearance-none rounded-[10px] bg-[#DDF6FB] px-4 py-2 pr-9 text-[14px] font-semibold text-[#2AA5B9] hover:bg-[#c9eef6] transition"
                        >
                          <option value="">Change Role</option>
                          <option value="Admin">Admin</option>
                          <option value="Organizer">Organizer</option>
                          <option value="User">User</option>
                        </select>
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#2AA5B9]">
                          ▾
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E5E5] text-[#9A9A9A]">
            <span className="-translate-x-[1px] rotate-180">›</span>
          </button>
          <div className="flex items-center gap-2 text-[15px]">
            <button className="h-9 w-9 rounded-full bg-[#1F1F1F] text-white font-medium">1</button>
            <span className="text-[#9A9A9A]">2</span>
            <span className="text-[#9A9A9A]">…</span>
            <span className="text-[#9A9A9A]">4</span>
            <span className="text-[#9A9A9A]">5</span>
          </div>
          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E5E5] text-[#9A9A9A]">
            <span>›</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-10 pb-8 text-center text-[14px] text-white/70">
        © 2025 Schedio. All rights reserved.
      </footer>

      {/* Confirm Ban Modal */}
      {confirmUserId && (
        <>
          <div className="fixed inset-0 z-20 bg-black/30"></div>
          <div className="fixed inset-0 z-30 flex items-center justify-center p-4">
            <div className="w-full max-w-[360px] rounded-[18px] bg-white p-6 text-center shadow-xl">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#FDEDEC] text-[#E25A5A]">
                <ExclamationTriangleIcon className="w-7 h-7" fill="#D63031" color="#FDEDEC"/>
              </div>
              <h3 className="text-[20px] font-bold text-[#1F1F1F]">{confirmAction === "unban" ? "Unban this user?" : "Ban this user?"}</h3>
              <p className="mt-1 text-[14px] text-[#8A8A8A]">{confirmAction === "unban" ? "Their account will be reactivated. Do you want to continue?" : "This will remove all user data. Do you want to continue?"}</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={() => { setConfirmUserId(null); setConfirmAction(null); }}
                  className="rounded-full bg-[#E2E2E2] px-4 py-2 font-semibold text-black hover:bg-[#D0D0D0] transition"
                >
                  Cancel
                </button>
                <button
                  onClick={performConfirm}
                  className="rounded-full bg-[#EF4444] px-4 py-2 font-semibold text-white hover:bg-[#DC2626] transition"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminUserManagement;