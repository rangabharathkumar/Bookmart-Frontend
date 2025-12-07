import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Filter, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { FilterModal } from '@/components/ui/FilterModal'
import { BookCard } from '@/components/BookCard'
import { LoadingPage } from '@/components/ui/LoadingSpinner'
import { bookService } from '@/services/bookService'
import type { Book } from '@/types'

export function BooksPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [books, setBooks] = useState<Book[]>([])
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all')
    const [showFilterModal, setShowFilterModal] = useState(false)

    useEffect(() => {
        loadBooks()
    }, [])

    useEffect(() => {
        filterBooks()
    }, [books, searchQuery, selectedCategory])

    const loadBooks = async () => {
        try {
            const data = await bookService.getAllBooks()
            setBooks(data)
        } catch (error) {
            console.error('Failed to load books:', error)
        } finally {
            setLoading(false)
        }
    }

    const filterBooks = () => {
        let filtered = books

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            filtered = filtered.filter(
                (book) =>
                    book.title.toLowerCase().includes(query) ||
                    book.author.toLowerCase().includes(query) ||
                    book.description.toLowerCase().includes(query)
            )
        }

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter((book) => book.category === selectedCategory)
        }

        setFilteredBooks(filtered)
    }

    const categories = ['all', ...Array.from(new Set(books.map((book) => book.category)))]

    const handleApplyFilters = () => {
        const params: Record<string, string> = {}
        if (searchQuery) params.search = searchQuery
        if (selectedCategory !== 'all') params.category = selectedCategory
        setSearchParams(params)
    }

    const handleClearFilters = () => {
        setSearchQuery('')
        setSelectedCategory('all')
        setSearchParams({})
    }

    const hasActiveFilters = searchQuery || selectedCategory !== 'all'

    if (loading) return <LoadingPage />

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50 py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl font-bold mb-2 gradient-text">Browse Books</h1>
                    <p className="text-neutral-600">Explore our complete collection</p>
                </motion.div>

                {/* Filter Button and Active Filters */}
                <motion.div
                    className="mb-4 flex items-center gap-3 flex-wrap relative z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Button
                        onClick={() => setShowFilterModal(true)}
                        className="gap-2 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 shadow-glow"
                    >
                        <Filter className="w-4 h-4" />
                        Filter & Search
                        {hasActiveFilters && (
                            <span className="ml-1 px-2 py-0.5 bg-white/30 rounded-full text-xs">
                                Active
                            </span>
                        )}
                    </Button>

                    {/* Active Filter Tags */}
                    <AnimatePresence>
                        {searchQuery && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm"
                            >
                                <span>Search: "{searchQuery}"</span>
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="hover:bg-blue-200 rounded-full p-0.5"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </motion.div>
                        )}

                        {selectedCategory !== 'all' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm"
                            >
                                <span>Category: {selectedCategory.replace('_', ' ')}</span>
                                <button
                                    onClick={() => setSelectedCategory('all')}
                                    className="hover:bg-purple-200 rounded-full p-0.5"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </motion.div>
                        )}

                        {hasActiveFilters && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={handleClearFilters}
                                className="text-sm text-neutral-600 hover:text-neutral-900 underline"
                            >
                                Clear all
                            </motion.button>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Results Count */}
                <motion.div
                    className="mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <p className="text-neutral-600">
                        Showing <span className="font-semibold text-primary-600">{filteredBooks.length}</span> {filteredBooks.length === 1 ? 'book' : 'books'}
                    </p>
                </motion.div>

                {/* Books Grid */}
                {filteredBooks.length > 0 ? (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {filteredBooks.map((book, index) => (
                            <motion.div
                                key={book.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * (index % 8) }}
                            >
                                <BookCard book={book} />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        className="text-center py-16"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className="text-6xl mb-4">📚</div>
                        <p className="text-neutral-600 text-lg mb-4">No books found matching your criteria</p>
                        <Button
                            variant="outline"
                            onClick={handleClearFilters}
                            className="gap-2"
                        >
                            <X className="w-4 h-4" />
                            Clear Filters
                        </Button>
                    </motion.div>
                )}
            </div>

            {/* Filter Modal */}
            <AnimatePresence>
                {showFilterModal && (
                    <FilterModal
                        isOpen={showFilterModal}
                        onClose={() => setShowFilterModal(false)}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        categories={categories}
                        onApply={handleApplyFilters}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}
