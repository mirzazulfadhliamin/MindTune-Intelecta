// src/services/playlistService.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const playlistService = {
  async createPlaylist(pre_mood, phq9) {
    try {
   const response = await axios.get(
  `${API_BASE_URL}/api/playlists`,
  {
    pre_mood: parseInt(pre_mood),
    phq9: parseInt(phq9),
  },
  {
    headers: { "Content-Type": "application/json" },
    withCredentials: false,
  }
);
      return response.data;
    } catch (error) {
      console.error('Error creating playlist:', error);
      throw error;
    }
  }
};