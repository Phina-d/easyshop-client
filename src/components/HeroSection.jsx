// src/components/HeroSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Bienvenue sur <span>EasyShop</span></h1>
          <p>Des produits tendance à petits prix, livrés partout au Sénégal 🇸🇳</p>
          <div className="hero-buttons">
            <Link to="/produits" className="hero-btn">Voir nos produits</Link>
            <Link to="/auth" className="hero-btn outline">Se connecter</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
