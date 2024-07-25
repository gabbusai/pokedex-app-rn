import { useInfiniteQuery, useQueries, useQuery } from "@tanstack/react-query"
import { getPokemonNames, getPokemonDetails, getPokemonSpecies, getPokemonTypes } from "./api"
import { FavPokemon, Pokemon } from "./types/Pokemon"
//import { Pokemon } from "./types/Pokemon"


//get pokemon names
export const usePokemonNames = () => {
    return(
        useInfiniteQuery({
            queryKey: ['pokemon'],
            initialPageParam: 1,
            getNextPageParam: (lastPage, pages) => pages.length + 1,
            queryFn: ({pageParam}) => getPokemonNames(pageParam),
        })
    )
};

export const usePokemonDetails = (names: (string | undefined| unknown)[] | undefined ) => {
    return useQueries({
        queries: (names ?? []).map((name: any) => {
            return {
                queryKey: ['pokemon', name],
                queryFn: () => getPokemonDetails(name)
            }
        })
    })
};

export const usePokemonSingle = (id : string | undefined) => {
    return useQuery({
        queryKey: ['pokemon', id],
        queryFn: () => getPokemonDetails(id)
    })
}

export const usePokemonSpecies = (id: number | string | undefined) => {
    return useQuery({
        queryKey: ['pokemon-species', id],
        queryFn: () => getPokemonSpecies(id)
    })
}

export const useIsPokemonFavorite = (pokemonId: number ,  FavPokemon: FavPokemon[] ) => {
    return FavPokemon.some((favPokemon) => favPokemon.pokemon.id === pokemonId)
}

//pokemon type
export const usePokemonType = (types: (string | undefined | unknown)[] | undefined) => {
    return useQueries({
        queries: (types ?? []).map((type: any) => {
            return {
                queryKey: ['types', type],
                queryFn: () => getPokemonTypes(type)
            }
        })
    })
}

export const useSinglePokemonType = (typeName : string) => {
    return useQuery({
        queryKey: ['types', typeName],
        queryFn: () => getPokemonTypes(typeName)
    })
}