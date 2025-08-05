import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen p-4 animate-fade-in">
        <h1 className="text-3xl font-bold text-center mb-6">
          Bienvenue sur EasyShop
        </h1>
        <p className="text-center text-gray-700 max-w-xl mx-auto">
          Découvrez nos produits soigneusement sélectionnés avec une interface
          élégante et professionnelle.
        </p>
      </main>
      <Footer />
    </div>
  );
}

export default App;
