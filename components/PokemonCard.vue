<template>
  <div
    class="max-w-sm rounded overflow-hidden shadow-lg bg-white transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-2xl cursor-pointer relative"
    @click="handleClick"
  >
    <LoadSpinner v-if="isLoading" />
    <div v-else>
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
          <span
            v-for="type in pokemonDetails.typeName"
            :key="type"
            class="mb-2"
          >
            <span :class="typeClass(type)">
              {{ type }}
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { usePokemonStore } from "~/stores/usePokemonStore";
import { defineProps } from "vue";
import LoadSpinner from "@/components/LoadSpinner.vue"; // Ensure path is correct

const props = defineProps({
  pokemon: Object,
});

const router = useRouter();
const isLoading = ref(false);
const pokemonStore = usePokemonStore();

// Computed property for reactive updates
const pokemonDetails = computed(() => {
  return pokemonStore.pokemonDetails[props.pokemon.url] || props.pokemon;
});

// Watch for changes in pokemon details
watch(
  () => pokemonStore.pokemonDetails[props.pokemon.url],
  (newDetails) => {
    if (newDetails && Object.keys(newDetails).length > 0) {
      isLoading.value = false;
    } else {
      fetchPokemonDetails(props.pokemon.url);
    }
  },
  { immediate: true }
);

const typeClass = (type) => {
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
  const baseClasses =
    "rounded-full px-4 py-1 text-sm font-semibold text-white uppercase";
  return [typeColors[type] || "bg-gray-500", baseClasses];
};

function handleClick() {
  isLoading.value = true;
  router.push(`/pokemon/${props.pokemon.name}`).finally(() => {
    isLoading.value = false;
  });
}

async function fetchPokemonDetails(url) {
  isLoading.value = true;
  await pokemonStore.fetchPokemonDetails(url);
}
</script>
