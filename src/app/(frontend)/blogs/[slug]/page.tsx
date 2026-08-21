'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { BlogPost } from '@/types';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Heart,
  Share2,
  Copy,
  Check,
  BookOpen,
  Tag,
  ArrowRight,
  User,
  Sparkles,
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CommandPalette } from '@/components/CommandPalette';
import { useAppNavigation } from '@/utils/navigation';
import confetti from 'canvas-confetti';

export default function BlogDetailPage() {
  const params = useParams<{ slug: string }>();
  const slugOrId = params?.slug ?? '';
  const { posts, likePost } = useData();
  const { navigateTo, goToSection } = useAppNavigation();
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [shareFeedback, setShareFeedback] = useState<boolean>(false);

  // Find post matching slug or id
  const post =
    posts.find(
      (p) =>
        p.slug === slugOrId ||
        p.id === slugOrId ||
        p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slugOrId
    ) || posts[0];

  const otherPosts = posts.filter((p) => p.id !== post?.id).slice(0, 3);

  const handleLikePost = () => {
    if (!post) return;
    likePost(post.id);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.8 },
    });
  };

  const handleShare = () => {
    if (!post) return;
    if (navigator.share) {
      navigator
        .share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
        .catch(() => { });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareFeedback(true);
      setTimeout(() => setShareFeedback(false), 2000);
    }
  };

  const handleCopySnippet = (codeText: string, id: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0A0A0A] text-slate-800 dark:text-slate-300 font-sans">
        <Navbar
          activeSection="blog"
          setActiveSection={() => { }}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        />
        <main className="pt-32 pb-20 max-w-3xl mx-auto px-4 text-center">
          <BookOpen className="w-12 h-12 mx-auto text-slate-400 mb-4" />
          <h1 className="text-2xl font-bold font-mono-code uppercase text-slate-900 dark:text-white">
            Publication Not Found
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 mb-6">
            The requested article slug <code className="text-blue-500 font-mono-code font-bold">"{slugOrId}"</code> could not be located.
          </p>
          <button
            onClick={() => navigateTo('/blogs')}
            className="px-4 py-2 rounded-sm bg-blue-600 text-white text-xs font-mono-code font-bold uppercase hover:bg-blue-500 transition-colors cursor-pointer"
          >
            Return to All Publications
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0A0A0A] text-slate-800 dark:text-slate-300 font-sans transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        activeSection="blog"
        setActiveSection={() => { }}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      <main className="pt-28 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
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
              onClick={() => navigateTo('/blogs')}
              className="hover:text-blue-500 transition-colors cursor-pointer"
            >
              Publications
            </button>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-semibold truncate max-w-xs sm:max-w-md">
              {post.title}
            </span>
          </div>

          <button
            onClick={() => navigateTo('/blogs')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white dark:bg-[#0F0F12] border border-slate-200 dark:border-slate-800 text-xs font-mono-code text-slate-700 dark:text-slate-300 hover:text-blue-500 hover:border-blue-500/40 transition-colors cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Articles</span>
          </button>
        </div>

        {/* Hero Publication Article Card */}
        <article className="rounded-sm border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F0F12] overflow-hidden shadow-md mb-12">
          {/* Cover Header */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-black">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover opacity-65"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            <div className="absolute top-4 left-4">
              <span className="px-2.5 py-1 rounded-xs text-[10px] font-mono-code font-bold uppercase bg-blue-600 text-white shadow-xs">
                {post.category}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 space-y-3">
              <div className="flex items-center gap-3 text-xs font-mono-code text-slate-300">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  {post.publishedAt}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  {post.readTime}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold font-mono-code uppercase text-white tracking-tight leading-tight">
                {post.title}
              </h1>
            </div>
          </div>

          {/* Author & Action Strip */}
          <div className="p-4 sm:p-6 bg-slate-50 dark:bg-[#0A0A0A] border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={post.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                alt={post.author?.name || 'Author'}
                className="w-10 h-10 rounded-sm object-cover border border-slate-300 dark:border-slate-700"
              />
              <div>
                <h4 className="text-xs font-bold font-mono-code uppercase text-slate-900 dark:text-white">
                  {post.author?.name || 'Hendra Gunawan'}
                </h4>
                <p className="text-[11px] font-mono-code text-slate-500 dark:text-slate-400 uppercase">
                  {post.author?.role || 'Lead Full-Stack Architect'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm bg-white dark:bg-[#0F0F12] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-mono-code hover:text-blue-500 transition-colors cursor-pointer shadow-xs"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{shareFeedback ? 'Copied Link!' : 'Share'}</span>
              </button>

              <button
                onClick={handleLikePost}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 text-xs font-mono-code hover:scale-105 transition-transform cursor-pointer shadow-xs font-bold"
              >
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                <span>{post.likes || 0} Likes</span>
              </button>
            </div>
          </div>

          {/* Article Markdown Body */}
          <div className="p-6 sm:p-10 space-y-6">
            <div className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 space-y-6">
              {post.content.split('\n\n').map((paragraph, pIdx) => {
                // H4
                if (paragraph.startsWith('#### ')) {
                  return (
                    <h4 key={pIdx} className="text-sm font-bold font-mono-code uppercase text-slate-900 dark:text-white pt-2">
                      {paragraph.replace('#### ', '')}
                    </h4>
                  );
                }
                // H3
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={pIdx} className="text-base sm:text-lg font-bold font-mono-code uppercase text-slate-900 dark:text-white pt-4 flex items-center gap-2">
                      <span className="text-blue-500 font-mono-code">//</span>
                      <span>{paragraph.replace('### ', '')}</span>
                    </h3>
                  );
                }
                // H2
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={pIdx} className="text-xl sm:text-2xl font-extrabold font-mono-code uppercase text-slate-900 dark:text-white pt-6 pb-2 border-b border-slate-200 dark:border-slate-800">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                // Code block
                if (paragraph.startsWith('```')) {
                  const cleanCode = paragraph.replace(/```[a-z]*\n?/g, '').trim();
                  const snippetId = `article-code-${pIdx}`;
                  return (
                    <div key={pIdx} className="my-6 rounded-sm bg-[#0A0A0A] text-slate-200 p-4 sm:p-5 border border-slate-800 font-mono-code text-xs relative group overflow-x-auto shadow-inner">
                      <button
                        onClick={() => handleCopySnippet(cleanCode, snippetId)}
                        className="absolute top-3 right-3 px-2.5 py-1 rounded-xs bg-slate-800/90 hover:bg-slate-700 text-[10px] uppercase font-bold text-slate-300 flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        {copiedCodeId === snippetId ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedCodeId === snippetId ? 'Copied' : 'Copy'}</span>
                      </button>
                      <pre className="whitespace-pre leading-6">
                        <code>{cleanCode}</code>
                      </pre>
                    </div>
                  );
                }
                // Standard text paragraph
                return (
                  <p key={pIdx} className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base font-sans">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Tag Pills */}
            <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono-code text-slate-500 uppercase mr-1 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" />
                <span>Tagged Topics:</span>
              </span>
              {(post.tags || []).map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-1 rounded-xs text-xs font-mono-code bg-slate-100 dark:bg-[#0A0A0A] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Author Biography Dossier */}
            <div className="mt-10 p-6 rounded-sm bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <img
                src={post.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                alt="Hendra Gunawan"
                className="w-14 h-14 rounded-sm object-cover border border-slate-300 dark:border-slate-700 shrink-0"
              />
              <div className="space-y-1">
                <h4 className="text-sm font-bold font-mono-code uppercase text-slate-900 dark:text-white">
                  Written by {post.author?.name || 'Hendra Gunawan'}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                  Full-stack software architect specializing in Next.js 15, PostgreSQL database optimization, Payload CMS code-first architectures, and enterprise edge performance.
                </p>
              </div>
            </div>
          </div>

          {/* Article Footer Strip */}
          <div className="p-4 sm:p-6 bg-slate-50 dark:bg-[#0A0A0A] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-mono-code uppercase">
              // KNOWLEDGE_BASE_DOCUMENT_ARCHIVE
            </span>
            <button
              onClick={() => navigateTo('/blogs')}
              className="px-4 py-2 rounded-sm text-xs font-mono-code font-bold uppercase bg-blue-600 text-white hover:bg-blue-500 transition-colors cursor-pointer shadow-xs"
            >
              Back to Publications
            </button>
          </div>
        </article>

        {/* Explore More Articles */}
        {otherPosts.length > 0 && (
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold font-mono-code uppercase text-slate-900 dark:text-white">
                More Technical Articles
              </h3>
              <button
                onClick={() => navigateTo('/blogs')}
                className="text-xs font-mono-code text-blue-500 hover:underline uppercase font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>All Articles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {otherPosts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => navigateTo(`/blogs/${p.slug || p.id}`)}
                  className="p-4 rounded-sm border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F0F12] hover:border-blue-500/50 transition-colors cursor-pointer group"
                >
                  <span className="text-[10px] font-mono-code font-bold uppercase text-blue-500 block mb-1">
                    {p.category}
                  </span>
                  <h4 className="text-sm font-bold font-mono-code text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors truncate uppercase">
                    {p.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {p.excerpt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* Command Palette */}
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
