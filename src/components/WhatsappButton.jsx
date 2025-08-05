// components/WhatsappButton.jsx
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsappButton = () => {
  return (
  <a
  href="https://wa.me/221775664237?text=Bonjour%2C%20je%20souhaite%20avoir%20des%20informations%20sur%20vos%20produits"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-5 right-5 bg-green-500 text-white p-1.5 rounded-full shadow-md hover:bg-green-600 transition-all z-50 flex items-center justify-center"
  aria-label="Contactez-nous sur WhatsApp"
>
  <FaWhatsapp size={18} />
</a>

  );
};

export default WhatsappButton;
