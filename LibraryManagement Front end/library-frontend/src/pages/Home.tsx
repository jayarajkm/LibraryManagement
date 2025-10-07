import { useEffect, useState } from 'react';
import { type Book, getBooks, updateBook, deleteBook, addBook } from '../services/bookService';
import toast from 'react-hot-toast';

export default function Home() {
    const [books, setBooks] = useState<Book[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [draft, setDraft] = useState<Partial<Book>>({});
    const [newBook, setNewBook] = useState<Omit<Book, 'id'>>({
        title: '',
        author: '',
        genre: '',
        yearPublished: new Date().getFullYear(),
        isAvailable: true,
        borrowerId: null,
    });

    async function refresh() {
        const data = await getBooks();
        setBooks(data);
    }

    useEffect(() => {
        refresh().catch(() => toast.error('Failed to load books'));
    }, []);

    function startEdit(b: Book) {
        setEditingId(b.id);
        setDraft({ ...b });
    }

    async function saveEdit() {
        if (!editingId || !draft.title || !draft.author || !draft.genre || draft.yearPublished === undefined || draft.isAvailable === undefined) {
            toast.error('Please fill all required fields');
            return;
        }
        try {
            await updateBook(draft as Book);
            toast.success('Book updated');
            setEditingId(null);
            await refresh();
        } catch {
            toast.error('Update failed');
        }
    }

    async function remove(id: number) {
        await deleteBook(id);
        toast.success('Book deleted');
        await refresh();
    }

    async function create() {
        try {
            await addBook(newBook);
            toast.success('Book added');
            setNewBook({ title: '', author: '', genre: '', yearPublished: new Date().getFullYear(), isAvailable: true, borrowerId: null });
            await refresh();
        } catch {
            toast.error('Create failed');
        }
    }

    return (
        <div className="max-w-6xl mx-auto px-4">
            <div className="overflow-x-auto">
                <table className="min-w-full border shadow-sm rounded">
                    <thead className="bg-gray-50">
                        <tr>
                            {['Id', 'Title', 'Author', 'Genre', 'YearPublished', 'IsAvailable', 'BorrowerId', 'Actions'].map(h => (
                                <th key={h} className="border px-3 py-2 text-left text-sm font-medium text-gray-700">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(b => (
                            <tr key={b.id} className="hover:bg-gray-50">
                                <td className="border px-3 py-2">{b.id}</td>
                                <td className="border px-3 py-2">
                                    {editingId === b.id ? (
                                        <input className="border rounded px-2 py-1 w-full" value={draft.title as string || ''} onChange={e => setDraft(d => ({ ...d, title: e.target.value }))} />
                                    ) : b.title}
                                </td>
                                <td className="border px-3 py-2">
                                    {editingId === b.id ? (
                                        <input className="border rounded px-2 py-1 w-full" value={draft.author as string || ''} onChange={e => setDraft(d => ({ ...d, author: e.target.value }))} />
                                    ) : b.author}
                                </td>
                                <td className="border px-3 py-2">
                                    {editingId === b.id ? (
                                        <input className="border rounded px-2 py-1 w-full" value={draft.genre as string || ''} onChange={e => setDraft(d => ({ ...d, genre: e.target.value }))} />
                                    ) : b.genre}
                                </td>
                                <td className="border px-3 py-2">
                                    {editingId === b.id ? (
                                        <input type="number" className="border rounded px-2 py-1 w-28" value={draft.yearPublished as number || 0} onChange={e => setDraft(d => ({ ...d, yearPublished: Number(e.target.value) }))} />
                                    ) : b.yearPublished}
                                </td>
                                <td className="border px-3 py-2">
                                    {editingId === b.id ? (
                                        <input type="checkbox" checked={Boolean(draft.isAvailable)} onChange={e => setDraft(d => ({ ...d, isAvailable: e.target.checked }))} />
                                    ) : (b.isAvailable ? 'Yes' : 'No')}
                                </td>
                                <td className="border px-3 py-2">{b.borrowerId ?? ''}</td>
                                <td className="border px-3 py-2 space-x-2">
                                    {editingId === b.id ? (
                                        <>
                                            <button className="px-3 py-1 rounded bg-green-600 text-white" onClick={saveEdit}>Save</button>
                                            <button className="px-3 py-1 rounded bg-gray-300" onClick={() => setEditingId(null)}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="px-3 py-1 rounded bg-blue-600 text-white" onClick={() => startEdit(b)}>Edit</button>
                                            <button className="px-3 py-1 rounded bg-rose-600 text-white" onClick={() => remove(b.id)}>Delete</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 border rounded p-4 space-y-3">
                <h2 className="font-medium">Add New Book</h2>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
                    <input className="border rounded px-3 py-2" placeholder="Title" value={newBook.title} onChange={e => setNewBook({ ...newBook, title: e.target.value })} />
                    <input className="border rounded px-3 py-2" placeholder="Author" value={newBook.author} onChange={e => setNewBook({ ...newBook, author: e.target.value })} />
                    <input className="border rounded px-3 py-2" placeholder="Genre" value={newBook.genre} onChange={e => setNewBook({ ...newBook, genre: e.target.value })} />
                    <input type="number" className="border rounded px-3 py-2" placeholder="Year" value={newBook.yearPublished} onChange={e => setNewBook({ ...newBook, yearPublished: Number(e.target.value) })} />
                    <label className="flex items-center gap-2"><input type="checkbox" checked={newBook.isAvailable} onChange={e => setNewBook({ ...newBook, isAvailable: e.target.checked })} /> IsAvailable</label>
                    <button className="px-4 py-2 rounded bg-indigo-600 text-white" onClick={create}>Add</button>
                </div>
            </div>
        </div>
    );
}
