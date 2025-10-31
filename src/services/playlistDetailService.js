// src/services/playlistDetailService.js
import { API_BASE_URL } from '../utils/utils.js';
import { useAuth } from '../composables/useAuth.js';

export const playlistDetailService = {
    async getPlaylistDetail(id) {
        try {
            const { api } = useAuth();
            const response = await api.get(`${API_BASE_URL}/api/playlists/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching playlist detail:', error);
            throw error;
        }
    }
};