'use client';

import React from 'react';
import Link from 'next/link';
import { Terminal, Github, Linkedin, Briefcase, Mail, ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/initialData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A0A0A] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between">

          {/* Brand & Tagline */}
          <div className="md:col-span-5 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-sm bg-blue-600 text-white flex items-center justify-center font-mono-code font-bold text-xs shadow-xs">
                HG
              </div>
              <span className="font-mono-code font-bold text-sm text-slate-900 dark:text-white tracking-wider">
                HENDRA.DEV
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm font-mono-code">
              Engineering high-resilience web architectures, scalable PostgreSQL databases, and high-performance Next.js systems.
            </p>
          </div>

          {/* System Status Pill */}
          <div className="md:col-span-4 flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm text-[11px] font-mono-code bg-slate-100 dark:bg-[#0F0F12] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              <span className="uppercase">Edge Status: Healthy (99.99%)</span>
            </div>
            <span className="text-[10px] font-mono-code text-slate-400 uppercase">
              PostgreSQL • Next.js • Payload CMS
            </span>
          </div>

          {/* Socials & Back to Top */}
          <div className="md:col-span-3 flex items-center justify-start md:justify-end gap-3">
            <a
              id="footer-github-link"
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub Profile"
              className="p-2 rounded-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              id="footer-linkedin-link"
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              id="footer-upwork-link"
              href={PERSONAL_INFO.upwork}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Upwork Profile"
              className="p-2 rounded-sm text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
            >
              <Briefcase className="w-4 h-4" />
            </a>

            <a
              id="footer-mail-link"
              href={`mailto:${PERSONAL_INFO.email}`}
              aria-label="Send email"
              className="p-2 rounded-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              id="scroll-to-top-btn"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="p-2 rounded-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono-code text-slate-500 dark:text-slate-400 uppercase">
          <span>© {new Date().getFullYear()} Hendra Gunawan. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Engineered with clean code & sub-second latency</span>
            <Link
              href="/admin"
              className="text-slate-400 hover:text-blue-500 transition-colors flex items-center gap-1 opacity-60 hover:opacity-100"
              title="Access Admin CMS Panel"
            >
              <span>CMS Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
