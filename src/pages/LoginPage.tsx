import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Mail, Lock, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { authService } from '@/services/authService'
import { useAuthStore } from '@/store'

export function LoginPage() {
    const navigate = useNavigate()
    const setUser = useAuthStore((state) => state.setUser)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [emailFocused, setEmailFocused] = useState(false)
    const [passwordFocused, setPasswordFocused] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await authService.login({ email, password })
            setUser(response)
            navigate('/')
        } catch (err: any) {
            setError(err.response?.data?.message || 'Invalid credentials')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative overflow-hidden bg-gradient-royal">
            {/* Animated Background Particles */}
            <div className="absolute inset-0 particles-bg" />

            {/* Floating Orbs */}
            <motion.div
                className="absolute top-20 left-20 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl"
                animate={{
                    y: [0, 50, 0],
                    x: [0, 30, 0],
                }}
                transition={{ duration: 10, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-20 right-20 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl"
                animate={{
                    y: [0, -50, 0],
                    x: [0, -30, 0],
                }}
                transition={{ duration: 12, repeat: Infinity }}
            />

            {/* Login Card */}
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, type: 'spring' }}
                className="w-full max-w-md px-4 relative z-10"
            >
                <motion.div
                    className="glass-dark rounded-3xl shadow-glass neon-border p-8"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Header */}
                    <CardHeader className="text-center pb-6">
                        <motion.div
                            className="flex justify-center mb-6"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        >
                            <div className="rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 p-4 shadow-glow">
                                <BookOpen className="h-10 w-10 text-white" />
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <CardTitle className="text-4xl text-white mb-2 flex items-center justify-center gap-2">
                                Welcome Back
                                <Sparkles className="w-6 h-6 text-accent-400" />
                            </CardTitle>
                            <CardDescription className="text-primary-200">
                                Sign in to your BookMart account
                            </CardDescription>
                        </motion.div>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Error Message */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="rounded-lg bg-error/10 border border-error/20 p-3 text-sm text-error backdrop-blur-sm"
                                >
                                    {error}
                                </motion.div>
                            )}

                            {/* Email Field */}
                            <motion.div
                                className="space-y-2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <div className="relative">
                                    <motion.label
                                        htmlFor="email"
                                        className={`absolute left-3 transition-all duration-200 pointer-events-none ${emailFocused || email
                                                ? '-top-2 text-xs bg-primary-900/50 px-2 rounded text-accent-400'
                                                : 'top-3 text-sm text-primary-200'
                                            }`}
                                        animate={{
                                            y: emailFocused || email ? -8 : 0,
                                            scale: emailFocused || email ? 0.85 : 1,
                                        }}
                                    >
                                        Email
                                    </motion.label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-300" />
                                        <Input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            onFocus={() => setEmailFocused(true)}
                                            onBlur={() => setEmailFocused(false)}
                                            className="pl-11 bg-white/5 border-primary-400/30 text-white placeholder-transparent focus:border-accent-400 focus:ring-accent-400/50 backdrop-blur-sm"
                                            required
                                        />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Password Field */}
                            <motion.div
                                className="space-y-2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <div className="relative">
                                    <motion.label
                                        htmlFor="password"
                                        className={`absolute left-3 transition-all duration-200 pointer-events-none ${passwordFocused || password
                                                ? '-top-2 text-xs bg-primary-900/50 px-2 rounded text-accent-400'
                                                : 'top-3 text-sm text-primary-200'
                                            }`}
                                        animate={{
                                            y: passwordFocused || password ? -8 : 0,
                                            scale: passwordFocused || password ? 0.85 : 1,
                                        }}
                                    >
                                        Password
                                    </motion.label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-300" />
                                        <Input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            onFocus={() => setPasswordFocused(true)}
                                            onBlur={() => setPasswordFocused(false)}
                                            className="pl-11 bg-white/5 border-primary-400/30 text-white placeholder-transparent focus:border-accent-400 focus:ring-accent-400/50 backdrop-blur-sm"
                                            required
                                        />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Submit Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white shadow-glow"
                                        disabled={loading}
                                    >
                                        {loading ? (
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
                            </motion.div>

                            {/* Sign Up Link */}
                            <motion.p
                                className="text-center text-sm text-primary-200"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                            >
                                Don't have an account?{' '}
                                <Link to="/register" className="text-accent-400 hover:text-accent-300 font-medium hover:underline">
                                    Sign up
                                </Link>
                            </motion.p>
                        </form>
                    </CardContent>
                </motion.div>
            </motion.div>
        </div>
    )
}

