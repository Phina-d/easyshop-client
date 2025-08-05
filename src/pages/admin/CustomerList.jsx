import React from "react";
import { Users } from "lucide-react";

const mockClients = [
  { id: 1, nom: "Fatou Ndiaye", email: "fatou@example.com", inscription: "2025-06-01" },
  { id: 2, nom: "Alioune Diop", email: "alioune@example.com", inscription: "2025-07-12" },
  { id: 3, nom: "Awa Ba", email: "awa@example.com", inscription: "2025-07-30" },
];

export default function CustomerList() {
  return (
    <section className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Users className="text-green-600" size={32} />
        <h1 className="text-2xl font-bold text-green-700">Liste des Clients</h1>
      </div>

      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Nom</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Date d'inscription</th>
          </tr>
        </thead>
        <tbody>
          {mockClients.map((client) => (
            <tr key={client.id} className="hover:bg-gray-50">
              <td className="p-2 border">{client.id}</td>
              <td className="p-2 border">{client.nom}</td>
              <td className="p-2 border">{client.email}</td>
              <td className="p-2 border">{client.inscription}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
