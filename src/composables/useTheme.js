import { ref, watch } from "vue";

const mode = ref("healing");

export function useTheme() {
  const setThemeVariables = () => {
    const root = document.documentElement;

    if (mode.value === "healing") {
      root.style.setProperty("--bg", "#e3f2fd");
      root.style.setProperty("--bg-white", "#fbfbfb");
      root.style.setProperty("--main-color", "#2F80ED");
      root.style.setProperty("--t-white", "#ffffff");
      root.style.setProperty("--t-grey", "#374151");
      root.style.setProperty("--t-black", "#1f2937");
      root.style.setProperty("--silver", "#acb5bb");
      root.style.setProperty("--dark-green", "#00A63E");
      root.style.setProperty("--bg-green", "#B9F8CF");
      root.style.setProperty("--dark-blue", "#1e3a8a");
    } else {
      root.style.setProperty("--bg", "#FFF3E0");
      root.style.setProperty("--bg-white", "#fbfbfb");
      root.style.setProperty("--main-color", "#FB923C");
      root.style.setProperty("--t-white", "#ffffff");
      root.style.setProperty("--t-grey", "#374151");
      root.style.setProperty("--t-black", "#1f2937");
      root.style.setProperty("--silver", "#acb5bb");
      root.style.setProperty("--dark-green", "#00A63E");
      root.style.setProperty("--bg-green", "#B9F8CF");
      root.style.setProperty("--dark-blue", "#1e3a8a");
    }
  };

  const toggleTheme = () => {
    mode.value = mode.value === "healing" ? "everyday" : "healing";
  };

  watch(mode, setThemeVariables, { immediate: true });

  return { mode, toggleTheme };
}
