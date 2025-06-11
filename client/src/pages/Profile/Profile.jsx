import React, { useState, useEffect } from "react";

function Profile() {
  const [nickname, setNickname] = useState("loading...");
  const [id, setEmail] = useState("loading...");
  const [password, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);

  // 유저 정보 자동 로드
  useEffect(() => {
    fetch("http://localhost:3000/api/profile", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setNickname(data.nickname);
        setEmail(data.id);
      })
      .catch((err) => {
        console.error("Failed to load profile:", err);
      });
  }, []);

  // 비밀번호 변경
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/profile/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id, password, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Password update failed.");
      } else {
        setSuccess("Password updated successfully.");
        setCurrentPassword("");
        setNewPassword("");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }
  };

  // 회원탈퇴
  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/user_id/${encodeURIComponent(id)}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        alert("Failed to delete account.");
        return;
      }

      setShowModal(true);
    } catch (err) {
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-xl bg-white p-10 shadow-md rounded">
        <h1 className="text-3xl font-semibold mb-8 text-center text-black">Profile</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* 닉네임 (수정 불가) */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={nickname}
              disabled
              className="w-full bg-gray-200 px-4 py-2 rounded text-black cursor-not-allowed"
            />
          </div>

          {/* 이메일 (수정 불가) */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={id}
              disabled
              className="w-full bg-gray-200 px-4 py-2 rounded text-black cursor-not-allowed"
            />
          </div>

          {/* 현재 비밀번호 */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Current Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="w-full bg-gray-200 px-4 py-2 rounded text-black"
            />
          </div>

          {/* 새 비밀번호 */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full bg-gray-200 px-4 py-2 rounded text-black"
            />
          </div>

          {/* 메시지 */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          {/* 버튼 */}
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400"
            >
              Update Password
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
            >
              Delete Account
            </button>
          </div>
        </form>
      </div>

      {/* 탈퇴 완료 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-[300px] text-center">
            <p className="text-lg font-semibold mb-4">Your account has been deleted.</p>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
