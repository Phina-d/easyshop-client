export default function Unauthorized() {
  return (
    <div className="p-4 text-center">
      <h2 className="text-2xl font-bold text-red-600">Accès refusé</h2>
      <p className="mt-2">Vous n'avez pas les droits pour accéder à cette page.</p>
    </div>
  );
}
