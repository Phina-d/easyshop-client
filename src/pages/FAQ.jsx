export default function FAQ() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Foire aux Questions (FAQ)</h1>
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-lg mb-1">📦 Quels sont les délais de livraison ?</h2>
          <p>
            Les commandes sont traitées sous 24h et livrées entre 3 à 7 jours ouvrables selon votre localisation.
            La livraison est gratuite dès 50€ d’achat.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-1">🔄 Puis-je retourner un produit ?</h2>
          <p>
            Oui. Vous avez 14 jours après réception pour nous retourner un article.
            Les produits doivent être en parfait état, dans leur emballage d’origine. Les frais de retour sont à votre charge sauf si le produit est défectueux.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-1">📍 Comment suivre ma commande ?</h2>
          <p>
            Dès que votre commande est expédiée, vous recevez un email avec un lien de suivi. Vous pouvez également consulter votre historique de commande dans votre espace client.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-1">💳 Quels moyens de paiement acceptez-vous ?</h2>
          <p>
            Nous acceptons les cartes Visa, Mastercard, PayPal ainsi que les paiements à la livraison dans certaines zones.
            Tous les paiements sont sécurisés.
          </p>
        </div>
      </div>
    </div>
  );
}
