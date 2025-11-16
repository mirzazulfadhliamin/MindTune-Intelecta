<script>
import { useTheme } from '@/composables/useTheme.js'

import HomeHealing from '@/views/Healing/HomeHealing.vue'
import HomeEveryday from '@/views/Everyday/HomeEveryday.vue'

export default {
  name: 'HomeView',
  components: {
    HomeHealing,
    HomeEveryday
  },
  setup() {
    const { mode } = useTheme()
    return { mode }
  }
}
</script>

<template>
  <div>
    <HomeHealing v-if="mode === 'healing'" />

    <HomeEveryday v-else-if="mode === 'everyday'" />

    <div v-else class="min-h-screen flex items-center justify-center">
      <p>Mode "{{ mode }}" tidak dikenali.</p>
    </div>
  </div>
</template>


