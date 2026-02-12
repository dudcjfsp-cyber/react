import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const authApi = {
    login: async (username, password) => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        const response = await axios.post(`${API_BASE_URL}/auth/token`, formData);
        return response.data; // { access_token, token_type, username, name }
    },

    register: async (username, password, name) => {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, {
            username,
            password,
            name
        });
        return response.data;
    }
};
