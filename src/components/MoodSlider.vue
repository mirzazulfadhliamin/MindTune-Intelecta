
<script setup>
import { ref, computed, watch, defineEmits } from "vue";

const props = defineProps({
  modelValue: { type: Number, default: 5 },
});

const emit = defineEmits(["update:modelValue"]);
const moodValue = ref(props.modelValue);

watch(moodValue, (val) => {
  emit("update:modelValue", val);
  localStorage.setItem("pre_mood", val.toString());
});

const moodEmojis = [
  "😢", "😔", "😕", "😐", "🙂",
  "😊", "😄", "😁", "🤩", "🥳", "🎉"
];

const moodLabels = [
  "Sangat Rendah", "Rendah", "Agak Rendah", "Netral Rendah",
  "Sedikit Rendah", "Sedang", "Baik", "Sangat Baik",
  "Luar Biasa", "Menakjubkan", "Sempurna"
];

const currentEmoji = computed(() => moodEmojis[moodValue.value]);
const currentMoodLabel = computed(() => moodLabels[moodValue.value]);

const thumbStyle = computed(() => ({
  left: `calc(${(moodValue.value / 10) * 100}% - 12px)`,
}));
</script>

<style scoped>
.slider {
  background: linear-gradient(
    to right,
    var(--color-danger-light) 0%,
    var(--color-warning-light) 50%,
    var(--color-success-light) 100%
  );
}

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


<template>
  <div class="space-y-6">
    <div class="text-center">
      <div
        class="mb-4 text-6xl transition-transform duration-200 hover:scale-110"
      >
        {{ currentEmoji }}
      </div>
      <p class="text-lg font-medium text-gray">
        {{ currentMoodLabel }}
      </p>
    </div>

    <div class="relative">
      <input
        type="range"
        min="0"
        max="10"
        v-model="moodValue"
        class="w-full h-3 rounded-full appearance-none cursor-pointer slider"
      />
      <div
        class="absolute top-1/2 w-6 h-6 bg-white rounded-full border-4 border-primary-health shadow-lg transition-all -translate-y-1/2 pointer-events-none"
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
