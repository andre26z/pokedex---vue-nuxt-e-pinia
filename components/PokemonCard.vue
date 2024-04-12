<template>
  <div
    class="max-w-sm rounded overflow-hidden shadow-lg bg-white hover:bg-gray-100 transition-colors"
  >
    <div class="px-6 py-4">
      <img
        :src="pokemonDetails.image"
        alt="Pokemon"
        class="mx-auto h-auto max-w-full"
        loading="lazy"
      />
      <div class="font-bold text-xl mb-6 capitalize text-center">
        {{ pokemonDetails.name }}
      </div>
      <p class="font-bold text-sm mb-20 text-center">
        Cód: {{ pokemonDetails.gameIndex }}
      </p>

      <div class="flex justify-center items-center space-x-2">
        <span v-for="type in pokemonDetails.typeName" :key="type" class="mb-2">
          <span
            :class="[
              typeColors[type],
              'rounded-full px-4 py-1 text-sm font-semibold text-white capitalize',
            ]"
          >
            {{ type }}
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { usePokemonStore } from "~/stores/usePokemonStore";

const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
});

const pokemonStore = usePokemonStore();
const pokemonDetails = ref({});

onMounted(async () => {
  await pokemonStore.fetchPokemon();
  if (!pokemonStore.pokemonDetails[props.pokemon.url]) {
    await pokemonStore.fetchPokemonDetails(props.pokemon.url);
  }
  pokemonDetails.value = pokemonStore.pokemonDetails[props.pokemon.url] || {};
});

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

const typeColors = {
  water: "bg-blue-500",
  grass: "bg-green-500",
  normal: "bg-orange-950",
  bug: "bg-lime-300",
  dark: "bg-gray-800",
  dragon: "bg-emerald-800",
  electric: "bg-yellow-400",
  fairy: "bg-pink-500",
  fire: "bg-red-500",
  flying: "bg-sky-300",
  ghost: "bg-gray-500",
  ground: "bg-amber-600",
  ice: "bg-blue-300",
  poison: "bg-purple-700",
  psychic: "bg-pink-300",
  fighting: "bg-red-300",
  rock: "bg-amber-700",
  shadow: "bg-coolGray-600",
  steel: "bg-indigo-800",
  unknown: "bg-emerald-950",
};
</script>
