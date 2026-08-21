'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Terminal,
  FolderGit2,
  Cpu,
  BookOpen,
  Send,
  Sun,
  Moon,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Database,
  Briefcase
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { PERSONAL_INFO } from '../data/initialData';
import { useAppNavigation } from '../utils/navigation';
import { BlogPost } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const { theme, toggleTheme } = useTheme();
  const { projects, posts } = useData();
  const { navigateTo } = useAppNavigation();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          setQuery('');
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const sections = [
    { id: 'home', label: 'Overview & Architecture Blueprint', icon: Terminal, category: 'Navigation' },
    { id: 'projects', label: 'Projects & Case Studies', icon: FolderGit2, category: 'Navigation' },
    { id: 'skills', label: 'Skills Matrix & Work Experience', icon: Cpu, category: 'Navigation' },
    { id: 'blog', label: 'Blog Articles & Payload CMS Engine', icon: BookOpen, category: 'Navigation' },
    { id: 'contact', label: 'Direct Contact & Terminal', icon: Send, category: 'Navigation' }
  ];

  const isSearchingAdmin = query.toLowerCase().includes('admin') || query.toLowerCase().includes('cms') || query.toLowerCase().includes('payload');

  const handleGoToAdmin = () => {
    navigateTo('/admin');
    onClose();
  };

  const filteredSections = sections.filter((s) =>
    s.label.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.tagline.toLowerCase().includes(query.toLowerCase()) ||
      (p.tags || []).some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredPosts = posts.filter(
    (b) =>
      b.title.toLowerCase().includes(query.toLowerCase()) ||
      b.category.toLowerCase().includes(query.toLowerCase()) ||
      (b.tags || []).some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const handleSelectSection = (id: string) => {
    if (id === 'projects') {
      navigateTo('/projects');
    } else if (id === 'blog') {
      navigateTo('/blogs');
    } else {
      onNavigate(id);
    }
    onClose();
  };

  const handleSelectProject = (projectId: string) => {
    navigateTo(`/projects/${projectId}`);
    onClose();
  };

  const handleSelectPost = (post: BlogPost) => {
    navigateTo(`/blogs/${post.slug || post.id}`);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white dark:bg-[#0F0F12] rounded-sm border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0A0A0A]">
          <Search className="w-4 h-4 text-blue-500 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sections, projects, or type 'admin' to open Payload CMS..."
            className="w-full bg-transparent text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none font-mono-code"
          />
          <kbd className="px-2 py-0.5 text-[10px] font-mono-code rounded-sm bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-4">

          {/* Admin Panel Quick Action */}
          {isSearchingAdmin && (
            <div>
              <div className="px-3 py-1 text-[10px] font-mono-code font-bold uppercase tracking-wider text-blue-500 flex items-center gap-1.5">
                <Database className="w-3 h-3" />
                <span>// Secure Payload CMS Portal</span>
              </div>
              <div className="space-y-1">
                <button
                  onClick={handleGoToAdmin}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-sm text-xs text-slate-700 dark:text-slate-300 hover:bg-blue-600/10 hover:text-blue-500 transition-colors text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Database className="w-4 h-4 text-blue-500" />
                    <span className="font-mono-code font-semibold">Open CMS Admin Dashboard (/admin)</span>
                  </div>
                  <span className="text-[9px] font-mono-code uppercase px-1.5 py-0.5 rounded-xs bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    Protected Page
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Navigation Sections */}
          {filteredSections.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[10px] font-mono-code font-bold uppercase tracking-wider text-slate-400">
                // Navigation
              </div>
              <div className="space-y-1">
                {filteredSections.map((sec) => {
                  const Icon = sec.icon;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => handleSelectSection(sec.id)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-sm text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white transition-colors text-left group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-slate-500 group-hover:text-blue-500" />
                        <span className="font-mono-code">{sec.label}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Projects */}
          {filteredProjects.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[10px] font-mono-code font-bold uppercase tracking-wider text-slate-400">
                // Projects ({filteredProjects.length})
              </div>
              <div className="space-y-1">
                {filteredProjects.slice(0, 4).map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => handleSelectProject(proj.id)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-sm text-xs text-slate-700 dark:text-slate-300 hover:bg-blue-600/10 hover:text-blue-500 text-left group cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FolderGit2 className="w-4 h-4 text-blue-500 shrink-0" />
                      <span className="font-mono-code truncate">{proj.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono-code shrink-0 ml-2">
                      {proj.category}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Blog Articles */}
          {filteredPosts.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[10px] font-mono-code font-bold uppercase tracking-wider text-slate-400">
                // Publications ({filteredPosts.length})
              </div>
              <div className="space-y-1">
                {filteredPosts.slice(0, 4).map((post) => (
                  <button
                    key={post.id}
                    onClick={() => handleSelectPost(post)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-sm text-xs text-slate-700 dark:text-slate-300 hover:bg-blue-600/10 hover:text-blue-500 text-left group cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <BookOpen className="w-4 h-4 text-blue-500 shrink-0" />
                      <span className="font-mono-code truncate">{post.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono-code shrink-0 ml-2">
                      {post.category}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Quick Footer Utilities */}
        <div className="px-4 py-2.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0A0A0A] flex items-center justify-between text-[10px] font-mono-code text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span>Navigation: ↑ ↓</span>
            <span>Select: ↵</span>
            <span>Close: ESC</span>
          </div>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 hover:text-blue-500 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
            <span>Theme: {theme.toUpperCase()}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
