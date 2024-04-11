// import the necessary functions from Pinia and Vue
import { defineStore } from "pinia";

export const usePokemonStore = defineStore("pokemon", {
  state: () => ({
    pokemonList: [],
    pokemonDetails: {},
    currentPage: 1,
    pageSize: 24,
  }),
  actions: {
    async fetchPokemon() {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
        );
        const data = await response.json();
        this.pokemonList = data.results;
      } catch (error) {
        console.error("Failed to fetch Pokémon", error);
      }
    },
    setPage(page) {
      this.currentPage = page;
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
    paginatedPokemon: (state) => {
      const start = (state.currentPage - 1) * state.pageSize;
      const end = start + state.pageSize;
      return state.pokemonList.slice(start, end);
    },
  },
});
