export const API_BASE_URL = import.meta.env.VITE_API_URL

export const getMoodEmoji = (pre_mood) => {
  const moodMap = {
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
  return moodMap[pre_mood] || '😐';
};

export const getMoodLabel = (pre_mood) => {
  const moodLabelMap = {
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
  return moodLabelMap[pre_mood] || 'Netral';
};

export const formatDuration = (milliseconds) => {
  if (!milliseconds) return '0 menit';
  
  const minutes = Math.floor(milliseconds / 60000);
  return minutes === 1 ? '1 menit' : `${minutes} menit`;
};