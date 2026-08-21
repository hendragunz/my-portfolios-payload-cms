'use client';

import React, { useState, useMemo } from 'react';
import { BlogPost } from '@/types';
import {
  BookOpen,
  Calendar,
  Clock,
  Heart,
  ArrowRight,
  ArrowLeft,
  Search,
  Tag,
  Share2,
  Sparkles,
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CommandPalette } from '@/components/CommandPalette';
import { useAppNavigation } from '@/utils/navigation';
import confetti from 'canvas-confetti';

export default function BlogsPage() {
  const { posts, likePost } = useData();
  const { navigateTo, goToSection } = useAppNavigation();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);

  const categories = ['All', 'Next.js', 'PostgreSQL & DB', 'Payload CMS', 'Architecture', 'DevOps'];

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.tags && p.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, searchQuery]);

  const handleArticleClick = (post: BlogPost) => {
    navigateTo(`/blogs/${post.slug || post.id}`);
  };

  const handleLikePost = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    likePost(postId);
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.8 },
    });
  };

  const featuredPost = posts.find((p) => p.featured) || posts[0];

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0A0A0A] text-slate-800 dark:text-slate-300 font-sans transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        activeSection="blog"
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
          <span className="text-slate-900 dark:text-white font-semibold">Publications & Knowledge Base</span>
        </div>

        {/* Page Hero Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800 mb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono-code text-blue-500 font-semibold uppercase tracking-[0.2em]">
                // TECHNICAL_PUBLICATIONS
              </span>
              <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-pulse" />
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase font-mono-code">
              Articles & Architecture Notes
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              Deep architectural breakdowns on Next.js 15 App Router, PostgreSQL query optimization, and Payload CMS code-first architectures written by Hendra Gunawan.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-3.5 py-2 rounded-sm bg-blue-500/10 border border-blue-500/20 text-xs font-mono-code text-blue-600 dark:text-blue-400 font-semibold">
              {posts.length} Publications Live
            </div>
          </div>
        </div>

        {/* Featured Publication Hero Banner */}
        {featuredPost && activeCategory === 'All' && !searchQuery && (
          <div
            onClick={() => handleArticleClick(featuredPost)}
            className="mb-12 rounded-sm border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F0F12] overflow-hidden group cursor-pointer shadow-md hover:border-blue-500/60 transition-all"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-full overflow-hidden bg-black">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 rounded-xs text-[10px] font-mono-code font-bold uppercase bg-blue-600 text-white shadow-xs">
                    ★ Featured Technical Article
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs font-mono-code text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-500" />
                      {featuredPost.publishedAt}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold font-mono-code uppercase text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-4">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {(featuredPost.tags || []).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-xs text-[10px] font-mono-code bg-slate-100 dark:bg-[#0A0A0A] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono-code font-bold uppercase text-blue-600 dark:text-blue-400 group-hover:underline">
                    <span>Read Full Document</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>

                  <button
                    onClick={(e) => handleLikePost(featuredPost.id, e)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono-code text-slate-500 hover:text-rose-500 p-1 cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-rose-500/10 text-rose-500" />
                    <span>{featuredPost.likes || 0}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter Controls Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-3 rounded-sm bg-white dark:bg-[#0F0F12] border border-slate-200 dark:border-slate-800 mb-8 shadow-xs">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`blog-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-2 rounded-sm text-xs font-mono-code uppercase whitespace-nowrap font-bold transition-all cursor-pointer ${activeCategory === cat
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
              placeholder="Search publications, topics..."
              className="w-full pl-9 pr-3.5 py-2 rounded-sm text-xs font-mono-code bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors shadow-xs"
            />
          </div>
        </div>

        {/* Articles Grid */}
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-slate-300 dark:border-slate-800 rounded-sm bg-white dark:bg-[#0F0F12]">
            <BookOpen className="w-10 h-10 mx-auto text-slate-400 mb-3" />
            <h3 className="text-base font-bold font-mono-code uppercase text-slate-800 dark:text-slate-200">
              No Articles Found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              No publications match your filter criteria. Try searching for a different keyword.
            </p>
            <button
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 rounded-sm bg-blue-600 text-white text-xs font-mono-code font-bold uppercase hover:bg-blue-500 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                id={`blog-card-${post.id}`}
                onClick={() => handleArticleClick(post)}
                className="rounded-sm border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F0F12] hover:border-blue-500/60 dark:hover:border-blue-500/60 transition-all flex flex-col justify-between overflow-hidden group shadow-xs hover:shadow-lg cursor-pointer"
              >
                <div>
                  {/* Cover Thumbnail */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-950 border-b border-slate-200 dark:border-slate-800">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover opacity-75 group-hover:scale-105 group-hover:opacity-90 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 rounded-xs text-[10px] font-mono-code font-bold uppercase bg-blue-600 text-white shadow-xs">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content Info */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 font-mono-code">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-blue-500" />
                        {post.publishedAt}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-blue-500" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold font-mono-code uppercase text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Tag Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {(post.tags || []).slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-xs text-[10px] font-mono-code bg-slate-100 dark:bg-[#0A0A0A] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Strip */}
                <div className="px-6 py-3.5 bg-slate-50 dark:bg-[#0A0A0A] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono-code">
                  <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <span>Read Publication</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>

                  <button
                    onClick={(e) => handleLikePost(post.id, e)}
                    className="inline-flex items-center gap-1 text-xs font-mono-code text-slate-500 hover:text-rose-500 transition-colors p-1 cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-500/10 hover:fill-rose-500 text-rose-500 transition-colors" />
                    <span>{post.likes || 0}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />

      {/* Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={(sec) => {
          if (sec === 'blog') return;
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
