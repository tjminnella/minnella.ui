import { useState } from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <nav className="navbar">
            <ul>
                <li className="nav-item">
                    <NavLink to="/">Dashboard</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/products">Products</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/tailwind">Tailwind</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/tailwind3">Tailwind 3</NavLink>
                </li>
                <li className={`nav-item${isContactOpen ? " is-open" : ""}`}>
                    <button
                        type="button"
                        aria-expanded={isContactOpen}
                        aria-controls="contact-submenu"
                        onClick={() => setIsContactOpen((open) => !open)}
                    >
                        Contact
                    </button>
                    <ul id="contact-submenu" className="sub-menu" aria-label="Contact submenu">
                        <li><NavLink to="/resume" onClick={() => setIsContactOpen(false)}>Resume</NavLink></li>
                        <li><a href="#">Chat</a></li>
                        <li><a href="#">Email</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    )
}