import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart, Star, Sparkles } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useCartStore } from '@/store'
import { formatPrice, truncateText } from '@/lib/utils'
import type { Book } from '@/types'
import { useState } from 'react'

interface BookCardProps {
    book: Book
}

export function BookCard({ book }: BookCardProps) {
    const addItem = useCartStore((state) => state.addItem)
    const [imageLoaded, setImageLoaded] = useState(false)
    const [isAdding, setIsAdding] = useState(false)

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault()
        setIsAdding(true)
        addItem(book, 1)

        // Reset animation after delay
        setTimeout(() => setIsAdding(false), 600)
    }

    // Category-based shadow colors
    const getCategoryShadow = (category: string) => {
        const shadows: Record<string, string> = {
            Programming: 'hover:shadow-[0_10px_40px_-10px_rgba(59,130,246,0.5)]',
            Design: 'hover:shadow-[0_10px_40px_-10px_rgba(236,72,153,0.5)]',
            Science: 'hover:shadow-[0_10px_40px_-10px_rgba(168,85,247,0.5)]',
            Fiction: 'hover:shadow-[0_10px_40px_-10px_rgba(239,68,68,0.5)]',
            Technology: 'hover:shadow-[0_10px_40px_-10px_rgba(249,115,22,0.5)]',
            History: 'hover:shadow-[0_10px_40px_-10px_rgba(34,197,94,0.5)]',
            Business: 'hover:shadow-[0_10px_40px_-10px_rgba(100,116,139,0.5)]',
        }
        return shadows[category] || 'hover:shadow-glow'
    }

    return (
        <Link to={`/books/${book.id}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="h-full"
            >
                <Card className={`h-full overflow-hidden group cursor-pointer transition-all duration-300 ${getCategoryShadow(book.category)}`}>
                    {/* Image Container with Parallax */}
                    <motion.div
                        className="aspect-[3/4] overflow-hidden bg-neutral-100 relative"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Skeleton Loader */}
                        {!imageLoaded && (
                            <div className="absolute inset-0 shimmer bg-neutral-200" />
                        )}

                        <motion.img
                            src={book.imageUrl}
                            alt={book.title}
                            className="h-full w-full object-cover"
                            onLoad={() => setImageLoaded(true)}
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{ scale: 1, opacity: imageLoaded ? 1 : 0 }}
                            transition={{ duration: 0.5 }}
                        />

                        {/* Hover Overlay */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />

                        {/* Stock Badge */}
                        {book.stockQuantity <= 5 && book.stockQuantity > 0 && (
                            <motion.div
                                initial={{ scale: 0, rotate: -12 }}
                                animate={{ scale: 1, rotate: -12 }}
                                transition={{ delay: 0.2, type: 'spring' }}
                                className="absolute top-2 right-2 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg"
                            >
                                Only {book.stockQuantity} left!
                            </motion.div>
                        )}
                    </motion.div>

                    <CardContent className="p-4">
                        {/* Category Badge */}
                        <motion.div
                            className="mb-2"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <span className="inline-flex items-center gap-1 rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700">
                                <Sparkles className="w-3 h-3" />
                                {book.category}
                            </span>
                        </motion.div>

                        <h3 className="font-semibold text-lg mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors">
                            {book.title}
                        </h3>
                        <p className="text-sm text-neutral-600 mb-2">by {book.author}</p>
                        <p className="text-sm text-neutral-500 line-clamp-2 mb-3">
                            {truncateText(book.description, 100)}
                        </p>

                        {/* Star Rating */}
                        <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.1 + i * 0.05, type: 'spring' }}
                                >
                                    <Star className="h-4 w-4 fill-accent-400 text-accent-400" />
                                </motion.div>
                            ))}
                            <span className="text-sm text-neutral-600 ml-1">(4.5)</span>
                        </div>
                    </CardContent>

                    <CardFooter className="p-4 pt-0 flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold gradient-text">{formatPrice(book.price)}</p>
                            <p className="text-xs text-neutral-500">
                                {book.stockQuantity > 0 ? `${book.stockQuantity} in stock` : 'Out of stock'}
                            </p>
                        </div>

                        {/* Animated Add to Cart Button */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                onClick={handleAddToCart}
                                disabled={book.stockQuantity === 0}
                                size="sm"
                                className="gap-2 relative overflow-hidden"
                            >
                                <motion.div
                                    animate={isAdding ? {
                                        scale: [1, 1.2, 1],
                                        rotate: [0, -10, 10, 0],
                                    } : {}}
                                    transition={{ duration: 0.4 }}
                                >
                                    <ShoppingCart className="h-4 w-4" />
                                </motion.div>
                                Add

                                {/* Ripple Effect */}
                                {isAdding && (
                                    <motion.span
                                        className="absolute inset-0 bg-white rounded-md"
                                        initial={{ scale: 0, opacity: 0.5 }}
                                        animate={{ scale: 2, opacity: 0 }}
                                        transition={{ duration: 0.6 }}
                                    />
                                )}
                            </Button>
                        </motion.div>
                    </CardFooter>
                </Card>
            </motion.div>
        </Link>
    )
}

