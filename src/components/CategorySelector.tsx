import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
    Code,
    Palette,
    Brain,
    Heart,
    Rocket,
    Globe,
    Briefcase,
    Sparkles,
    BookOpen,
} from 'lucide-react'

interface CategorySelectorProps {
    onClose: () => void
}

const categories = [
    { name: 'Programming', icon: Code, color: 'from-blue-500 to-cyan-500', keyword: 'programming' },
    { name: 'Design', icon: Palette, color: 'from-pink-500 to-rose-500', keyword: 'design' },
    { name: 'Science', icon: Brain, color: 'from-purple-500 to-indigo-500', keyword: 'science' },
    { name: 'Fiction', icon: Heart, color: 'from-red-500 to-pink-500', keyword: 'fiction' },
    { name: 'Technology', icon: Rocket, color: 'from-orange-500 to-yellow-500', keyword: 'technology' },
    { name: 'History', icon: Globe, color: 'from-green-500 to-emerald-500', keyword: 'history' },
    { name: 'Business', icon: Briefcase, color: 'from-gray-500 to-slate-500', keyword: 'business' },
    { name: 'Self-Help', icon: Sparkles, color: 'from-amber-500 to-orange-500', keyword: 'self-help' },
    { name: 'All Books', icon: BookOpen, color: 'from-primary-500 to-accent-500', keyword: '' },
]

export function CategorySelector({ onClose }: CategorySelectorProps) {
    const navigate = useNavigate()

    const handleCategoryClick = (keyword: string) => {
        if (keyword) {
            navigate(`/books?search=${keyword}`)
        } else {
            navigate('/books')
        }
        onClose()
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, index) => {
                const Icon = category.icon
                return (
                    <motion.button
                        key={category.name}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                            delay: index * 0.05,
                            type: 'spring',
                            stiffness: 300,
                            damping: 20,
                        }}
                        whileHover={{
                            scale: 1.05,
                            rotateY: 5,
                            rotateX: 5,
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCategoryClick(category.keyword)}
                        className="group relative overflow-hidden rounded-xl p-6 text-left transition-all"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {/* Gradient Background */}
                        <div
                            className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90 group-hover:opacity-100 transition-opacity`}
                        />

                        {/* Glow Effect */}
                        <div
                            className={`absolute inset-0 bg-gradient-to-br ${category.color} blur-xl opacity-0 group-hover:opacity-50 transition-opacity`}
                        />

                        {/* Content */}
                        <div className="relative z-10">
                            {/* Icon */}
                            <motion.div
                                className="mb-3"
                                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="inline-flex p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                            </motion.div>

                            {/* Text */}
                            <h3 className="text-lg font-bold text-white mb-1">
                                {category.name}
                            </h3>
                            <p className="text-sm text-white/80">
                                Explore {category.name.toLowerCase()} books
                            </p>

                            {/* Hover Arrow */}
                            <motion.div
                                className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
                                initial={{ x: -10 }}
                                whileHover={{ x: 0 }}
                            >
                                <svg
                                    className="w-5 h-5 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                    />
                                </svg>
                            </motion.div>
                        </div>

                        {/* Shimmer Effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.6 }}
                        />
                    </motion.button>
                )
            })}
        </div>
    )
}
