<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center space-x-8">
          <button class="flex items-center space-x-2 group">
            <div class="w-30">
              <img
                :src="mode === 'healing' ? logo1 : logo2"
                alt="MindTuneLogo"
                class="w-full h-full object-contain"
              />
            </div>
          </button>
        </div>
        <div class="flex items-center space-x-4">
          <ToggleSwitch class="h-full" />
          <button
            v-if="!isLogin"
            @click="handleLogin"
            class="cursor-pointer px-4 py-2 bg-[var(--main-color)] text-sm font-medium text-white rounded-lg shadow-md hover:shadow-lg transition-all flex items-center space-x-2"
          >
            <div class="w-6">
              <img src="@/assets/Spotify (1).svg" alt="Spotify">
            </div>
            <span>Login with Spotify</span>
          </button>
          <div v-else class="relative">
            <button
              @click="toggleUserMenu"
              class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div class="w-8 h-8 bg-[var(--main-color)] rounded-full flex items-center justify-center">
                <span class="text-white text-sm font-medium">U</span>
              </div>
              <span class="text-sm font-medium text-[var(--t-grey)]">User</span>
              <svg
                class="w-4 h-4 transition-transform"
                :class="{ 'rotate-180': showUserMenu }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Logout modal -->
            <div
              v-if="showUserMenu"
              class="absolute right-0 top-12 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
            >
              <button
                @click="goToDashboard"
                class="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Dashboard</span>
              </button>
              <button
                @click="handleLogout"
                class="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <div
    v-if="showUserMenu"
    @click="showUserMenu = false"
    class="fixed inset-0 z-40"
  ></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import logo1 from '@/assets/1.svg'
import logo2 from '@/assets/2.svg'
import ToggleSwitch from "@/components/ToggleButton.vue"
import { useTheme } from "@/composables/useTheme"
import { useAuth } from "@/composables/useAuth"

const { mode } = useTheme()
const { isAuthenticated, getLoginUrl } = useAuth()
const isLogin = ref(false)
const showUserMenu = ref(false)

// Periksa status login saat komponen dimount
onMounted(() => {
  isLogin.value = isAuthenticated()
})

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const goToDashboard = () => {
  console.log('Navigate to dashboard')
  showUserMenu.value = false
}

const handleLogin = async () => {
  try {
    const auth_url = await getLoginUrl()
    window.location.href = auth_url
  } catch (error) {
    console.error('Error during login:', error)
  }
}

const handleLogout = () => {
  console.log('Logout clicked')
  // Gunakan fungsi logout dari useAuth
  const { logout } = useAuth()
  logout()
  isLogin.value = false
  showUserMenu.value = false
}
</script>