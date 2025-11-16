<script>
export default {
  name: 'SupportPage',
  methods: {
    callCrisis() {
      window.location.href = 'tel:112';
    },
    findTherapist() {
      window.open('https://www.google.com/search?q=terapis+terdekat', '_blank');
    },
    goHome() {
      this.$router.push('/');
    }
  }
}
</script>

<template>
  <div class="min-h-screen bg-background-soft">
    <div class="flex items-center justify-center h-fit px-4 py-20">
      <div class="max-w-5xl w-full">
        <div class="bg-background-white rounded-3xl shadow-lg p-8 md:p-12 animate-card-entrance">
          <!-- Header -->
          <div class="text-center mb-8">
            <h1 class="text-3xl md:text-4xl font-bold text-red-600 mb-4">
              Kami Siap Mendukungmu
            </h1>
            <p class="text-gray text-base">
              Hasil penilaianmu menunjukkan bahwa kamu mungkin mengalami gejala berat. Kami sangat menyarankan untuk berbicara dengan profesional kesehatan mental yang dapat memberikan dukungan yang tepat.
            </p>
          </div>

          <div class="bg-red-50 border border-red-100 rounded-2xl p-6 mb-6 text-center">
            <div class="flex justify-center mb-3">
              <div class="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
            </div>
            <p class="text-gray font-semibold mb-1">Tingkat Depresi</p>
            <p class="text-red-600 font-bold text-sm mb-3">Parah - Butuh Bantuan Profesional</p>
            <p class="text-4xl font-bold text-red-600">22/27</p>
          </div>

          <div class="grid md:grid-cols-2 gap-6 mb-6">
            <!-- Crisis Support -->
            <div class="bg-red-50 border border-red-100 rounded-2xl p-6">
              <h3 class="text-xl font-bold text-red-600 mb-2">Dukungan Krisis 24 Jam</h3>
              <p class="text-gray text-sm mb-8">
                Jika kamu sedang dalam krisis atau memiliki pikiran untuk menyakiti diri, segera hubungi layanan bantuan. Konselor terlatih tersedia 24 jam setiap hari.
              </p>
              <button
                  @click="callCrisis"
                  class="cursor-pointer w-full px-6 py-3 bg-red-600 text-white rounded-lg font-semibold transition-all duration-300 hover:bg-red-700 hover:shadow-lg"
              >
                Hubungi Hotline Krisis
              </button>
            </div>

            <!-- Find Therapist -->
            <div class="bg-blue-50 border border-blue-100 rounded-2xl p-6">
              <h3 class="text-xl font-bold text-blue-500 mb-2">Temukan Profesional</h3>
              <p class="text-gray text-sm mb-8">
                Terhubunglah dengan terapis dan profesional kesehatan mental berlisensi yang dapat memberikan perawatan dan dukungan yang sesuai dengan kebutuhanmu.
              </p>
              <button
                  @click="findTherapist"
                  class="cursor-pointer w-full px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold transition-all duration-300 hover:bg-blue-600 hover:shadow-lg"
              >
                Cari Terapis di Sekitarmu
              </button>
            </div>
          </div>

          <div class="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-6">
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 mt-0.5">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#d97706"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <div>
                <h4 class="font-bold text-yellow-600 mb-2">Catatan Penting</h4>
                <p class="text-yellow-600 text-sm">
                  Mind Tune dibuat untuk mendukung perjalanan kesehatan mentalmu, tetapi bukan pengganti perawatan profesional. Jika kamu mengalami gejala berat, segera cari bantuan dari profesional kesehatan mental. Kesejahteraanmu adalah prioritas kami.
                </p>
              </div>
            </div>
          </div>

          <!-- Back to Home Button -->
          <button
              @click="goHome"
              class="cursor-pointer w-full px-6 py-4 bg-background-white border-2 border-border text-gray rounded-lg font-semibold transition-all duration-300 hover:bg-background-soft hover:shadow-md"
          >
            Kembali ke Beranda
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
