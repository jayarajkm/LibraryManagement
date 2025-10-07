import axios from 'axios';

export interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    yearPublished: number;
    isAvailable: boolean;
    borrowerId?: number | null;
}

const api = axios.create({ baseURL: 'http://localhost:5000' });

export async function getBooks(): Promise<Book[]> {
    const res = await api.get('/api/Books');
    return res.data;
}

export async function addBook(book: Omit<Book, 'id'>): Promise<Book> {
    const res = await api.post('/api/Books', book);
    return res.data;
}

export async function updateBook(book: Book): Promise<void> {
    await api.put(`/api/Books/${book.id}`, book);
}

export async function deleteBook(id: number): Promise<void> {
    await api.delete(`/api/Books/${id}`);
}

export async function borrowBook(id: number, memberId: number): Promise<void> {
    await api.post(`/api/Books/${id}/borrow/${memberId}`);
}

export async function returnBook(id: number): Promise<void> {
    await api.post(`/api/Books/${id}/return`);
}
