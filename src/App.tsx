import { Routes, Route } from 'react-router-dom'
import { Layout } from './layouts/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AdminRoute } from './components/AdminRoute'
import { WelcomeToast } from './components/WelcomeToast'

// Pages
import { HomePage } from './pages/HomePage'
import { AuthPage } from './pages/AuthPage'
import { BooksPage } from './pages/BooksPage'
import { BookDetailPage } from './pages/BookDetailPage'
import { CartPage } from './pages/CartPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { OrdersPage } from './pages/OrdersPage'
import { ProfilePage } from './pages/ProfilePage'
import { AdminDashboard } from './pages/admin/AdminDashboard'
import { AdminBooks } from './pages/admin/AdminBooks'
import { AdminOrders } from './pages/admin/AdminOrders'
import { AdminUsers } from './pages/admin/AdminUsers'

function App() {
    return (
        <>
            <WelcomeToast />
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* Public Routes */}
                    <Route index element={<HomePage />} />
                    <Route path="auth" element={<AuthPage />} />
                    <Route path="login" element={<AuthPage />} />
                    <Route path="register" element={<AuthPage />} />
                    <Route path="books" element={<BooksPage />} />
                    <Route path="books/:id" element={<BookDetailPage />} />

                    {/* Protected Routes */}
                    <Route path="cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
                    <Route path="checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
                    <Route path="orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
                    <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

                    {/* Admin Routes */}
                    <Route path="admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                    <Route path="admin/books" element={<AdminRoute><AdminBooks /></AdminRoute>} />
                    <Route path="admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
                    <Route path="admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
                </Route>
            </Routes>
        </>
    )
}

export default App

