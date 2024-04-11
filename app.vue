<template>
  <div class="space-y-4">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <PokemonCard
        v-for="pokemon in pokemonStore.paginatedPokemon"
        :key="pokemon.name"
        :pokemon="pokemon"
      />
    </div>
    <div class="flex justify-center space-x-4">
      <button
        @click="changePage(-1)"
        :disabled="pokemonStore.currentPage <= 1"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Previous
      </button>
      <button
        @click="changePage(1)"
        :disabled="
          pokemonStore.currentPage * pokemonStore.pageSize >=
          pokemonStore.pokemonList.length
        "
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { usePokemonStore } from "~/stores/usePokemonStore";

const pokemonStore = usePokemonStore();

onMounted(async () => {
  if (pokemonStore.pokemonList.length === 0) {
    await pokemonStore.fetchPokemon();
  }
});
</script>
