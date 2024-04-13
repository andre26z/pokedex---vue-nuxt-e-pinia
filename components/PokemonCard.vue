<template>
  <div
    class="max-w-sm rounded overflow-hidden shadow-lg bg-white transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-2xl cursor-pointer relative"
    @click="handleClick"
  >
    <div v-if="isLoading" class="absolute inset-0 bg-white bg-opacity-75 flex justify-center items-center">
      <!-- Tailwind Spinner -->
      <svg class="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.313 2.686 6 6 6v-1.709z"></path>
      </svg>
    </div>
    <div v-else>
      <div class="px-6 py-4">
        <img
          :src="pokemon.image"
          alt="Pokemon"
          class="mx-auto h-auto max-w-full"
          loading="lazy"
        />
        <div class="font-bold text-xl mb-6 capitalize text-center">
          {{ pokemon.name }}
        </div>
        <p class="font-bold text-sm mb-20 text-center">
          Cód: {{ pokemon.gameIndex }}
        </p>

        <div class="flex justify-center items-center space-x-2">
          <span v-for="type in pokemon.typeName" :key="type" class="mb-2">
            <span
              :class="[
                typeColors[type],
                'rounded-full px-4 py-1 text-sm font-semibold text-white uppercase',
              ]"
            >
              {{ type }}
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { usePokemonStore } from "~/stores/usePokemonStore";
import { defineProps } from "vue";

const router = useRouter();
const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
});

const isLoading = ref(false);

function handleClick() {
  isLoading.value = true;
  // Simulate a network delay
  setTimeout(() => {
    router.push(`/pokemon/${props.pokemon.name}`).finally(() => {
      isLoading.value = false; // Reset loading state after navigation
    });
  }, 500); // Delay for half a second
}

const pokemonStore = usePokemonStore();
const pokemonDetails = ref({});

onMounted(async () => {
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

function navigateToPokemonDetail(name) {
  router.push(`/pokemon/${name}`);
}
</script>
