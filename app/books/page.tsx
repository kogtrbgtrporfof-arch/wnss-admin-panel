'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  MoreVertical,
  BookOpen
} from 'lucide-react'
import { supabase, Book } from '@/lib/supabase'

export default function BooksPage() {
  const router = useRouter()
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadBooks()
  }, [])

  async function loadBooks() {
    try {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setBooks(data || [])
    } catch (error) {
      console.error('Error loading books:', error)
    } finally {
      setLoading(false)
    }
  }

  async function deleteBook(id: string) {
    if (!confirm('Are you sure you want to delete this book?')) return

    try {
      const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', id)

      if (error) throw error
      loadBooks() // Reload books
    } catch (error) {
      console.error('Error deleting book:', error)
      alert('Error deleting book')
    }
  }

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getLevelBadge = (level: string) => {
    return level === 'O' 
      ? 'bg-blue-100 text-blue-800'
      : 'bg-purple-100 text-purple-800'
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Books</h1>
            <p className="text-gray-500 mt-1">Manage your book collection</p>
          </div>
        </div>
        
        {/* Loading Skeleton */}
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="w-10 h-14 bg-gray-200 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/6"></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Books</h1>
          <p className="text-gray-500 mt-1">Manage your book collection ({books.length} books)</p>
        </div>
        <Button
          onClick={() => router.push('/books/new')}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Book
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                icon={Search}
                placeholder="Search books by title, author, or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" icon={Filter}>
                Filters
              </Button>
              <Button variant="outline" icon={Download}>
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Books Table */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">
            Book Collection ({filteredBooks.length} books)
          </h2>
        </CardHeader>
        <CardContent className="p-0">
          {filteredBooks.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-gray-500">No books found</p>
              <Button 
                className="mt-4"
                onClick={() => router.push('/books/new')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Book
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableHead>Book Details</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableHeader>
              <TableBody>
                {filteredBooks.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-14 bg-gray-100 rounded border flex items-center justify-center">
                          {book.cover_url ? (
                            <img 
                              src={book.cover_url} 
                              alt={book.title}
                              className="w-10 h-14 object-cover rounded"
                            />
                          ) : (
                            <BookOpen className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{book.title}</p>
                          <p className="text-sm text-gray-500">{book.author}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-900">{book.subject}</span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelBadge(book.level)}`}>
                        {book.level}-Level
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-900">{book.class || '-'}</span>
                    </TableCell>
                    <TableCell>
                      {book.featured ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Featured
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Standard
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/books/${book.id}`)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/books/edit/${book.id}`)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteBook(book.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
