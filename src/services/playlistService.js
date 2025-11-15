// src/services/playlistService.js
import { API_BASE_URL } from '../utils/utils.js';
import { useAuth } from '../composables/useAuth.js';

export const playlistService = {
  async createPlaylist(pre_mood, phq9) {
    try {
      const { api } = useAuth();
      const response = await api.get(`${API_BASE_URL}/api/playlists/create?pre_mood=${pre_mood}&phq9=${phq9}`);

      return response.data;
    } catch (error) {
      console.error('Error creating playlist:', error);
      throw error;
    }
  },
  
  async getPlaylistById(playlistId) {
    try {
      const { api } = useAuth();
      const response = await api.get(`${API_BASE_URL}/api/playlists/${playlistId}`);
      
      return response.data;
    } catch (error) {
      console.error('Error fetching playlist:', error);
      throw error;
    }
  },

  async submitFeedback(playlistId, post_mood, feedback) {
    try {
      const { api } = useAuth();
      const response = await api.get(`${API_BASE_URL}/api/playlists/${playlistId}/feedback?post_mood=${post_mood}&feedback=${encodeURIComponent(feedback)}`);
      
      return response.data;
    } catch (error) {
      console.error('Error submitting feedback:', error);
      throw error;
    }
  }
};