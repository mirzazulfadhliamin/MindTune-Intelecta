<script>
import { useTheme } from "@/composables/useTheme"
import { useRouter } from "vue-router"
import { useAuth } from "@/composables/useAuth"

export default {
  name: 'HealingModePage',
  setup() {
    const { mode } = useTheme()
    const router = useRouter()
    const { isAuthenticated, getLoginUrl } = useAuth()

    const generatePlaylist = async () => {
      try {
        if (!isAuthenticated()) {
          const auth_url = await getLoginUrl()
          window.location.href = auth_url
          return
        }
      } catch (error) {
        console.error('Error during login redirect:', error)
      }
      router.push('/mood-slider')
    }

    return { mode, generatePlaylist }
  },
  data() {
    return {
      musicNotes: [],
      selectedMethod: 'text',
      userInput: '',
      uploadedImage: null,
      contextData: {
        location: '',
        activity: '',
        timeOfDay: ''
      },
      locations: ['Cafe', 'Beach', 'Road', 'Home', 'Park', 'Gym', 'Office'],
      activities: ['Study', 'Drive', 'Relax', 'Exercise', 'Work', 'Party', 'Sleep'],
      timesOfDay: ['Morning', 'Afternoon', 'Evening', 'Night']
    }
  },
  methods: {
    triggerImageUpload() {
      this.selectedMethod = 'image'
    },
    handleImageUpload(event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.uploadedImage = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    triggerCamera() {
      this.selectedMethod = 'camera'
    },
    handleCameraCapture(event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.uploadedImage = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    removeImage() {
      this.uploadedImage = null
      this.$refs.imageInput.value = ''
      this.$refs.cameraInput.value = ''
    }
  },
  mounted() {
    const notes = []
    const minDistance = 15
    const totalNotes = 30

    const isTooClose = (newLeft, newTop, existingNotes) => {
      return existingNotes.some(note => {
        const distanceX = Math.abs(parseFloat(newLeft) - parseFloat(note.left))
        const distanceY = Math.abs(parseFloat(newTop) - parseFloat(note.top))
        return distanceX < minDistance && distanceY < minDistance
      })
    }

    for (let i = 0; i < totalNotes; i++) {
      let left, top
      let attempts = 0
      const maxAttempts = 100

      do {
        left = `${Math.random() * 100}%`
        top = `${Math.random() * 100}%`
        attempts++
      } while (isTooClose(left, top, notes) && attempts < maxAttempts)

      const duration = `${2 + Math.random() * 3}s`

      notes.push({
        id: i,
        left: left,
        top: top,
        delay: `${Math.random() * 5}s`,
        duration: duration,
        size: 24 + Math.random() * 24
      })
    }

    this.musicNotes = notes
  }
}
</script>

<template>
  <div class="relative min-h-screen bg-white">
    <!-- Grid Background -->
    <div class="fixed inset-0 bg-white pointer-events-none">
      <div
          class="absolute inset-0 transition-opacity duration-500"
          :style="{
          backgroundImage: 'linear-gradient(rgba(251, 146, 60, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 146, 60, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }"
      ></div>
    </div>

    <!-- Pulsing Music Notes -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div
          v-for="note in musicNotes"
          :key="note.id"
          class="absolute transition-colors animate-pulse text-primary-everyday"
          :style="{
          left: note.left,
          top: note.top,
          animationDelay: note.delay,
          animationDuration: note.duration,
          opacity: 0
        }"
      >
        <svg xmlns="http://www.w3.org/2000/svg" :width="note.size" :height="note.size" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3"></circle>
          <circle cx="18" cy="16" r="3"></circle>
        </svg>
      </div>
    </div>

    <div class="relative flex justify-center items-center px-4 py-8 min-h-screen">
      <div class="w-full max-w-2xl">
        <!-- Card -->
        <div class="mt-14 p-12 text-center rounded-3xl backdrop-blur-sm bg-white/80 animate-card-entrance shadow-[0_0_50px_25px_rgba(251,146,60,0.15)]">
          <h1 class="mb-4 text-3xl font-bold transition-colors duration-500 md:text-4xl text-primary-everyday">
            Create Your Perfect Playlist
          </h1>
          <p class="mb-8 text-muted">
            Choose how you want to describe your vibe
          </p>

          <!-- Input Method Tabs -->
          <div class="grid grid-cols-4 gap-3 mb-6">
            <button
                @click="selectedMethod = 'text'"
                class="cursor-pointer flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-200 border-2"
                :class="selectedMethod === 'text'
                  ? 'bg-primary-everyday-soft border-primary-everyday text-primary-everyday'
                  : 'bg-white border-border text-gray hover:border-primary-everyday-light'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span class="text-sm font-medium">Text</span>
            </button>

            <button
                @click="triggerImageUpload"
                class="cursor-pointer flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-200 border-2"
                :class="selectedMethod === 'image'
                  ? 'bg-primary-everyday-soft border-primary-everyday text-primary-everyday'
                  : 'bg-white border-border text-gray hover:border-primary-everyday-light'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="9" cy="9" r="2"></circle>
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
              </svg>
              <span class="text-sm font-medium">Image</span>
            </button>
            <input
                ref="imageInput"
                type="file"
                accept="image/*"
                @change="handleImageUpload"
                class="hidden"
            />

            <button
                @click="triggerCamera"
                class="cursor-pointer flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-200 border-2"
                :class="selectedMethod === 'camera'
                  ? 'bg-primary-everyday-soft border-primary-everyday text-primary-everyday'
                  : 'bg-white border-border text-gray hover:border-primary-everyday-light'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
              <span class="text-sm font-medium">Camera</span>
            </button>
            <input
                ref="cameraInput"
                type="file"
                accept="image/*"
                capture="environment"
                @change="handleCameraCapture"
                class="hidden"
            />

            <button
                @click="selectedMethod = 'context'"
                class="cursor-pointer flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-200 border-2"
                :class="selectedMethod === 'context'
                  ? 'bg-primary-everyday-soft border-primary-everyday text-primary-everyday'
                  : 'bg-white border-border text-gray hover:border-primary-everyday-light'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-2">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span class="text-sm font-medium">Context</span>
            </button>
          </div>

          <!-- Text Input Area (for Text method) -->
          <div v-if="selectedMethod === 'text'">
            <textarea
                v-model="userInput"
                placeholder="Tell us about your mood or vibe... (e.g., I want a playlist for walking during sunset)"
                class="w-full p-4 mb-6 rounded-lg border-2 border-border focus:border-primary-everyday focus:outline-none resize-none transition-colors"
                rows="4"
            ></textarea>
          </div>

          <!-- Image Upload (for Image method) -->
          <div v-if="selectedMethod === 'image'" class="mb-6">
            <div v-if="!uploadedImage" class="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-4 text-muted">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="9" cy="9" r="2"></circle>
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
              </svg>
              <button
                  @click="$refs.imageInput.click()"
                  class="cursor-pointer px-6 py-2 bg-primary-everyday text-white rounded-lg hover:bg-primary-everyday-dark transition-colors"
              >
                Choose Image
              </button>
              <p class="mt-2 text-sm text-muted">Upload an image that represents your vibe</p>
            </div>
            <div v-else>
              <img :src="uploadedImage" alt="Uploaded" class="w-full rounded-lg border-2 border-border mb-2" />
              <button @click="removeImage" class="cursor-pointer text-sm text-danger hover:text-danger-dark">Remove image</button>
            </div>
            <input
                ref="imageInput"
                type="file"
                accept="image/*"
                @change="handleImageUpload"
                class="hidden"
            />
          </div>

          <!-- Camera Capture (for Camera method) -->
          <div v-if="selectedMethod === 'camera'" class="mb-6">
            <div v-if="!uploadedImage" class="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-4 text-muted">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
              <button
                  @click="$refs.cameraInput.click()"
                  class="cursor-pointer px-6 py-2 bg-primary-everyday text-white rounded-lg hover:bg-primary-everyday-dark transition-colors"
              >
                Open Camera
              </button>
              <p class="mt-2 text-sm text-muted">Capture a photo that represents your vibe</p>
            </div>
            <div v-else>
              <img :src="uploadedImage" alt="Captured" class="w-full rounded-lg border-2 border-border mb-2" />
              <button @click="removeImage" class="cursor-pointer text-sm text-danger hover:text-danger-dark">Remove photo</button>
            </div>
            <input
                ref="cameraInput"
                type="file"
                accept="image/*"
                capture="environment"
                @change="handleCameraCapture"
                class="hidden"
            />
          </div>

          <!-- Context Selection (for Context method) -->
          <div v-if="selectedMethod === 'context'" class="mb-6 text-left">
            <!-- Location -->
            <div class="mb-6">
              <div class="flex items-center mb-3 text-gray font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Location
              </div>
              <div class="grid grid-cols-4 gap-2 mb-4">
                <button
                    v-for="loc in locations.slice(0, 4)"
                    :key="loc"
                    @click="contextData.location = loc"
                    class="cursor-pointer px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all"
                    :class="contextData.location === loc
                    ? 'bg-primary-everyday border-primary-everyday text-white'
                    : 'bg-white border-border text-gray hover:border-primary-everyday-light'"
                >
                  {{ loc }}
                </button>
              </div>
              <div class="grid grid-cols-3 gap-2">
                <button
                    v-for="loc in locations.slice(4)"
                    :key="loc"
                    @click="contextData.location = loc"
                    class="cursor-pointer px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all"
                    :class="contextData.location === loc
                    ? 'bg-primary-everyday border-primary-everyday text-white'
                    : 'bg-white border-border text-gray hover:border-primary-everyday-light'"
                >
                  {{ loc }}
                </button>
              </div>
            </div>

            <!-- Activity -->
            <div class="mb-6">
              <div class="flex items-center mb-3 text-gray font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
                Activity
              </div>
              <div class="grid grid-cols-4 gap-2 mb-4">
                <button
                    v-for="act in activities.slice(0, 4)"
                    :key="act"
                    @click="contextData.activity = act"
                    class="cursor-pointer px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all"
                    :class="contextData.activity === act
                    ? 'bg-primary-everyday border-primary-everyday text-white'
                    : 'bg-white border-border text-gray hover:border-primary-everyday-light'"
                >
                  {{ act }}
                </button>
              </div>
              <div class="grid grid-cols-3 gap-2">
                <button
                    v-for="act in activities.slice(4)"
                    :key="act"
                    @click="contextData.activity = act"
                    class="cursor-pointer px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all"
                    :class="contextData.activity === act
                    ? 'bg-primary-everyday border-primary-everyday text-white'
                    : 'bg-white border-border text-gray hover:border-primary-everyday-light'"
                >
                  {{ act }}
                </button>
              </div>
            </div>

            <!-- Time of Day -->
            <div class="mb-6">
              <div class="flex items-center mb-3 text-gray font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                Time of Day
              </div>
              <div class="grid grid-cols-4 gap-2">
                <button
                    v-for="time in timesOfDay"
                    :key="time"
                    @click="contextData.timeOfDay = time"
                    class="cursor-pointer px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all"
                    :class="contextData.timeOfDay === time
                    ? 'bg-primary-everyday border-primary-everyday text-white'
                    : 'bg-white border-border text-gray hover:border-primary-everyday-light'"
                >
                  {{ time }}
                </button>
              </div>
            </div>
          </div>

          <!-- Generate Button -->
          <button
              @click="generatePlaylist"
              class="w-full cursor-pointer flex items-center justify-center px-8 py-4 space-x-3 text-lg font-semibold text-white rounded-lg bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 shadow-lg shadow-orange-500/50 hover:shadow-xl hover:shadow-orange-500/60 transition-all duration-200"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
              <path
                  d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
              <path d="M5 3v4"></path>
              <path d="M19 17v4"></path>
              <path d="M3 5h4"></path>
              <path d="M17 19h4"></path>
            </svg>
            <span>Generate Playlist</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes card-entrance {
  from {
    opacity: 0;
    transform: translateY(-30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-card-entrance {
  animation: card-entrance 0.8s ease-out;
}
</style>