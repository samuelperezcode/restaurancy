"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {useState} from "react";

function FavoriteButton({
  restaurant,
}: {
  restaurant: {
    id: string;
    name: string;
    image: string;
    description: string;
    score: number;
    ratings: number;
  };
}) {
  const [isFavourite, setIsFavourite] = useState(
    window.localStorage.getItem("favorites")?.includes(restaurant.id),
  );

  const handleCLick = () => {
    if (isFavourite === true) {
      window.localStorage.setItem(
        "favorites",
        window.localStorage.getItem("favorites")?.replace(restaurant.id, "") || "",
      );
      setIsFavourite(false);
    } else {
      window.localStorage.setItem(
        "favorites",
        `${restaurant.id},${window.localStorage.getItem("favorites")}`,
      );
      setIsFavourite(true);
    }
  };

  return (
    <button
      className={`text-xl text-red-500 ${isFavourite ? "opacity-100" : "opacity-20"}`}
      type="button"
      onClick={handleCLick}
    >
      ♥
    </button>
  );
}

const DynamicFavoriteButton = dynamic(async () => FavoriteButton, {ssr: false});

export default function RestaurantCard({
  restaurant,
}: {
  restaurant: {
    id: string;
    name: string;
    image: string;
    description: string;
    score: number;
    ratings: number;
  };
}) {
  return (
    <article>
      <img
        alt={restaurant.name}
        className="mb-3 h-[300px] w-full object-cover"
        src={restaurant.image}
      />
      <h2 className="inline-flex items-center gap-2 text-lg font-bold">
        <Link href={`/${restaurant.id}`}>
          <span>{restaurant.name}</span>
        </Link>
        <small className="inline-flex gap-1">
          <span>⭐</span>
          <span>{restaurant.score}</span>
          <span className="font-normal opacity-75">({restaurant.ratings})</span>
        </small>
        <DynamicFavoriteButton restaurant={restaurant} />
      </h2>
      <p className="opacity-90">{restaurant.description}</p>
    </article>
  );
}
