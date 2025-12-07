export interface User {
    id: string
    name: string
    email: string
    role: 'USER' | 'ADMIN'
    createdAt: string
}

export interface AuthResponse {
    id: string
    email: string
    name: string
    role: 'USER' | 'ADMIN'
    accessToken: string
    tokenType: string
}

export interface LoginRequest {
    email: string
    password: string
}

export interface RegisterRequest {
    name: string
    email: string
    password: string
}

export interface Book {
    id: string
    title: string
    author: string
    description: string
    price: number
    isbn: string
    stockQuantity: number
    category: string
    imageUrl: string
    createdAt: string
    updatedAt: string
}

export interface OrderItem {
    id: string
    bookId: string
    bookTitle: string
    bookAuthor: string
    quantity: number
    orderPrice: number
    subtotal: number
}

export interface Order {
    id: string
    orderDate: string
    totalAmount: number
    status: 'PENDING' | 'COMPLETED' | 'CANCELLED'
    items: OrderItem[]
}

export interface OrderRequest {
    items: {
        bookId: string
        quantity: number
    }[]
}

export interface CartItem {
    book: Book
    quantity: number
}

export interface ApiError {
    timestamp: string
    message: string
    details: string
}
