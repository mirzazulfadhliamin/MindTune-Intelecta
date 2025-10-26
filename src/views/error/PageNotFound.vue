<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-blue-500 mb-4">404</h1>
      <h2 class="text-2xl font-semibold text-gray-800 mb-3">
        Oops! That page can't be found
      </h2>
      <p class="text-gray-600 mb-8">
        The page you are looking do not exist
      </p>
      <button
          @click="goToHome"
          class="px-6 py-3 bg-white text-blue-500 border border-blue-500 rounded-md font-medium hover:bg-blue-500 hover:text-white transition-colors duration-300 cursor-pointer"
      >
        Go To Home
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
  methods: {
    goToHome() {
      this.$router.push('/')
    }
  }
}
</script>