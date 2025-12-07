import api from '@/lib/axios'
import { API_ENDPOINTS, STORAGE_KEYS } from '@/config/api'
import type { LoginRequest, RegisterRequest, AuthResponse } from '@/types'

export const authService = {
    async login(credentials: LoginRequest): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>(API_ENDPOINTS.LOGIN, credentials)
        const data = response.data
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.accessToken)
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data))
        return data
    },

    async register(userData: RegisterRequest): Promise<string> {
        const response = await api.post<string>(API_ENDPOINTS.REGISTER, userData)
        return response.data
    },

    logout() {
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
        localStorage.removeItem(STORAGE_KEYS.USER)
        localStorage.removeItem(STORAGE_KEYS.CART)
    },

    getCurrentUser(): AuthResponse | null {
        const user = localStorage.getItem(STORAGE_KEYS.USER)
        return user ? JSON.parse(user) : null
    },

    isAuthenticated(): boolean {
        return !!localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
    },

    isAdmin(): boolean {
        const user = this.getCurrentUser()
        return user?.role === 'ADMIN'
    },
}
