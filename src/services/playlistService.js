// src/services/playlistService.js
import axios from 'axios';
import { API_BASE_URL } from '../utils/utils.js';

export const playlistService = {
  async createPlaylist(pre_mood, phq9) {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('Token tidak tersedia');
      }
      const response = await axios.post(
        `${API_BASE_URL}/api/playlists`,
        {
          pre_mood: parseInt(pre_mood),
          phq9: parseInt(phq9),
        },
        {
          headers: { 'Authorization': `Bearer ${token}` },
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