'use client';

import React, { useState, useMemo } from 'react';
import { Project } from '@/types';
import {
  FolderGit2,
  ExternalLink,
  Github,
  Search,
  Layers,
  Database,
  Server,
  ArrowRight,
  ArrowLeft,
  SlidersHorizontal,
  Activity,
  CheckCircle2,
  Code2,
  Sparkles,
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CommandPalette } from '@/components/CommandPalette';
import { useAppNavigation } from '@/utils/navigation';

export default function ProjectsPage() {
  const { projects } = useData();
  const { navigateTo, goToSection } = useAppNavigation();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);

  const categories = ['All', 'Fullstack', 'Backend & DB', 'Frontend & UI', 'DevOps & Cloud'];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.tags || []).some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  const handleProjectClick = (projectId: string) => {
    navigateTo(`/projects/${projectId}`);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0A0A0A] text-slate-800 dark:text-slate-300 font-sans transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        activeSection="projects"
        setActiveSection={() => { }}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      <main className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 mb-6 text-xs font-mono-code text-slate-500 dark:text-slate-400">
          <button
            onClick={() => navigateTo('/')}
            className="hover:text-blue-500 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-semibold">Projects & Architecture</span>
        </div>

        {/* Page Hero Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800 mb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono-code text-blue-500 font-semibold uppercase tracking-[0.2em]">
                // PRODUCTION_SYSTEMS_INDEX
              </span>
              <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-pulse" />
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase font-mono-code">
              Engineering Projects & Systems
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              Explore production architectures, headless content engines, PostgreSQL diagnostics, and enterprise full-stack solutions architected by Hendra Gunawan.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-3.5 py-2 rounded-sm bg-blue-500/10 border border-blue-500/20 text-xs font-mono-code text-blue-600 dark:text-blue-400 font-semibold">
              {projects.length} Total Systems Active
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-3 rounded-sm bg-white dark:bg-[#0F0F12] border border-slate-200 dark:border-slate-800 mb-8 shadow-xs">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`project-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-sm text-xs font-mono-code uppercase whitespace-nowrap font-bold transition-all cursor-pointer ${selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, stack, keywords..."
              className="w-full pl-9 pr-3.5 py-2 rounded-sm text-xs font-mono-code bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors shadow-xs"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-slate-300 dark:border-slate-800 rounded-sm bg-white dark:bg-[#0F0F12]">
            <FolderGit2 className="w-10 h-10 mx-auto text-slate-400 mb-3" />
            <h3 className="text-base font-bold font-mono-code uppercase text-slate-800 dark:text-slate-200">
              No Projects Found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              No systems match the current category and search query. Try clearing your filters.
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 rounded-sm bg-blue-600 text-white text-xs font-mono-code font-bold uppercase hover:bg-blue-500 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                className="rounded-sm border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F0F12] hover:border-blue-500/60 dark:hover:border-blue-500/60 transition-all flex flex-col justify-between overflow-hidden group shadow-xs hover:shadow-lg"
              >
                <div>
                  {/* Thumbnail Banner */}
                  <div
                    onClick={() => handleProjectClick(project.id)}
                    className="relative h-48 w-full overflow-hidden bg-slate-950 border-b border-slate-200 dark:border-slate-800 cursor-pointer"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover opacity-75 group-hover:scale-105 group-hover:opacity-90 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-xs text-[10px] font-mono-code font-bold uppercase bg-blue-600 text-white shadow-xs">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="px-2 py-0.5 rounded-xs text-[10px] font-mono-code font-bold uppercase bg-amber-500 text-slate-950 shadow-xs">
                          ★ Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content Info */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-1.5">
                      <h3
                        onClick={() => handleProjectClick(project.id)}
                        className="text-lg font-bold font-mono-code text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors uppercase cursor-pointer"
                      >
                        {project.title}
                      </h3>
                      <p className="text-xs font-mono-code text-blue-600 dark:text-blue-400">
                        {project.tagline}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Stack specifications summary */}
                    {project.stack && (
                      <div className="p-2.5 rounded-xs bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-800/80 text-[11px] font-mono-code space-y-1">
                        {project.stack.frontend && (
                          <div className="truncate text-slate-600 dark:text-slate-400">
                            <span className="text-slate-400 dark:text-slate-500">UI: </span>
                            <span className="text-slate-800 dark:text-slate-200 font-semibold">{project.stack.frontend}</span>
                          </div>
                        )}
                        {project.stack.database && (
                          <div className="truncate text-slate-600 dark:text-slate-400">
                            <span className="text-slate-400 dark:text-slate-500">DB: </span>
                            <span className="text-slate-800 dark:text-slate-200 font-semibold">{project.stack.database}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {(project.tags || []).slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-xs text-[10px] font-mono-code bg-slate-100 dark:bg-[#0A0A0A] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                        >
                          #{tech}
                        </span>
                      ))}
                      {(project.tags || []).length > 4 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-mono-code text-slate-400">
                          +{(project.tags || []).length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="px-6 py-4 bg-slate-50 dark:bg-[#0A0A0A] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono-code">
                  <button
                    onClick={() => handleProjectClick(project.id)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-500 font-bold flex items-center gap-1.5 cursor-pointer uppercase tracking-wider group/btn"
                  >
                    <span>View Detail Specs</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                        title="GitHub Source"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                        title="Live Deployment"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />

      {/* Quick Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={(sec) => {
          if (sec === 'projects') return;
          if (sec === 'home') {
            navigateTo('/');
          } else {
            goToSection(sec);
          }
        }}
      />
    </div>
  );
}
