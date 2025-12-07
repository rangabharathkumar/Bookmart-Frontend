import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Sparkles, X } from 'lucide-react'
import { CategorySelector } from './CategorySelector'

export function BookieBot() {
    const [isOpen, setIsOpen] = useState(false)
    const [expression, setExpression] = useState('😊')

    const expressions = ['😊', '🤓', '📚', '✨', '💡']

    // Change expression periodically
    useState(() => {
        const interval = setInterval(() => {
            setExpression(expressions[Math.floor(Math.random() * expressions.length)])
        }, 3000)
        return () => clearInterval(interval)
    })

    const handleClick = () => {
        setExpression('🎉')
        setIsOpen(true)
        setTimeout(() => setExpression('😊'), 500)
    }

    return (
        <>
            {/* Bookie Bot Mascot */}
            <motion.div
                className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, type: 'spring', stiffness: 200 }}
            >
                {/* Tooltip Bubble - Hidden on mobile */}
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute bottom-full right-0 mb-2 sm:mb-4 whitespace-nowrap hidden sm:block"
                        >
                            <div className="glass px-4 py-2 rounded-lg shadow-lg">
                                <p className="text-sm font-medium text-primary-700">
                                    Need help finding books? 📚
                                </p>
                            </div>
                            {/* Arrow */}
                            <div className="absolute top-full right-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white/70" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Bot Container */}
                <motion.button
                    onClick={handleClick}
                    className="relative group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                        y: [0, -10, 0],
                    }}
                    transition={{
                        y: {
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        },
                    }}
                >
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-primary-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />

                    {/* Bot Body - Responsive size */}
                    <div className="relative w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full shadow-glow flex items-center justify-center">
                        {/* LED Face */}
                        <motion.div
                            key={expression}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-2xl sm:text-3xl"
                        >
                            {expression}
                        </motion.div>

                        {/* Book Hologram */}
                        <motion.div
                            className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2"
                            animate={{
                                rotate: [0, 10, -10, 0],
                                y: [0, -5, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        >
                            <div className="bg-accent-500 rounded-lg p-1 sm:p-1.5 shadow-glow-accent">
                                <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                            </div>
                        </motion.div>

                        {/* Sparkle Effect */}
                        <motion.div
                            className="absolute -top-1 -left-1"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                            }}
                        >
                            <Sparkles className="w-2 h-2 sm:w-3 sm:h-3 text-accent-400" />
                        </motion.div>
                    </div>
                </motion.button>
            </motion.div>

            {/* Category Selector Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="glass-dark rounded-2xl shadow-glass max-w-4xl w-full max-h-[80vh] overflow-y-auto">
                                {/* Header */}
                                <div className="sticky top-0 glass-dark border-b border-primary-300/20 px-6 py-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                                            <span className="text-xl">{expression}</span>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-white">Bookie Bot</h2>
                                            <p className="text-sm text-primary-200">Choose a category to explore</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                    >
                                        <X className="w-5 h-5 text-white" />
                                    </button>
                                </div>

                                {/* Category Selector Content */}
                                <div className="p-6">
                                    <CategorySelector onClose={() => setIsOpen(false)} />
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
