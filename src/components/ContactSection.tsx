'use client';

import React, { useState } from 'react';
import {
  Mail,
  Github,
  Linkedin,
  Briefcase,
  Send,
  Check,
  Copy,
  Terminal,
  ExternalLink,
  Sparkles,
  MapPin,
  Clock,
  CheckCircle2,
  CornerDownLeft
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/initialData';
import { ContactFormData } from '../types';
import confetti from 'canvas-confetti';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: 'Full-Stack Architecture & Development Inquiry',
    message: '',
    projectBudget: '$5k - $15k'
  });

  // Mini Interactive Terminal State
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; output: string }>>([
    { cmd: 'whoami', output: 'Hendra Gunawan (Senior Full-Stack Architect)' },
    { cmd: 'skills --core', output: 'Next.js 15, PostgreSQL, Payload CMS, Tailwind CSS, Docker' },
    { cmd: 'contact --status', output: 'Ready for collaboration. hendragunz@codecampz.com' }
  ]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
    confetti({ particleCount: 20, spread: 35, origin: { y: 0.8 } });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.6 }
      });
    }, 600);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rawCmd = terminalInput.trim().toLowerCase();
    if (!rawCmd) return;

    let output = '';
    switch (rawCmd) {
      case 'help':
        output = 'Available commands: whoami, stack, contact, github, linkedin, upwork, clear, date';
        break;
      case 'whoami':
        output = 'Hendra Gunawan • Senior Ruby on Rails Architect (10+ Yrs) & Full-Stack Specialist';
        break;
      case 'stack':
        output = 'Ruby on Rails (10+ Yrs), Next.js 15, Vue.js 3, TypeScript, Tailwind CSS / Bootstrap, PostgreSQL, MySQL, MariaDB, MongoDB, Redis, Docker, AWS, Heroku';
        break;
      case 'contact':
        output = `Email: ${PERSONAL_INFO.email} | GitHub: ${PERSONAL_INFO.github} | Upwork: ${PERSONAL_INFO.upwork}`;
        break;
      case 'github':
        output = `Redirecting or check: ${PERSONAL_INFO.github}`;
        break;
      case 'linkedin':
        output = `Profile: ${PERSONAL_INFO.linkedin}`;
        break;
      case 'upwork':
        output = `Upwork Profile: ${PERSONAL_INFO.upwork}`;
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      case 'date':
        output = new Date().toUTCString();
        break;
      case 'ping':
        output = 'PONG 64 bytes from hendragunz.dev: icmp_seq=1 ttl=64 time=12.4 ms';
        break;
      default:
        output = `zsh: command not found: ${rawCmd}. Type "help" for a list of commands.`;
    }

    setTerminalHistory((prev) => [...prev, { cmd: terminalInput, output }]);
    setTerminalInput('');
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-t border-slate-200 dark:border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="space-y-2 mb-12 text-left">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono-code text-blue-500 font-semibold uppercase tracking-[0.2em]">
              // DIRECT_COMMUNICATION_CHANNELS
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">
            Let's Build Something High-Impact
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Whether you need enterprise Next.js architecture, PostgreSQL optimization, Payload CMS integrations, or a seasoned full-stack lead, I'm just a ping away.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Left Column: Direct Links & Interactive Terminal (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">

            {/* Quick Contact Cards */}
            <div className="space-y-3">

              {/* Email Card with 1-click Copy */}
              <div className="p-4 rounded-sm border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F0F12] shadow-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2.5 rounded-sm bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-mono-code text-slate-400 uppercase block">Direct Email</span>
                    <span className="text-xs font-bold font-mono-code text-slate-900 dark:text-white truncate block">
                      {PERSONAL_INFO.email}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    id="copy-email-btn"
                    onClick={handleCopyEmail}
                    title="Copy Email Address"
                    className="p-2 rounded-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-blue-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <a
                    id="mailto-link-btn"
                    href={`mailto:${PERSONAL_INFO.email}`}
                    title="Send Email"
                    className="p-2 rounded-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* GitHub Card */}
              <a
                id="contact-github-card"
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer noopener"
                className="group p-4 rounded-sm border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F0F12] hover:border-slate-400 dark:hover:border-slate-700 shadow-xs flex items-center justify-between gap-3 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-sm bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 shrink-0">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono-code text-slate-400 uppercase block">GitHub Profile</span>
                    <span className="text-xs font-bold font-mono-code text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                      github.com/hendragunz
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
              </a>

              {/* LinkedIn Card */}
              <a
                id="contact-linkedin-card"
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="group p-4 rounded-sm border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F0F12] hover:border-slate-400 dark:hover:border-slate-700 shadow-xs flex items-center justify-between gap-3 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-sm bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 shrink-0">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono-code text-slate-400 uppercase block">LinkedIn Network</span>
                    <span className="text-xs font-bold font-mono-code text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                      linkedin.com/in/hendragunawan
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
              </a>

              {/* Upwork Profile Card */}
              <a
                id="contact-upwork-card"
                href={PERSONAL_INFO.upwork}
                target="_blank"
                rel="noreferrer noopener"
                className="group p-4 rounded-sm border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F0F12] hover:border-emerald-500/50 dark:hover:border-emerald-500/50 shadow-xs flex items-center justify-between gap-3 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-sm bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono-code text-slate-400 uppercase block">Upwork Freelance</span>
                      <span className="px-1.5 py-0.5 rounded-xs text-[9px] font-mono-code font-bold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        Available
                      </span>
                    </div>
                    <span className="text-xs font-bold font-mono-code text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                      upwork.com/freelancers/~016eb8e1fb746e15a6
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
              </a>

            </div>

            {/* Interactive Terminal Widget */}
            <div className="rounded-sm border border-slate-200 dark:border-slate-800 bg-[#0A0A0A] text-slate-100 p-4 font-mono-code text-xs shadow-md space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[10px] text-slate-400 uppercase">
                <span className="flex items-center gap-1.5 text-blue-400 font-bold">
                  <Terminal className="w-3.5 h-3.5 text-blue-500" />
                  // SHELL_ENV v2.4
                </span>
                <span className="text-slate-500">TRY: "HELP"</span>
              </div>

              {/* Command output history */}
              <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                {terminalHistory.map((item, i) => (
                  <div key={i} className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-blue-400">
                      <span className="text-slate-500">guest@hendra:~$</span>
                      <span>{item.cmd}</span>
                    </div>
                    <div className="text-slate-300 pl-4 text-[11px] leading-relaxed">
                      {item.output}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Form */}
              <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 pt-1 border-t border-slate-800">
                <span className="text-blue-400 shrink-0">guest@hendra:~$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Type a command (e.g. stack, ping, help)..."
                  className="w-full bg-transparent text-white placeholder-slate-600 focus:outline-none text-xs"
                />
                <button type="submit" aria-label="Send terminal command" className="text-slate-400 hover:text-white cursor-pointer">
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

          </div>

          {/* Right Column: Contact Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="p-6 sm:p-8 rounded-sm border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F0F12] shadow-sm flex-1 flex flex-col">

              <div className="mb-6 space-y-1 border-b border-slate-200 dark:border-slate-800 pb-4">
                <h3 className="text-base font-extrabold font-mono-code uppercase text-slate-900 dark:text-white">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono-code">
                  Fill out this form for project estimates, technical consults, or engineering leadership opportunities.
                </p>
              </div>

              {submitted ? (
                <div className="py-10 text-center space-y-4 rounded-sm bg-blue-50 dark:bg-blue-950/20 border border-blue-500/50 p-6 my-auto">
                  <div className="w-10 h-10 rounded-sm bg-blue-600 text-white flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold font-mono-code uppercase text-slate-900 dark:text-white">
                      Message Dispatched Successfully
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto font-mono-code">
                      Thank you for reaching out. I've received your notification and will reply to <strong className="text-slate-900 dark:text-white font-mono-code">{formData.email}</strong> within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        subject: 'Full-Stack Inquiry',
                        message: '',
                        projectBudget: '$5k - $15k'
                      });
                    }}
                    className="px-4 py-2 rounded-sm text-xs font-mono-code font-bold uppercase bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex-1 flex flex-col justify-between space-y-4">

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono-code font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                          Your Name *
                        </label>
                        <input
                          id="contact-name-input"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Alex Mercer"
                          className="w-full px-3.5 py-2.5 rounded-sm text-xs font-mono-code bg-slate-50 dark:bg-[#0A0A0A] border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono-code font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                          Your Email *
                        </label>
                        <input
                          id="contact-email-input"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alex@company.com"
                          className="w-full px-3.5 py-2.5 rounded-sm text-xs font-mono-code bg-slate-50 dark:bg-[#0A0A0A] border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono-code font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                          Topic / Subject
                        </label>
                        <input
                          id="contact-subject-input"
                          type="text"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-sm text-xs font-mono-code bg-slate-50 dark:bg-[#0A0A0A] border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono-code font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                          Expected Scope / Budget
                        </label>
                        <select
                          value={formData.projectBudget}
                          onChange={(e) => setFormData({ ...formData, projectBudget: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-sm text-xs font-mono-code bg-slate-50 dark:bg-[#0A0A0A] border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
                        >
                          <option value="<$5k">Advisory / Consultation (&lt; $5k)</option>
                          <option value="$5k - $15k">Medium Project ($5k - $15k)</option>
                          <option value="$15k - $50k">Enterprise Architecture ($15k - $50k)</option>
                          <option value="Full-time">Full-time / Lead Role Opportunity</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <label className="block text-xs font-mono-code font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                        Project Details & Requirements *
                      </label>
                      <textarea
                        id="contact-message-input"
                        required
                        rows={7}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Describe your tech stack, goals, timelines, or role requirements..."
                        className="w-full min-h-[160px] sm:min-h-[180px] px-3.5 py-2.5 rounded-sm text-xs font-mono-code bg-slate-50 dark:bg-[#0A0A0A] border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none leading-relaxed resize-y"
                      />
                    </div>
                  </div>

                  <button
                    id="submit-contact-form-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-sm bg-blue-600 text-white font-mono-code font-bold uppercase tracking-wider text-xs hover:bg-blue-700 transition-all shadow-xs flex items-center justify-center gap-2 group cursor-pointer mt-2"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Transmitting...
                      </span>
                    ) : (
                      <>
                        <span>Transmit Message</span>
                        <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
