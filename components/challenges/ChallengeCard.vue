<template>
  <div
    class="border border-gray-200 rounded-lg overflow-hidden flex flex-col h-full"
  >
    <div :class="`bg-${getSafeColor(challenge.color)}-50 p-3 sm:p-4`">
      <div class="flex justify-between items-start">
        <h3 class="text-base sm:text-lg font-medium text-gray-800 mr-2">
          {{ challenge.title }}
        </h3>
        <div class="flex flex-shrink-0">
          <span
            v-for="i in 5"
            :key="i"
            :class="`w-3 h-3 sm:w-4 sm:h-4 ${
              i <= challenge.difficulty ? 'text-yellow-400' : 'text-gray-300'
            }`"
          >
            ★
          </span>
        </div>
      </div>
      <p class="text-xs sm:text-sm text-gray-600 mt-1">
        {{ challenge.description }}
      </p>
      <div class="mt-2 flex flex-wrap gap-1 sm:gap-2">
        <span
          :class="`bg-${getSafeColor(challenge.color)}-100 text-${getSafeColor(
            challenge.color
          )}-800 text-xs px-2 py-1 rounded-full`"
        >
          {{ challenge.duration }}
        </span>
        <span class="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
          {{ challenge.category }}
        </span>
      </div>
    </div>

    <div class="p-3 sm:p-4 flex-1 flex flex-col">
      <ul
        class="text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-2 mb-3 sm:mb-4 flex-1"
      >
        <li
          v-for="(feature, index) in challenge.features.slice(0, 3)"
          :key="index"
          class="flex items-start"
        >
          <svg
            class="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1 sm:mr-2 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          {{ feature }}
        </li>
      </ul>

      <div class="flex flex-wrap items-center justify-between gap-2 mt-auto">
        <p class="text-sm font-medium text-gray-800">
          {{ challenge.targetText }}
        </p>
        <div class="flex space-x-2">
          <NuxtLink
            :to="`/dashboard/challenges/${challenge.id}`"
            class="px-2 sm:px-3 py-1 border border-gray-300 text-gray-600 hover:bg-gray-50 rounded transition-colors text-xs sm:text-sm"
          >
            Details
          </NuxtLink>
          <button
            @click="$emit('join', challenge.title)"
            :class="`px-2 sm:px-3 py-1 bg-${getSafeColor(
              challenge.color
            )}-500 hover:bg-${getSafeColor(
              challenge.color
            )}-600 text-white rounded transition-colors text-xs sm:text-sm`"
          >
            Join
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UiChallenge } from "~/types/api";

// Define type for valid Tailwind colors
type TailwindColor =
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone"
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose";

// Function to get safe Tailwind color
function getSafeColor(color: string): TailwindColor {
  const validColors: Record<string, TailwindColor> = {
    slate: "slate",
    gray: "gray",
    zinc: "zinc",
    neutral: "neutral",
    stone: "stone",
    red: "red",
    orange: "orange",
    amber: "amber",
    yellow: "yellow",
    lime: "lime",
    green: "green",
    emerald: "emerald",
    teal: "teal",
    cyan: "cyan",
    sky: "sky",
    blue: "blue",
    indigo: "indigo",
    violet: "violet",
    purple: "purple",
    fuchsia: "fuchsia",
    pink: "pink",
    rose: "rose",
  };

  return validColors[color] || "blue";
}

defineProps<{
  challenge: UiChallenge;
}>();

defineEmits<{
  (e: "join", title: string): void;
}>();
</script>

<style>
/* 
  Safelist for Tailwind to include all color variations:
  bg-slate-50 bg-slate-100 bg-slate-500 bg-slate-600 text-slate-800
  bg-gray-50 bg-gray-100 bg-gray-500 bg-gray-600 text-gray-800
  bg-zinc-50 bg-zinc-100 bg-zinc-500 bg-zinc-600 text-zinc-800
  bg-neutral-50 bg-neutral-100 bg-neutral-500 bg-neutral-600 text-neutral-800
  bg-stone-50 bg-stone-100 bg-stone-500 bg-stone-600 text-stone-800
  bg-red-50 bg-red-100 bg-red-500 bg-red-600 text-red-800
  bg-orange-50 bg-orange-100 bg-orange-500 bg-orange-600 text-orange-800
  bg-amber-50 bg-amber-100 bg-amber-500 bg-amber-600 text-amber-800
  bg-yellow-50 bg-yellow-100 bg-yellow-500 bg-yellow-600 text-yellow-800
  bg-lime-50 bg-lime-100 bg-lime-500 bg-lime-600 text-lime-800
  bg-green-50 bg-green-100 bg-green-500 bg-green-600 text-green-800
  bg-emerald-50 bg-emerald-100 bg-emerald-500 bg-emerald-600 text-emerald-800
  bg-teal-50 bg-teal-100 bg-teal-500 bg-teal-600 text-teal-800
  bg-cyan-50 bg-cyan-100 bg-cyan-500 bg-cyan-600 text-cyan-800
  bg-sky-50 bg-sky-100 bg-sky-500 bg-sky-600 text-sky-800
  bg-blue-50 bg-blue-100 bg-blue-500 bg-blue-600 text-blue-800
  bg-indigo-50 bg-indigo-100 bg-indigo-500 bg-indigo-600 text-indigo-800
  bg-violet-50 bg-violet-100 bg-violet-500 bg-violet-600 text-violet-800
  bg-purple-50 bg-purple-100 bg-purple-500 bg-purple-600 text-purple-800
  bg-fuchsia-50 bg-fuchsia-100 bg-fuchsia-500 bg-fuchsia-600 text-fuchsia-800
  bg-pink-50 bg-pink-100 bg-pink-500 bg-pink-600 text-pink-800
  bg-rose-50 bg-rose-100 bg-rose-500 bg-rose-600 text-rose-800
*/
</style>
