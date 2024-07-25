import axios from "axios";
import { Pokemon, PokemonSpecies, PokeType} from "./types/Pokemon";

const BASE_URL = 'https://pokeapi.co/api/v2/';
const axiosInstance = axios.create({baseURL : BASE_URL});
const count = 20;

export const getPokemonNamess = async() => {
    const response = await axiosInstance.get(`pokemon/?offset=0&limit=${count}`)
    return response.data.results.map((pokemon: any) => pokemon.name)
}


export const getPokemonDetails = async(name : string | undefined) => {
    const response = await axiosInstance.get<Pokemon>(`pokemon/${name}`)
    return response.data
}

export const getRegion = async(id: number) => {
    const response = await axiosInstance.get(`pokedex/${id}`)
    return response.data
}

//pagination testing
export const getPokemonNames = async(page : number) => {
    if(page < 1){
        page = 1
    } 
    const response = await axiosInstance.get(`pokemon/?offset=${(page - 1) * count}&limit=${count}`)
    return response.data.results.map((pokemon: any )=> pokemon.name.toString())
}

//pokemon-species/{id or name}/
export const getPokemonSpecies = async(id: number | string | undefined) => {
    const response = await axiosInstance.get<PokemonSpecies>(`pokemon-species/${id}`);
    return response.data;
}


//pokemon types /type/{id or name}/
export const getPokemonTypes = async(typeId: number | string | undefined ) => {
    const response = await axiosInstance.get<PokeType>(`type/${typeId}`);
    return response.data;
}
