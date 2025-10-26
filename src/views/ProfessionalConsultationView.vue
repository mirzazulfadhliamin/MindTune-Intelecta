<template>
  <div class="min-h-screen bg-gray-50">
    <div class="flex items-center justify-center h-fit px-4 py-20">
      <div class="max-w-5xl w-full">
        <div class="bg-white rounded-3xl shadow-lg p-8 md:p-12 animate-card-entrance">
          <!-- Header -->
          <div class="text-center mb-8">
            <h1 class="text-3xl md:text-4xl font-bold text-red-600 mb-4">
              We're Here to Support You
            </h1>
            <p class="text-gray-700 text-base">
              Your assessment indicates you may be experiencing severe symptoms. We strongly recommend speaking with a mental health professional who can provide proper support.
            </p>
          </div>

          <div class="bg-red-50 border border-red-100 rounded-2xl p-6 mb-6 text-center">
            <div class="flex justify-center mb-3">
              <div class="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
            </div>
            <p class="text-gray-700 font-semibold mb-1">Depression Level</p>
            <p class="text-red-600 font-bold text-sm mb-3">Severe - Professional Help Needed</p>
            <p class="text-4xl font-bold text-red-600">22/27</p>
          </div>

          <div class="grid md:grid-cols-2 gap-6 mb-6">
            <div class="bg-red-50 border border-red-100 rounded-2xl p-6">
              <h3 class="text-xl font-bold text-red-600 mb-2">24/7 Crisis Support</h3>
              <p class="text-gray-700 text-sm mb-8">
                If you're in crisis or having thoughts of self-harm, please reach out immediately. Trained counselors are available 24/7.
              </p>
              <button
                  @click="callCrisis"
                  class="cursor-pointer w-full px-6 py-3 bg-red-600 text-white rounded-lg font-semibold transition-all duration-300 hover:bg-red-700 hover:shadow-lg"
              >
                Call Crisis Hotline
              </button>
            </div>

            <div class="bg-blue-50 border border-blue-100 rounded-2xl p-6">
              <h3 class="text-xl font-bold text-blue-500 mb-2">Find a Professional</h3>
              <p class="text-gray-700 text-sm mb-8">
                Connect with licensed therapists and mental health professionals who can provide personalized treatment and support.
              </p>
              <button
                  @click="findTherapist"
                  class="cursor-pointer w-full px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold transition-all duration-300 hover:bg-blue-600 hover:shadow-lg"
              >
                Find Therapist Near You
              </button>
            </div>
          </div>

          <div class="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-6">
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <div>
                <h4 class="font-bold text-yellow-600 mb-2">Important Note</h4>
                <p class="text-yellow-600 text-sm">
                  Mind Tune is designed to support your mental wellness journey, but it is not a substitute for professional mental health care. If you're experiencing severe symptoms, please seek help from a qualified mental health professional. Your wellbeing is our priority.
                </p>
              </div>
            </div>
          </div>

          <!-- Back to Home Button -->
          <button
              @click="goHome"
              class="cursor-pointer w-full px-6 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-50 hover:shadow-md"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SupportPage',
  methods: {
    callCrisis() {
      window.location.href = 'tel:112';
    },
    findTherapist() {
      window.open('https://www.google.com/search?q=therapist+near+me', '_blank');
    },
    goHome() {
      this.$router.push('/');
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

.animate-card-entrance {
  animation: card-entrance 0.6s ease-out;
}
</style>