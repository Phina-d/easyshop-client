import React, { useState } from "react";

export default function UsersTablesPage() {
  // Exemple de données utilisateurs simulées (à remplacer par ton API)
  const [users] = useState([
    {
      _id: "1",
      name: "Alioune",
      email: "alioune@example.com",
      data: [
        { col1: "A1", col2: "B1" },
        { col1: "A2", col2: "B2" },
      ],
    },
    {
      _id: "2",
      name: "Fatou",
      email: "fatou@example.com",
      data: [
        { col1: "C1", col2: "D1" },
        { col1: "C2", col2: "D2" },
      ],
    },
  ]);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Tableaux par utilisateur</h1>

      {users.map((user) => (
        <div key={user._id} className="border rounded p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {user.name} ({user.email})
          </h2>

          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-3 py-1">Colonne 1</th>
                <th className="border border-gray-300 px-3 py-1">Colonne 2</th>
              </tr>
            </thead>
            <tbody>
              {user.data.map((row, i) => (
                <tr key={i}>
                  <td className="border border-gray-300 px-3 py-1">{row.col1}</td>
                  <td className="border border-gray-300 px-3 py-1">{row.col2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
