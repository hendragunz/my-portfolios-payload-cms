'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Project } from '@/types';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Layers,
  Database,
  Server,
  Cpu,
  CheckCircle2,
  Activity,
  Code2,
  Sparkles,
  Share2,
  Check,
  Copy,
  FolderGit2,
  ArrowRight,
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CommandPalette } from '@/components/CommandPalette';
import { useAppNavigation } from '@/utils/navigation';

export default function ProjectDetailPage() {
  const params = useParams<{ slug: string }>();
  const idOrSlug = params?.slug ?? '';
  const { projects } = useData();
  const { navigateTo, goToSection } = useAppNavigation();
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [shareFeedback, setShareFeedback] = useState<boolean>(false);

  // Find project by ID or slugified title
  const project =
    projects.find(
      (p) => p.id === idOrSlug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === idOrSlug
    ) || projects[0];

  const otherProjects = projects.filter((p) => p.id !== project?.id).slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${project.title} - Architecture Case Study`,
          text: project.tagline,
          url: window.location.href,
        })
        .catch(() => { });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareFeedback(true);
      setTimeout(() => setShareFeedback(false), 2000);
    }
  };

  const sampleSnippet = `// Architecture Schema Blueprint: ${project.title}
// Stack: ${project.stack?.frontend || 'Next.js'} + ${project.stack?.backend || 'Payload CMS'} + ${project.stack?.database || 'PostgreSQL'}

import { defineSystemArchitecture } from '@architecture/core';

export const systemManifest = defineSystemArchitecture({
  slug: '${project.id}',
  title: '${project.title}',
  category: '${project.category}',
  deployment: {
    edgeRegions: ['iad1', 'sin1', 'fra1'],
    cachingStrategy: 'StaleWhileRevalidate + Incremental ISR',
    databaseConnection: 'PgBouncer pooled transaction port 6543'
  },
  securityPolicies: {
    rowLevelSecurity: true,
    strictTypeScriptValidation: true,
  }
});`;

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(sampleSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0A0A0A] text-slate-800 dark:text-slate-300 font-sans">
        <Navbar
          activeSection="projects"
          setActiveSection={() => { }}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        />
        <main className="pt-32 pb-20 max-w-3xl mx-auto px-4 text-center">
          <FolderGit2 className="w-12 h-12 mx-auto text-slate-400 mb-4" />
          <h1 className="text-2xl font-bold font-mono-code uppercase text-slate-900 dark:text-white">
            Project Specification Not Found
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 mb-6">
            The requested project ID <code className="text-blue-500 font-mono-code font-bold">"{idOrSlug}"</code> does not exist in the current manifest.
          </p>
          <button
            onClick={() => navigateTo('/projects')}
            className="px-4 py-2 rounded-sm bg-blue-600 text-white text-xs font-mono-code font-bold uppercase hover:bg-blue-500 transition-colors cursor-pointer"
          >
            Return to All Projects
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0A0A0A] text-slate-800 dark:text-slate-300 font-sans transition-colors duration-200">
      {/* Navbar */}
      <Navbar
        activeSection="projects"
        setActiveSection={() => { }}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      <main className="pt-28 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 text-xs font-mono-code text-slate-500 dark:text-slate-400">
            <button
              onClick={() => navigateTo('/')}
              className="hover:text-blue-500 transition-colors cursor-pointer"
            >
              Overview
            </button>
            <span>/</span>
            <button
              onClick={() => navigateTo('/projects')}
              className="hover:text-blue-500 transition-colors cursor-pointer"
            >
              Projects
            </button>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-semibold truncate max-w-xs sm:max-w-md">
              {project.title}
            </span>
          </div>

          <button
            onClick={() => navigateTo('/projects')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white dark:bg-[#0F0F12] border border-slate-200 dark:border-slate-800 text-xs font-mono-code text-slate-700 dark:text-slate-300 hover:text-blue-500 hover:border-blue-500/40 transition-colors cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Projects List</span>
          </button>
        </div>

        {/* Hero Case Study Header */}
        <div className="relative rounded-sm border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F0F12] overflow-hidden shadow-md mb-10">
          <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-950">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-xs text-[10px] font-mono-code bg-blue-600 text-white font-bold uppercase shadow-xs">
                {project.category}
              </span>
              {project.featured && (
                <span className="px-2.5 py-1 rounded-xs text-[10px] font-mono-code bg-amber-500 text-slate-950 font-bold uppercase shadow-xs">
                  ★ Featured Architecture
                </span>
              )}
            </div>

            <div className="absolute bottom-6 left-6 right-6 space-y-2">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase font-mono-code">
                {project.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl font-mono-code">
                {project.tagline}
              </p>
            </div>
          </div>

          {/* Action Header Strip */}
          <div className="p-4 sm:p-6 bg-slate-50 dark:bg-[#0A0A0A] border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {project.liveUrl && (
                <a
                  id="detail-live-demo-link"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-blue-600 text-white font-mono-code font-bold uppercase text-xs hover:bg-blue-500 shadow-xs transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Launch Live Platform</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  id="detail-github-link"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-white dark:bg-[#0F0F12] text-slate-800 dark:text-slate-200 font-mono-code font-bold uppercase text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-300 dark:border-slate-800"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Source Code (GitHub)</span>
                </a>
              )}
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-sm bg-white dark:bg-[#0F0F12] text-slate-700 dark:text-slate-300 text-xs font-mono-code border border-slate-300 dark:border-slate-800 hover:text-blue-500 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{shareFeedback ? 'Link Copied!' : 'Share Project'}</span>
            </button>
          </div>
        </div>

        {/* Detailed Sections Grid */}
        <div className="space-y-10">
          {/* Section 1: Overview & Architecture */}
          <div className="p-6 sm:p-8 rounded-sm bg-white dark:bg-[#0F0F12] border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h2 className="text-xs font-mono-code text-blue-500 uppercase tracking-[0.2em] font-semibold flex items-center gap-2">
              <Code2 className="w-4 h-4 text-blue-500" />
              // ARCHITECTURE_OVERVIEW & DESIGN_GOALS
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Section 2: Key Engineering Highlights */}
          {project.architectureHighlights && project.architectureHighlights.length > 0 && (
            <div className="p-6 sm:p-8 rounded-sm bg-white dark:bg-[#0F0F12] border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <h2 className="text-xs font-mono-code text-blue-500 uppercase tracking-[0.2em] font-semibold flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-500" />
                // KEY_ENGINEERING_HIGHLIGHTS & DECISIONS
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {project.architectureHighlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 p-4 rounded-sm bg-slate-50 dark:bg-[#0A0A0A] border-l-2 border-blue-600 border-t border-r border-b border-slate-200 dark:border-slate-800/80 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <span className="font-sans leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 3: Performance Metrics & Benchmarks */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="p-6 sm:p-8 rounded-sm bg-white dark:bg-[#0F0F12] border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <h2 className="text-xs font-mono-code text-blue-500 uppercase tracking-[0.2em] font-semibold flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-500" />
                // MEASURED_BENCHMARKS & PRODUCTION_PERFORMANCE
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-sm bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-800 text-xs font-mono-code text-slate-800 dark:text-slate-200 flex items-center gap-3"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] shrink-0" />
                    <span className="leading-snug">{metric}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 4: Technical Stack Specifications */}
          {project.stack && (
            <div className="p-6 sm:p-8 rounded-sm bg-white dark:bg-[#0F0F12] border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <h2 className="text-xs font-mono-code text-blue-500 uppercase tracking-[0.2em] font-semibold flex items-center gap-2">
                <Server className="w-4 h-4 text-blue-500" />
                // TECHNICAL_STACK_SPECIFICATIONS
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono-code">
                {project.stack.frontend && (
                  <div className="p-4 rounded-sm bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 uppercase text-[10px] block mb-1">Frontend Layer & Rendering:</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">{project.stack.frontend}</span>
                  </div>
                )}
                {project.stack.backend && (
                  <div className="p-4 rounded-sm bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 uppercase text-[10px] block mb-1">Backend Engine & API:</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">{project.stack.backend}</span>
                  </div>
                )}
                {project.stack.database && (
                  <div className="p-4 rounded-sm bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 uppercase text-[10px] block mb-1">Database & ORM Layer:</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">{project.stack.database}</span>
                  </div>
                )}
                {project.stack.infrastructure && (
                  <div className="p-4 rounded-sm bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 uppercase text-[10px] block mb-1">Infrastructure & Cloud:</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">{project.stack.infrastructure}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Section 5: Code Blueprint Snippet */}
          <div className="p-6 sm:p-8 rounded-sm bg-white dark:bg-[#0F0F12] border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono-code text-blue-500 uppercase tracking-[0.2em] font-semibold flex items-center gap-2">
                <Code2 className="w-4 h-4 text-blue-500" />
                // ARCHITECTURAL_BLUEPRINT_CONFIG
              </h2>
              <button
                onClick={handleCopySnippet}
                className="px-2.5 py-1 rounded-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[10px] font-mono-code uppercase font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedCode ? 'Copied' : 'Copy Config'}</span>
              </button>
            </div>

            <div className="rounded-sm bg-[#0A0A0A] p-4 border border-slate-800 font-mono-code text-xs text-slate-300 overflow-x-auto">
              <pre className="whitespace-pre leading-relaxed">
                <code>{sampleSnippet}</code>
              </pre>
            </div>
          </div>

          {/* Section 6: Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {(project.tags || []).map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-xs text-xs font-mono-code bg-white dark:bg-[#0F0F12] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 shadow-xs"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Section 7: Explore More Architectures */}
          {otherProjects.length > 0 && (
            <div className="pt-10 border-t border-slate-200 dark:border-slate-800 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold font-mono-code uppercase text-slate-900 dark:text-white">
                  Explore Other Architectures
                </h3>
                <button
                  onClick={() => navigateTo('/projects')}
                  className="text-xs font-mono-code text-blue-500 hover:underline uppercase font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>View All Projects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {otherProjects.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => navigateTo(`/projects/${p.id}`)}
                    className="p-4 rounded-sm border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F0F12] hover:border-blue-500/50 transition-colors cursor-pointer group"
                  >
                    <span className="text-[10px] font-mono-code font-bold uppercase text-blue-500 block mb-1">
                      {p.category}
                    </span>
                    <h4 className="text-sm font-bold font-mono-code text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors truncate uppercase">
                      {p.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {p.tagline}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Quick Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={(sec) => {
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
