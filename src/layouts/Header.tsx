import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, LogOut, BookOpen, LayoutDashboard, Search, ShoppingBag } from 'lucide-react'
import { useAuthStore, useCartStore } from '@/store'
import { authService } from '@/services/authService'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'

export function Header() {
    const navigate = useNavigate()
    const user = useAuthStore((state) => state.user)
    const logout = useAuthStore((state) => state.logout)
    const totalItems = useCartStore((state) => state.getTotalItems())
    const [searchQuery, setSearchQuery] = useState('')

    const handleLogout = () => {
        authService.logout()
        logout()
        navigate('/login')
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/books?search=${encodeURIComponent(searchQuery)}`)
        }
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors">
                    <BookOpen className="h-8 w-8" />
                    <span>BookMart</span>
                </Link>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Search books..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-10 pl-10 pr-4 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>
                </form>

                {/* Navigation */}
                <nav className="flex items-center gap-4">
                    <Link to="/books">
                        <Button variant="ghost">Browse Books</Button>
                    </Link>

                    {user ? (
                        <>
                            <Link to="/orders">
                                <Button variant="ghost" className="gap-2">
                                    <ShoppingBag className="h-4 w-4" />
                                    My Orders
                                </Button>
                            </Link>

                            {user.role === 'ADMIN' && (
                                <Link to="/admin">
                                    <Button variant="ghost" size="icon">
                                        <LayoutDashboard className="h-5 w-5" />
                                    </Button>
                                </Link>
                            )}

                            <Link to="/cart" className="relative">
                                <Button variant="ghost" size="icon">
                                    <ShoppingCart className="h-5 w-5" />
                                    {totalItems > 0 && (
                                        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-secondary-500 text-xs text-white flex items-center justify-center">
                                            {totalItems}
                                        </span>
                                    )}
                                </Button>
                            </Link>

                            <Link to="/profile">
                                <Button variant="ghost" size="icon">
                                    <User className="h-5 w-5" />
                                </Button>
                            </Link>

                            <Button variant="ghost" size="icon" onClick={handleLogout}>
                                <LogOut className="h-5 w-5" />
                            </Button>
                        </>
                    ) : (
                        <Link to="/auth">
                            <Button className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700">
                                Login / Sign Up
                            </Button>
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    )
}
