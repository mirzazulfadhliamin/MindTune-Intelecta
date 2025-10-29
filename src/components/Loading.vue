<template>
  <div class="text-center py-16 space-y-6">
    <div class="relative w-24 h-24 mx-auto">
      <div class="absolute inset-0 border-4 border-blue-200 rounded-full animate-ping"></div>
      <div class="absolute inset-0 border-4 border-blue-500 rounded-full animate-pulse"></div>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        class="lucide lucide-brain absolute inset-0 m-auto w-12 h-12 text-blue-500 animate-pulse"
      >
        <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path>
        <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path>
        <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path>
        <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"></path>
        <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path>
        <path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path>
        <path d="M19.938 10.5a4 4 0 0 1 .585.396"></path>
        <path d="M6 18a4 4 0 0 1-1.967-.516"></path>
        <path d="M19.967 17.484A4 4 0 0 1 18 18"></path>
      </svg>
    </div>
    <h3 class="text-xl font-semibold text-gray-800">{{ title }}</h3>
    <p class="text-gray-600">{{ subtitle }}</p>
  </div>
</template>

<script>
export default {
  name: 'MindTuneLoading',
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

<style scoped>
@keyframes pulse-ring {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  80%, 100% {
    transform: scale(1.4);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}
</style>