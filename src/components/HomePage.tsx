'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ProjectShowcase } from '@/components/ProjectShowcase';
import { SkillsExperience } from '@/components/SkillsExperience';
import { BlogCMS } from '@/components/BlogCMS';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { CommandPalette } from '@/components/CommandPalette';

const HOME_SECTIONS = ['home', 'projects', 'skills', 'blog', 'contact'];

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeSection, setActiveSection] = useState<string>('home');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);

  // Track the active section while scrolling on the home page.
  useEffect(() => {
    const handleScroll = () => {
      const sections = HOME_SECTIONS;
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to a section when arriving from another page (?section=skills).
  useEffect(() => {
    const section = searchParams?.get('section');
    if (section && HOME_SECTIONS.includes(section)) {
      setActiveSection(section);
      requestAnimationFrame(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, [searchParams]);

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'projects') {
      router.push('/projects');
      return;
    }
    if (sectionId === 'blog') {
      router.push('/blogs');
      return;
    }
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0A0A0A] text-slate-800 dark:text-slate-300 selection:bg-blue-600/30 selection:text-blue-200 font-sans transition-colors duration-200">
      {/* Top Fixed Header */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      {/* Main Content Flow */}
      <main className="relative">
        <Hero onNavigate={handleNavigate} />
        <ProjectShowcase />
        <SkillsExperience />
        <BlogCMS />
        <ContactSection />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Global Quick Command Palette (Cmd+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
