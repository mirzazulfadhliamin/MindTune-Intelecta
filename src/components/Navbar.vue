<template>
  <nav
    class="fixed top-0 right-0 left-0 z-50 border-b border-gray-200 backdrop-blur-xl bg-white/80"
  >
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center space-x-8">
          <button @click="goToHome" class="flex items-center space-x-2 cursor-pointer group">
            <div class="w-30">
              <img
                :src="mode === 'healing' ? logo1 : logo2"
                alt="MindTuneLogo"
                class="object-contain w-full h-full"
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
              class="flex items-center p-2 space-x-2 rounded-lg transition-colors cursor-pointer hover:bg-gray-100"
            >
              <div class="w-8 h-8 bg-[var(--main-color)] rounded-full flex items-center justify-center">
                <span class="text-sm font-medium text-white">{{ userInitial }}</span>
              </div>
              <span class="text-sm font-medium text-[var(--t-grey)]">{{ userName }}</span>
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
              class="absolute right-0 top-12 z-50 py-2 mt-2 w-64 bg-white rounded-lg border border-gray-200 shadow-lg"
            >
              <button
                @click="goToDashboard"
                class="flex items-center px-4 py-2 space-x-2 w-full text-sm text-left text-gray-700 transition-colors cursor-pointer hover:bg-gray-50"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Dashboard</span>
              </button>
              <button
                @click="handleLogout"
                class="flex items-center px-4 py-2 space-x-2 w-full text-sm text-left text-red-600 transition-colors cursor-pointer hover:bg-red-50"
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
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import logo1 from '@/assets/1.svg'
import logo2 from '@/assets/2.svg'
import ToggleSwitch from "@/components/ToggleButton.vue"
import { useTheme } from "@/composables/useTheme"
import { useAuth } from "@/composables/useAuth"

const route = useRoute()
const router = useRouter()
const { mode } = useTheme()
const { isAuthenticated, getLoginUrl, getUserProfile } = useAuth()
const isLogin = ref(false)
const showUserMenu = ref(false)
const userName = ref('User')
const userInitial = ref('U')

// Fungsi untuk memperbarui status login dan data profil pengguna
const updateLoginStatus = async () => {
  isLogin.value = isAuthenticated()
  
  if (isLogin.value) {
    try {
      const userProfile = await getUserProfile()
      if (userProfile && userProfile.name) {
        userName.value = userProfile.name
        userInitial.value = userProfile.name.charAt(0)
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }
}

// Periksa status login saat komponen dimount
onMounted(async () => {
  await updateLoginStatus()
})

// Perbarui status login setiap kali rute berubah
watch(() => route.fullPath, async () => {
  await updateLoginStatus()
})

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const goToHome = () => {
  router.push('/')
}

const goToDashboard = () => {
  console.log('Navigate to dashboard')
  showUserMenu.value = false
  router.push('/dashboard')
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
  // Reset nilai userName dan userInitial
  userName.value = 'User'
  userInitial.value = 'U'
}
</script>