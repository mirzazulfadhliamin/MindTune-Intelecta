import { ref, watch } from "vue";

const mode = ref("healing");

export function useTheme() {
  const setThemeVariables = () => {
    const root = document.documentElement;

    if (mode.value === "healing") {
      root.style.setProperty("--bg", "#E3F2FD");
      root.style.setProperty("--accent", "#2F80ED");
    } else {
      root.style.setProperty("--bg", "#FFF3E0");
      root.style.setProperty("--accent", "#FB923C");
    }
  };

  const toggleTheme = () => {
    mode.value = mode.value === "healing" ? "everyday" : "healing";
  };

  watch(mode, setThemeVariables, { immediate: true });

  return { mode, toggleTheme };
}
