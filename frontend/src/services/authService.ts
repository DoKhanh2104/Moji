import api from '@/lib/axios';

export const authService = {
    signUp: async (username: string, password: string, email: string, lastName: string, firstName: string) => {
        const res = await api.post('/auth/signup', { username, password, email, lastName, firstName }, { withCredentials: true });

        return res.data;
    }
}