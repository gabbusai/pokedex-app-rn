export type Pokemon = {
  id: number;
  name: string;
  sprites?: { // optional
    front_default: string; // URL to the default front image
    other: {
      dream_world: {
        front_default: string;
      },
      home: {
        front_default: string;
      },
    }
  };
  height: number;
  weight: number;
  types: Array<{
    type: { name: string };
  }>;
  stats: Array<{ 
    base_stat: number,
    effort: number,
    stat: {
      name: string,
      url: string
    }
  }>;
  abilities: Array<{
    is_hidden: boolean;
    ability: {
        name: string;
      }
  }>
};

export type PokemonSpecies = {
  id: number;
  name: string;
  order: number;
  capture_rate: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;

  pokedex_numbers: Array<{
    entry_number: number;
    pokedex:{
      name: string;
      url: string;
    }
  }>;
  evolves_from_species: {name: string; url: string};
  evolution_chain: {url: string};
  generation: {name: string; url: string;};
  flavor_text_entries: Array<{
    flavor_text: string;
  }>;
  form_descriptions: Array<{
    description: string
  }>;
}


export type PokeType = {
  id: number;
  name: string;
  damage_relations: {
    //very weak against
    no_damage_to: Array<{
      name: string
    }>;
    //weak against
    half_damage_to: Array<{
      name: string
    }>;
    //strong against
    double_damage_to: Array<{
      name: string
    }>;
    //very strong against
    no_damage_from: Array<{
    name: string
    }>;

  }
}

export type PokedexEntry = {
  id: number; // Unique identifier for the entry
  name: string; // Name of the Pokedex (e.g., "kanto")
  description?: string; // Optional description for the Pokedex (if available)
  pokemon_entries: Array<{
    entry_number: number; // Entry number within this Pokedex
    pokemon_species: {
      name: string; // Name of the Pokemon species (e.g., "bulbasaur")
      url: string; // URL to the Pokemon species resource
    };
  }>;
};


export type FavPokemon = {
  id: number;
  pokeId: number
  pokemon: Pokemon;
}

export type SectionType ={ title: 'General' | 'Stats' | 'Evolution';}