import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [noOfEmail, setNoOfEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://carbon-footprint-wgu4.onrender.com/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, noOfEmail: parseInt(noOfEmail) }),
    });
    if (response.ok) {
      alert("Contribution saved successfully!");
      setName("");
      setNoOfEmail("");
    } else {
      alert("Error saving contribution.");
    }
  };

  return (
    <>
      <header className="w-full max-w-4xl flex justify-between items-center p-4">
        <h1 className="text-green-700 text-4xl font-bold flex items-center">
          🌱 Email Cleanup Challenge
        </h1>
      </header>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-xl w-full -mt-40">
        <h2 className="text-3xl font-semibold mb-4 text-green-900">Track Your Impact</h2>
        <div className="h-0 sm:h-5"></div>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-bold text-xl">Your Name</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded-lg mb-4"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <div className="h-0 sm:h-5"></div>
          <label className="block mb-2 font-bold text-xl">Number of Emails Deleted</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded-lg mb-4"
            placeholder="0"
            value={noOfEmail}
            onChange={(e) => setNoOfEmail(e.target.value)}
            required
          />
          <div className="h-0 sm:h-5"></div>
          <button
            type="submit"
            className="w-full block mb-2 cursor-pointer font-bold text-xl bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Save My Contribution
          </button>
        </form>
      </div>
    </div>
    </>
  );
}
