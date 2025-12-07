import { useEffect, useState } from 'react'
import { Package, Calendar, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { LoadingPage } from '@/components/ui/LoadingSpinner'
import { orderService } from '@/services/orderService'
import { formatPrice, formatDate } from '@/lib/utils'
import type { Order } from '@/types'

export function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        loadOrders()
    }, [])

    const loadOrders = async () => {
        try {
            const data = await orderService.getMyOrders()
            setOrders(data.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()))
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to load orders')
        } finally {
            setLoading(false)
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'COMPLETED':
                return 'bg-success/10 text-success border-success/20'
            case 'CANCELLED':
                return 'bg-error/10 text-error border-error/20'
            default:
                return 'bg-warning/10 text-warning border-warning/20'
        }
    }

    if (loading) return <LoadingPage />

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">My Orders</h1>

            {error && (
                <div className="rounded-md bg-error/10 border border-error/20 p-4 text-error mb-6">
                    {error}
                </div>
            )}

            {orders.length === 0 ? (
                <Card className="text-center py-12">
                    <Package className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
                    <p className="text-neutral-600">
                        Your order history will appear here once you make a purchase.
                    </p>
                </Card>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <Card key={order.id}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-xl mb-2">Order #{order.id.slice(0, 8)}</CardTitle>
                                        <div className="flex items-center gap-4 text-sm text-neutral-600">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                <span>{formatDate(order.orderDate)}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <DollarSign className="h-4 w-4" />
                                                <span>{formatPrice(order.totalAmount)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                                            order.status
                                        )}`}
                                    >
                                        {order.status}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex justify-between items-center pb-3 border-b last:border-0">
                                            <div>
                                                <p className="font-medium">{item.bookTitle}</p>
                                                <p className="text-sm text-neutral-600">by {item.bookAuthor}</p>
                                                <p className="text-sm text-neutral-600">
                                                    Quantity: {item.quantity} × {formatPrice(item.orderPrice)}
                                                </p>
                                            </div>
                                            <p className="font-semibold">{formatPrice(item.subtotal)}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
