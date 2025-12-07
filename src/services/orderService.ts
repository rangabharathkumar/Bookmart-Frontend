import api from '@/lib/axios'
import { API_ENDPOINTS } from '@/config/api'
import type { Order, OrderRequest } from '@/types'

export const orderService = {
    async placeOrder(orderRequest: OrderRequest): Promise<Order> {
        const response = await api.post<Order>(API_ENDPOINTS.PLACE_ORDER, orderRequest)
        return response.data
    },

    async getMyOrders(): Promise<Order[]> {
        const response = await api.get<Order[]>(API_ENDPOINTS.MY_ORDERS)
        return response.data
    },

    async getAllOrders(): Promise<Order[]> {
        const response = await api.get<Order[]>(API_ENDPOINTS.ALL_ORDERS)
        return response.data
    },

    async updateOrderStatus(
        orderId: string,
        status: 'PENDING' | 'COMPLETED' | 'CANCELLED'
    ): Promise<Order> {
        const response = await api.patch<Order>(API_ENDPOINTS.UPDATE_ORDER_STATUS(orderId), {
            status,
        })
        return response.data
    },
}
