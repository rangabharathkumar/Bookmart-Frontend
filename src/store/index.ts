import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthResponse, CartItem, Book } from '@/types'
import { STORAGE_KEYS } from '@/config/api'

interface AuthState {
    user: AuthResponse | null
    setUser: (user: AuthResponse | null) => void
    logout: () => void
    isAuthenticated: () => boolean
    isAdmin: () => boolean
}

interface CartState {
    items: CartItem[]
    addItem: (book: Book, quantity?: number) => void
    removeItem: (bookId: string) => void
    updateQuantity: (bookId: string, quantity: number) => void
    clearCart: () => void
    getTotalItems: () => number
    getTotalPrice: () => number
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: (() => {
        const user = localStorage.getItem(STORAGE_KEYS.USER)
        return user ? JSON.parse(user) : null
    })(),
    setUser: (user) => set({ user }),
    logout: () => {
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
        localStorage.removeItem(STORAGE_KEYS.USER)
        set({ user: null })
    },
    isAuthenticated: () => !!get().user,
    isAdmin: () => get().user?.role === 'ADMIN',
}))

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (book, quantity = 1) => {
                const items = get().items
                const existingItem = items.find((item) => item.book.id === book.id)

                if (existingItem) {
                    set({
                        items: items.map((item) =>
                            item.book.id === book.id
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        ),
                    })
                } else {
                    set({ items: [...items, { book, quantity }] })
                }
            },
            removeItem: (bookId) => {
                set({ items: get().items.filter((item) => item.book.id !== bookId) })
            },
            updateQuantity: (bookId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(bookId)
                } else {
                    set({
                        items: get().items.map((item) =>
                            item.book.id === bookId ? { ...item, quantity } : item
                        ),
                    })
                }
            },
            clearCart: () => set({ items: [] }),
            getTotalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0)
            },
            getTotalPrice: () => {
                return get().items.reduce(
                    (total, item) => total + item.book.price * item.quantity,
                    0
                )
            },
        }),
        {
            name: STORAGE_KEYS.CART,
        }
    )
)
