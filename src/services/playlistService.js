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

      const response = await axios.get(`${API_BASE_URL}/api/playlists/create?pre_mood=${pre_mood}&phq9=${phq9}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error creating playlist:', error);
      throw error;
    }
  }
};