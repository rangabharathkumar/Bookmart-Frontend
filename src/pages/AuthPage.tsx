import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Mail, Lock, User, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { authService } from '@/services/authService'
import { useAuthStore } from '@/store'

export function AuthPage() {
    const navigate = useNavigate()
    const setUser = useAuthStore((state) => state.setUser)
    const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login')

    // Login state
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [loginError, setLoginError] = useState('')
    const [loginLoading, setLoginLoading] = useState(false)

    // Signup state
    const [signupName, setSignupName] = useState('')
    const [signupEmail, setSignupEmail] = useState('')
    const [signupPassword, setSignupPassword] = useState('')
    const [signupError, setSignupError] = useState('')
    const [signupLoading, setSignupLoading] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoginError('')
        setLoginLoading(true)

        try {
            const response = await authService.login({ email: loginEmail, password: loginPassword })
            setUser(response)
            navigate('/')
        } catch (err: any) {
            setLoginError(err.response?.data?.message || 'Invalid credentials')
        } finally {
            setLoginLoading(false)
        }
    }

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setSignupError('')
        setSignupLoading(true)

        try {
            await authService.register({ name: signupName, email: signupEmail, password: signupPassword })
            // Auto-login after signup
            const response = await authService.login({ email: signupEmail, password: signupPassword })
            setUser(response)
            navigate('/')
        } catch (err: any) {
            setSignupError(err.response?.data?.message || 'Registration failed')
        } finally {
            setSignupLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4">
            {/* Animated Stars Background */}
            <div className="absolute inset-0">
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0.2, 1, 0.2],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 2 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            {/* Floating Gradient Orbs - Hidden on mobile */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-full blur-3xl hidden sm:block"
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 20, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl hidden sm:block"
                animate={{
                    x: [0, -100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.3, 1],
                }}
                transition={{ duration: 25, repeat: Infinity }}
            />

            {/* Auth Card */}
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, type: 'spring' }}
                className="w-full max-w-md relative z-10"
            >
                <motion.div
                    className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 border-white/20 overflow-hidden"
                    whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.4)' }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Glowing Border Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-20 blur-xl" />

                    <div className="relative bg-gradient-to-br from-white/5 to-white/10 p-8">
                        {/* Logo */}
                        <motion.div
                            className="flex justify-center mb-6"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                        >
                            <div className="relative">
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur-lg"
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                <div className="relative rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 p-4">
                                    <BookOpen className="h-12 w-12 text-white" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-2 flex items-center justify-center gap-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            BookMart
                            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                        </motion.h1>
                        <motion.p
                            className="text-center text-sm sm:text-base text-white/70 mb-4 sm:mb-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            Your gateway to endless stories
                        </motion.p>

                        {/* Tab Switcher */}
                        <div className="flex gap-2 mb-6 bg-white/5 p-1 rounded-xl">
                            <button
                                onClick={() => setActiveTab('login')}
                                className="relative flex-1 py-3 rounded-lg font-medium transition-all"
                            >
                                {activeTab === 'login' && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10 text-white">Login</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('signup')}
                                className="relative flex-1 py-3 rounded-lg font-medium transition-all"
                            >
                                {activeTab === 'signup' && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10 text-white">Sign Up</span>
                            </button>
                        </div>

                        {/* Forms */}
                        <AnimatePresence mode="wait">
                            {activeTab === 'login' ? (
                                <motion.form
                                    key="login"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                    onSubmit={handleLogin}
                                    className="space-y-4"
                                >
                                    {loginError && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="rounded-lg bg-red-500/20 border border-red-500/50 p-3 text-sm text-red-200"
                                        >
                                            {loginError}
                                        </motion.div>
                                    )}

                                    <div className="space-y-2">
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                                            <Input
                                                type="email"
                                                placeholder="Email"
                                                value={loginEmail}
                                                onChange={(e) => setLoginEmail(e.target.value)}
                                                className="pl-11 bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-pink-500 focus:ring-pink-500/50"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                                            <Input
                                                type="password"
                                                placeholder="Password"
                                                value={loginPassword}
                                                onChange={(e) => setLoginPassword(e.target.value)}
                                                className="pl-11 bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-pink-500 focus:ring-pink-500/50"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-lg shadow-pink-500/50"
                                            disabled={loginLoading}
                                        >
                                            {loginLoading ? (
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                                />
                                            ) : (
                                                'Sign In'
                                            )}
                                        </Button>
                                    </motion.div>
                                </motion.form>
                            ) : (
                                <motion.form
                                    key="signup"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    onSubmit={handleSignup}
                                    className="space-y-4"
                                >
                                    {signupError && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="rounded-lg bg-red-500/20 border border-red-500/50 p-3 text-sm text-red-200"
                                        >
                                            {signupError}
                                        </motion.div>
                                    )}

                                    <div className="space-y-2">
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                                            <Input
                                                type="text"
                                                placeholder="Full Name"
                                                value={signupName}
                                                onChange={(e) => setSignupName(e.target.value)}
                                                className="pl-11 bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-blue-500 focus:ring-blue-500/50"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                                            <Input
                                                type="email"
                                                placeholder="Email"
                                                value={signupEmail}
                                                onChange={(e) => setSignupEmail(e.target.value)}
                                                className="pl-11 bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-blue-500 focus:ring-blue-500/50"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                                            <Input
                                                type="password"
                                                placeholder="Password"
                                                value={signupPassword}
                                                onChange={(e) => setSignupPassword(e.target.value)}
                                                className="pl-11 bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-blue-500 focus:ring-blue-500/50"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg shadow-blue-500/50"
                                            disabled={signupLoading}
                                        >
                                            {signupLoading ? (
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                                />
                                            ) : (
                                                'Create Account'
                                            )}
                                        </Button>
                                    </motion.div>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}
