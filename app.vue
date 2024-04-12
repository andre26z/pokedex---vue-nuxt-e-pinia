<template>
  <div class="flex justify-center items-center">
    <div class="container max-w-screen-xl mx-auto p-4">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Procurar Pokémon por Nome ou Código"
        class="mb-4 p-2 w-full border rounded"
      />

      <div class="space-y-4">
        <h1 class="text-2xl font-bold">Pokémons</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <PokemonCard
            v-for="pokemon in filteredPokemon"
            :key="pokemon.name"
            :pokemon="pokemon"
          />
        </div>
        <div v-if="pokemonStore.isLoading" class="text-center">
          Carregando mais pokemons...
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { usePokemonStore } from "~/stores/usePokemonStore";

const pokemonStore = usePokemonStore();
const searchQuery = ref("");

const filteredPokemon = computed(() => {
  const lowerSearchQuery = searchQuery.value.toLowerCase();
  return pokemonStore.pokemonList.filter(pokemon => {
    const nameMatches = pokemon.name.toLowerCase().includes(lowerSearchQuery);
    const gameIndexMatches = pokemon.gameIndex !== undefined && pokemon.gameIndex.toString().includes(lowerSearchQuery);
    return nameMatches || gameIndexMatches;
  });
});

onMounted(() => {
  if (pokemonStore.pokemonList.length === 0) {
    pokemonStore.fetchPokemon();
  }
});
</script>
