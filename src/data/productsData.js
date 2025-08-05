// src/data/productsData.js
const products = [
  // --- MODE ---
  { id: 1, name: "Robe élégante", price: 20000, image: "/images/robe.jpg", category: "Mode", description: "Robe chic pour toutes vos occasions." },
  { id: 2, name: "Chemise homme classique", price: 6000, image: "/images/chemise6.jpg", category: "Mode", description: "Chemise confortable et élégante pour homme." },
  { id: 3, name: "Haut femme fleuri", price: 2500, image: "/images/haut.jpg", category: "Mode", description: "Haut tendance parfait pour l’été." },
  { id: 4, name: "Lingerie femme dentelle", price: 6999, image: "/images/lingerie.jpg", category: "Mode", description: "Ensemble en dentelle séduisant et confortable." },
  { id: 5, name: "Chaussures homme cuir", price: 12759, image: "/images/chaussureH.jpg", category: "Chaussures", description: "Élégantes chaussures en cuir pour homme." },
  { id: 6, name: "Chaussures à talon rouge", price: 10500, image: "/images/chaus-D1.jpg", category: "Chaussures", description: "Talons aiguilles pour un look glamour." },
  { id: 7, name: "Baskets de sport", price: 7000, image: "/images/basket.jpg", category: "Chaussures", description: "Confort et performance pour le sport." },
  { id: 8, name: "Perruque naturelle longue", price: 60000, image: "/images/perruque2.jpg", category: "Beauté", description: "Perruque naturelle avec effet lisse et brillant." },

  // --- BEAUTE & ACCESSOIRES ---
  { id: 9, name: "Bracelet doré", price: 1900, image: "/images/bracelet3.jpg", category: "Accessoires", description: "Bracelet chic et élégant pour toutes vos tenues." },
  { id: 10, name: "Montre en acier femme", price: 4900, image: "/images/montre.jpg", category: "Accessoires", description: "Montre tendance avec bracelet acier inoxydable." },
  { id: 11, name: "Lunettes de soleil", price: 3500, image: "/images/lunette3.jpg", category: "Accessoires", description: "Protection UV et style pour vos sorties." },
  { id: 12, name: "Trousse de maquillage complète", price: 10550, image: "/images/maquillage.jpg", category: "Beauté", description: "Palette complète pour sublimer votre beauté." },
  { id: 13, name: "Crème hydratante visage", price: 2500, image: "/images/creme.jpg", category: "Beauté", description: "Hydratation intense pour tous types de peau." },
  { id: 14, name: "Parfum floral 100ml", price: 5900, image: "/images/parfum5.jpg", category: "Beauté", description: "Fragrance douce et envoûtante." },

  // --- CUISINE ---
  { id: 15, name: "Ustensiles de cuisine inox", price: 13000, image: "/images/IMG-20250508-WA0073.jpg", category: "Cuisine", description: "Ensemble complet d’ustensiles de qualité." },
  { id: 16, name: "Tasses à café en céramique", price: 2500, image: "/images/IMG-20250508-WA0071.jpg", category: "Cuisine", description: "Set de 6 tasses élégantes pour vos cafés." },
  { id: 17, name: "Service de vaisselle 18 pièces", price: 17500, image: "/images/IMG-20250508-WA0076.jpg", category: "Cuisine", description: "Parfait pour vos repas en famille." },
  { id: 18, name: "Micro-ondes 800W", price: 25000, image: "/images/micro-onde.jpg", category: "Électroménager", description: "Pratique et rapide pour vos repas." },
  { id: 19, name: "Cuisinière 4 feux à gaz", price: 40000, image: "/images/IMG-20250508-WA0068.jpg", category: "Électroménager", description: "Cuisinière robuste et fiable." },
  { id: 20, name: "Machine à laver 7kg", price: 78900, image: "/images/machine.jpg", category: "Électroménager", description: "Silencieuse et efficace pour toute la famille." },
  { id: 21, name: "Fer à repasser vapeur", price: 4900, image: "/images/IMG-20250508-WA0063.jpg", category: "Électroménager", description: "Repassage facile et rapide." },

  // --- MAISON & DECO ---
  { id: 22, name: "Tableau moderne 3 pièces", price: 9900, image: "/images/tableau.jpg", category: "Maison", description: "Décorez votre salon avec élégance." },
  { id: 23, name: "Meuble TV moderne", price: 18500, image: "/images/salon5.jpg", category: "Maison", description: "Support élégant pour votre télévision." },
  { id: 24, name: "Meuble cuisine suspendu", price: 140000, image: "/images/IMG-20250508-WA0103.jpg", category: "Maison", description: "Optimisez votre espace de rangement." },
  { id: 25, name: "Chambre à coucher complète", price: 399000, image: "/images/IMG-20250508-WA0106.jpg", category: "Maison", description: "Confort et élégance pour vos nuits." },

  // --- TECH ---
  { id: 26, name: "Téléphone Android 128GB", price: 55990, image: "/images/IMG-20250508-WA0091.jpg", category: "Électronique", description: "Performant et design moderne." },
  { id: 27, name: "Imprimante multifonction", price: 18890, image: "/images/IMG-20250508-WA0058.jpg", category: "Électronique", description: "Scanner + impression rapide." },
  { id: 28, name: "Casque Bluetooth", price: 6900, image: "/images/casque.jpg", category: "Électronique", description: "Autonomie et son HD immersif." },
  { id: 29, name: "Montre connectée", price: 5290, image: "/images/montre-connect.jpg", category: "Électronique", description: "Suivi santé, notifications, appels." },
  { id: 30, name: "Tablette 10 pouces", price: 26790, image: "/images/IMG-20250508-WA0090.jpg", category: "Électronique", description: "Idéale pour vidéos, jeux, lecture." },

  {  id: 31,  name: "Bijoux élégant",  price: 2000,  image: "/images/bijoux.jpg", category: "Mode", description: "Accessoire raffiné pour sublimer votre tenue.",  },
  {  id: 32,  name: "Tableau moderne", price: 18900,  image: "/images/Tableau2.jpg", category: "Décoration", description: "Art mural contemporain pour embellir votre intérieur.",  },
  {  id: 33,  name: "Chambre à coucher moderne",  price: 269000,  image: "/images/salon8.jpg",  category: "Meubles",  description: "Mobilier élégant et confortable pour vos nuits."  },
  {  id: 34,  name: "Lingerie mauve",   price: 6500,   image: "/images/lingerie2.jpg",   category: "Mode",  description: "Lingerie fine, confortable et séduisante.",  },
  {  id: 35,  name: "Veste Dame chic",  price: 7900,   image: "/images/veste.jpg", category: "Mode",  description: "Veste élégante idéale pour un look professionnel ou casual.",  },

  
];

export default products;
