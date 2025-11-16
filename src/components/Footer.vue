<script setup>
import { ref, computed } from "vue";
import { useTheme } from "@/composables/useTheme";

const { mode } = useTheme();

const currentYear = computed(() => new Date().getFullYear());

const legalLinks = ref([
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
  { name: "Contact", href: "/contact" },
]);
</script>

<template>
  <footer class="bg-background-white border-t border-border-light z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
          class="py-8 flex flex-col md:flex-row md:justify-between md:items-center text-center md:text-left space-y-4 md:space-y-0"
      >
        <!-- Left Section -->
        <div class="flex flex-col items-center md:items-start space-y-2">
          <div class="flex items-center justify-center md:justify-start space-x-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-music w-5 h-5"
                :class="mode === 'healing' ? 'text-primary-health' : 'text-primary-everyday'"
            >
              <path d="M9 18V5l12-2v13"></path>
              <circle cx="6" cy="18" r="3"></circle>
              <circle cx="18" cy="16" r="3"></circle>
            </svg>
            <p class="text-sm text-muted">
              &copy; {{ currentYear }} MindTune.
            </p>
          </div>
          <p class="text-sm text-muted">
            Tune Your Mind, Heal Through Music.
          </p>
        </div>

        <!-- Center Section (Legal Links) -->
        <div
            class="flex flex-wrap justify-center md:justify-end gap-4 text-sm text-muted"
        >
          <a
              v-for="link in legalLinks"
              :key="link.name"
              :href="link.href"
              class="transition-colors"
              :class="mode === 'healing'
              ? 'hover:text-primary-health'
              : 'hover:text-primary-everyday'"
          >
            {{ link.name }}
          </a>
        </div>

        <!-- Right Section (Mode Badge) -->
        <div class="flex justify-center md:justify-end">
          <div
              class="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-medium text-white"
              :class="mode === 'healing' ? 'bg-primary-health' : 'bg-primary-everyday'"
          >
            <div class="w-2 h-2 rounded-full bg-background-white animate-pulse"></div>
            <span>{{ mode === 'healing' ? 'Healing Mode' : 'Everyday Mode' }}</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
