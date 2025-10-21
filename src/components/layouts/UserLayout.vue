<template>
  <div>
    <Navbar />
    <main class="p-6">
      <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/navbar/Navbar.vue';

export default {
  name: 'UserLayout',
  components: { Navbar }
};
</script>
