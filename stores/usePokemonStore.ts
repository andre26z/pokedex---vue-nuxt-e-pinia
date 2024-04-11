// import the necessary functions from Pinia and Vue
import { defineStore } from "pinia";

export const usePokemonStore = defineStore("pokemon", {
  state: () => ({
    pokemonList: [],
    pokemonDetails: {},
    isLoading: false,
    totalCount: null,
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
        this.pokemonList = [...this.pokemonList, ...data.results];
      } catch (error) {
        console.error("Failed to fetch Pokémon", error);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchPokemonDetails(url) {
      try {
        const response = await fetch(url);
        const details = await response.json();
        this.pokemonDetails[url] = {
          name: details.name,
          image: details.sprites.front_default,
          typeName: details.types.map((t) => t.type.name).join(", "),
          gameIndex: details.game_indices[0]?.game_index,
        };
      } catch (error) {
        console.error("Failed to fetch Pokémon details", error);
      }
    },
  },
  getters: {
    paginatedPokemon: (state) => state.pokemonList,
  },
});
