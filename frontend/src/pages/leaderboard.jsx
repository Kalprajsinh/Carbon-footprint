import React, { useState, useEffect } from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { useNavigate } from "react-router-dom";

const Leaderboard = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
        const fetchData = () => {
          fetch("https://carbon-footprint-wgu4.onrender.com/alluser")
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error("Error fetching data:", err));
        };
      
        fetchData();
      
        const interval = setInterval(fetchData, 1000);

        return () => clearInterval(interval);
      }, []);
  
    const totalCO2Saved = users.reduce((acc, user) => acc + user.noOfEmail * 4, 0);
    const maxValue = 5450; 
    const percentage = (totalCO2Saved / maxValue) * 100;
    const data = [{ value: percentage }];

    const treeIndex = Math.min(20, Math.max(1, Math.ceil((totalCO2Saved / maxValue) * 20)));

    return (
      <div className="min-h-screen bg-green-50 p-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-green-700 flex items-center">🥇 Carbon Savings Leaderboard</h1>
        
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        
        
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h2 className="text-2xl font-semibold">Total Community Impact</h2>
         
          <div className="flex justify-center">
            <RadialBarChart
              width={400} 
              height={300} 
              cx={200} 
              cy={250} 
              innerRadius={180}
              outerRadius={210}
              startAngle={180} 
              endAngle={0} 
              barSize={30} 
              data={data}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
              <RadialBar minAngle={15} background clockWise dataKey="value" fill="#16a34a" />
            </RadialBarChart>
          </div>
          
          <p className="text-center text-xl font-bold -mt-24">{totalCO2Saved}g CO₂ Saved</p>
          <img
            src={`/tree${treeIndex}.png`} 
            alt="Growing Tree"
            className="w-full h-auto mt-4"
          />
        </div>
          
  
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Top Contributors</h2>
          <div className="bg-white rounded-lg overflow-x-scroll sm:overflow-hidden border-3 border-gray-300">
            <table className="w-full border-collapse text-center">
              <thead className="border-b-3 border-gray-300">
                <tr className="text-gray-600">
                  <th className="py-2 px-4 text-xl">Rank</th>
                  <th className="py-2 px-4 text-xl">Name</th>
                  <th className="py-2 px-4 text-xl">Emails Deleted</th>
                  <th className="py-2 px-4 text-xl">CO₂ Saved</th>
                </tr>
              </thead>
              <tbody>
                {users.sort((a, b) => b.noOfEmail - a.noOfEmail).map((user, index) => (
                  <tr key={user.name} className="border-b-3 border-gray-300 text-xl last:border-b-0">
                    <td className="py-3 px-4">{index === 0 ? '🏆' : index + 1}</td>
                    <td className="py-3 px-4 font-medium">{user.name}</td>
                    <td className="py-3 px-4">{user.noOfEmail}</td>
                    <td className="py-3 px-4">{user.noOfEmail * 4}g</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        </div>
      </div>
    );
};

export default Leaderboard;
