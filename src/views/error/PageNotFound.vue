<template>
  <div class="min-h-screen flex items-center justify-center bg-background-color font-poppins">
    <div class="text-center">
      <h1 class="text-[8rem] font-extrabold text-primary mb-4">404</h1>
      <h2 class="text-2xl font-semibold text-primary mb-3">
        Oops! That page can't be found
      </h2>
      <p class="text-primary mb-8">
        The page you are looking for does not exist.
      </p>
      <button
        @click="goToHome"
        class="px-6 py-3 border border-primary text-primary bg-white rounded-xl font-medium 
               hover:bg-primary-healing hover:text-white transition-all duration-300 shadow-full-blur"
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
      this.$router.push("/");
    },
  },
};
</script>
