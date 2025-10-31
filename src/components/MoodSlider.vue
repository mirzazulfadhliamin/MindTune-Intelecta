<template>
  <div class="space-y-6">
    <div class="text-center">
      <div
        class="mb-4 text-6xl transition-transform duration-200 hover:scale-110"
      >
        {{ currentEmoji }}
      </div>
      <p class="text-lg font-medium text-gray-700">
        {{ currentMoodLabel }}
      </p>
    </div>

    <div class="relative">
      <input
        type="range"
        min="0"
        max="10"
        v-model="moodValue"
        class="w-full h-3 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-full appearance-none cursor-pointer slider"
        :style="sliderStyle"
      />
      <div
        class="absolute top-1/2 w-6 h-6 bg-white rounded-full border-4 border-blue-500 shadow-lg transition-all -translate-y-1/2 pointer-events-none"
        :style="thumbStyle"
      ></div>
    </div>

    <div class="flex justify-between px-1 text-xs text-gray-500">
      <span>Sangat Rendah</span>
      <span>Sedang</span>
      <span>Sangat Baik</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits, watch } from "vue";

const props = defineProps({
  modelValue: { type: Number, default: 5 },
});

const emit = defineEmits(["update:modelValue"]);

const moodValue = ref(props.modelValue);

watch(moodValue, (val) => {
  emit("update:modelValue", val);
  // Save to localStorage for use in questionnaire
  localStorage.setItem('pre_mood', val.toString());
});

const moodEmojis = {
  0: "😢",
  1: "😔",
  2: "😕",
  3: "😐",
  4: "🙂",
  5: "😊",
  6: "😄",
  7: "😁",
  8: "🤩",
  9: "🥳",
  10: "🎉",
};

const moodLabels = {
  0: "Sangat Rendah",
  1: "Rendah",
  2: "Agak Rendah",
  3: "Netral Rendah",
  4: "Sedikit Rendah",
  5: "Sedang",
  6: "Baik",
  7: "Sangat Baik",
  8: "Luar Biasa",
  9: "Menakjubkan",
  10: "Sempurna",
};

const currentEmoji = computed(() => moodEmojis[moodValue.value]);
const currentMoodLabel = computed(() => moodLabels[moodValue.value]);

const thumbStyle = computed(() => ({
  left: `calc(${(moodValue.value / 10) * 100}% - 12px)`,
}));

const sliderStyle = computed(() => ({
  background:
    "linear-gradient(to right, rgb(252,165,165) 0%, rgb(253,230,138) 50%, rgb(134,239,172) 100%)",
}));
</script>

<style scoped>
.slider::-webkit-slider-thumb {
  appearance: none;
  width: 0;
  height: 0;
}
.slider::-moz-range-thumb {
  width: 0;
  height: 0;
  border: none;
  background: transparent;
}
</style>