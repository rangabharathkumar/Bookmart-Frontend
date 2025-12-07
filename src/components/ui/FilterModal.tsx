import { motion } from 'framer-motion'
import { X, Search, Filter as FilterIcon } from 'lucide-react'
import { Button } from './Button'
import { Input } from './Input'

interface FilterModalProps {
    isOpen: boolean
    onClose: () => void
    searchQuery: string
    onSearchChange: (value: string) => void
    selectedCategory: string
    onCategoryChange: (category: string) => void
    categories: string[]
    onApply: () => void
}

const categoryIcons: Record<string, string> = {
    all: '📚',
    PROGRAMMING: '💻',
    DESIGN: '🎨',
    SCIENCE: '🔬',
    FICTION: '📖',
    TECHNOLOGY: '⚡',
    HISTORY: '📜',
    BUSINESS: '💼',
    SELF_HELP: '🌟',
}

export function FilterModal({
    isOpen,
    onClose,
    searchQuery,
    onSearchChange,
    selectedCategory,
    onCategoryChange,
    categories,
    onApply,
}: FilterModalProps) {
    if (!isOpen) return null

    const handleApply = () => {
        onApply()
        onClose()
    }

    const handleReset = () => {
        onSearchChange('')
        onCategoryChange('all')
    }

    return (
        <>
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: 'spring', duration: 0.3 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-neutral-200 bg-gradient-to-r from-primary-50 to-accent-50">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-lg shadow-sm">
                                <FilterIcon className="w-5 h-5 text-primary-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-neutral-900">Filter Books</h2>
                                <p className="text-sm text-neutral-600">Search and filter by category</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                        {/* Search */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2 text-neutral-700">
                                Search Books
                            </label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                                <Input
                                    type="text"
                                    placeholder="Search by title, author, or description..."
                                    value={searchQuery}
                                    onChange={(e) => onSearchChange(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        {/* Categories */}
                        <div>
                            <label className="block text-sm font-medium mb-3 text-neutral-700">
                                Select Category
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {categories.map((category) => {
                                    const isSelected = selectedCategory === category
                                    const icon = categoryIcons[category] || '📚'
                                    const displayName = category === 'all' ? 'All Books' : category.replace('_', ' ')

                                    return (
                                        <motion.button
                                            key={category}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => onCategoryChange(category)}
                                            className={`
                                                p-4 rounded-xl border-2 transition-all text-left
                                                ${isSelected
                                                    ? 'border-primary-500 bg-gradient-to-br from-primary-50 to-accent-50 shadow-md'
                                                    : 'border-neutral-200 hover:border-primary-300 hover:bg-neutral-50'
                                                }
                                            `}
                                        >
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-2xl">{icon}</span>
                                                {isSelected && (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className="ml-auto w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center"
                                                    >
                                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </motion.div>
                                                )}
                                            </div>
                                            <p className={`text-sm font-medium ${isSelected ? 'text-primary-700' : 'text-neutral-700'}`}>
                                                {displayName}
                                            </p>
                                        </motion.button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex gap-3 p-6 border-t border-neutral-200 bg-neutral-50">
                        <Button
                            variant="outline"
                            onClick={handleReset}
                            className="flex-1"
                        >
                            Reset
                        </Button>
                        <Button
                            onClick={handleApply}
                            className="flex-1 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 shadow-glow"
                        >
                            Apply Filters
                        </Button>
                    </div>
                </motion.div>
            </div>
        </>
    )
}
