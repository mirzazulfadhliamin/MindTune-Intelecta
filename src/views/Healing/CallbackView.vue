<template>
  <div class="flex flex-col justify-center items-center px-4 min-h-screen bg-background">
    <div class="p-8 space-y-8 w-full max-w-md bg-background rounded-lg shadow-md">
      <div class="text-center">
        <h2 v-if="!error" class="mt-6 text-3xl font-bold text-primary">Login Berhasil!</h2>
        <h2 v-else class="mt-6 text-3xl font-bold text-danger">Login Gagal</h2>
        
        <p v-if="!error" class="mt-3 text-sm text-primary">
          Anda telah berhasil login dengan Spotify. Anda akan dialihkan ke halaman utama dalam beberapa saat.
        </p>
        <p v-else class="mt-3 text-sm text-danger">
          Terjadi kesalahan saat proses login. Anda akan dialihkan ke halaman utama dalam beberapa saat.
          <span v-if="error" class="block mt-2 text-xs text-gray-500">{{ error }}</span>
        </p>
      </div>
      <div class="flex justify-center mt-8">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" 
             :class="{'border-primary': !error, 'border-danger': error}"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const { exchangeCodeForToken } = useAuth();
const isLoading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    // Ambil code dari parameter URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (!code) {
      throw new Error('Code parameter tidak ditemukan');
    }
    
    // Exchange code dengan token menggunakan useAuth composable
    await exchangeCodeForToken(code);
    
    // Redirect ke halaman utama setelah 2 detik
    setTimeout(() => {
      router.push('/');
    }, 2000);
    
  } catch (err) {
    console.error('Error during token exchange:', err);
    error.value = err.message;
    
    // Redirect ke halaman utama jika terjadi error
    setTimeout(() => {
      router.push('/');
    }, 2000);
  } finally {
    isLoading.value = false;
  }
});
</script>