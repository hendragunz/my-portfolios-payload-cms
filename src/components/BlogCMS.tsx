'use client';

import React, { useState } from 'react';
import { BlogPost } from '../types';
import {
  Calendar,
  Clock,
  Heart,
  ArrowRight,
  Check,
  Copy,
  X,
  Search,
  BookOpen,
  Share2
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAppNavigation } from '../utils/navigation';
import confetti from 'canvas-confetti';

export const BlogCMS: React.FC = () => {
  const { posts, likePost } = useData();
  const { navigateTo } = useAppNavigation();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [shareFeedback, setShareFeedback] = useState<boolean>(false);

  const categories = ['All', 'Next.js', 'PostgreSQL & DB', 'Payload CMS', 'Architecture', 'DevOps'];

  const filteredPosts = posts.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.tags && p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const handlePostClick = (post: BlogPost) => {
    navigateTo(`/blogs/${post.slug || post.id}`);
  };

  const handleLikePost = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    likePost(postId);
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost({ ...selectedPost, likes: (selectedPost.likes || 0) + 1 });
    }
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.8 }
    });
  };

  const handleCopySnippet = (codeText: string, id: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleShare = (post: BlogPost) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => { });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareFeedback(true);
      setTimeout(() => setShareFeedback(false), 2000);
    }
  };

  return (
    <section id="blog" className="py-16 md:py-24 border-t border-slate-200 dark:border-slate-800 relative bg-[#F8F9FA] dark:bg-[#0A0A0A] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono-code text-blue-500 font-semibold uppercase tracking-[0.2em]">
                // TECHNICAL_PUBLICATIONS
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">
              Articles & Architecture Notes
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              Deep dives on Next.js 15 App Router, PostgreSQL query optimization, and Payload CMS code-first architectures.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              onClick={() => navigateTo('/blogs')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono-code font-bold uppercase transition-colors shadow-xs cursor-pointer whitespace-nowrap"
            >
              <span>Explore All Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Quick Search */}
            <div className="relative w-full sm:w-60">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search publications..."
                className="w-full pl-9 pr-3.5 py-2 text-xs font-mono-code bg-white dark:bg-[#0F0F12] border border-slate-200 dark:border-slate-800 rounded-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors shadow-xs"
              />
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                id={`blog-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-sm text-xs font-mono-code font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${isActive
                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                    : 'bg-white dark:bg-[#0F0F12] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                  }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Articles Grid */}
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-slate-300 dark:border-slate-800 rounded-sm bg-white dark:bg-[#0F0F12]">
            <BookOpen className="w-8 h-8 mx-auto text-slate-400 mb-3" />
            <p className="text-sm font-mono-code text-slate-600 dark:text-slate-400">
              No publications match the filter criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                id={`blog-post-card-${post.id}`}
                onClick={() => handlePostClick(post)}
                className="group cursor-pointer flex flex-col justify-between rounded-sm border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F0F12] overflow-hidden hover:border-blue-500/50 dark:hover:border-blue-500/50 shadow-xs transition-all duration-200"
              >
                <div>
                  {/* Cover Thumbnail */}
                  <div className="relative h-44 w-full overflow-hidden bg-black border-b border-slate-200 dark:border-slate-800">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 rounded-xs text-[10px] font-mono-code font-bold uppercase bg-blue-600 text-white shadow-xs">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Meta info */}
                  <div className="p-5 space-y-3">
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

                    <h3 className="text-base font-extrabold font-mono-code uppercase text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Tag badges */}
                    <div className="flex flex-wrap gap-1 pt-1">
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

                {/* Card Bottom Strip */}
                <div className="p-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0A0A0A] flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono-code font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <span>Read Document</span>
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

      </div>

      {/* ================= FULL ARTICLE READING MODAL ================= */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className="relative w-full max-w-3xl bg-white dark:bg-[#0F0F12] rounded-sm border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Cover */}
            <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-black border-b border-slate-200 dark:border-slate-800">
              <img
                src={selectedPost.coverImage}
                alt={selectedPost.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

              <button
                id="close-article-modal-btn"
                onClick={() => setSelectedPost(null)}
                aria-label="Close article modal"
                className="absolute top-4 right-4 p-2 rounded-sm bg-black/80 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors border border-slate-700 cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-xs text-[10px] font-mono-code font-bold uppercase bg-blue-600 text-white shadow-xs">
                    {selectedPost.category}
                  </span>
                  <span className="text-xs font-mono-code text-slate-300 uppercase">
                    {selectedPost.readTime}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold font-mono-code uppercase text-white tracking-tight leading-tight">
                  {selectedPost.title}
                </h2>
              </div>
            </div>

            {/* Modal Body with Markdown rendering */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[calc(85vh-18rem)] overflow-y-auto">

              {/* Author Strip */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedPost.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                    alt={selectedPost.author?.name || 'Author'}
                    className="w-10 h-10 rounded-sm object-cover border border-slate-300 dark:border-slate-700"
                  />
                  <div>
                    <h4 className="text-xs font-bold font-mono-code uppercase text-slate-900 dark:text-white">
                      {selectedPost.author?.name || 'Engineering Lead'}
                    </h4>
                    <p className="text-[11px] font-mono-code text-slate-500 dark:text-slate-400 uppercase">
                      {selectedPost.author?.role || 'Fullstack Architect'} • Published {selectedPost.publishedAt}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleShare(selectedPost)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-mono-code hover:text-blue-500 transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{shareFeedback ? 'Copied!' : 'Share'}</span>
                  </button>
                  <button
                    onClick={(e) => handleLikePost(selectedPost.id, e)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 text-xs font-mono-code hover:scale-105 transition-transform cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                    <span>{selectedPost.likes || 0}</span>
                  </button>
                </div>
              </div>

              {/* Render Article Content */}
              <div className="prose prose-slate dark:prose-invert max-w-none text-sm leading-relaxed text-slate-700 dark:text-slate-300 space-y-4 font-mono-code">
                {selectedPost.content.split('\n\n').map((paragraph, pIdx) => {
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h4 key={pIdx} className="text-base font-bold font-mono-code uppercase text-slate-900 dark:text-white pt-3">
                        {paragraph.replace('### ', '')}
                      </h4>
                    );
                  }
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h3 key={pIdx} className="text-lg font-bold font-mono-code uppercase text-slate-900 dark:text-white pt-4 pb-1 border-b border-slate-200 dark:border-slate-800">
                        {paragraph.replace('## ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('```')) {
                    const cleanCode = paragraph.replace(/```[a-z]*\n?/g, '').trim();
                    const snippetId = `code-block-${pIdx}`;
                    return (
                      <div key={pIdx} className="my-4 rounded-sm bg-[#0A0A0A] text-slate-200 p-4 border border-slate-800 font-mono-code text-xs relative group overflow-x-auto">
                        <button
                          onClick={() => handleCopySnippet(cleanCode, snippetId)}
                          className="absolute top-3 right-3 px-2 py-1 rounded-xs bg-slate-800/80 hover:bg-slate-700 text-[10px] uppercase font-bold text-slate-300 flex items-center gap-1 cursor-pointer"
                        >
                          {copiedCodeId === snippetId ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedCodeId === snippetId ? 'Copied' : 'Copy'}</span>
                        </button>
                        <pre className="whitespace-pre leading-5">
                          <code>{cleanCode}</code>
                        </pre>
                      </div>
                    );
                  }
                  return (
                    <p key={pIdx} className="text-slate-600 dark:text-slate-300 leading-relaxed font-sans text-sm">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-2">
                {(selectedPost.tags || []).map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded-xs text-[10px] font-mono-code bg-slate-100 dark:bg-[#0A0A0A] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 dark:bg-[#0A0A0A] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono-code uppercase">
                // ARCHITECTURE_KNOWLEDGE_BASE
              </span>
              <button
                onClick={() => setSelectedPost(null)}
                className="px-4 py-1.5 rounded-sm text-xs font-mono-code font-bold uppercase bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Close Document
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
