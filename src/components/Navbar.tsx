'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import {
  Sun,
  Moon,
  Terminal,
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  Command,
  Code2,
  FolderGit2,
  Cpu,
  BookOpen,
  Send,
  Database
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/initialData';
import { useAppNavigation } from '../utils/navigation';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onOpenCommandPalette: () => void;
  onOpenCmsStudio?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  onOpenCommandPalette,
  onOpenCmsStudio
}) => {
  const { theme, toggleTheme } = useTheme();
  const { navigateTo, goToSection, pathname } = useAppNavigation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Overview', icon: Terminal },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'skills', label: 'Skills & Experience', icon: Cpu },
    { id: 'blog', label: 'Blog & CMS', icon: BookOpen },
    { id: 'contact', label: 'Contact', icon: Send },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);

    if (id === 'projects') {
      navigateTo('/projects');
      return;
    }

    if (id === 'blog') {
      navigateTo('/blogs');
      return;
    }

    // Check if already on the home page
    const isHomePage = pathname === '/';

    if (id === 'home') {
      if (isHomePage) {
        setActiveSection('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigateTo('/');
      }
      return;
    }

    // For skills or contact: scroll on home, otherwise navigate home to the section
    if (isHomePage) {
      setActiveSection(id);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      goToSection(id);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${isScrolled
          ? 'bg-white/90 dark:bg-[#0A0A0A]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm'
          : 'bg-transparent border-b border-slate-200/50 dark:border-slate-800/60'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Terminal Brand */}
          <div className="flex items-center gap-4">
            <button
              id="brand-logo-btn"
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3.5 text-left group focus:outline-none cursor-pointer"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-sm flex items-center justify-center font-mono text-white font-bold text-xl shadow-xs group-hover:bg-blue-500 transition-colors">
                H
              </div>
              <div className="flex flex-col">
                <span className="text-slate-900 dark:text-white font-bold tracking-tighter text-base sm:text-lg uppercase">
                  {PERSONAL_INFO.name}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-mono-code">
                  Full-Stack Software Engineer
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium uppercase tracking-widest text-slate-600 dark:text-slate-300">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`transition-colors py-1 relative cursor-pointer ${isActive
                      ? 'text-blue-600 dark:text-blue-500 font-bold'
                      : 'hover:text-blue-600 dark:hover:text-blue-400 text-slate-600 dark:text-slate-400'
                    }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-500" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Utilities */}
          <div className="flex items-center gap-3">
            {/* Quick Command Palette Button */}
            <button
              id="cmd-palette-trigger"
              onClick={onOpenCommandPalette}
              aria-label="Open command palette"
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-mono-code text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800 transition-colors cursor-pointer"
            >
              <Command className="w-3.5 h-3.5 text-blue-500" />
              <span>SEARCH</span>
              <kbd className="px-1.5 py-0.5 rounded-xs bg-slate-200 dark:bg-slate-800 text-[10px] text-slate-700 dark:text-slate-300 font-mono-code">
                ⌘K
              </kbd>
            </button>

            {/* Social Icons */}
            <a
              id="header-github-link"
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub Profile"
              className="p-2 rounded-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 border border-transparent hover:border-slate-300 dark:hover:border-slate-800 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* Geometric Dark Mode Toggle Pill */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-800 text-xs font-mono-code uppercase tracking-wider text-slate-700 dark:text-slate-300 hover:border-blue-500/50 transition-all cursor-pointer shadow-xs"
            >
              {theme === 'dark' ? (
                <Moon className="w-3.5 h-3.5 text-blue-400" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-amber-500" />
              )}
              <span className="text-[10px] font-bold">{theme === 'dark' ? 'DARK' : 'LIGHT'}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 rounded-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#0F0F12] border-b border-slate-200 dark:border-slate-800 px-4 py-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-xs font-mono-code uppercase text-left text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer"
              >
                <Icon className="w-4 h-4 text-blue-500" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono-code text-slate-600 dark:text-slate-400 uppercase">Theme Mode:</span>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs font-mono-code text-slate-700 dark:text-slate-300 cursor-pointer"
            >
              {theme === 'dark' ? <Moon className="w-3.5 h-3.5 text-blue-400" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
              <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
