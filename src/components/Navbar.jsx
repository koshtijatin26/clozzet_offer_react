import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-transparent px-8 py-6 relative z-10 flex justify-between items-center text-white">
            <div className="navbar-logo">
                <NavLink to="/" className="no-underline">
                    <img src="/logo.png" alt="Clozzet" className="h-12 w-auto object-contain" />
                </NavLink>
            </div>
            <ul className="flex gap-6 list-none">
                {/* Links removed as per requirement */}
            </ul>
        </nav>
    );
};

export default Navbar;
