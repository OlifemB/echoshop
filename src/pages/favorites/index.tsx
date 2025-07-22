import React from "react";
import { FavoritesList } from "@/components/favorites/FavoritesList";

const FavoritesPage: React.FC = () => {
  return (
    <div className="p-4 md:p-8  min-h-screen container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Избранное</h1>

      <FavoritesList/>
    </div>
  );
};

export default FavoritesPage;