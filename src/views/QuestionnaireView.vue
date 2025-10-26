<template>
    <div class="flex items-center justify-center h-fit px-4 py-20">
      <div class="max-w-4xl w-full">
        <div class="bg-white rounded-3xl shadow-lg p-8 md:p-12 animate-card-entrance">
          <div
              class="px-6 py-6 rounded-2xl mb-8 transition-colors duration-500 border"
              :class="mode === 'healing' ? 'bg-blue-50 border-blue-100' : 'bg-orange-50 border-orange-100'"
          >
            <h1
                class="text-2xl md:text-3xl font-bold mb-2 transition-colors duration-500 flex items-center"
                :class="mode === 'healing' ? 'text-blue-900' : 'text-orange-600'"
            >
              PHQ-9 Depression Screening
              <button
                  @click="showModal = true"
                  class="cursor-pointer text-xl ml-3 hover:opacity-70 transition-opacity"
                  :class="mode === 'healing' ? 'text-blue-900' : 'text-orange-600'"
              >
                ⓘ
              </button>
            </h1>
            <p
                class="text-sm md:text-base transition-colors duration-500"
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
                <p class="text-gray-700 font-medium text-sm">
                  {{ index + 1 }}. {{ question }}
                </p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button
                      v-for="option in options"
                      :key="option.value"
                      @click="selectAnswer(index, option.value)"
                      class="cursor-pointer px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200"
                      :class="answers[index] === option.value
                        ? (mode === 'healing' ? 'border-blue-500 bg-blue-500 text-white' : 'border-orange-500 bg-orange-500 text-white')
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'"
                  >
                    {{ option.label }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col md:flex-row gap-4 mt-10">
              <button
                  class="cursor-pointer flex-1 px-6 py-4 rounded-lg text-base font-semibold border-2 transition-all duration-300"
                  :class="mode === 'healing'
                    ? 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:shadow-md'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:shadow-md'"
              >
                Back
              </button>
              <button
                  class="cursor-pointer flex-1 px-6 py-4 rounded-lg text-base font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2 shadow-md"
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
                >
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                  <path d="M5 3v4"></path>
                  <path d="M19 17v4"></path>
                  <path d="M3 5h4"></path>
                  <path d="M17 19h4"></path>
                </svg>
                <span>Create Playlist</span>
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
        class="fixed inset-0 flex items-center justify-center z-99 px-4 animate-fade-in"
        style="background-color: rgba(0, 0, 0, 0.2);"
    >
      <div
          @click.stop
          class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 animate-modal-entrance"
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
              class="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none"
          >
            ×
          </button>
        </div>
        <div class="text-gray-700 space-y-4">
          <p>
            The <strong>Patient Health Questionnaire-9 (PHQ-9)</strong> is a widely used, validated screening tool for detecting depression. It consists of nine questions that correspond to the diagnostic criteria for major depressive disorder.
          </p>
          <p>
            <strong>How it works:</strong>
          </p>
          <ul class="list-disc list-inside space-y-2 ml-4">
            <li>Each question asks about symptoms over the past 2 weeks</li>
            <li>Responses are scored from 0 (not at all) to 3 (nearly every day)</li>
            <li>Total scores range from 0 to 27</li>
            <li>Higher scores indicate more severe depression symptoms</li>
          </ul>
          <p>
            <strong>Score interpretation:</strong>
          </p>
          <ul class="list-disc list-inside space-y-2 ml-4">
            <li>0-4: Minimal depression</li>
            <li>5-9: Mild depression</li>
            <li>10-14: Moderate depression</li>
            <li>15-19: Moderately severe depression</li>
            <li>20-27: Severe depression</li>
          </ul>
          <p class="text-sm text-gray-600 italic">
            Note: This screening tool is for informational purposes and does not replace professional medical advice. If you're experiencing depression symptoms, please consult with a healthcare provider.
          </p>
        </div>
      </div>
    </div>
</template>

<script>
import {useTheme} from "@/composables/useTheme"

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
  methods: {
    selectAnswer(questionIndex, value) {
      this.answers[questionIndex] = value;
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