'use client';

import React, { useState, useMemo } from 'react';
import { Project } from '../types';
import {
  FolderGit2,
  ExternalLink,
  Github,
  Search,
  Layers,
  Database,
  Server,
  SlidersHorizontal,
  ArrowUpRight,
  ArrowRight,
  Info,
  Settings,
  Plus
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAppNavigation } from '../utils/navigation';

interface ProjectShowcaseProps {
  onSelectProject?: (project: Project) => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = () => {
  const { projects } = useData();
  const { navigateTo } = useAppNavigation();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Fullstack', 'Backend & DB', 'Frontend & UI', 'Architecture'];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ((project.tags || []).some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  const handleProjectClick = (projectId: string) => {
    navigateTo(`/projects/${projectId}`);
  };

  return (
    <section id="projects" className="py-16 md:py-24 border-t border-slate-200 dark:border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono-code text-blue-500 font-semibold uppercase tracking-[0.2em]">
                // FEATURED_PROJECTS
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">
              Production Architecture & Systems
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              Architected for speed, resilience, and scale. Built with Next.js 15, Payload CMS, and PostgreSQL.
            </p>
          </div>

          <div>
            <button
              onClick={() => navigateTo('/projects')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono-code font-bold uppercase transition-colors shadow-xs cursor-pointer"
            >
              <span>Explore All Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 rounded-sm bg-white dark:bg-[#0F0F12] border border-slate-200 dark:border-slate-800 mb-8 shadow-xs">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-sm text-xs font-mono-code uppercase whitespace-nowrap transition-colors cursor-pointer ${selectedCategory === cat
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search architecture, stack..."
              className="w-full pl-8 pr-3 py-1.5 rounded-sm text-xs font-mono-code bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-sm border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F0F12] hover:border-blue-500/50 transition-all flex flex-col justify-between overflow-hidden group shadow-xs hover:shadow-md"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono-code font-bold uppercase px-2 py-0.5 rounded-xs bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="text-[10px] font-mono-code text-amber-500 font-semibold">
                      ★ FEATURED
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold font-mono-code text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors uppercase">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono-code text-blue-600 dark:text-blue-400">
                    {project.tagline}
                  </p>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {(project.tags || []).slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-xs text-[10px] font-mono-code bg-slate-100 dark:bg-[#0A0A0A] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                  {(project.tags || []).length > 4 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono-code text-slate-400">
                      +{(project.tags || []).length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="px-6 py-3.5 bg-slate-50 dark:bg-[#0A0A0A] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono-code">
                <button
                  onClick={() => handleProjectClick(project.id)}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>Deep Dive Spec</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-slate-500 hover:text-slate-900 dark:hover:text-white"
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
                      className="text-slate-500 hover:text-slate-900 dark:hover:text-white"
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

      </div>
    </section>
  );
};
