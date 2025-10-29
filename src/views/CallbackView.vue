<template>
  <div class="flex flex-col justify-center items-center px-4 min-h-screen bg-gray-50">
    <div class="p-8 space-y-8 w-full max-w-md bg-white rounded-lg shadow-md">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-bold text-blue-500">Login Berhasil!</h2>
        <p class="mt-3 text-sm text-blue-500">
          Anda telah berhasil login dengan Spotify. Anda akan dialihkan ke halaman utama dalam beberapa saat.
        </p>
      </div>
      <div class="flex justify-center mt-8">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--main-color)]"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
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
    
    // Hit API untuk mendapatkan access token
    const response = await axios.get(`https://mindtune-api.syahranfd.cloud/api/users/access-token?code=${code}`);
    const { access_token, refresh_token } = response.data;
    
    // Simpan token ke localStorage
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    
    // Set status login menjadi true
    localStorage.setItem('isLogin', 'true');
    
    // Redirect ke halaman utama setelah 2 detik
    setTimeout(() => {
      router.push('/');
    }, 2000);
    
  } catch (err) {
    console.error('Error during token exchange:', err);
    error.value = err.message;
    
    // Coba refresh token jika error 403 (token expired)
    if (err.response && err.response.status === 403) {
      try {
        const refresh_token = localStorage.getItem('refresh_token');
        
        if (refresh_token) {
          const refreshResponse = await axios.post(`https://mindtune-api.syahranfd.cloud/api/users/refresh-token?refresh_token=${refresh_token}`);
          const { access_token, refresh_token: new_refresh_token } = refreshResponse.data;
          
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', new_refresh_token || refresh_token);
          
          // Redirect ke halaman utama setelah refresh token berhasil
          setTimeout(() => {
            router.push('/');
          }, 2000);
        }
      } catch (refreshErr) {
        console.error('Error during token refresh:', refreshErr);
        // Redirect ke halaman login jika refresh token juga gagal
        setTimeout(() => {
          router.push('/');
        }, 3000);
      }
    } else {
      // Redirect ke halaman utama jika terjadi error lain
      setTimeout(() => {
        router.push('/');
      }, 3000);
    }
  } finally {
    isLoading.value = false;
  }
});
</script>