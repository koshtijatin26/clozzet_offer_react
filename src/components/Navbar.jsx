import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-transparent px-8 py-6 relative z-10 flex justify-between items-center text-white">
            <div className="navbar-logo">
                <NavLink to="/" className="text-[1.8rem] font-extrabold text-white tracking-tighter no-underline">Clozzet</NavLink>
            </div>
            <ul className="flex gap-6 list-none">
                {/* Links removed as per requirement */}
            </ul>
        </nav>
    );
};

export default Navbar;
