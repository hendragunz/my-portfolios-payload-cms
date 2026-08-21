'use client';

import React, { useState } from 'react';
import {
  Terminal,
  ArrowRight,
  Download,
  Check,
  Copy,
  Sparkles,
  Database,
  Layers,
  FileCode,
  Cpu,
  Server,
  ExternalLink,
  Code2,
  Boxes,
  Network
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/initialData';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [activeCodeTab, setActiveCodeTab] = useState<'rails' | 'graphql' | 'vue_next' | 'database'>('rails');
  const [copiedCode, setCopiedCode] = useState(false);

  // SSR-safe: window is unavailable while server-rendering client components.
  const tenantHost = typeof window !== 'undefined' ? window.location.hostname : 'app.localhost';

  const codeSnippets = {
    rails: `# app/controllers/api/v1/checkout_controller.rb
# Ruby on Rails 7.1 Enterprise E-Commerce & SaaS Architecture
module Api
  module V1
    class CheckoutController < ApplicationController
      before_action :authenticate_tenant!
      
      def process_order
        order = Current.tenant.orders.build(order_params)
        
        ActiveRecord::Base.transaction do
          order.save!
          # High-concurrency asynchronous execution
          ProcessOrderCheckoutJob.perform_async(order.id, Current.tenant.id)
        end

        render json: OrderSerializer.new(order).serializable_hash, status: :accepted
      rescue ActiveRecord::RecordInvalid => e
        render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end
end`,
    graphql: `# app/graphql/types/query_type.rb
# High-Throughput GraphQL-Ruby Resolver with DataLoader (Zero N+1)
module Types
  class QueryType < Types::BaseObject
    field :company_pipeline, Types::PipelineType, null: false do
      argument :tenant_id, ID, required: true
      argument :status, String, required: false
    end

    def company_pipeline(tenant_id:, status: 'active')
      # Batch load associations to eliminate N+1 queries
      dataloader.with(Sources::ActivePipelineSource).load(tenant_id)
    end
  end
end`,
    vue_next: `// src/stores/useCommerceStore.ts
// Vue 3 Composition API / Next.js REST API Integration
import { defineStore } from 'pinia';
import axios from 'axios';

export const useCommerceStore = defineStore('commerce', () => {
  const cart = ref<CartItem[]>([]);
  const isProcessing = ref(false);

  async function executeCheckout(payload: CheckoutPayload) {
    isProcessing.value = true;
    try {
      const { data } = await axios.post('/api/v1/checkout', payload, {
        headers: { 'X-Tenant-Subdomain': '${tenantHost}' }
      });
      return { success: true, order: data.data };
    } finally {
      isProcessing.value = false;
    }
  }

  return { cart, isProcessing, executeCheckout };
});`,
    database: `-- Production Database Performance Tuning (PostgreSQL / MySQL)
-- Composite Indexing for Sub-Millisecond Multi-Tenant Filter Queries

CREATE INDEX CONCURRENTLY idx_tenant_orders_status_created 
ON orders (tenant_id, status, created_at DESC) 
INCLUDE (total_amount_cents);

-- Query diagnostic with zero sequential scans
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, total_amount_cents FROM orders
WHERE tenant_id = 'ten_9482a' 
  AND status = 'paid' 
ORDER BY created_at DESC 
LIMIT 25;
-- Execution Time: 0.84ms (Heap Fetches: 0, Buffers: hit)`
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippets[activeCodeTab]);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-grid-pattern opacity-70 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left Column: Bio & Current Stack Panel */}
          <div className="lg:col-span-7 space-y-6 text-left">

            {/* Section Tag */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono-code text-blue-500 font-semibold uppercase tracking-[0.2em]">
                // SENIOR_FULLSTACK_ARCHITECT // 10+_YEARS_EXP
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-slate-900 dark:text-white uppercase leading-[1.05]">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-lg sm:text-xl font-mono-code text-slate-700 dark:text-slate-300">
                Ruby on Rails (10+ Yrs) • SaaS, E-Commerce, CRM & Next.js / Vue.js
              </p>
            </div>

            {/* Detailed Pitch */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              10+ years engineering mission-critical <strong className="text-slate-900 dark:text-white font-semibold">Ruby on Rails</strong> backends, enterprise <strong className="text-slate-900 dark:text-white font-semibold">SaaS</strong>, high-volume <strong className="text-slate-900 dark:text-white font-semibold">E-Commerce</strong>, <strong className="text-slate-900 dark:text-white font-semibold">RESTful / GraphQL APIs</strong>, and internal company CRM software. Backed by deep database tuning (<strong className="text-slate-900 dark:text-white font-semibold">PostgreSQL, MySQL, MariaDB, MongoDB</strong>), reactive <strong className="text-slate-900 dark:text-white font-semibold">Next.js & Vue.js</strong> frontends, and automated deployments with <strong className="text-slate-900 dark:text-white font-semibold">Docker, AWS & Heroku</strong>.
            </p>

            {/* CURRENT_STACK Geometric Block */}
            <div className="p-5 border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#0F0F12] rounded-sm space-y-3">
              <h2 className="text-[11px] font-mono-code text-blue-500 uppercase tracking-[0.2em] font-semibold">
                // CORE_EXPERTISE_&_STACK
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
                <div>
                  <p className="text-slate-900 dark:text-white text-xs font-bold font-mono-code">Ruby on Rails</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">10+ Yrs • SaaS & API</p>
                </div>
                <div>
                  <p className="text-slate-900 dark:text-white text-xs font-bold font-mono-code">Vue.js & Next.js</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Reactive Frontends</p>
                </div>
                <div>
                  <p className="text-slate-900 dark:text-white text-xs font-bold font-mono-code">Postgres & MySQL</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">MariaDB & MongoDB</p>
                </div>
                <div>
                  <p className="text-slate-900 dark:text-white text-xs font-bold font-mono-code">Docker & AWS</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Heroku & Vercel</p>
                </div>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                id="hero-view-projects-btn"
                onClick={() => onNavigate('projects')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-blue-600 text-white font-mono-code font-semibold text-xs uppercase tracking-wider hover:bg-blue-500 shadow-sm transition-all cursor-pointer group"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-read-blog-btn"
                onClick={() => onNavigate('blog')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-200 border border-slate-300 dark:border-slate-800 font-mono-code text-xs uppercase tracking-wider hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
              >
                <FileCode className="w-3.5 h-3.5 text-blue-500" />
                <span>Technical Publications</span>
              </button>

              <button
                id="hero-contact-btn"
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-transparent text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-800 font-mono-code text-xs uppercase tracking-wider hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
              >
                <span>// GET_IN_TOUCH</span>
              </button>
            </div>

            {/* Stats Metric Strip */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-200 dark:border-slate-800">
              {PERSONAL_INFO.stats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono-code text-slate-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-mono-code text-slate-500 dark:text-slate-400 uppercase tracking-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Interactive Code Sandbox / Architecture Viewer */}
          <div className="lg:col-span-5">
            <div className="rounded-sm border border-slate-200 dark:border-slate-800 bg-[#0F0F12] text-slate-200 shadow-xl overflow-hidden font-mono-code text-xs">

              {/* Window Bar */}
              <div className="px-4 py-3 bg-[#0A0A0A] border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.6)]" />
                  <span className="ml-2 text-slate-400 text-[10px] font-mono-code uppercase tracking-wider">
                    ARCH_CONSOLE // RAILS_7.1
                  </span>
                </div>

                <button
                  id="hero-copy-snippet-btn"
                  onClick={handleCopyCode}
                  aria-label="Copy code snippet"
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors text-[10px] uppercase tracking-wider"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3 h-3 text-blue-400" />
                      <span className="text-blue-400">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-slate-400" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Tabs */}
              <div className="flex items-center bg-[#0A0A0A] border-b border-slate-800 overflow-x-auto text-[11px]">
                <button
                  onClick={() => setActiveCodeTab('rails')}
                  className={`px-3.5 py-2 border-b-2 font-mono-code transition-colors flex items-center gap-1.5 whitespace-nowrap uppercase tracking-wider text-[10px] ${activeCodeTab === 'rails'
                      ? 'border-blue-500 text-white bg-[#0F0F12] font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-300'
                    }`}
                >
                  <Layers className="w-3 h-3 text-blue-400" />
                  Rails API
                </button>
                <button
                  onClick={() => setActiveCodeTab('graphql')}
                  className={`px-3.5 py-2 border-b-2 font-mono-code transition-colors flex items-center gap-1.5 whitespace-nowrap uppercase tracking-wider text-[10px] ${activeCodeTab === 'graphql'
                      ? 'border-blue-500 text-white bg-[#0F0F12] font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-300'
                    }`}
                >
                  <Network className="w-3 h-3 text-blue-400" />
                  GraphQL API
                </button>
                <button
                  onClick={() => setActiveCodeTab('vue_next')}
                  className={`px-3.5 py-2 border-b-2 font-mono-code transition-colors flex items-center gap-1.5 whitespace-nowrap uppercase tracking-wider text-[10px] ${activeCodeTab === 'vue_next'
                      ? 'border-blue-500 text-white bg-[#0F0F12] font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-300'
                    }`}
                >
                  <Code2 className="w-3 h-3 text-blue-400" />
                  Vue / Next.js
                </button>
                <button
                  onClick={() => setActiveCodeTab('database')}
                  className={`px-3.5 py-2 border-b-2 font-mono-code transition-colors flex items-center gap-1.5 whitespace-nowrap uppercase tracking-wider text-[10px] ${activeCodeTab === 'database'
                      ? 'border-blue-500 text-white bg-[#0F0F12] font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-300'
                    }`}
                >
                  <Database className="w-3 h-3 text-blue-400" />
                  DB Tuning
                </button>
              </div>

              {/* Code Content Container */}
              <div className="p-4 sm:p-5 overflow-x-auto text-slate-300 leading-relaxed font-mono-code min-h-[300px] max-h-[360px] bg-[#0F0F12]">
                <pre className="text-[12px] leading-5 font-mono-code whitespace-pre">
                  <code>{codeSnippets[activeCodeTab]}</code>
                </pre>
              </div>

              {/* Status Footer */}
              <div className="px-4 py-2.5 bg-[#0A0A0A] border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-mono-code uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
                  RUBY 3.3 • RAILS 7.1 • DOCKER READY
                </span>
                <span className="text-slate-500">10+ YRS PRODUCTION EXP</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
