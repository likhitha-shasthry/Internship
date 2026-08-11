import React, { useState, useEffect } from 'react';

function Navbar({ navigation }) {
  const [theme, setTheme] = useState('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => { const saved = localStorage.getItem('theme') || 'light'; setTheme(saved); document.documentElement.dataset.theme = saved; }, []);
  const toggleTheme = () => { const next = theme === 'light' ? 'dark' : 'light'; setTheme(next); document.documentElement.dataset.theme = next; localStorage.setItem('theme', next); };
  return <nav className="navbar"><div className="navbar-content">
    <a href="#" className="logo"><span>skill100<em>.ai</em></span> Physics</a>
    <div className="nav-center hidden-mobile">{navigation.slice(0, 5).map((nav, idx) => <a key={idx} href={nav.href} className="nav-link-item">{nav.label}</a>)}</div>
    <div className="nav-actions hidden-mobile"><button onClick={toggleTheme} className="btn-login">{theme === 'dark' ? 'Light mode' : 'Dark mode'}</button><a href="#summary" className="btn-primary">Summary</a></div>
    <button className="menu-toggle show-mobile" aria-label="Toggle menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>☰</button>
  </div>{mobileMenuOpen && <div className="mobile-dropdown">{navigation.map((nav, idx) => <a key={idx} href={nav.href} className="nav-link-item">{nav.label}</a>)}</div>}</nav>;
}
export default Navbar;
