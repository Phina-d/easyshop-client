import { FaCcVisa, FaCcMastercard, FaCcPaypal } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Liens */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Informations</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/faq" className="hover:underline hover:text-gray-300">FAQ</a></li>
            <li><a href="/shipping" className="hover:underline hover:text-gray-300">Livraison</a></li>
            <li><a href="/returns" className="hover:underline hover:text-gray-300">Retours</a></li>
            <li><a href="/terms" className="hover:underline hover:text-gray-300">CGV</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Newsletter</h3>
          <p className="text-sm mb-3 text-gray-300">Recevez nos offres exclusives et nouveautés !</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Votre email"
              className="px-3 py-2 rounded-l bg-white text-gray-900 focus:outline-none text-sm"
            />
            <button className="bg-blue-500 px-4 py-2 rounded-r text-white font-medium hover:bg-blue-600 transition">
              S'inscrire
            </button>
          </form>
        </div>

        {/* Réseaux sociaux */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Suivez-nous</h3>
          <div className="flex flex-col space-y-2 text-sm sm:flex-row sm:space-y-0 sm:space-x-4">
            <a href="https://facebook.com" aria-label="Facebook" className="hover:text-blue-400">Facebook</a>
            <a href="https://instagram.com" aria-label="Instagram" className="hover:text-pink-400">Instagram</a>
            <a href="https://twitter.com" aria-label="Twitter" className="hover:text-blue-300">Twitter</a>
          </div>
        </div>

        {/* Paiements & Garantie */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Paiement sécurisé</h3>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 text-sm text-gray-300">
            <span className="flex items-center gap-2">
              <FaCcVisa className="text-xl text-blue-500" />
              Visa
            </span>
            <span className="flex items-center gap-2">
              <FaCcMastercard className="text-xl text-red-500" />
              Mastercard
            </span>
            <span className="flex items-center gap-2">
              <FaCcPaypal className="text-xl text-indigo-500" />
              PayPal
            </span>
          </div>
          <p className="text-sm italic mt-3 text-gray-400">Livraison rapide & gratuite dès 50€</p>
        </div>

      </div>
      <div className="text-center text-xs mt-10 text-gray-400">
        © 2025 EasyShop - Tous droits réservés
      </div>
    </footer>
  );
}
