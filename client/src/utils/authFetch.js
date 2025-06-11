// src/utils/authFetch.js
export default function authFetch(url, options = {}) {
  const token = localStorage.getItem("token");
  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    // 만약 세션 쿠키 방식으로 바꾸려면 아래 주석 해제
    // credentials: "include",
  });
}
