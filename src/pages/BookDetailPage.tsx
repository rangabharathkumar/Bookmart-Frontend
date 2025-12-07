import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ShoppingCart, ArrowLeft, Star, Package } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { LoadingPage } from '@/components/ui/LoadingSpinner'
import { bookService } from '@/services/bookService'
import { useCartStore } from '@/store'
import { formatPrice } from '@/lib/utils'
import type { Book } from '@/types'

export function BookDetailPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const addItem = useCartStore((state) => state.addItem)
    const [book, setBook] = useState<Book | null>(null)
    const [quantity, setQuantity] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        if (id) {
            loadBook(id)
        }
    }, [id])

    const loadBook = async (bookId: string) => {
        try {
            const data = await bookService.getBookById(bookId)
            setBook(data)
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to load book')
        } finally {
            setLoading(false)
        }
    }

    const handleAddToCart = () => {
        if (book) {
            addItem(book, quantity)
            navigate('/cart')
        }
    }

    if (loading) return <LoadingPage />
    if (error || !book) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <p className="text-error text-lg mb-4">{error || 'Book not found'}</p>
                <Link to="/books">
                    <Button>Back to Books</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/books">
                <Button variant="ghost" className="mb-6 gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Books
                </Button>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
                {/* Image */}
                <div>
                    <Card className="overflow-hidden">
                        <img
                            src={book.imageUrl}
                            alt={book.title}
                            className="w-full aspect-[3/4] object-cover"
                        />
                    </Card>
                </div>

                {/* Details */}
                <div>
                    <div className="mb-4">
                        <span className="inline-block rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700">
                            {book.category}
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{book.title}</h1>
                    <p className="text-lg sm:text-xl text-neutral-600 mb-4 md:mb-6">by {book.author}</p>

                    <div className="flex items-center gap-2 mb-4 md:mb-6">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className="h-4 w-4 sm:h-5 sm:w-5 fill-secondary-400 text-secondary-400"
                            />
                        ))}
                        <span className="text-sm sm:text-base text-neutral-600">(4.5 out of 5)</span>
                    </div>

                    <div className="mb-4 md:mb-6">
                        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                            {formatPrice(book.price)}
                        </p>
                        <div className="flex items-center gap-2 text-neutral-600">
                            <Package className="h-4 w-4" />
                            <span>
                                {book.stockQuantity > 0
                                    ? `${book.stockQuantity} in stock`
                                    : 'Out of stock'}
                            </span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-semibold mb-2">ISBN</h3>
                        <p className="text-neutral-600">{book.isbn}</p>
                    </div>

                    <div className="mb-8">
                        <h3 className="font-semibold mb-2">Description</h3>
                        <p className="text-neutral-600 leading-relaxed">{book.description}</p>
                    </div>

                    {/* Add to Cart */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <label htmlFor="quantity" className="font-medium">
                                    Quantity:
                                </label>
                                <input
                                    id="quantity"
                                    type="number"
                                    min="1"
                                    max={book.stockQuantity}
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-20 h-10 px-3 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                            <Button
                                onClick={handleAddToCart}
                                disabled={book.stockQuantity === 0}
                                className="w-full gap-2"
                                size="lg"
                            >
                                <ShoppingCart className="h-5 w-5" />
                                {book.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
