import { PropsWithChildren, createContext, useContext, useState } from "react";
import { FavPokemon, Pokemon } from "./types/Pokemon";
import { useIsPokemonFavorite } from "./queries";


// for type safety
type FavoritesListType = {
    favorites: FavPokemon[],
    addToFavorites: (pokemon: Pokemon) => void,
    removeToFavorites: (pokemon: Pokemon) => void,
}
export const FavoritesContext = createContext<FavoritesListType>({
    favorites: [],
    addToFavorites: () => {},
    removeToFavorites: () => {},
});

//main function
export default function FavoritesProvider({children}: PropsWithChildren) {
    //states
    const [favPokemons, setFavPokemons] = useState<FavPokemon[]>([]);
    const addToFavorites = (pokemon: Pokemon) => {
        const newFavoritePokemon:FavPokemon = {
            id: 1,
            pokeId: pokemon.id,
            pokemon: pokemon,
        }
        const existing = useIsPokemonFavorite(pokemon.id, favPokemons);
        if (existing === false) {
        setFavPokemons([newFavoritePokemon, ...favPokemons]);
        }else{
            console.warn(pokemon.name.toUpperCase() +' Is already in favorites'  );
        }
    }
    const removeToFavorites = (pokemon: Pokemon) => {
        // Update state using a callback function
        setFavPokemons((prevFavPokemons) => {
            const newFavPokemons = prevFavPokemons.filter(
                (favPokemon) => favPokemon.pokemon.id !== pokemon.id
            );

            return newFavPokemons;
            });
        };

  return (
    <FavoritesContext.Provider value={{ favorites: favPokemons, addToFavorites, removeToFavorites  }}>
        {children}
    </FavoritesContext.Provider>
  )
}
export const useFavoritesContext = () => useContext(FavoritesContext);