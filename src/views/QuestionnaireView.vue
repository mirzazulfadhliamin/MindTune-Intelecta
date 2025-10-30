<template>
    <div class="flex justify-center items-center px-4 py-20 h-fit">
      <div class="w-full max-w-4xl">
        <div class="p-8 bg-white rounded-3xl shadow-lg md:p-12 animate-card-entrance">
          <div
              class="px-6 py-6 mb-8 rounded-2xl border transition-colors duration-500"
              :class="mode === 'healing' ? 'bg-blue-50 border-blue-100' : 'bg-orange-50 border-orange-100'"
          >
            <h1
                class="flex items-center mb-2 text-2xl font-bold transition-colors duration-500 md:text-3xl"
                :class="mode === 'healing' ? 'text-blue-900' : 'text-orange-600'"
            >
              PHQ-9 Depression Screening
              <button
                  @click="showModal = true"
                  class="ml-3 text-xl transition-opacity cursor-pointer hover:opacity-70"
                  :class="mode === 'healing' ? 'text-blue-900' : 'text-orange-600'"
              >
                ⓘ
              </button>
            </h1>
            <p
                class="text-sm transition-colors duration-500 md:text-base"
                :class="mode === 'healing' ? 'text-blue-600' : 'text-orange-600'"
            >
              Over the last <span class="font-semibold">2 weeks</span>, how often have you been bothered by the following problems?
            </p>
          </div>

          <!-- Content -->
          <div>
            <!-- Questions -->
            <div class="space-y-6">
              <div v-for="(question, index) in questions" :key="index" class="space-y-3">
                <p class="text-sm font-medium text-gray-700">
                  {{ index + 1 }}. {{ question }}
                </p>
                <div class="grid grid-cols-2 gap-3 md:grid-cols-4">
                  <button
                      v-for="option in options"
                      :key="option.value"
                      @click="selectAnswer(index, option.value)"
                      class="px-4 py-3 text-sm font-medium rounded-lg border transition-all duration-200 cursor-pointer"
                      :class="answers[index] === option.value
                        ? (mode === 'healing' ? 'border-blue-500 bg-blue-500 text-white' : 'border-orange-500 bg-orange-500 text-white')
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'"
                  >
                    {{ option.label }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Loading State -->
            <div v-if="isLoading" class="mt-8 text-center">
              <div class="inline-flex items-center space-x-2">
                <svg class="w-5 h-5 text-blue-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span :class="mode === 'healing' ? 'text-blue-600' : 'text-orange-600'">Creating your playlist...</span>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="p-4 mt-6 bg-red-50 rounded-lg border border-red-200">
              <div class="flex items-center space-x-2 text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
                <span class="font-medium">Error: {{ error }}</span>
              </div>
              <button
                  @click="error = ''"
                  class="mt-2 text-sm font-medium text-red-600 hover:text-red-800"
              >
                Dismiss
              </button>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col gap-4 mt-10 md:flex-row">
              <button
                  @click="$router.back()"
                  class="flex-1 px-6 py-4 text-base font-semibold rounded-lg border-2 transition-all duration-300 cursor-pointer"
                  :class="mode === 'healing'
                    ? 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:shadow-md'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:shadow-md'"
                  :disabled="isLoading"
              >
                Back
              </button>
              <button
                  @click="createPlaylist"
                  :disabled="isLoading || !isFormComplete"
                  class="flex flex-1 justify-center items-center px-6 py-4 space-x-2 text-base font-semibold text-white rounded-lg shadow-md transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  :class="mode === 'healing' ? 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg' : 'bg-orange-500 hover:bg-orange-600 hover:shadow-lg'"
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
                    v-if="!isLoading"
                >
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                  <path d="M5 3v4"></path>
                  <path d="M19 17v4"></path>
                  <path d="M3 5h4"></path>
                  <path d="M17 19h4"></path>
                </svg>
                <span>{{ isLoading ? 'Creating...' : 'Create Playlist' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
        v-if="showModal"
        @click="showModal = false"
        class="flex fixed inset-0 justify-center items-center px-4 z-99 animate-fade-in"
        style="background-color: rgba(0, 0, 0, 0.2);"
    >
      <div
          @click.stop
          class="p-8 w-full max-w-2xl bg-white rounded-2xl shadow-2xl animate-modal-entrance"
      >
        <div class="flex justify-between items-start mb-4">
          <h2
              class="text-2xl font-bold transition-colors duration-500"
              :class="mode === 'healing' ? 'text-blue-900' : 'text-orange-600'"
          >
            About PHQ-9 Depression Screening
          </h2>
          <button
              @click="showModal = false"
              class="text-2xl leading-none text-gray-400 transition-colors cursor-pointer hover:text-gray-600"
          >
            ×
          </button>
        </div>
        <div class="space-y-4 text-gray-700">
          <p>
            The <strong>Patient Health Questionnaire-9 (PHQ-9)</strong> is a widely used, validated screening tool for detecting depression. It consists of nine questions that correspond to the diagnostic criteria for major depressive disorder.
          </p>
          <p>
            <strong>How it works:</strong>
          </p>
          <ul class="ml-4 space-y-2 list-disc list-inside">
            <li>Each question asks about symptoms over the past 2 weeks</li>
            <li>Responses are scored from 0 (not at all) to 3 (nearly every day)</li>
            <li>Total scores range from 0 to 27</li>
            <li>Higher scores indicate more severe depression symptoms</li>
          </ul>
          <p>
            <strong>Score interpretation:</strong>
          </p>
          <ul class="ml-4 space-y-2 list-disc list-inside">
            <li>0-4: Minimal depression</li>
            <li>5-9: Mild depression</li>
            <li>10-14: Moderate depression</li>
            <li>15-19: Moderately severe depression</li>
            <li>20-27: Severe depression</li>
          </ul>
          <p class="text-sm italic text-gray-600">
            Note: This screening tool is for informational purposes and does not replace professional medical advice. If you're experiencing depression symptoms, please consult with a healthcare provider.
          </p>
        </div>
      </div>
    </div>
</template>

<script>
import {useTheme} from "@/composables/useTheme"
import { playlistService } from "@/services/playlistService"

export default {
  name: 'PHQ9Screening',
  setup() {
    const {mode} = useTheme()
    return {mode}
  },
  data() {
    return {
      showModal: false,
      answers: Array(9).fill(null),
      isLoading: false,
      error: '',
      options: [
        { label: 'Not at all', value: 0 },
        { label: 'Several days', value: 1 },
        { label: 'More than half the days', value: 2 },
        { label: 'Nearly every day', value: 3 }
      ],
      questions: [
        'Little interest or pleasure in doing things',
        'Feeling down, depressed, or hopeless',
        'Trouble falling or staying asleep, or sleeping too much',
        'Feeling tired or having little energy',
        'Poor appetite or overeating',
        'Feeling bad about yourself — or that you are a failure or have let yourself or your family down',
        'Trouble concentrating on things, such as reading the newspaper or watching television',
        'Moving or speaking so slowly that other people could have noticed. Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual',
        'Thoughts that you would be better off dead or of hurting yourself in some way'
      ]
    }
  },
  computed: {
    isFormComplete() {
      return this.answers.every(answer => answer !== null)
    },
    totalScore() {
      return this.answers.reduce((sum, answer) => sum + answer, 0)
    }
  },
  methods: {
    selectAnswer(questionIndex, value) {
      this.answers[questionIndex] = value;
      this.error = ''; // Clear error when user makes changes
    },
    
    createPlaylist() {
      if (!this.isFormComplete) {
        this.error = 'Please answer all questions before creating a playlist.';
        return;
      }

      // Get pre_mood from route query or localStorage
      const pre_mood = this.$route.query.pre_mood || localStorage.getItem('pre_mood') || 5;
      
      // Store data in localStorage for LoadingAnimationView to use
      localStorage.setItem('phq9_score', this.totalScore);
      localStorage.setItem('pre_mood', pre_mood);
      
      // Navigate to loading animation view
      this.$router.push({
        name: 'loading-animation'
      });

    }
  }
}
</script>

<style scoped>
@keyframes card-entrance {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes modal-entrance {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-card-entrance {
  animation: card-entrance 0.6s ease-out;
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

.animate-modal-entrance {
  animation: modal-entrance 0.3s ease-out;
}
</style>