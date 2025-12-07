import { Link, useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useCartStore } from '@/store'
import { formatPrice } from '@/lib/utils'

export function CartPage() {
    const navigate = useNavigate()
    const items = useCartStore((state) => state.items)
    const removeItem = useCartStore((state) => state.removeItem)
    const updateQuantity = useCartStore((state) => state.updateQuantity)
    const getTotalPrice = useCartStore((state) => state.getTotalPrice())

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16">
                <Card className="max-w-md mx-auto text-center py-12">
                    <ShoppingBag className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                    <p className="text-neutral-600 mb-6">
                        Start adding some books to your cart!
                    </p>
                    <Link to="/books">
                        <Button>Browse Books</Button>
                    </Link>
                </Card>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <Card key={item.book.id}>
                            <CardContent className="p-6">
                                <div className="flex gap-4">
                                    <img
                                        src={item.book.imageUrl}
                                        alt={item.book.title}
                                        className="w-24 h-32 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <Link to={`/books/${item.book.id}`}>
                                            <h3 className="font-semibold text-lg hover:text-primary-600 transition-colors">
                                                {item.book.title}
                                            </h3>
                                        </Link>
                                        <p className="text-neutral-600 text-sm mb-2">by {item.book.author}</p>
                                        <p className="text-primary-600 font-semibold text-lg mb-4">
                                            {formatPrice(item.book.price)}
                                        </p>

                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </Button>
                                                <span className="w-12 text-center font-medium">{item.quantity}</span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                                                    disabled={item.quantity >= item.book.stockQuantity}
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>

                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeItem(item.book.id)}
                                                className="text-error hover:text-error hover:bg-error/10 gap-2"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                Remove
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-lg font-semibold">
                                            {formatPrice(item.book.price * item.quantity)}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Order Summary */}
                <div>
                    <Card className="sticky top-20">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between text-neutral-600">
                                <span>Subtotal ({items.length} items)</span>
                                <span>{formatPrice(getTotalPrice)}</span>
                            </div>
                            <div className="flex justify-between text-neutral-600">
                                <span>Shipping</span>
                                <span className="text-success">FREE</span>
                            </div>
                            <div className="border-t pt-4 flex justify-between text-lg font-semibold">
                                <span>Total</span>
                                <span className="text-primary-600">{formatPrice(getTotalPrice)}</span>
                            </div>
                            <Button
                                className="w-full"
                                size="lg"
                                onClick={() => navigate('/checkout')}
                            >
                                Proceed to Checkout
                            </Button>
                            <Link to="/books">
                                <Button variant="outline" className="w-full">
                                    Continue Shopping
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
