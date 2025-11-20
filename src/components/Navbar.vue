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
const { isAuthenticated, getLoginUrl, getUserProfile, logout } = useAuth()

const isLogin = ref(false)
const showUserMenu = ref(false)
const userName = ref('User')
const userInitial = ref('U')
const showLogoutModal = ref(false)
const isLoggingOut = ref(false)

// Update status login dan profil user
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
      // Jika gagal mendapatkan profil (mis. token invalid/CORS), paksa logout dan fallback ke tombol login
      logout()
      isLogin.value = false
      showUserMenu.value = false
      userName.value = 'User'
      userInitial.value = 'U'
    }
  }
}

onMounted(async () => {
  await updateLoginStatus()
})

watch(
    () => route.fullPath,
    async () => {
      await updateLoginStatus()
    }
)

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const goToHome = () => {
  const current = router.currentRoute.value
  if (current && (current.name === 'home' || current.path === '/')) {
    router.replace('/')
    setTimeout(() => {
      window.location.reload()
    }, 50)
  } else {
    router.push('/')
  }
}

const goToDashboard = () => {
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

const openLogoutModal = () => {
  showLogoutModal.value = true
}

const confirmLogout = () => {
  if (isLoggingOut.value) return
  isLoggingOut.value = true
  try {
    logout()
    isLogin.value = false
    showUserMenu.value = false
    userName.value = 'User'
    userInitial.value = 'U'
    const current = router.currentRoute.value
    if (current && (current.name === 'home' || current.path === '/')) {
      router.replace('/')
      setTimeout(() => {
        window.location.reload()
      }, 50)
    } else {
      router.push('/')
    }
  } catch (error) {
    console.error('Error during logout:', error)
  } finally {
    isLoggingOut.value = false
    showLogoutModal.value = false
  }
}
</script>

<template>
  <nav
      class="fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-xl border-border-light bg-background-white/80"
  >
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
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

        <!-- Right Section -->
        <div class="flex items-center space-x-4">
          <ToggleSwitch class="h-full" />

          <!-- Login button -->
          <button
              v-if="!isLogin"
              @click="handleLogin"
              class="flex items-center px-4 py-2 space-x-2 text-sm font-medium text-white rounded-lg shadow-md transition-all cursor-pointer hover:shadow-lg"
              :class="mode === 'healing'
              ? 'bg-primary-health hover:bg-primary-health-dark'
              : 'bg-primary-everyday hover:bg-primary-everyday-dark'"
          >
            <div class="w-6">
              <img src="@/assets/Spotify (1).svg" alt="Spotify" />
            </div>
            <span>Login with Spotify</span>
          </button>

          <!-- User dropdown -->
          <div v-else class="relative">
            <button
                @click="toggleUserMenu"
                class="flex items-center p-2 space-x-2 rounded-lg transition-colors cursor-pointer hover:bg-background-soft"
            >
              <div
                  class="flex justify-center items-center w-8 h-8 rounded-full"
                  :class="mode === 'healing' ? 'bg-primary-health' : 'bg-primary-everyday'"
              >
                <span class="text-sm font-medium text-white">{{ userInitial }}</span>
              </div>
              <span class="text-sm font-medium text-muted">{{ userName }}</span>
              <svg
                  class="w-4 h-4 transition-transform"
                  :class="{ 'rotate-180': showUserMenu }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <!-- Dropdown menu -->
            <div
                v-if="showUserMenu"
                class="absolute right-0 top-12 z-50 py-2 mt-2 w-64 rounded-lg border shadow-lg bg-background-white border-border-light"
            >
              <button
                  @click="goToDashboard"
                  class="flex items-center px-4 py-2 space-x-2 w-full text-sm text-left transition-colors cursor-pointer text-gray hover:bg-background-soft"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span>Dashboard</span>
              </button>

              <button
                  @click="openLogoutModal"
                  class="flex items-center px-4 py-2 space-x-2 w-full text-sm text-left transition-colors cursor-pointer hover:bg-danger-light text-danger"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Overlay untuk close dropdown -->
  <div
      v-if="showUserMenu"
      @click="showUserMenu = false"
      class="fixed inset-0 z-40"
  ></div>

  <!-- Logout Modal -->
  <div
      v-if="showLogoutModal"
      @click="!isLoggingOut && (showLogoutModal = false)"
      class="flex fixed inset-0 z-[60] justify-center items-center px-4 animate-fade-in"
      style="background-color: rgba(0, 0, 0, 0.2);"
  >
    <div
        @click.stop
        class="p-8 w-full max-w-md rounded-2xl shadow-2xl bg-background-white animate-modal-entrance"
    >
      <!-- Icon -->
      <div class="flex justify-center mb-6">
        <div class="flex justify-center items-center w-16 h-16 bg-red-100 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 16l4-4m0 0l-4-4m4 4H7" />
            <path d="M13 20v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </div>
      </div>

      <!-- Close Button -->
      <button
          @click="!isLoggingOut && (showLogoutModal = false)"
          class="absolute top-4 right-4 transition-colors cursor-pointer text-silver hover:text-gray"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <!-- Content -->
      <div class="mb-6 text-center">
        <h2 class="mb-3 text-2xl font-medium text-black">Logout</h2>
        <p class="text-muted">Are you sure you want to logout? You will need to login again to access your data.</p>
      </div>

      <!-- Action Buttons -->
      <div class="flex space-x-3">
        <button
            @click="!isLoggingOut && (showLogoutModal = false)"
            :disabled="isLoggingOut"
            class="flex-1 px-6 py-3 font-semibold rounded-lg border-2 transition-all duration-300 cursor-pointer text-gray bg-background-white border-border hover:bg-background-soft hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
            @click="confirmLogout"
            :disabled="isLoggingOut"
            class="flex-1 px-6 py-3 font-semibold text-white bg-red-600 rounded-lg transition-all duration-300 cursor-pointer hover:bg-red-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-600 disabled:hover:shadow-none"
        >
          <span v-if="!isLoggingOut">Logout</span>
          <span v-else class="flex justify-center items-center space-x-2">
            <span class="w-4 h-4 rounded-full border-t-2 border-b-2 border-white animate-spin" aria-hidden="true"></span>
            <span>Logging out...</span>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes modal-entrance {
  from { opacity: 0; transform: scale(0.9) translateY(-20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
.animate-fade-in { animation: fade-in 0.3s ease-out; }
.animate-modal-entrance { animation: modal-entrance 0.3s ease-out; }
</style>
