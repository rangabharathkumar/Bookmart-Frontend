import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface AdvancedLoaderProps {
    onComplete?: () => void
}

export function AdvancedLoader({ onComplete }: AdvancedLoaderProps) {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        // Simulate loading progress
        const duration = 2000 // 2 seconds
        const steps = 100
        const interval = duration / steps

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer)
                    setTimeout(() => onComplete?.(), 300)
                    return 100
                }
                return prev + 1
            })
        }, interval)

        return () => clearInterval(timer)
    }, [onComplete])

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 via-neutral-50 to-accent-50"
        >
            {/* Logo/Icon */}
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-glow">
                    <span className="text-4xl">📚</span>
                </div>
            </motion.div>

            {/* Progress Container */}
            <div className="w-full max-w-md px-8">
                {/* Percentage */}
                <motion.div
                    className="text-center mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <motion.span
                        key={progress}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-5xl font-bold gradient-text"
                    >
                        {progress}%
                    </motion.span>
                </motion.div>

                {/* Progress Bar Background */}
                <div className="relative h-3 bg-neutral-200 rounded-full overflow-hidden shadow-inner">
                    {/* Gradient Progress Bar */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500 rounded-full"
                    >
                        {/* Shimmer Effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                            animate={{
                                x: ['-100%', '200%'],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                        />
                    </motion.div>

                    {/* Glow Effect */}
                    <motion.div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full blur-md opacity-50"
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                </div>

                {/* Loading Text */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mt-4 text-neutral-600 font-medium"
                >
                    Loading your books...
                </motion.p>
            </div>

            {/* Floating Particles */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-primary-400 rounded-full"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: window.innerHeight + 20,
                    }}
                    animate={{
                        y: -20,
                        x: Math.random() * window.innerWidth,
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                    }}
                    style={{ opacity: 0.3 }}
                />
            ))}
        </motion.div>
    )
}

// Simple loading spinner for inline use
export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    }

    return (
        <motion.div
            className={`${sizeClasses[size]} border-3 border-primary-200 border-t-primary-600 rounded-full`}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
    )
}

// Full page loading
export function LoadingPage() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <LoadingSpinner size="lg" />
                <p className="mt-4 text-neutral-600">Loading...</p>
            </div>
        </div>
    )
}
