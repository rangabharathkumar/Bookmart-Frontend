import { Link } from 'react-router-dom'
import { BookOpen, Package, Users, LayoutDashboard } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export function AdminDashboard() {
    const stats = [
        {
            title: 'Total Books',
            value: '1,234',
            icon: BookOpen,
            color: 'text-primary-600',
            bg: 'bg-primary-100',
        },
        {
            title: 'Total Orders',
            value: '567',
            icon: Package,
            color: 'text-secondary-600',
            bg: 'bg-secondary-100',
        },
        {
            title: 'Total Users',
            value: '890',
            icon: Users,
            color: 'text-success',
            bg: 'bg-success/10',
        },
    ]

    const quickActions = [
        { title: 'Manage Books', link: '/admin/books', icon: BookOpen },
        { title: 'Manage Orders', link: '/admin/orders', icon: Package },
        { title: 'Manage Users', link: '/admin/users', icon: Users },
    ]

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-8">
                <LayoutDashboard className="h-8 w-8 text-primary-600" />
                <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-neutral-600 text-sm mb-1">{stat.title}</p>
                                    <p className="text-3xl font-bold">{stat.value}</p>
                                </div>
                                <div className={`p-3 rounded-full ${stat.bg}`}>
                                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {quickActions.map((action) => (
                            <Link key={action.title} to={action.link}>
                                <Button variant="outline" className="w-full h-24 flex-col gap-2">
                                    <action.icon className="h-8 w-8" />
                                    <span>{action.title}</span>
                                </Button>
                            </Link>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
