import api from '@/lib/axios'
import { API_ENDPOINTS } from '@/config/api'
import type { Book } from '@/types'

export const bookService = {
    async getAllBooks(): Promise<Book[]> {
        const response = await api.get<Book[]>(API_ENDPOINTS.BOOKS)
        return response.data
    },

    async getBookById(id: string): Promise<Book> {
        const response = await api.get<Book>(API_ENDPOINTS.BOOK_BY_ID(id))
        return response.data
    },

    async searchBooks(keyword: string): Promise<Book[]> {
        const response = await api.get<Book[]>(`${API_ENDPOINTS.SEARCH_BOOKS}?keyword=${keyword}`)
        return response.data
    },

    async addBook(book: Partial<Book>): Promise<string> {
        const response = await api.post<string>(API_ENDPOINTS.ADD_BOOK, book)
        return response.data
    },

    async updateBook(id: string, book: Partial<Book>): Promise<string> {
        const response = await api.put<string>(API_ENDPOINTS.UPDATE_BOOK(id), book)
        return response.data
    },

    async deleteBook(id: string): Promise<string> {
        const response = await api.delete<string>(API_ENDPOINTS.DELETE_BOOK(id))
        return response.data
    },
}
