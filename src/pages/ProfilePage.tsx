import { motion } from 'framer-motion'
import { User, Mail, Shield, Calendar, ShoppingBag, BookOpen, Settings, ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useAuthStore } from '@/store'
import { Link, Navigate, useNavigate } from 'react-router-dom'

export function ProfilePage() {
    const user = useAuthStore((state) => state.user)
    const navigate = useNavigate()

    // If no user, redirect to login
    if (!user) {
        return <Navigate to="/login" replace />
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50 py-8">
            <div className="container mx-auto px-4">
                {/* Back Button */}
                <div className="mb-4">
                    <Button
                        variant="outline"
                        onClick={() => navigate(-1)}
                        className="gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Button>
                </div>

                <motion.h1
                    className="text-4xl font-bold mb-8 gradient-text"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    My Profile
                </motion.h1>


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile Info */}
                    <motion.div
                        className="lg:col-span-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="w-5 h-5 text-primary-600" />
                                    Profile Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <motion.div
                                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary-50 to-neutral-50 rounded-lg border border-primary-100"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="p-2 bg-primary-100 rounded-lg">
                                        <User className="h-5 w-5 text-primary-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-neutral-600">Name</p>
                                        <p className="font-semibold text-lg">{user.name}</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-neutral-50 rounded-lg border border-blue-100"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <Mail className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-neutral-600">Email</p>
                                        <p className="font-semibold">{user.email}</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-neutral-50 rounded-lg border border-purple-100"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        <Shield className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-neutral-600">Role</p>
                                        <span
                                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${user.role === 'ADMIN'
                                                ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-glow'
                                                : 'bg-neutral-200 text-neutral-700'
                                                }`}
                                        >
                                            {user.role}
                                        </span>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-neutral-50 rounded-lg border border-green-100"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <Calendar className="h-5 w-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-neutral-600">User ID</p>
                                        <p className="font-semibold">#{user.id}</p>
                                    </div>
                                </motion.div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Settings className="w-5 h-5 text-primary-600" />
                                    Quick Actions
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Link to="/orders">
                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button variant="outline" className="w-full justify-start gap-2 hover:bg-primary-50 hover:border-primary-300">
                                            <ShoppingBag className="w-4 h-4" />
                                            View My Orders
                                        </Button>
                                    </motion.div>
                                </Link>
                                <Link to="/books">
                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button variant="outline" className="w-full justify-start gap-2 hover:bg-blue-50 hover:border-blue-300">
                                            <BookOpen className="w-4 h-4" />
                                            Browse Books
                                        </Button>
                                    </motion.div>
                                </Link>
                                {user.role === 'ADMIN' && (
                                    <Link to="/admin">
                                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                            <Button className="w-full justify-start gap-2 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white shadow-glow">
                                                <Shield className="w-4 h-4" />
                                                Admin Dashboard
                                            </Button>
                                        </motion.div>
                                    </Link>
                                )}
                            </CardContent>
                        </Card>

                        {/* Welcome Message */}
                        <motion.div
                            className="mt-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Card className="bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-glow">
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold mb-2">Welcome back, {user.name.split(' ')[0]}! 👋</h3>
                                    <p className="text-white/90 text-sm">
                                        Ready to discover your next great read?
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
