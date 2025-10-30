<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-50">
    <div class="w-full max-w-3xl text-center rounded-3xl shadow-[0_0_20px_0_rgba(0,0,0,0.075)] backdrop-blur-sm p-28 bg-white/80">
      <!-- Brain Icon with Ring Animation -->
      <div class="relative mx-auto mb-12 w-28 h-28">
        <div class="absolute inset-0 rounded-full border-4 border-blue-400 opacity-70 animate-ping"></div>
        <div class="flex absolute inset-0 justify-center items-center p-6 m-auto w-28 h-28 bg-white rounded-full border-4 border-blue-500 animate-pulse">
          <img 
            src="../assets/brain.svg" 
            alt="Brain Icon" 
            class="w-16 h-16 text-blue-500"
          >
        </div>
      </div>
      
      <!-- Text Content -->
      <h3 class="mb-3 text-2xl font-medium text-gray-800 animate-fade-in">
        Menganalisis tanggapan Anda...
      </h3>
      
      <p class="text-base text-gray-600 font-regular animate-fade-in animation-delay-300">
        Membuat playlist yang disesuaikan dengan kebutuhan anda
      </p>
    </div>
  </div>
</template>

<script>

</script>