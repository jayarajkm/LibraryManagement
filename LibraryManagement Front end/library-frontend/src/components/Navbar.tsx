import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const baseLink = 'px-3 py-2 rounded transition-colors';
    const active = 'bg-blue-600 text-white';
    const inactive = 'text-blue-700 hover:bg-blue-100';

    return (
        <header className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-between h-14">
                    <div className="flex items-center gap-3">
                        <h1 className="text-lg font-semibold text-gray-800">Library Management</h1>
                    </div>
                    {/* <button className="md:hidden p-2 rounded hover:bg-white/60" aria-label="Toggle menu" onClick={() => setOpen(v => !v)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-700">
                            <path fillRule="evenodd" d="M3.75 6.75A.75.75 0 014.5 6h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zm0 5.25a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zm.75 4.5a.75.75 0 000 1.5h15a.75.75 0 000-1.5h-15z" clipRule="evenodd" />
                        </svg>
                    </button> */}
                    <nav className="hidden md:flex items-center gap-2">
                        <NavLink to="/" className={({ isActive }) => `${baseLink} ${isActive ? active : inactive}`} end>
                            <span>📚 Books</span>
                        </NavLink>
                        <NavLink to="/members" className={({ isActive }) => `${baseLink} ${isActive ? active : inactive}`}>
                            <span>👥 Members</span>
                        </NavLink>
                    </nav>
                </div>
                {open && (
                    <div className="md:hidden pb-3">
                        <div className="flex flex-col gap-2">
                            <NavLink to="/" onClick={() => setOpen(false)} className={({ isActive }) => `${baseLink} ${isActive ? active : 'hover:bg-white text-blue-700'}`} end>
                                <span>📚 Books</span>
                            </NavLink>
                            <NavLink to="/members" onClick={() => setOpen(false)} className={({ isActive }) => `${baseLink} ${isActive ? active : 'hover:bg-white text-blue-700'}`}>
                                <span>👥 Members</span>
                            </NavLink>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
