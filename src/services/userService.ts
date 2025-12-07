import api from '@/lib/axios'
import { API_ENDPOINTS } from '@/config/api'
import type { User } from '@/types'

export const userService = {
    async getUserProfile(email: string): Promise<User> {
        const response = await api.get<User>(API_ENDPOINTS.USER_PROFILE(email))
        return response.data
    },

    async getAllUsers(): Promise<User[]> {
        const response = await api.get<User[]>(API_ENDPOINTS.ADMIN_USERS)
        return response.data
    },

    async updateUserRole(email: string, role: 'USER' | 'ADMIN'): Promise<void> {
        await api.put(`${API_ENDPOINTS.UPDATE_USER_ROLE(email)}?role=${role}`)
    },

    async deleteUser(id: string): Promise<void> {
        await api.delete(API_ENDPOINTS.DELETE_USER(id))
    },
}
