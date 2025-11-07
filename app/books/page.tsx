'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { Modal } from '@/components/ui/Modal'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'
import { Plus, Search, Edit, Trash2, BookOpen, CheckCircle, Upload, X } from 'lucide-react'
import { supabase, Book } from '@/lib/supabase'

interface BookFormData {
  title: string
  author: string
  level: 'O' | 'A'
  class: string
  subject: string
  description: string
  keywords: string
  cover_url: string
  file_url: string
  featured: boolean
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [saving, setSaving] = useState(false)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    level: 'O',
    class: '',
    subject: '',
    description: '',
    keywords: '',
    cover_url: '',
    file_url: '',
    featured: false
  })

  useEffect(() => {
    loadBooks()
    
    // Real-time subscription for live updates
    const subscription = supabase
      .channel('books_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'books' },
        (payload) => {
          console.log('📚 Real-time book update:', payload.eventType)
          loadBooks() // Reload books on any change
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
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

  const resetForm = () => {
    setFormData({
      title: '',
      author: '',
      level: 'O',
      class: '',
      subject: '',
      description: '',
      keywords: '',
      cover_url: '',
      file_url: '',
      featured: false
    })
    setCoverFile(null)
    setPdfFile(null)
    setUploadProgress(0)
  }

  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type.startsWith('image/')) {
        setCoverFile(file)
        // Create preview URL
        const reader = new FileReader()
        reader.onloadend = () => {
          setFormData({ ...formData, cover_url: reader.result as string })
        }
        reader.readAsDataURL(file)
      } else {
        alert('Please select an image file for the cover')
      }
    }
  }

  const handlePdfFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type === 'application/pdf') {
        setPdfFile(file)
        setFormData({ ...formData, file_url: file.name })
      } else {
        alert('Please select a PDF file')
      }
    }
  }

  const openAddModal = () => {
    resetForm()
    setIsAddModalOpen(true)
  }

  const openEditModal = (book: Book) => {
    setEditingBook(book)
    setFormData({
      title: book.title,
      author: book.author,
      level: book.level,
      class: book.class || '',
      subject: book.subject,
      description: book.description || '',
      keywords: book.keywords?.join(', ') || '',
      cover_url: book.cover_url || '',
      file_url: book.file_url || '',
      featured: book.featured
    })
    setIsEditModalOpen(true)
  }

  async function handleAddBook(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    try {
      const keywordsArray = formData.keywords
        .split(',')
        .map(k => k.trim())
        .filter(k => k.length > 0)

      const { error } = await supabase
        .from('books')
        .insert([{
          ...formData,
          keywords: keywordsArray.length > 0 ? keywordsArray : null,
          class: formData.class || null,
          description: formData.description || null,
          cover_url: formData.cover_url || null,
          file_url: formData.file_url || null
        }])

      if (error) throw error

      setIsAddModalOpen(false)
      resetForm()
      alert('✅ Book added successfully!')
    } catch (error) {
      console.error('Error adding book:', error)
      alert('❌ Error adding book. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  async function handleEditBook(e: React.FormEvent) {
    e.preventDefault()
    if (!editingBook) return
    
    setSaving(true)

    try {
      const keywordsArray = formData.keywords
        .split(',')
        .map(k => k.trim())
        .filter(k => k.length > 0)

      const { error } = await supabase
        .from('books')
        .update({
          ...formData,
          keywords: keywordsArray.length > 0 ? keywordsArray : null,
          class: formData.class || null,
          description: formData.description || null,
          cover_url: formData.cover_url || null,
          file_url: formData.file_url || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingBook.id)

      if (error) throw error

      setIsEditModalOpen(false)
      setEditingBook(null)
      resetForm()
      alert('✅ Book updated successfully!')
    } catch (error) {
      console.error('Error updating book:', error)
      alert('❌ Error updating book. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDeleteBook(book: Book) {
    if (!confirm(`Are you sure you want to delete "${book.title}"?`)) return

    try {
      const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', book.id)

      if (error) throw error
      alert('✅ Book deleted successfully!')
    } catch (error) {
      console.error('Error deleting book:', error)
      alert('❌ Error deleting book. Please try again.')
    }
  }

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getLevelBadge = (level: string) => {
    return level === 'O' 
      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
      : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Books Management</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Loading books...</p>
          </div>
        </div>
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Books Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your book collection • {books.length} total books • <span className="text-green-600 dark:text-green-400">●</span> Real-time sync
          </p>
        </div>
        <Button onClick={openAddModal} className="bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600">
          <Plus className="w-4 h-4 mr-2" />
          Add New Book
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              icon={Search}
              placeholder="Search books by title, author, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            />
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <BookOpen className="w-4 h-4" />
            <span>{filteredBooks.length} results</span>
          </div>
        </div>
      </div>

      {/* Books Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-sky-100 dark:bg-sky-900/40 rounded-lg">
              <BookOpen className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Book Collection ({filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'})
            </h2>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredBooks.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">
                {searchTerm ? 'No books match your search' : 'No books added yet'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                {searchTerm ? 'Try adjusting your search terms' : 'Start building your library catalog'}
              </p>
              {!searchTerm && (
                <Button onClick={openAddModal}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Book
                </Button>
              )}
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
                          <CheckCircle className="w-3 h-3 mr-1" />
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
                          onClick={() => openEditModal(book)}
                          title="Edit book"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteBook(book)}
                          title="Delete book"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
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

      {/* Add Book Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Book"
        size="lg"
      >
        <form onSubmit={handleAddBook} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Book Title *"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="Enter book title"
            />
            <Input
              label="Author *"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              required
              placeholder="Enter author name"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Select
              label="Level *"
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value as 'O' | 'A' })}
              required
            >
              <option value="O">O-Level</option>
              <option value="A">A-Level</option>
            </Select>
            <Input
              label="Class"
              value={formData.class}
              onChange={(e) => setFormData({ ...formData, class: e.target.value })}
              placeholder="e.g., Form 1, Form 2"
            />
            <Input
              label="Subject *"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
              placeholder="e.g., Mathematics"
            />
          </div>

          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Brief description of the book..."
          />

          <Input
            label="Keywords (comma-separated)"
            value={formData.keywords}
            onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
            placeholder="e.g., algebra, geometry, calculus"
          />

          {/* File Uploads */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cover Image
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex-1 cursor-pointer">
                  <div className={`
                    border-2 border-dashed rounded-lg p-4
                    ${coverFile 
                      ? 'border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/20' 
                      : 'border-gray-300 dark:border-gray-600 hover:border-sky-500 dark:hover:border-sky-400'
                    }
                    transition-colors
                  `}>
                    <div className="flex items-center justify-center space-x-2">
                      <Upload className={`w-5 h-5 ${coverFile ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`} />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {coverFile ? coverFile.name : 'Click to upload cover image'}
                      </span>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverFileChange}
                    className="hidden"
                  />
                </label>
                {coverFile && (
                  <button
                    type="button"
                    onClick={() => {
                      setCoverFile(null)
                      setFormData({ ...formData, cover_url: '' })
                    }}
                    className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              {coverFile && formData.cover_url && (
                <div className="mt-2">
                  <img
                    src={formData.cover_url}
                    alt="Cover preview"
                    className="h-32 w-auto rounded border border-gray-200 dark:border-gray-700"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                PDF File *
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex-1 cursor-pointer">
                  <div className={`
                    border-2 border-dashed rounded-lg p-4
                    ${pdfFile 
                      ? 'border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/20' 
                      : 'border-gray-300 dark:border-gray-600 hover:border-sky-500 dark:hover:border-sky-400'
                    }
                    transition-colors
                  `}>
                    <div className="flex items-center justify-center space-x-2">
                      <Upload className={`w-5 h-5 ${pdfFile ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`} />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {pdfFile ? pdfFile.name : 'Click to upload PDF file'}
                      </span>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handlePdfFileChange}
                    className="hidden"
                  />
                </label>
                {pdfFile && (
                  <button
                    type="button"
                    onClick={() => {
                      setPdfFile(null)
                      setFormData({ ...formData, file_url: '' })
                    }}
                    className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              {pdfFile && (
                <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                  ✓ PDF ready to upload: {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 text-blue-600 dark:bg-gray-800 rounded"
            />
            <label htmlFor="featured" className="text-sm text-gray-700 dark:text-gray-300">
              Mark as Featured Book
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'Adding...' : 'Add Book'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Book Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Book"
        size="lg"
      >
        <form onSubmit={handleEditBook} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Book Title *"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <Input
              label="Author *"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Select
              label="Level *"
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value as 'O' | 'A' })}
              required
            >
              <option value="O">O-Level</option>
              <option value="A">A-Level</option>
            </Select>
            <Input
              label="Class"
              value={formData.class}
              onChange={(e) => setFormData({ ...formData, class: e.target.value })}
            />
            <Input
              label="Subject *"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
            />
          </div>

          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <Input
            label="Keywords (comma-separated)"
            value={formData.keywords}
            onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
          />

          {/* File Uploads - Same as Add Modal */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cover Image {formData.cover_url && '(Current cover will be replaced)'}
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex-1 cursor-pointer">
                  <div className={`
                    border-2 border-dashed rounded-lg p-4
                    ${coverFile 
                      ? 'border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/20' 
                      : 'border-gray-300 dark:border-gray-600 hover:border-sky-500 dark:hover:border-sky-400'
                    }
                    transition-colors
                  `}>
                    <div className="flex items-center justify-center space-x-2">
                      <Upload className={`w-5 h-5 ${coverFile ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`} />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {coverFile ? coverFile.name : 'Click to upload new cover'}
                      </span>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverFileChange}
                    className="hidden"
                  />
                </label>
                {coverFile && (
                  <button
                    type="button"
                    onClick={() => {
                      setCoverFile(null)
                      setFormData({ ...formData, cover_url: editingBook?.cover_url || '' })
                    }}
                    className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              {coverFile && formData.cover_url && (
                <div className="mt-2">
                  <img
                    src={formData.cover_url}
                    alt="Cover preview"
                    className="h-32 w-auto rounded border border-gray-200 dark:border-gray-700"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                PDF File {formData.file_url && '(Current file will be replaced)'}
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex-1 cursor-pointer">
                  <div className={`
                    border-2 border-dashed rounded-lg p-4
                    ${pdfFile 
                      ? 'border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/20' 
                      : 'border-gray-300 dark:border-gray-600 hover:border-sky-500 dark:hover:border-sky-400'
                    }
                    transition-colors
                  `}>
                    <div className="flex items-center justify-center space-x-2">
                      <Upload className={`w-5 h-5 ${pdfFile ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`} />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {pdfFile ? pdfFile.name : 'Click to upload new PDF'}
                      </span>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handlePdfFileChange}
                    className="hidden"
                  />
                </label>
                {pdfFile && (
                  <button
                    type="button"
                    onClick={() => {
                      setPdfFile(null)
                      setFormData({ ...formData, file_url: editingBook?.file_url || '' })
                    }}
                    className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              {pdfFile && (
                <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                  ✓ PDF ready to upload: {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="featured-edit"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 text-blue-600 dark:bg-gray-800 rounded"
            />
            <label htmlFor="featured-edit" className="text-sm text-gray-700 dark:text-gray-300">
              Mark as Featured Book
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
