<template>
  <div class="min-h-screen flex flex-col">
    <main class="flex-grow">
    <Navbar />
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Footer from '@/components/Footer.vue'
import Navbar from '@/components/Navbar.vue'
</script>