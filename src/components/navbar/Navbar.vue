<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center space-x-8">
          <button class="flex items-center space-x-2 group">
            <div class="w-16">
            <img
              :src="mode === 'healing' ? logo1 : logo2"
              alt="MindTuneLogo"
              class="w-full h-full object-contain"
            />
            </div>
          </button>
        </div>
        <div class="flex items-center space-x-4">
          <ToggleSwitch class="h-full"/>
          <button
            class="px-4 py-2 bg-[var(--main-color)] text-sm font-medium text-white rounded-lg shadow-md hover:shadow-lg transition-all flex items-center space-x-2"
          >
          <div class="w-6">
            <img src="../../assets/Spotify (1).svg" alt="">
          </div>
            <span>Login with Spotify</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import logo1 from '../../assets/1.svg'
import logo2 from '../../assets/2.svg'
import ToggleSwitch from "@/components/button/ToggleButton.vue"
import { useTheme } from "@/composables/useTheme"

const { mode } = useTheme()
</script>

