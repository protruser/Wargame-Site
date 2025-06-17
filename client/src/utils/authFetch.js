// src/utils/authFetch.js

// authFetch: A wrapper for fetch() that automatically adds Authorization header
export default function authFetch(url, options = {}) {
  const token = localStorage.getItem("token"); // Retrieve JWT token from localStorage

  return fetch(url, {
    ...options, // Spread original fetch options
    headers: {
      ...(options.headers || {}), // Include any custom headers passed
      Authorization: token ? `Bearer ${token}` : undefined, // Add Bearer token if it exists
    },
  });
}
