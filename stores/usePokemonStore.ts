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
    async fetchPokemon() {
      if (this.isLoading || this.pokemonList.length >= 300) {
        return;
      }

      this.isLoading = true;
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=300&offset=${this.pokemonList.length}`
        );
        const data = await response.json();
        this.totalCount = data.count;
        const detailedPokemonList = data.results.map(async (pokemon: any) => {
          const detailsResponse = await fetch(pokemon.url);
          const detailsData = await detailsResponse.json();
          return {
            name: detailsData.name,
            url: pokemon.url,
            image: detailsData.sprites.front_default,
            typeName: detailsData.types.map((t: any) => t.type.name), 
            gameIndex: detailsData.game_indices[0]?.game_index,
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
        // Fetch details only if not already loaded
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
