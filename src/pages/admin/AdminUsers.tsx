import { useEffect, useState } from 'react'
import { Users as UsersIcon, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/Modal'
import { LoadingPage } from '@/components/ui/LoadingSpinner'
import { userService } from '@/services/userService'
import { formatDate } from '@/lib/utils'
import type { User } from '@/types'

export function AdminUsers() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [deletingUserId, setDeletingUserId] = useState<string | null>(null)
    const [deletingUserName, setDeletingUserName] = useState<string>('')

    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = async () => {
        try {
            const data = await userService.getAllUsers()
            setUsers(data)
        } catch (error) {
            console.error('Failed to load users:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleUpdateRole = async (email: string, role: 'USER' | 'ADMIN') => {
        try {
            await userService.updateUserRole(email, role)
            loadUsers()
        } catch (error) {
            console.error('Failed to update user role:', error)
            alert('Failed to update user role. Please check the console for details.')
        }
    }

    const openDeleteDialog = (user: User) => {
        setDeletingUserId(user.id)
        setDeletingUserName(user.name)
        setShowDeleteDialog(true)
    }

    const handleDeleteUser = async () => {
        if (!deletingUserId) return

        try {
            await userService.deleteUser(deletingUserId)
            loadUsers()
        } catch (error) {
            console.error('Failed to delete user:', error)
            alert('Failed to delete user. Please check the console for details.')
        }
    }

    if (loading) return <LoadingPage />

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 gradient-text">Manage Users</h1>

            {users.length === 0 ? (
                <Card className="text-center py-12">
                    <UsersIcon className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">No users found</h2>
                </Card>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {users.map((user) => (
                        <Card key={user.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-xl mb-1">{user.name}</CardTitle>
                                        <p className="text-neutral-600">{user.email}</p>
                                        <p className="text-sm text-neutral-500 mt-1">
                                            Member since {formatDate(user.createdAt)}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${user.role === 'ADMIN'
                                                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-glow'
                                                    : 'bg-neutral-200 text-neutral-700'
                                                }`}
                                        >
                                            {user.role}
                                        </span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        variant={user.role === 'USER' ? 'default' : 'outline'}
                                        onClick={() => handleUpdateRole(user.email, 'USER')}
                                        className={user.role === 'USER' ? 'bg-gradient-to-r from-primary-500 to-accent-500' : ''}
                                    >
                                        Set as User
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant={user.role === 'ADMIN' ? 'default' : 'outline'}
                                        onClick={() => handleUpdateRole(user.email, 'ADMIN')}
                                        className={user.role === 'ADMIN' ? 'bg-gradient-to-r from-primary-500 to-accent-500' : ''}
                                    >
                                        Set as Admin
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => openDeleteDialog(user)}
                                        className="text-red-600 hover:bg-red-50 hover:border-red-300 ml-auto gap-2"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                isOpen={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
                onConfirm={handleDeleteUser}
                title="Delete User"
                message={`Are you sure you want to delete ${deletingUserName}? This action cannot be undone and will remove all their data.`}
                confirmText="Delete User"
                cancelText="Cancel"
                variant="danger"
            />
        </div>
    )
}
