<template>
  <div
    class="max-w-sm rounded overflow-hidden shadow-lg bg-white hover:bg-gray-100 transition-colors"
  >
    <div class="px-6 py-4">
      <img :src="pokemonDetails.image" alt="Pokemon" class="mx-auto" />
      <div class="font-bold text-xl mb-2">{{ pokemonDetails.name }}</div>

      <p class="rounded-full bg-gray-200 text-sm font-semibold text-gray-700">
        Type: {{ pokemonDetails.typeName }}
      </p>

      <p>Game Index: {{ pokemonDetails.gameIndex }}</p>
    </div>
    <div class="px-6 pt-4 pb-2">
      <!-- Additional actions -->
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { usePokemonStore } from "~/stores/usePokemonStore";

const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
});

const pokemonStore = usePokemonStore();
const pokemonDetails = ref({
  name: "",
  image: "",
  typeName: "",
  gameIndex: 0,
});

onMounted(async () => {
  await pokemonStore.fetchPokemon();
  if (!pokemonStore.pokemonDetails[props.pokemon.url]) {
    await pokemonStore.fetchPokemonDetails(props.pokemon.url);
  }
  pokemonDetails.value = pokemonStore.pokemonDetails[props.pokemon.url] || {};
});

// Reactively update details if the URL changes
watch(
  () => props.pokemon.url,
  async (newUrl) => {
    if (!pokemonStore.pokemonDetails[newUrl]) {
      await pokemonStore.fetchPokemonDetails(newUrl);
    }
    pokemonDetails.value = pokemonStore.pokemonDetails[newUrl];
  },
  { immediate: true }
);
</script>

<style scoped>
/* You can add additional scoped styles here */
</style>
