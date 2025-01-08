import React, { useState, useEffect } from "react";

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://frontend-service';


  // Function to fetch users from the backend API
  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      console.log(`${process.env.REACT_APP_BACKEND_URL}`);
      const response = await fetch(`${API_URL}/api/users`);
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message || "Error fetching users.");
    } finally {
      setLoading(false);
    }
  };

  // Function to add a new user
  const addUser = async () => {
    if (!name.trim()) {
      alert("Name cannot be empty!");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      if (!response.ok) throw new Error("Failed to add user");
      setName("");
      fetchUsers(); // Re-fetch users after adding a new one
    } catch (err) {
      setError(err.message || "Error adding user.");
    } finally {
      setLoading(false);
    }
  };

  // Use useEffect to fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []); // Empty dependency array means it runs once on component mount

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>User Management</h1>

      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a user name"
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <button
          onClick={addUser}
          style={{
            padding: "10px 15px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add User
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul style={{ listStyleType: "none", padding: "0" }}>
        {users.length > 0 ? (
          users.map((user) => (
            <li
              key={user._id}
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                marginBottom: "5px",
              }}
            >
              {user.name}
            </li>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </ul>
    </div>
  );
};

export default App;
