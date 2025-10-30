<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-50">
    <div class="w-full max-w-xl text-center rounded-3xl shadow-[0_0_20px_0_rgba(0,0,0,0.075)] backdrop-blur-sm p-16 bg-white/80">
      <!-- Brain Icon with Pulse Animation -->
      <div class="relative mx-auto mb-8 w-24 h-24">
        <div class="absolute inset-0 bg-blue-100 rounded-full opacity-30 animate-ping"></div>
        <div class="absolute inset-0 bg-blue-200 rounded-full animate-pulse"></div>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          class="absolute inset-0 m-auto w-12 h-12 text-blue-500 animate-pulse"
        >
          <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path>
          <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path>
          <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path>
        </svg>
      </div>
      
      <!-- Text Content -->
      <h3 class="mb-3 text-2xl font-semibold text-gray-800 animate-fade-in">
        {{ title }}
      </h3>
      
      <p class="text-gray-600 animate-fade-in animation-delay-300">
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

.animation-delay-300 {
  animation-delay: 300ms;
}
</style>

<script>
export default {
  name: 'LoadingAnimationView',
  props: {
    title: {
      type: String,
      default: 'Menganalisis tanggapan Anda...'
    },
    subtitle: {
      type: String,
      default: 'Membuat playlist yang disesuaikan dengan kebutuhan anda'
    },
  }
}
</script>