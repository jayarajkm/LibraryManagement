import axios from 'axios';

export interface Member {
    id: number;
    name: string;
    email: string;
    joinedDate: string; // ISO string
}

const api = axios.create({ baseURL: 'http://localhost:5000' });

export async function getMembers(): Promise<Member[]> {
    const res = await api.get('/api/Members');
    return res.data;
}

export async function addMember(member: Omit<Member, 'id'>): Promise<Member> {
    const res = await api.post('/api/Members', member);
    return res.data;
}

export async function updateMember(member: Member): Promise<void> {
    await api.put(`/api/Members/${member.id}`, member);
}

export async function deleteMember(id: number): Promise<void> {
    await api.delete(`/api/Members/${id}`);
}
