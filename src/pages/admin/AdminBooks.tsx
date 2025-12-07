import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { Modal, ConfirmDialog } from '@/components/ui/Modal'
import { LoadingPage } from '@/components/ui/LoadingSpinner'
import { bookService } from '@/services/bookService'
import { formatPrice } from '@/lib/utils'
import type { Book } from '@/types'

export function AdminBooks() {
    const [books, setBooks] = useState<Book[]>([])
    const [loading, setLoading] = useState(true)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [editingBook, setEditingBook] = useState<Book | null>(null)
    const [deletingBookId, setDeletingBookId] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        price: '',
        isbn: '',
        stockQuantity: '',
        category: '',
        imageUrl: '',
    })

    useEffect(() => {
        loadBooks()
    }, [])

    const loadBooks = async () => {
        try {
            const data = await bookService.getAllBooks()
            setBooks(data)
        } catch (error) {
            console.error('Failed to load books:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const bookData = {
                title: formData.title,
                author: formData.author,
                description: formData.description,
                price: parseFloat(formData.price),
                isbn: formData.isbn,
                stock: parseInt(formData.stockQuantity),
                category: formData.category,
                imageUrl: formData.imageUrl,
            }

            if (editingBook) {
                await bookService.updateBook(editingBook.id, bookData)
            } else {
                await bookService.addBook(bookData)
            }

            resetForm()
            loadBooks()
        } catch (error) {
            console.error('Failed to save book:', error)
            alert('Failed to save book. Please check the console for details.')
        }
    }

    const handleDelete = async () => {
        if (!deletingBookId) return

        try {
            await bookService.deleteBook(deletingBookId)
            loadBooks()
        } catch (error) {
            console.error('Failed to delete book:', error)
            alert('Failed to delete book. Please check the console for details.')
        }
    }

    const openEditModal = (book?: Book) => {
        if (book) {
            setEditingBook(book)
            setFormData({
                title: book.title,
                author: book.author,
                description: book.description,
                price: book.price.toString(),
                isbn: book.isbn,
                stockQuantity: book.stockQuantity.toString(),
                category: book.category,
                imageUrl: book.imageUrl,
            })
        } else {
            setEditingBook(null)
            resetFormData()
        }
        setShowEditModal(true)
    }

    const openDeleteDialog = (bookId: string) => {
        setDeletingBookId(bookId)
        setShowDeleteDialog(true)
    }

    const resetFormData = () => {
        setFormData({
            title: '',
            author: '',
            description: '',
            price: '',
            isbn: '',
            stockQuantity: '',
            category: '',
            imageUrl: '',
        })
    }

    const resetForm = () => {
        resetFormData()
        setEditingBook(null)
        setShowEditModal(false)
    }

    if (loading) return <LoadingPage />

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold gradient-text">Manage Books</h1>
                <Button onClick={() => openEditModal()} className="gap-2 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 shadow-glow">
                    <Plus className="h-4 w-4" />
                    Add Book
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {books.map((book) => (
                    <Card key={book.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex gap-4">
                                <img
                                    src={book.imageUrl}
                                    alt={book.title}
                                    className="w-20 h-28 object-cover rounded-lg shadow-md"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
                                    <p className="text-neutral-600 text-sm mb-2">by {book.author}</p>
                                    <div className="flex gap-4 text-sm text-neutral-600">
                                        <span>Price: {formatPrice(book.price)}</span>
                                        <span>Stock: {book.stockQuantity}</span>
                                        <span>Category: {book.category}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => openEditModal(book)}
                                        className="hover:bg-blue-50 hover:border-blue-300"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => openDeleteDialog(book.id)}
                                        className="text-red-600 hover:bg-red-50 hover:border-red-300"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Edit/Add Modal */}
            <Modal
                isOpen={showEditModal}
                onClose={resetForm}
                title={editingBook ? 'Edit Book' : 'Add New Book'}
                size="lg"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Title</label>
                            <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Author</label>
                            <Input
                                value={formData.author}
                                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full min-h-[100px] px-3 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Price</label>
                            <Input
                                type="number"
                                step="0.01"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">ISBN</label>
                            <Input
                                value={formData.isbn}
                                onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Stock Quantity</label>
                            <Input
                                type="number"
                                value={formData.stockQuantity}
                                onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full h-10 px-3 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="PROGRAMMING">Programming</option>
                                <option value="DESIGN">Design</option>
                                <option value="SCIENCE">Science</option>
                                <option value="FICTION">Fiction</option>
                                <option value="TECHNOLOGY">Technology</option>
                                <option value="HISTORY">History</option>
                                <option value="BUSINESS">Business</option>
                                <option value="SELF_HELP">Self Help</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Image URL</label>
                        <Input
                            type="url"
                            value={formData.imageUrl}
                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                            required
                        />
                    </div>

                    <div className="flex gap-3 justify-end pt-4">
                        <Button type="button" variant="outline" onClick={resetForm}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600">
                            {editingBook ? 'Update Book' : 'Add Book'}
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                isOpen={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
                onConfirm={handleDelete}
                title="Delete Book"
                message="Are you sure you want to delete this book? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                variant="danger"
            />
        </div>
    )
}
