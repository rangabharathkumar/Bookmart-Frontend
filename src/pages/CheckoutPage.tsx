import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CreditCard, Lock, Calendar, User as UserIcon } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { SuccessCelebration } from '@/components/SuccessCelebration'
import { useCartStore } from '@/store'
import { orderService } from '@/services/orderService'
import { formatPrice } from '@/lib/utils'

export function CheckoutPage() {
    const navigate = useNavigate()
    const items = useCartStore((state) => state.items)
    const getTotalPrice = useCartStore((state) => state.getTotalPrice())
    const clearCart = useCartStore((state) => state.clearCart)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showSuccess, setShowSuccess] = useState(false)
    const [orderNumber, setOrderNumber] = useState('')

    // Mock payment form state
    const [cardNumber, setCardNumber] = useState('')
    const [cardName, setCardName] = useState('')
    const [expiryDate, setExpiryDate] = useState('')
    const [cvv, setCvv] = useState('')

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const orderRequest = {
                items: items.map((item) => ({
                    bookId: item.book.id,
                    quantity: item.quantity,
                })),
            }

            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 2000))

            await orderService.placeOrder(orderRequest)
            const generatedOrderNumber = `BM${Date.now().toString().slice(-8)}`
            setOrderNumber(generatedOrderNumber)
            clearCart()
            setShowSuccess(true)
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to place order')
        } finally {
            setLoading(false)
        }
    }

    const handleSuccessClose = () => {
        setShowSuccess(false)
        navigate('/orders')
    }

    if (items.length === 0 && !showSuccess) {
        navigate('/cart')
        return null
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50 py-8">
                <div className="container mx-auto px-4">
                    <motion.h1
                        className="text-4xl font-bold mb-8 gradient-text"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Secure Checkout
                    </motion.h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Payment Form */}
                        <motion.div
                            className="lg:col-span-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <Card className="shadow-lg">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Lock className="w-5 h-5 text-green-600" />
                                        Payment Information
                                    </CardTitle>
                                    <p className="text-sm text-neutral-600 mt-2">
                                        🎭 <strong>Demo Mode:</strong> Enter any card details - all payments are simulated!
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handlePlaceOrder} className="space-y-6">
                                        {error && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-600"
                                            >
                                                {error}
                                            </motion.div>
                                        )}

                                        {/* Card Number */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Card Number</label>
                                            <div className="relative">
                                                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                                                <Input
                                                    type="text"
                                                    placeholder="1234 5678 9012 3456"
                                                    value={cardNumber}
                                                    onChange={(e) => setCardNumber(e.target.value)}
                                                    className="pl-11"
                                                    maxLength={19}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Cardholder Name */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Cardholder Name</label>
                                            <div className="relative">
                                                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                                                <Input
                                                    type="text"
                                                    placeholder="John Doe"
                                                    value={cardName}
                                                    onChange={(e) => setCardName(e.target.value)}
                                                    className="pl-11"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Expiry & CVV */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Expiry Date</label>
                                                <div className="relative">
                                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                                                    <Input
                                                        type="text"
                                                        placeholder="MM/YY"
                                                        value={expiryDate}
                                                        onChange={(e) => setExpiryDate(e.target.value)}
                                                        className="pl-11"
                                                        maxLength={5}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">CVV</label>
                                                <Input
                                                    type="text"
                                                    placeholder="123"
                                                    value={cvv}
                                                    onChange={(e) => setCvv(e.target.value)}
                                                    maxLength={4}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Order Items Preview */}
                                        <div className="border-t pt-6">
                                            <h3 className="font-semibold mb-4">Order Items ({items.length})</h3>
                                            <div className="space-y-3 max-h-60 overflow-y-auto">
                                                {items.map((item) => (
                                                    <div key={item.book.id} className="flex gap-3 pb-3 border-b last:border-0">
                                                        <img
                                                            src={item.book.imageUrl}
                                                            alt={item.book.title}
                                                            className="w-12 h-16 object-cover rounded"
                                                        />
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="font-medium text-sm truncate">{item.book.title}</h4>
                                                            <p className="text-xs text-neutral-600">Qty: {item.quantity}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-semibold text-sm">
                                                                {formatPrice(item.book.price * item.quantity)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Order Summary */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="shadow-lg sticky top-8">
                                <CardHeader>
                                    <CardTitle>Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-neutral-600">
                                            <span>Subtotal</span>
                                            <span>{formatPrice(getTotalPrice)}</span>
                                        </div>
                                        <div className="flex justify-between text-neutral-600">
                                            <span>Shipping</span>
                                            <span className="text-green-600 font-medium">FREE</span>
                                        </div>
                                        <div className="flex justify-between text-neutral-600">
                                            <span>Tax</span>
                                            <span>{formatPrice(0)}</span>
                                        </div>
                                        <div className="border-t pt-3 flex justify-between text-xl font-bold">
                                            <span>Total</span>
                                            <span className="gradient-text">{formatPrice(getTotalPrice)}</span>
                                        </div>
                                    </div>

                                    <div className="pt-4 space-y-3">
                                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                            <Button
                                                className="w-full bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 shadow-glow"
                                                size="lg"
                                                onClick={handlePlaceOrder}
                                                disabled={loading}
                                            >
                                                {loading ? (
                                                    <div className="flex items-center gap-2">
                                                        <motion.div
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                                        />
                                                        Processing...
                                                    </div>
                                                ) : (
                                                    'Complete Purchase'
                                                )}
                                            </Button>
                                        </motion.div>
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            onClick={() => navigate('/cart')}
                                            disabled={loading}
                                        >
                                            Back to Cart
                                        </Button>
                                    </div>

                                    <div className="pt-4 border-t">
                                        <div className="flex items-center gap-2 text-sm text-neutral-600">
                                            <Lock className="w-4 h-4 text-green-600" />
                                            <span>Secure SSL encrypted payment</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Success Celebration Modal */}
            <SuccessCelebration
                isOpen={showSuccess}
                onClose={handleSuccessClose}
                orderNumber={orderNumber}
            />
        </>
    )
}

