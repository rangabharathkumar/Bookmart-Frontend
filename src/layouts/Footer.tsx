import { Link } from 'react-router-dom'
import { BookOpen, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
    return (
        <footer className="border-t border-neutral-200 bg-neutral-900 text-neutral-300">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white mb-4">
                            <BookOpen className="h-8 w-8 text-primary-400" />
                            <span>BookMart</span>
                        </Link>
                        <p className="text-sm">
                            Your premier online bookstore for all genres. Discover, explore, and enjoy the world of books.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/books" className="hover:text-white transition-colors">Browse Books</Link></li>
                            <li><Link to="/orders" className="hover:text-white transition-colors">My Orders</Link></li>
                            <li><Link to="/profile" className="hover:text-white transition-colors">My Profile</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Categories</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/books?category=Fiction" className="hover:text-white transition-colors">Fiction</Link></li>
                            <li><Link to="/books?category=Programming" className="hover:text-white transition-colors">Programming</Link></li>
                            <li><Link to="/books?category=Business" className="hover:text-white transition-colors">Business</Link></li>
                            <li><Link to="/books?category=Science" className="hover:text-white transition-colors">Science</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                <span>support@bookmart.com</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>123 Book Street, NY</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} BookMart. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
