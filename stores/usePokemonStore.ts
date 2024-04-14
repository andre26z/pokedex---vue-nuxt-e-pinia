interface Pokemon {
  name: string;
  url: string;
  image: string;
  typeName: string[];
  gameIndex: number | undefined;
  pokemonIndex: number | undefined;
}

interface PokemonDetails {
  [key: string]: {
    name: string;
    image: string;
    typeName: string[];
    gameIndex: number | undefined;
  };
}

export const usePokemonStore = defineStore("pokemon", {
  state: () => ({
    pokemonList: [] as Pokemon[],
    pokemonDetails: {} as PokemonDetails,
    isLoading: false,
    totalCount: null as number | null,
    pageSize: 24,
  }),
  actions: {
    async fetchPokemon(batchSize = 24) {
      this.isLoading = true;
      const limit = Math.min(batchSize, 300 - this.pokemonList.length);

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${this.pokemonList.length}`
        );
        const data = await response.json();
        this.totalCount = data.count;

        const detailedPokemonList = data.results.map(async (pokemon) => {
         
          return {
            name: pokemon.name,
            url: pokemon.url,
            image: "", 
            typeName: [],
            gameIndex: undefined,
          };
        });

        this.pokemonList = [
          ...this.pokemonList,
          ...(await Promise.all(detailedPokemonList)),
        ];
      } catch (error) {
        console.error("Failed to fetch Pokémon", error);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchPokemonDetails(url: any) {
      if (!this.pokemonDetails[url]) {
        try {
          const response = await fetch(url);
          const details = await response.json();
          this.pokemonDetails[url] = {
            name: details.name,
            image: details.sprites.front_default,
            typeName: details.types.map((t: any) => t.type.name),
            gameIndex: details.game_indices[0]?.game_index,
          };
        } catch (error) {
          console.error("Failed to fetch Pokémon details", error);
        }
      }
    },
  },
});
