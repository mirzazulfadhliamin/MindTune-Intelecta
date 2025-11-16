// src/services/dashboardService.js
import { API_BASE_URL } from '../utils/utils.js';
import { useAuth } from '../composables/useAuth.js';

export const dashboardService = {
    async getPlaylists() {
        try {
            const { api } = useAuth();
            const response = await api.get(`${API_BASE_URL}/api/playlists/`);
            
            return response.data;
        } catch (error) {
            console.error('Error fetching playlists:', error);
            throw error;
        }
    },

    async getDashboardStats() {
        try {
            const { api } = useAuth();
            const response = await api.get(`${API_BASE_URL}/api/playlists/dashboard/stats`);
            return response.data;
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            throw error;
        }
    },

    async getChartMood() {
        try {
            const { api } = useAuth();
            const response = await api.get(`${API_BASE_URL}/api/playlists/chart/mood`);
            return response.data;
        } catch (error) {
            console.error('Error fetching chart mood:', error);
            throw error;
        }
    }
};