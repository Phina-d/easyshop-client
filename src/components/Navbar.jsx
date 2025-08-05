import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import {
  FaShoppingCart,
  FaQuestionCircle,
  FaTimes,
  FaBars,
  FaChevronDown
} from "react-icons/fa";
import HelpModal from "./HelpModal";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout, isLoading } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const closeMenu = () => setMenuOpen(false);

  // Bloque le rendu tant que l'utilisateur est en cours de chargement
  if (isLoading) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <h1 className="logo">
            <Link to="/">🛍️ EasyShop</Link>
          </h1>

          <div className="burger-menu">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="burger-button"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <ul className="nav-links">
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/produits">Produits</Link></li>
            <li><Link to="/contact">Contact & Avis</Link></li>

            {user?.role === "admin" && (
              <li className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1 text-sm font-semibold px-3 py-2 text-white hover:text-yellow-300"
                >
                  Gestion <FaChevronDown className="text-xs mt-0.5" />
                </button>
                {dropdownOpen && (
                  <ul
                    onMouseLeave={() => setDropdownOpen(false)}
                    className="absolute bg-gray-900 text-white shadow-lg rounded-md w-48 mt-2 z-50 animate-fade-in"
                  >
                    <li><Link to="/admin/produits" className="block px-4 py-2 hover:bg-gray-700">🛒 Produits</Link></li>
                    <li><Link to="/orders" className="block px-4 py-2 hover:bg-gray-700">📦 Commandes</Link></li>
                    <li><Link to="/clients" className="block px-4 py-2 hover:bg-gray-700">📋 Clients</Link></li>
                    <li><Link to="/prospects" className="block px-4 py-2 hover:bg-gray-700">📤 Prospects</Link></li>
                    <li><Link to="/admin/utilisateurs" className="block px-4 py-2 hover:bg-gray-700">👥 Utilisateurs</Link></li>
                  </ul>
                )}
              </li>
            )}

            <li className="cart-icon">
              <Link to="/panier">
                <FaShoppingCart />
                {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
              </Link>
            </li>

            <li>
              <button onClick={() => setIsHelpOpen(true)} className="help-button">
                <FaQuestionCircle />
              </button>
            </li>

            {user ? (
              <li><button onClick={handleLogout} className="logout-button">Déconnexion</button></li>
            ) : (
              <li><Link to="/auth">Connexion</Link></li>
            )}
          </ul>
        </div>

        {menuOpen && (
          <ul className="nav-links-mobile">
            <li><Link to="/" onClick={closeMenu}>Accueil</Link></li>
            <li><Link to="/produits" onClick={closeMenu}>Produits</Link></li>
            <li><Link to="/contact" onClick={closeMenu}>Contact & Avis</Link></li>

            {user?.role === "admin" && (
              <>
                <li><Link to="/orders" onClick={closeMenu}>📦 Commandes</Link></li>
                <li><Link to="/clients" onClick={closeMenu}>📋 Clients</Link></li>
                <li><Link to="/prospects" onClick={closeMenu}>📤 Prospects</Link></li>
                <li><Link to="/admin/utilisateurs" onClick={closeMenu}>👥 Utilisateurs</Link></li>
              </>
            )}

            <li><Link to="/panier" onClick={closeMenu}><FaShoppingCart /> Panier</Link></li>
            <li><button onClick={() => { setIsHelpOpen(true); closeMenu(); }} className="help-button"><FaQuestionCircle /> Aide</button></li>
            {user ? (
              <li><button onClick={() => { handleLogout(); closeMenu(); }} className="logout-button">Déconnexion</button></li>
            ) : (
              <li><Link to="/auth" onClick={closeMenu}>Connexion</Link></li>
            )}
          </ul>
        )}
      </nav>

      {isHelpOpen && <HelpModal onClose={() => setIsHelpOpen(false)} />}
    </>
  );
}
