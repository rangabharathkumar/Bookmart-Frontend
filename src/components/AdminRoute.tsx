import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store'

interface AdminRouteProps {
    children: React.ReactNode
}

export function AdminRoute({ children }: AdminRouteProps) {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated())
    const isAdmin = useAuthStore((state) => state.isAdmin())

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />
    }

    return <>{children}</>
}
