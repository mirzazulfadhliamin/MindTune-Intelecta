<script>
export default {
  name: 'SupportPage',
  mounted() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
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
  <div class="min-h-screen bg-background-soft animate-page-fade-in">
    <div class="flex justify-center items-center px-4 py-20 h-fit">
      <div class="w-full max-w-5xl">
        <div class="p-8 rounded-3xl shadow-lg bg-background-white md:p-12 animate-card-entrance">
          <!-- Header -->
          <div class="mb-8 text-center">
            <h1 class="mb-4 text-3xl font-bold text-red-600 md:text-4xl">
              Kami Siap Mendukungmu
            </h1>
            <p class="text-base text-gray">
              Hasil penilaianmu menunjukkan bahwa kamu mungkin mengalami gejala berat. Kami sangat menyarankan untuk berbicara dengan profesional kesehatan mental yang dapat memberikan dukungan yang tepat.
            </p>
          </div>

          <div class="p-6 mb-6 text-center bg-red-50 rounded-2xl border border-red-100">
            <div class="flex justify-center mb-3">
              <div class="flex justify-center items-center w-12 h-12 bg-red-500 rounded-full">
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
            <p class="mb-1 font-semibold text-gray">Tingkat Depresi</p>
            <p class="mb-3 text-sm font-bold text-red-600">Parah - Butuh Bantuan Profesional</p>
            <p class="text-4xl font-bold text-red-600">22/27</p>
          </div>

          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <!-- Crisis Support -->
            <div class="p-6 bg-red-50 rounded-2xl border border-red-100">
              <h3 class="mb-2 text-xl font-bold text-red-600">Dukungan Krisis 24 Jam</h3>
              <p class="mb-8 text-sm text-gray">
                Jika kamu sedang dalam krisis atau memiliki pikiran untuk menyakiti diri, segera hubungi layanan bantuan. Konselor terlatih tersedia 24 jam setiap hari.
              </p>
              <button
                  @click="callCrisis"
                  class="px-6 py-3 w-full font-semibold text-white bg-red-600 rounded-lg transition-all duration-300 cursor-pointer hover:bg-red-700 hover:shadow-lg"
              >
                Hubungi Hotline Krisis
              </button>
            </div>

            <!-- Find Therapist -->
            <div class="p-6 bg-blue-50 rounded-2xl border border-blue-100">
              <h3 class="mb-2 text-xl font-bold text-blue-500">Temukan Profesional</h3>
              <p class="mb-8 text-sm text-gray">
                Terhubunglah dengan terapis dan profesional kesehatan mental berlisensi yang dapat memberikan perawatan dan dukungan yang sesuai dengan kebutuhanmu.
              </p>
              <button
                  @click="findTherapist"
                  class="px-6 py-3 w-full font-semibold text-white bg-blue-500 rounded-lg transition-all duration-300 cursor-pointer hover:bg-blue-600 hover:shadow-lg"
              >
                Cari Terapis di Sekitarmu
              </button>
            </div>
          </div>

          <div class="p-6 mb-6 bg-yellow-50 rounded-2xl border border-yellow-200">
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
                <h4 class="mb-2 font-bold text-yellow-600">Catatan Penting</h4>
                <p class="text-sm text-yellow-600">
                  Mind Tune dibuat untuk mendukung perjalanan kesehatan mentalmu, tetapi bukan pengganti perawatan profesional. Jika kamu mengalami gejala berat, segera cari bantuan dari profesional kesehatan mental. Kesejahteraanmu adalah prioritas kami.
                </p>
              </div>
            </div>
          </div>

          <!-- Back to Home Button -->
          <button
              @click="goHome"
              class="px-6 py-4 w-full font-semibold rounded-lg border-2 transition-all duration-300 cursor-pointer bg-background-white border-border text-gray hover:bg-background-soft"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes page-fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animasi masuk lembut untuk seluruh halaman */
.animate-page-fade-in {
  animation: page-fade-in 0.35s ease-out;
}

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
