// Use environment variable in production, fallback to local development
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

export const API_ENDPOINTS = {
    // Auth
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',

    // Books
    BOOKS: '/api/books/',
    BOOK_BY_ID: (id: string) => `/api/books/${id}`,
    SEARCH_BOOKS: '/api/books/search',
    ADD_BOOK: '/api/books/add',
    UPDATE_BOOK: (id: string) => `/api/books/${id}`,
    DELETE_BOOK: (id: string) => `/api/books/${id}`,

    // Orders
    PLACE_ORDER: '/api/orders/',
    MY_ORDERS: '/api/orders/my-orders',
    ALL_ORDERS: '/api/orders/orders',
    UPDATE_ORDER_STATUS: (id: string) => `/api/orders/${id}/status`,

    // Users
    USER_PROFILE: (email: string) => `/api/users/me/${email}`,

    // Admin
    ADMIN_USERS: '/api/admin/users',
    UPDATE_USER_ROLE: (email: string) => `/api/admin/users/${email}/role`,
    DELETE_USER: (id: string) => `/api/admin/user/${id}`,
} as const

export const STORAGE_KEYS = {
    ACCESS_TOKEN: 'accessToken',
    USER: 'user',
    CART: 'cart',
} as const
