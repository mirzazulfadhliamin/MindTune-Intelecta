<template>
  <div class="p-6 mb-8 bg-white rounded-2xl border-1 border-silver">
    <div class="flex items-center mb-4 space-x-2">
        <img src="/src/assets/chart-line.svg" alt="Chart Line Icon" class="w-8 h-8 text-primary-health" />
      <h2 class="text-xl font-medium md:text-2xl text-primary-health">Mood Improvement Chart</h2>
    </div>

    <div v-if="isLoading" class="py-10 text-center text-gray">Memuat data chart...</div>
    <div v-else-if="error" class="py-4 text-center text-red-500">{{ error }}</div>
    <div v-else-if="!hasData" class="py-10 text-center text-gray">Data mood belum tersedia.</div>
    <div v-else class="w-full">
      <apexchart type="line" height="350" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import ApexCharts from 'vue3-apexcharts'

const apexchart = ApexCharts

const props = defineProps({
  moodData: { type: Array, default: () => [] },
  isLoading: { type: Boolean, default: false },
  error: { type: String, default: '' },
})

const series = ref([])
const chartOptions = ref({
  chart: {
    type: 'line',
    height: 350,
    toolbar: { show: false },
    animations: { enabled: true },
  },
  stroke: { curve: 'smooth', width: 3 },
  markers: { size: 4 },
  colors: ['#EF4444', '#22C55E'], // pre: red, post: green
  xaxis: { categories: [] },
  yaxis: {
    min: 1,
    max: 10,
    tickAmount: 6,
    labels: { formatter: (val) => Math.round(val) },
  },
  legend: { show: true },
  grid: { strokeDashArray: 4 },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: (val) => `${val}`,
    },
  },
  responsive: [
    {
      breakpoint: 768,
      options: {
        chart: { height: 320 },
        markers: { size: 3 },
      },
    },
  ],
})

const hasData = computed(() => Array.isArray(props.moodData) && props.moodData.length > 0)

const prepareChart = () => {
  if (!hasData.value) {
    series.value = []
    chartOptions.value = { ...chartOptions.value, xaxis: { categories: [] } }
    return
  }

  const categories = props.moodData.map((d) => `Session ${d.sequence_number}`)
  const preSeries = props.moodData.map((d) => parseInt(d.pre_mood))
  const postSeries = props.moodData.map((d) => parseInt(d.post_mood))

  series.value = [
    { name: 'Pre-Playlist Mood', data: preSeries },
    { name: 'Post-Playlist Mood', data: postSeries },
  ]

  chartOptions.value = {
    ...chartOptions.value,
    xaxis: { categories },
  }
}

watch(() => props.moodData, prepareChart, { deep: true, immediate: true })
</script>

<style scoped>
/* Ensure the chart uses full container width */
.apexcharts-canvas {
  width: 100% !important;
}
</style>