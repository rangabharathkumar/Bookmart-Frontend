import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Sparkles, X } from 'lucide-react'

export function WelcomeToast() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Check if user has seen the welcome message before
        const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome')

        if (!hasSeenWelcome) {
            // Show toast after a short delay
            const showTimer = setTimeout(() => {
                setIsVisible(true)
            }, 500)

            // Auto-hide after 5 seconds
            const hideTimer = setTimeout(() => {
                setIsVisible(false)
                sessionStorage.setItem('hasSeenWelcome', 'true')
            }, 5500)

            return () => {
                clearTimeout(showTimer)
                clearTimeout(hideTimer)
            }
        }
    }, [])

    const handleClose = () => {
        setIsVisible(false)
        sessionStorage.setItem('hasSeenWelcome', 'true')
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        onClick={handleClose}
                    />

                    {/* Toast in Center - Vertical Design */}
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            transition={{
                                type: 'spring',
                                stiffness: 300,
                                damping: 25
                            }}
                            className="w-full max-w-[280px] sm:max-w-xs pointer-events-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative bg-gradient-to-br from-primary-500 via-purple-500 to-accent-500 rounded-2xl shadow-2xl overflow-hidden">
                                {/* Animated background gradient */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-primary-400 via-purple-400 to-accent-400 opacity-50"
                                    animate={{
                                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: 'linear',
                                    }}
                                    style={{
                                        backgroundSize: '200% 200%',
                                    }}
                                />

                                {/* Sparkle particles - Fewer on mobile */}
                                <div className="absolute inset-0 overflow-hidden">
                                    {[...Array(3)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="absolute hidden sm:block"
                                            initial={{
                                                x: `${Math.random() * 100}%`,
                                                y: `${Math.random() * 100}%`,
                                                scale: 0,
                                                opacity: 0,
                                            }}
                                            animate={{
                                                scale: [0, 1, 0],
                                                opacity: [0, 1, 0],
                                            }}
                                            transition={{
                                                duration: 2,
                                                delay: i * 0.3,
                                                repeat: Infinity,
                                                repeatDelay: 1,
                                            }}
                                        >
                                            <Sparkles className="w-3 h-3 text-white" />
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Content - Vertical Layout */}
                                <div className="relative p-5 sm:p-6 text-white text-center">
                                    <button
                                        onClick={handleClose}
                                        className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-lg transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>

                                    {/* Waving Hand Emoji */}
                                    <motion.div
                                        animate={{
                                            rotate: [0, 10, -10, 10, 0],
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.5,
                                        }}
                                        className="text-5xl sm:text-6xl mb-4"
                                    >
                                        👋
                                    </motion.div>

                                    {/* Text in 3 Lines */}
                                    <div className="space-y-2 mb-6">
                                        <motion.h3
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="text-xl sm:text-2xl font-bold"
                                        >
                                            Welcome
                                        </motion.h3>
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="text-base sm:text-lg font-medium"
                                        >
                                            to
                                        </motion.p>
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 }}
                                            className="text-2xl sm:text-3xl font-bold bg-white/20 backdrop-blur-sm rounded-lg py-2 px-4 inline-block"
                                        >
                                            BookMart
                                        </motion.div>
                                    </div>

                                    {/* Buttons - Stacked Vertically */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                        className="flex flex-col gap-2"
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <a
                                                href="/books"
                                                className="block w-full text-center px-4 py-2.5 text-sm sm:text-base bg-white text-primary-600 rounded-lg font-semibold hover:bg-white/90 transition-colors shadow-lg"
                                                onClick={handleClose}
                                            >
                                                Browse Books
                                            </a>
                                        </motion.div>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleClose}
                                            className="w-full px-4 py-2.5 text-sm sm:text-base bg-white/20 backdrop-blur-sm rounded-lg font-semibold hover:bg-white/30 transition-colors"
                                        >
                                            Maybe Later
                                        </motion.button>
                                    </motion.div>
                                </div>

                                {/* Bottom glow effect */}
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent"
                                    animate={{
                                        opacity: [0.3, 0.8, 0.3],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                    }}
                                />
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
