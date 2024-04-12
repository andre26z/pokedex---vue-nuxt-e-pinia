<template>
  <div class="flex justify-center items-center">
    <div class="container max-w-screen-xl mx-auto p-4">
      <div class="space-y-4">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          <PokemonCard
            v-for="pokemon in pokemonStore.paginatedPokemon"
            :key="pokemon.name"
            :pokemon="pokemon"
          />
        </div>
        <div v-if="pokemonStore.isLoading" class="text-center">
          Loading more Pokémon...
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import { usePokemonStore } from "~/stores/usePokemonStore";

const pokemonStore = usePokemonStore();

const checkScroll = () => {
  const nearBottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;
  if (
    nearBottom &&
    !pokemonStore.isLoading &&
    pokemonStore.pokemonList.length < pokemonStore.totalCount
  ) {
    pokemonStore.fetchPokemon();
  }
};

onMounted(() => {
  window.addEventListener("scroll", checkScroll);
  if (pokemonStore.pokemonList.length === 0) {
    pokemonStore.fetchPokemon();
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", checkScroll);
});
</script>
