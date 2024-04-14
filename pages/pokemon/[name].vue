<template>
  <Header />
  <div v-if="pokemon" class="py-8 px-4 justify-center mx-auto lg:w-1/2 w-full">
    <div class="bg-white shadow-lg rounded-lg overflow-hidden">
      <div class="p-2">
        <img
          :src="pokemon.sprites.front_default"
          alt="Front of Pokémon"
          class="mx-auto w-64 h-auto"
        />
        <h1 class="text-3xl text-center mb-20 font-bold capitalize">
          {{ pokemon.name }}
        </h1>
        <div class="mt-3 mb-3">
          <ul class="flex justify-center items-center space-x-2">
            <li v-for="type in pokemon.types" :key="type.slot">
              <span
                :class="[
                  typeColors[type.type.name],
                  'rounded-full px-4 py-1 text-sm font-semibold text-white uppercase',
                ]"
              >
                {{ type.type.name }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="bg-white shadow-lg rounded-lg overflow-hidden mt-4">
      <div class="p-4">
        <h1 class="text-lg justify-center text-center font-bold ">
          Habilidades:
        </h1>
        <ul>
          <li
            v-for="ability in pokemon.abilities"
            :key="ability.ability.name"
            class="px-3 py-4 text-lg font-normal text-gray-900 mr-2 capitalize"
          >
            {{ ability.ability.name }}
          </li>
        </ul>
      </div>
    </div>

    <div class="text-center mt-14">
      <LoadSpinner v-if="isNavigating" />
      <button
        v-else
        @click="goBack"
        class="bg-white-500 text-xl hover:text-cyan-800 text-cyan-600 font-semibold py-2 px-4 rounded"
      >
        Voltar
      </button>
    </div>
  </div>
  <div v-else class="flex justify-center items-center h-screen">
    <p>Carregando...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Header from "@/components/Header.vue";
import LoadSpinner from "@/components/LoadSpinner.vue";

const route = useRoute();
const router = useRouter();
const pokemon = ref(null);
const isNavigating = ref(false);

const fetchPokemon = async () => {
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${route.params.name}`
    );
    pokemon.value = await res.json();
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    pokemon.value = null;
  }
};

onMounted(() => {
  fetchPokemon();
});

const goBack = () => {
  isNavigating.value = true;
  setTimeout(() => {
    router.push("/").finally(() => {
      setTimeout(() => { 
        isNavigating.value = false;
      }, 500); 
    });
  }, 500); 
};

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

<style scoped>
html {
  background-color: #04b3ee;
}
</style>
