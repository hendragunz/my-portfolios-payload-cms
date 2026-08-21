'use client';

import React, { useState } from 'react';
import {
  Cpu,
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  ExternalLink,
  Layers,
  Database,
  Server,
  Palette,
  FileCode2,
  ShieldCheck,
  CloudRain,
  Terminal,
  Boxes,
  GitBranch,
  TerminalSquare,
  Zap,
  Code,
  Network,
  Settings,
  Plus
} from 'lucide-react';
import { useData } from '../context/DataContext';

export const SkillsExperience: React.FC = () => {
  const { skillCategories, experiences } = useData();
  const [activeSkillCategory, setActiveSkillCategory] = useState<number>(0);
  const [expandedExpId, setExpandedExpId] = useState<string>(experiences[0]?.id || 'lead-fullstack-dev');

  // Dynamic icon helper
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Layers': return Layers;
      case 'Code': return Code;
      case 'FileCode2': return FileCode2;
      case 'Palette': return Palette;
      case 'Zap': return Zap;
      case 'FileText': return FileCode2;
      case 'Server': return Server;
      case 'Network': return Network;
      case 'ShieldCheck': return ShieldCheck;
      case 'Database': return Database;
      case 'CloudRain': return CloudRain;
      case 'Terminal': return Terminal;
      case 'Cpu': return Cpu;
      case 'Boxes': return Boxes;
      case 'GitBranch': return GitBranch;
      case 'TerminalSquare': return TerminalSquare;
      default: return Cpu;
    }
  };

  const safeActiveIdx = activeSkillCategory < skillCategories.length ? activeSkillCategory : 0;
  const currentCategory = skillCategories[safeActiveIdx];

  return (
    <section id="skills" className="py-16 md:py-24 border-t border-slate-200 dark:border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* ================= SECTION 1: SKILLS MATRIX ================= */}
        <div>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 text-left">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono-code text-blue-500 font-semibold uppercase tracking-[0.2em]">
                  // TECHNICAL_EXPERTISE
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">
                Skills & Engineering Matrix
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
                10+ years of deep expertise across Ruby on Rails architecture, E-Commerce & SaaS platforms, REST/GraphQL APIs, reactive Next.js & Vue.js frontends, and database tuning (PostgreSQL, MySQL, MariaDB, MongoDB).
              </p>
            </div>
          </div>

          {/* Skill Category Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {skillCategories.map((cat, idx) => {
              const isSelected = safeActiveIdx === idx;
              return (
                <button
                  key={idx}
                  id={`skill-cat-btn-${idx}`}
                  onClick={() => setActiveSkillCategory(idx)}
                  className={`p-4 rounded-sm text-left border transition-all cursor-pointer ${isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs font-bold'
                      : 'bg-white dark:bg-[#0F0F12] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700'
                    }`}
                >
                  <div className="text-xs font-bold font-mono-code uppercase tracking-wider leading-tight mb-1">
                    {cat.category}
                  </div>
                  <div className={`text-[10px] font-mono-code uppercase ${isSelected ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                    {cat.skills.length} CORE MODULES
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Category Skills Display */}
          {currentCategory && (
            <div className="p-6 sm:p-8 rounded-sm border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F0F12] shadow-xs">
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold font-mono-code text-slate-900 dark:text-white uppercase tracking-tight">
                    {currentCategory.category}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono-code">
                    {currentCategory.description}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono-code text-blue-500 uppercase font-semibold">
                    // MODULE_ACTIVE
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {currentCategory.skills.map((skill, sIdx) => {
                  const IconComponent = getIcon(skill.iconName);
                  return (
                    <div
                      key={sIdx}
                      className="p-4 rounded-sm border border-slate-200 dark:border-slate-800/80 bg-slate-50/70 dark:bg-[#0A0A0A] space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 rounded-sm bg-white dark:bg-[#0F0F12] text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-xs">
                            <IconComponent className="w-4 h-4 text-blue-500" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold font-mono-code text-slate-900 dark:text-white uppercase">
                              {skill.name}
                            </h4>
                            <span className="text-[10px] font-mono-code text-slate-500 dark:text-slate-400 uppercase">
                              Experience: {skill.experience}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-bold font-mono-code text-blue-600 dark:text-blue-400">
                            {skill.level}%
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-xs overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-xs transition-all duration-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>

                      {/* Highlight Note */}
                      {skill.highlight && (
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                          💡 {skill.highlight}
                        </p>
                      )}

                      {/* Tags */}
                      {skill.tags && skill.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {skill.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded-xs text-[10px] font-mono-code bg-white dark:bg-[#0F0F12] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ================= SECTION 2: WORK EXPERIENCE TIMELINE ================= */}
        <div>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 text-left">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono-code text-blue-500 font-semibold uppercase tracking-[0.2em]">
                  // CAREER_TRAJECTORY
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">
                Work Experience & Impact
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
                Proven track record leading engineering initiatives, optimizing high-traffic databases, and delivering mission-critical web applications.
              </p>
            </div>
          </div>

          {/* Timeline Container */}
          <div className="space-y-4">
            {experiences.map((exp) => {
              const isExpanded = expandedExpId === exp.id;
              return (
                <div
                  key={exp.id}
                  id={`experience-item-${exp.id}`}
                  className={`rounded-sm border transition-all duration-200 overflow-hidden ${exp.isCurrent
                      ? 'border-blue-500/80 bg-white dark:bg-[#0F0F12] shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F0F12]'
                    }`}
                >
                  {/* Item Header */}
                  <div
                    onClick={() => setExpandedExpId(isExpanded ? '' : exp.id)}
                    className="p-5 sm:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none hover:bg-slate-50 dark:hover:bg-[#141418] transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-base sm:text-lg font-extrabold font-mono-code text-slate-900 dark:text-white uppercase">
                          {exp.role}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400 font-mono-code uppercase">
                          {exp.company}
                        </span>
                        {exp.isCurrent && (
                          <span className="px-2 py-0.5 rounded-sm text-[9px] font-mono-code font-bold bg-blue-600 text-white shadow-xs uppercase">
                            CURRENT ROLE
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-mono-code">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-blue-500" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-blue-500" />
                          {exp.location}
                        </span>
                        <span className="px-2 py-0.5 rounded-xs bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 uppercase text-[10px]">
                          {exp.type}
                        </span>
                      </div>
                    </div>

                    {/* Metrics Banner */}
                    {exp.metrics && (
                      <div className="px-3 py-1.5 rounded-sm bg-slate-100 dark:bg-[#0A0A0A] border border-slate-300 dark:border-slate-800 text-xs font-mono-code text-slate-800 dark:text-slate-200 self-start md:self-center">
                        <span className="text-blue-500 font-bold">⚡ METRIC:</span> {exp.metrics}
                      </div>
                    )}
                  </div>

                  {/* Expanded Content Details */}
                  {isExpanded && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-2 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#0A0A0A] space-y-5">

                      {/* Summary */}
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-mono-code">
                        {exp.summary}
                      </p>

                      {/* Achievements List */}
                      {exp.achievements && exp.achievements.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                            Key Achievements & Production Deliveries:
                          </h4>
                          <ul className="space-y-1.5">
                            {exp.achievements.map((item, aIdx) => (
                              <li key={aIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 font-mono-code">
                                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Tech Stack Pills & Company Link */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-200 dark:border-slate-800">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[10px] font-mono-code uppercase text-slate-400 mr-1">
                            Stack:
                          </span>
                          {(exp.technologies || []).map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded-xs text-[10px] font-mono-code bg-white dark:bg-[#0F0F12] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 shadow-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {exp.companyUrl && (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex items-center gap-1 text-xs font-mono-code font-bold text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            <span>Verify Organization</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= SECTION 3: CORE ARCHITECTURAL PROTOCOLS ================= */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono-code text-blue-500 font-semibold uppercase tracking-[0.2em]">
              // ARCHITECTURAL_FOUNDATIONS & PROTOCOLS
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <div className="p-5 rounded-sm bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-mono-code font-bold text-slate-900 dark:text-white block text-xs uppercase tracking-wider">
                01. Database First & RLS
              </span>
              <p>
                Schema design, indexes, and engine-level security (PostgreSQL RLS) form the bedrock of application safety. Never rely purely on client validation.
              </p>
            </div>
            <div className="p-5 rounded-sm bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-mono-code font-bold text-slate-900 dark:text-white block text-xs uppercase tracking-wider">
                02. Payload CMS Headless Ergonomics
              </span>
              <p>
                Code-first schema definitions, TypeScript strictness, and PostgreSQL persistence empower marketing teams without locking developers into proprietary silos.
              </p>
            </div>
            <div className="p-5 rounded-sm bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-mono-code font-bold text-slate-900 dark:text-white block text-xs uppercase tracking-wider">
                03. Sub-Second Performance & Edge
              </span>
              <p>
                Next.js App Router hybrid rendering, connection pooling, and optimized asset delivery to guarantee sub-100ms TTFB and 100/100 Core Web Vitals.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
