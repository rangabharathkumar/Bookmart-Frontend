import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, BookOpen, ShoppingBag, TrendingUp, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { BookCard } from '@/components/BookCard'
import { LoadingPage } from '@/components/ui/LoadingSpinner'
import { BookieBot } from '@/components/BookieBot'
import { bookService } from '@/services/bookService'
import type { Book } from '@/types'

export function HomePage() {
    const [featuredBooks, setFeaturedBooks] = useState<Book[]>([])
    const [loading, setLoading] = useState(true)
    const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 })
    const [booksRef, booksInView] = useInView({ triggerOnce: true, threshold: 0.1 })

    useEffect(() => {
        loadFeaturedBooks()
    }, [])

    const loadFeaturedBooks = async () => {
        try {
            const books = await bookService.getAllBooks()
            setFeaturedBooks(books.slice(0, 8))
        } catch (error) {
            console.error('Failed to load books:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <LoadingPage />

    return (
        <div>
            {/* Bookie Bot Mascot */}
            <BookieBot />

            {/* Hero Section with Parallax */}
            <section className="relative overflow-hidden bg-gradient-royal text-white">
                {/* Animated Background Particles */}
                <div className="absolute inset-0 particles-bg opacity-50" />

                {/* Floating Orbs */}
                <motion.div
                    className="absolute top-20 left-10 w-64 h-64 bg-accent-500/20 rounded-full blur-3xl"
                    animate={{
                        y: [0, 30, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl"
                    animate={{
                        y: [0, -40, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                />

                <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
                    <div className="max-w-3xl">
                        {/* Animated Heading */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.h1
                                className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                            >
                                Discover Your Next
                                <motion.span
                                    className="block text-accent-400 flex items-center gap-3"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                >
                                    Great Read
                                    <Sparkles className="w-12 h-12 animate-pulse" />
                                </motion.span>
                            </motion.h1>
                        </motion.div>

                        <motion.p
                            className="text-xl md:text-2xl mb-8 text-primary-100"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                        >
                            Explore thousands of books across all genres. From bestsellers to hidden gems,
                            find your perfect book at BookMart.
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.8 }}
                        >
                            <Link to="/books">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button size="lg" className="gap-2 bg-accent-500 hover:bg-accent-600 text-white shadow-glow-accent">
                                        Browse Books
                                        <ArrowRight className="h-5 w-5" />
                                    </Button>
                                </motion.div>
                            </Link>
                            <Link to="/register">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20 backdrop-blur-sm">
                                        Get Started
                                    </Button>
                                </motion.div>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Wave Divider */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 80C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F3F5FA" />
                    </svg>
                </div>
            </section>

            {/* Features Section */}
            <section ref={featuresRef} className="py-16 bg-neutral-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: BookOpen, title: 'Vast Collection', desc: 'Thousands of books across all genres and categories', color: 'primary', delay: 0 },
                            { icon: ShoppingBag, title: 'Easy Shopping', desc: 'Simple and secure checkout process', color: 'accent', delay: 0.1 },
                            { icon: TrendingUp, title: 'Best Prices', desc: 'Competitive prices and regular discounts', color: 'primary', delay: 0.2 },
                        ].map((feature, index) => {
                            const Icon = feature.icon
                            return (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: feature.delay, duration: 0.6 }}
                                    className="text-center group"
                                >
                                    <motion.div
                                        className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-${feature.color}-100 mb-4 group-hover:shadow-glow transition-all duration-300`}
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                    >
                                        <Icon className={`h-10 w-10 text-${feature.color}-600`} />
                                    </motion.div>
                                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-neutral-600">{feature.desc}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Featured Books Section */}
            <section ref={booksRef} className="py-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="flex items-center justify-between mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={booksInView ? { opacity: 1, y: 0 } : {}}
                    >
                        <div>
                            <h2 className="text-4xl font-bold mb-2 gradient-text">Featured Books</h2>
                            <p className="text-neutral-600">Discover our handpicked selection</p>
                        </div>
                        <Link to="/books">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button variant="outline" className="gap-2">
                                    View All
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </motion.div>
                        </Link>
                    </motion.div>

                    {/* Staggered Grid Animation */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredBooks.map((book, index) => (
                            <motion.div
                                key={book.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={booksInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                <BookCard book={book} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-royal text-white relative overflow-hidden">
                {/* Animated Background */}
                <motion.div
                    className="absolute inset-0 opacity-30"
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,184,0,0.3) 1px, transparent 1px)',
                        backgroundSize: '50px 50px',
                    }}
                />

                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Ready to Start Reading?
                        </h2>
                        <p className="text-xl mb-8 text-white/90">
                            Join thousands of readers and find your next favorite book today
                        </p>
                        <Link to="/register">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button size="lg" className="bg-accent-500 hover:bg-accent-600 text-white shadow-glow-accent">
                                    Create Free Account
                                </Button>
                            </motion.div>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

