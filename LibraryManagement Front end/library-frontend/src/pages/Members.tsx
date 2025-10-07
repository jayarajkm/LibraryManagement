import { useEffect, useState } from 'react';
import { type Member, getMembers, updateMember, deleteMember, addMember } from '../services/memberService';
import toast from 'react-hot-toast';

export default function Members() {
    const [members, setMembers] = useState<Member[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [draft, setDraft] = useState<Partial<Member>>({});
    const [newMember, setNewMember] = useState<Omit<Member, 'id'>>({
        name: '',
        email: '',
        joinedDate: new Date().toISOString(),
    });

    async function refresh() {
        const data = await getMembers();
        setMembers(data);
    }

    useEffect(() => {
        refresh().catch(() => toast.error('Failed to load members'));
    }, []);

    function startEdit(m: Member) {
        setEditingId(m.id);
        setDraft({ ...m });
    }

    async function saveEdit() {
        if (!editingId || !draft.name || !draft.email || !draft.joinedDate) {
            toast.error('Please fill all required fields');
            return;
        }
        try {
            await updateMember(draft as Member);
            toast.success('Member updated');
            setEditingId(null);
            await refresh();
        } catch {
            toast.error('Update failed');
        }
    }

    async function remove(id: number) {
        await deleteMember(id);
        toast.success('Member deleted');
        await refresh();
    }

    async function create() {
        try {
            await addMember(newMember);
            toast.success('Member added');
            setNewMember({ name: '', email: '', joinedDate: new Date().toISOString() });
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
                            {['Id', 'Name', 'Email', 'JoinedDate', 'Actions'].map(h => (
                                <th key={h} className="border px-3 py-2 text-left text-sm font-medium text-gray-700">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {members.map(m => (
                            <tr key={m.id} className="hover:bg-gray-50">
                                <td className="border px-3 py-2">{m.id}</td>
                                <td className="border px-3 py-2">
                                    {editingId === m.id ? (
                                        <input className="border rounded px-2 py-1 w-full" value={draft.name as string || ''} onChange={e => setDraft(d => ({ ...d, name: e.target.value }))} />
                                    ) : m.name}
                                </td>
                                <td className="border px-3 py-2">
                                    {editingId === m.id ? (
                                        <input className="border rounded px-2 py-1 w-full" value={draft.email as string || ''} onChange={e => setDraft(d => ({ ...d, email: e.target.value }))} />
                                    ) : m.email}
                                </td>
                                <td className="border px-3 py-2">
                                    {editingId === m.id ? (
                                        <input className="border rounded px-2 py-1 w-56" value={draft.joinedDate as string || ''} onChange={e => setDraft(d => ({ ...d, joinedDate: e.target.value }))} />
                                    ) : new Date(m.joinedDate).toLocaleString()}
                                </td>
                                <td className="border px-3 py-2 space-x-2">
                                    {editingId === m.id ? (
                                        <>
                                            <button className="px-3 py-1 rounded bg-green-600 text-white" onClick={saveEdit}>Save</button>
                                            <button className="px-3 py-1 rounded bg-gray-300" onClick={() => setEditingId(null)}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="px-3 py-1 rounded bg-blue-600 text-white" onClick={() => startEdit(m)}>Edit</button>
                                            <button className="px-3 py-1 rounded bg-rose-600 text-white" onClick={() => remove(m.id)}>Delete</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 border rounded p-4 space-y-3">
                <h2 className="font-medium">Add New Member</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <input className="border rounded px-3 py-2" placeholder="Name" value={newMember.name} onChange={e => setNewMember({ ...newMember, name: e.target.value })} />
                    <input className="border rounded px-3 py-2" placeholder="Email" value={newMember.email} onChange={e => setNewMember({ ...newMember, email: e.target.value })} />
                    <input className="border rounded px-3 py-2" placeholder="Joined Date" value={newMember.joinedDate} onChange={e => setNewMember({ ...newMember, joinedDate: e.target.value })} />
                    <button className="px-4 py-2 rounded bg-indigo-600 text-white" onClick={create}>Add</button>
                </div>
            </div>
        </div>
    );
}
