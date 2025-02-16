import React, { useState } from "react";

const Admin = () => {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handlePasswordSubmit = () => {
    if (password === "123") { 
      setIsAuthorized(true);
    } else {
      alert("Incorrect password!");
    }
  };

  const handleDelete = () => {
    setShowPopup(true); // Show confirmation popup
  };

  const confirmDelete = () => {
    fetch("https://carbon-footprint-wgu4.onrender.com/admin/delete", {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        alert("All data deleted successfully!");
        setShowPopup(false); // Close popup
      })

      setShowPopup(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {!isAuthorized ? (
        <div className="bg-white shadow-md p-6 rounded-lg">
        <p className="text-lg mb-4">Enter Password:</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handlePasswordSubmit()} // Listen for Enter key
          className="border p-2 rounded w-64"
        />
      </div>
      ) : (
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-6 py-3 rounded mt-4 hover:bg-red-700 shadow-md" 
          >
            Delete All Data
          </button>
      )}

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500 mr-2"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="bg-red-600 text-white px-6 py-2 rounded  hover:bg-red-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
