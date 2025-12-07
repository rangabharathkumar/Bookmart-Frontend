import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Sparkles, Star, Heart } from 'lucide-react'
import { Button } from './ui/Button'

interface SuccessCelebrationProps {
    isOpen: boolean
    onClose: () => void
    orderNumber?: string
}

export function SuccessCelebration({ isOpen, onClose, orderNumber }: SuccessCelebrationProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />

                    {/* Confetti */}
                    <div className="fixed inset-0 z-50 pointer-events-none">
                        {[...Array(30)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: '-10%',
                                }}
                                initial={{ y: 0, opacity: 1, rotate: 0 }}
                                animate={{
                                    y: window.innerHeight + 100,
                                    opacity: [1, 1, 0],
                                    rotate: Math.random() * 720,
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    delay: Math.random() * 0.5,
                                    ease: 'easeIn',
                                }}
                            >
                                {i % 3 === 0 ? (
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                ) : i % 3 === 1 ? (
                                    <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
                                ) : (
                                    <Sparkles className="w-4 h-4 text-blue-400 fill-blue-400" />
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 50 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-gradient-to-br from-white via-green-50 to-emerald-50 rounded-3xl shadow-2xl max-w-md w-full p-8 relative overflow-hidden">
                            {/* Animated Background Glow */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-emerald-400/20 to-teal-400/20"
                                animate={{
                                    opacity: [0.3, 0.6, 0.3],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />

                            {/* Content */}
                            <div className="relative z-10">
                                {/* Bookie Bot Celebration */}
                                <motion.div
                                    className="flex justify-center mb-6"
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                >
                                    <motion.div
                                        className="relative"
                                        animate={{
                                            y: [0, -10, 0],
                                        }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        {/* Glow Effect */}
                                        <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-50" />

                                        {/* Bot */}
                                        <div className="relative w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-lg flex items-center justify-center">
                                            <motion.div
                                                animate={{
                                                    scale: [1, 1.2, 1],
                                                }}
                                                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                                                className="text-5xl"
                                            >
                                                🎉
                                            </motion.div>
                                        </div>

                                        {/* Sparkles around bot */}
                                        {[...Array(8)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="absolute"
                                                style={{
                                                    top: '50%',
                                                    left: '50%',
                                                }}
                                                animate={{
                                                    x: Math.cos((i * Math.PI * 2) / 8) * 60,
                                                    y: Math.sin((i * Math.PI * 2) / 8) * 60,
                                                    opacity: [0, 1, 0],
                                                    scale: [0, 1, 0],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    delay: i * 0.1,
                                                }}
                                            >
                                                <Sparkles className="w-4 h-4 text-yellow-400" />
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </motion.div>

                                {/* Success Icon */}
                                <motion.div
                                    className="flex justify-center mb-4"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                                >
                                    <CheckCircle className="w-16 h-16 text-green-600" />
                                </motion.div>

                                {/* Text */}
                                <motion.h2
                                    className="text-3xl font-bold text-center text-gray-900 mb-2"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    Order Successful! 🎊
                                </motion.h2>

                                <motion.p
                                    className="text-center text-gray-600 mb-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    Your books are on their way! 📚
                                    {orderNumber && (
                                        <span className="block mt-2 font-mono text-sm text-green-600">
                                            Order #{orderNumber}
                                        </span>
                                    )}
                                </motion.p>

                                {/* Fun Message from Bookie Bot */}
                                <motion.div
                                    className="bg-green-100 border-2 border-green-300 rounded-xl p-4 mb-6"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    <p className="text-sm text-green-800 text-center italic">
                                        "Happy reading! Can't wait for you to dive into these amazing stories!"
                                        <span className="block mt-1 text-2xl">📖✨</span>
                                    </p>
                                </motion.div>

                                {/* Close Button */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button
                                            onClick={onClose}
                                            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg"
                                        >
                                            Continue Shopping
                                        </Button>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
