import { Project, SkillCategory, Experience, BlogPost } from '../types';

export const PERSONAL_INFO = {
  name: 'Hendra Gunawan',
  handle: '@hendragunz',
  role: 'Senior Ruby on Rails & Full-Stack Architect',
  tagline: '10+ years architecting mission-critical Ruby on Rails backends, enterprise SaaS, E-Commerce platforms, and modern Next.js & Vue.js interfaces.',
  bio: 'Senior Full-Stack Architect with 10+ years of deep expertise in Ruby on Rails, high-concurrency REST/GraphQL APIs, enterprise E-Commerce, SaaS platforms, and internal enterprise tools. Proven track record scaling PostgreSQL, MySQL, MariaDB, and MongoDB, delivering reactive frontends with Next.js and Vue.js, and managing containerized deployments across AWS, Docker, Heroku, and Vercel.',
  location: 'Indonesia (GMT+7) • Available Worldwide (Remote)',
  email: 'hendragunz@codecampz.com',
  github: 'https://github.com/hendragunz',
  linkedin: 'https://linkedin.com/in/hendragunawan',
  upwork: 'https://www.upwork.com/freelancers/~016eb8e1fb746e15a6',
  status: 'Open for Select Full-time & Technical Advisory Roles',
  stats: [
    { label: 'Years of Experience', value: '10+' },
    { label: 'Production Apps Built', value: '45+' },
    { label: 'Databases & APIs Scaled', value: '60+' },
    { label: 'Enterprise Deployments', value: '100+' }
  ]
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'apex-rails-commerce',
    title: 'ApexCommerce - Enterprise Multi-Vendor E-Commerce Engine',
    tagline: 'High-scale e-commerce and subscription platform built with Ruby on Rails 7 API, Vue.js 3, and PostgreSQL.',
    description: 'A modular, high-throughput e-commerce platform designed for multi-vendor catalog management, real-time inventory synchronization, automated tax calculation, and multi-currency Stripe checkout. Features Sidekiq background processing and Redis caching for sub-100ms response times.',
    category: 'Fullstack',
    featured: true,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    tags: ['Ruby on Rails', 'Vue.js 3', 'PostgreSQL', 'Redis', 'Sidekiq', 'Docker', 'Stripe', 'Tailwind CSS'],
    githubUrl: 'https://github.com/hendragunz/apex-rails-commerce',
    liveUrl: 'https://apexcommerce-demo.dev',
    architectureHighlights: [
      'Ruby on Rails 7 API mode with fast JSON serializers and strict OpenAPI contracts',
      'Vue 3 Composition API with Pinia store and Tailwind CSS for instant reactive checkout',
      'Sidekiq asynchronous workers handling order dispatches, invoice PDFs, and webhook retries',
      'PostgreSQL read/write splitting with connection pooling handling flash sale surges'
    ],
    metrics: [
      'Handled 65,000 requests/min during high-volume sales campaigns',
      'Processed over $4.2M in annual gross merchandise volume',
      'Sub-85ms average API response time across 120 endpoints'
    ],
    stack: {
      frontend: 'Vue.js 3, Vite, Pinia, Tailwind CSS, Axios',
      backend: 'Ruby on Rails 7.1, Sidekiq Pro, Puma, Stripe SDK',
      database: 'PostgreSQL 16 + Redis Cluster (Cache & Queues)',
      infrastructure: 'Docker, AWS ECS (Fargate), AWS S3, Cloudflare CDN'
    }
  },
  {
    id: 'pulsesaas-crm-platform',
    title: 'PulseSaaS - Multi-Tenant B2B CRM & Subscription Suite',
    tagline: 'Multi-tenant SaaS CRM platform with GraphQL & REST APIs, Next.js dashboard, and PostgreSQL row-level isolation.',
    description: 'A robust multi-tenant customer relationship management (CRM) and subscription billing platform. Supports custom deal pipelines, automated email sequences, team role-based access control (RBAC), and bi-directional third-party webhooks.',
    category: 'Fullstack',
    featured: true,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    tags: ['Ruby on Rails', 'Next.js 15', 'GraphQL', 'PostgreSQL', 'TypeScript', 'Tailwind CSS', 'AWS'],
    githubUrl: 'https://github.com/hendragunz/pulsesaas-crm',
    liveUrl: 'https://pulsesaas-crm.dev',
    architectureHighlights: [
      'Multi-tenancy tenant isolation schema with automated PostgreSQL migrations',
      'GraphQL Ruby API with DataLoader pattern to eliminate N+1 database queries',
      'Next.js 15 App Router frontend with TypeScript and server-side authentication',
      'Automated recurring billing and subscription lifecycle management'
    ],
    metrics: [
      'Powers 140+ active business tenants with 99.99% uptime',
      'Zero N+1 queries across all GraphQL resolvers',
      'Automated 1.2M monthly email touchpoints via Sidekiq'
    ],
    stack: {
      frontend: 'Next.js 15, React 19, TypeScript, Tailwind CSS, Lucide',
      backend: 'Ruby on Rails 7 API, GraphQL-Ruby, Pundit Authorization',
      database: 'PostgreSQL with multi-tenant tenancy gem & Redis',
      infrastructure: 'AWS RDS, Docker, Heroku / Vercel Edge'
    }
  },
  {
    id: 'omnierp-internal-suite',
    title: 'OmniERP - Internal Enterprise Operations & Resource Management',
    tagline: 'Bespoke enterprise internal software for inventory control, employee workflow automation, and financial auditing.',
    description: 'Comprehensive internal enterprise system created for mid-market manufacturing and retail operations. Orchestrates complex purchase orders, inventory warehousing, employee access controls, and detailed financial audit logging.',
    category: 'Backend & DB',
    featured: true,
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    tags: ['Ruby on Rails', 'Vue.js', 'MySQL', 'Bootstrap CSS', 'Docker', 'REST API'],
    githubUrl: 'https://github.com/hendragunz/omnierp-enterprise',
    liveUrl: 'https://omnierp-internal.dev',
    architectureHighlights: [
      'Comprehensive ActiveRecord state machines managing complex order lifecycles',
      'MySQL / MariaDB transaction-safe ledger with immutable audit logs',
      'Vue.js interactive data grids with real-time barcode scanning input',
      'Role-based permissions (RBAC) with granular department access'
    ],
    metrics: [
      'Cut internal order processing time by 72%',
      'Managed 250,000+ SKU inventory items across 6 regional warehouses',
      '100% compliance with corporate financial audit requirements'
    ],
    stack: {
      frontend: 'Vue.js 3, Bootstrap 5 / Tailwind CSS, AG-Grid',
      backend: 'Ruby on Rails (Monolith + Internal JSON APIs), ActionCable',
      database: 'MySQL 8.0 / MariaDB with InnoDB cluster',
      infrastructure: 'Docker, AWS EC2, Nginx, SSL Reverse Proxy'
    }
  },
  {
    id: 'relaycore-api-gateway',
    title: 'RelayCore - High-Throughput RESTful & GraphQL Microservice API',
    tagline: 'Ultra-fast API gateway handling millions of daily requests with OAuth2, rate limiting, and MongoDB event logging.',
    description: 'A dedicated API engine built for high concurrency and resilient data distribution. Consolidates disparate data stores (PostgreSQL & MongoDB), enforces OAuth2 tokens, and dispatches real-time webhooks with automatic exponential backoff.',
    category: 'Backend & DB',
    featured: false,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    tags: ['Ruby on Rails', 'RESTful API', 'GraphQL', 'MongoDB', 'PostgreSQL', 'Redis', 'Docker'],
    githubUrl: 'https://github.com/hendragunz/relaycore-api-gateway',
    liveUrl: 'https://relaycore-docs.dev',
    architectureHighlights: [
      'Dual data layer utilizing PostgreSQL for relational entities and MongoDB for audit logs',
      'Distributed token bucket rate limiting using Redis to prevent API abuse',
      'Comprehensive RSpec test suite with 98% code coverage'
    ],
    metrics: [
      'Sustained 40,000,000+ monthly API requests',
      'Average p95 latency under 45ms across all REST endpoints'
    ],
    stack: {
      backend: 'Ruby on Rails (API Mode), FastJsonAPI, GraphQL-Ruby',
      database: 'PostgreSQL 16, MongoDB 7.0, Redis 7',
      infrastructure: 'Docker, AWS ECS, ALB, CloudWatch'
    }
  },
  {
    id: 'vue-analytics-dashboard',
    title: 'Veloce - Real-Time SaaS Analytics & Metrics Dashboard',
    tagline: 'High-density reactive analytics portal built with Vue.js 3, TypeScript, and Tailwind CSS.',
    description: 'A rich frontend dashboard engineered for SaaS platform administrators to monitor real-time user retention, revenue MRR/ARR charts, API health, and churn metrics with interactive charting and dark mode.',
    category: 'Frontend & UI',
    featured: false,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    tags: ['Vue.js 3', 'TypeScript', 'Tailwind CSS', 'Chart.js', 'Vite', 'REST API'],
    githubUrl: 'https://github.com/hendragunz/veloce-vue-analytics',
    liveUrl: 'https://veloce-analytics.dev',
    architectureHighlights: [
      'Modular component hierarchy with Vue 3 script setup and strict TypeScript types',
      'Optimized chart rendering with virtualized tables for datasets over 50,000 rows',
      'Zero layout shift with Tailwind CSS design tokens and custom CSS variables'
    ],
    metrics: [
      'Sub-300ms initial load time with Vite code-splitting',
      '100% Lighthouse Performance & Accessibility score'
    ],
    stack: {
      frontend: 'Vue.js 3, Pinia, TypeScript, Tailwind CSS, Lucide Icons',
      infrastructure: 'Vercel, Cloudflare Pages, GitHub Actions'
    }
  },
  {
    id: 'cloudops-deploy-orchestrator',
    title: 'CloudOps Deploy - Multi-Cloud Docker & Database Orchestrator',
    tagline: 'Automated CI/CD deployment scripts and zero-downtime backup daemon for Rails, PostgreSQL, and MySQL.',
    description: 'A DevOps toolkit automating containerized builds, zero-downtime rolling deployments to AWS/Heroku, point-in-time database backups to AWS S3, and automated SSL certificate renewal.',
    category: 'DevOps & Cloud',
    featured: false,
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=80',
    tags: ['Docker', 'AWS', 'Heroku', 'PostgreSQL', 'MySQL', 'Bash', 'Ruby'],
    githubUrl: 'https://github.com/hendragunz/cloudops-rails-deploy',
    liveUrl: 'https://github.com/hendragunz/cloudops-rails-deploy',
    architectureHighlights: [
      'Automated database replication health checks and S3 encrypted backups',
      'Zero-downtime Puma/Rails reload with Kamal / Docker Compose',
      'Multi-stage Docker builds reducing image sizes to under 120MB'
    ],
    metrics: [
      'Orchestrated 800+ zero-downtime production deployments',
      'Sub-3 minute full deployment cycle from git push to live container'
    ],
    stack: {
      tooling: 'Ruby CLI, Bash, Docker, Docker Compose, Kamal',
      cloud: 'AWS (EC2/ECS/S3), Heroku CLI, GitHub Actions CI/CD'
    }
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Ruby on Rails & Backend (10+ Yrs)',
    description: 'Architecting scalable enterprise backends, high-concurrency APIs, and mission-critical business software.',
    skills: [
      { name: 'Ruby on Rails (10+ Years)', level: 98, experience: '10+ yrs', iconName: 'Layers', tags: ['ActiveRecord', 'Sidekiq', 'ActionCable', 'RSpec', 'Puma'], highlight: 'Core strongest expertise: architecting enterprise SaaS, E-Commerce, and internal systems' },
      { name: 'RESTful & GraphQL APIs', level: 96, experience: '9+ yrs', iconName: 'Network', tags: ['GraphQL Ruby', 'RESTful Design', 'Serializers', 'OpenAPI', 'JWT'], highlight: 'Designed robust APIs serving tens of millions of monthly requests' },
      { name: 'E-Commerce & SaaS Architecture', level: 97, experience: '10+ yrs', iconName: 'ShieldCheck', tags: ['Multi-Tenancy', 'Stripe / Payments', 'Subscriptions', 'Inventories'], highlight: 'Complete monetization, billing pipelines, and complex business logic' },
      { name: 'CRM & Internal Company Software', level: 95, experience: '9+ yrs', iconName: 'Server', tags: ['RBAC', 'Audit Logging', 'Workflow Engines', 'ERP / CRM'], highlight: 'Engineered high-efficiency enterprise tools tailored for company workflows' }
    ]
  },
  {
    category: 'Modern Frontend & Frameworks',
    description: 'Building reactive, type-safe, and high-performance client interfaces and SPAs.',
    skills: [
      { name: 'Vue.js (Recent Project Focus)', level: 92, experience: '4+ yrs', iconName: 'Code', tags: ['Vue 3', 'Composition API', 'Pinia', 'Vite', 'Nuxt'], highlight: 'Recent active project focus: delivering rich, reactive dashboards and single-page apps' },
      { name: 'Next.js & React', level: 93, experience: '5+ yrs', iconName: 'Layers', tags: ['Next.js 15', 'App Router', 'RSC', 'Server Actions', 'React 19'], highlight: 'Modern full-stack web applications with server-side rendering and edge caching' },
      { name: 'TypeScript & JavaScript', level: 94, experience: '7+ yrs', iconName: 'FileCode2', tags: ['Strict Typing', 'Generics', 'ESNext', 'Async/Await'], highlight: 'End-to-end type safety connecting APIs, stores, and UI components' },
      { name: 'Tailwind CSS & Bootstrap CSS', level: 96, experience: '8+ yrs', iconName: 'Palette', tags: ['Tailwind v4', 'Bootstrap 5', 'Design Systems', 'Responsive UI'], highlight: 'Fluent in both modern utility CSS and enterprise component frameworks' }
    ]
  },
  {
    category: 'Databases & Data Stores',
    description: 'Expertise in relational, document, and in-memory databases with query optimization and scaling.',
    skills: [
      { name: 'PostgreSQL', level: 96, experience: '9+ yrs', iconName: 'Database', tags: ['Indexing', 'EXPLAIN ANALYZE', 'Partitions', 'RLS', 'PgBouncer'], highlight: 'Deep understanding of query execution planners, MVCC, and high-throughput tuning' },
      { name: 'MySQL & MariaDB', level: 95, experience: '10+ yrs', iconName: 'Database', tags: ['InnoDB', 'Replication', 'Transactions', 'Index Tuning'], highlight: 'Decade of experience operating production MySQL and MariaDB databases' },
      { name: 'MongoDB', level: 88, experience: '5+ yrs', iconName: 'CloudRain', tags: ['Aggregation Pipelines', 'Document Modeling', 'Indexing', 'Mongoose'], highlight: 'Document store design for event logging, catalogs, and flexible schemas' },
      { name: 'Redis (Caching & Queues)', level: 92, experience: '8+ yrs', iconName: 'Cpu', tags: ['Sidekiq Queues', 'Sub-millisecond Caching', 'Pub/Sub', 'Rate Limiter'], highlight: 'Essential in-memory backbone for background jobs and caching layers' }
    ]
  },
  {
    category: 'DevOps, Cloud & Deployment',
    description: 'Containerized deployments, automated CI/CD pipelines, and multi-cloud infrastructure management.',
    skills: [
      { name: 'Docker & Containerization', level: 92, experience: '7+ yrs', iconName: 'Boxes', tags: ['Docker Compose', 'Multi-Stage Builds', 'Kamal', 'Optimization'], highlight: 'Standardized container environments from local development to production' },
      { name: 'AWS (Amazon Web Services)', level: 90, experience: '6+ yrs', iconName: 'TerminalSquare', tags: ['EC2', 'ECS', 'RDS', 'S3', 'CloudFront', 'ALB'], highlight: 'Robust AWS infrastructure setup for Rails applications and database clusters' },
      { name: 'Heroku & Vercel Deployments', level: 95, experience: '9+ yrs', iconName: 'GitBranch', tags: ['Heroku Dynos & Add-ons', 'Vercel Edge', 'Buildpacks', 'Zero-Downtime'], highlight: 'Streamlined continuous deployment workflows with automated rollbacks' },
      { name: 'Testing & Code Quality', level: 94, experience: '10+ yrs', iconName: 'CheckCircle2', tags: ['RSpec', 'Capybara', 'Jest / Vitest', 'GitHub Actions CI'], highlight: 'Rigorous test-driven development ensuring zero production regressions' }
    ]
  }
];

export const WORK_EXPERIENCE: Experience[] = [
  {
    id: 'lead-fullstack-dev',
    role: 'Lead Ruby on Rails & Full-Stack Architect',
    company: 'CodeCampz Solutions',
    companyUrl: 'https://codecampz.com',
    location: 'Remote',
    type: 'Lead',
    period: '2020 - Present',
    isCurrent: true,
    summary: 'Directing the architecture and development of enterprise Ruby on Rails SaaS platforms, multi-tenant CRM systems, and high-performance Vue.js & Next.js frontend applications.',
    achievements: [
      'Architected and delivered multi-tenant B2B SaaS platforms serving over 400k active users with Ruby on Rails 7 API, PostgreSQL, Redis, and Vue.js.',
      'Engineered enterprise E-Commerce checkout pipelines processing $5M+ in transactions with zero checkout downtime and automated Stripe billing.',
      'Reduced database query latency by 65% across PostgreSQL, MySQL, and MariaDB through index tuning, query plan analysis, and Redis caching.',
      'Established Docker containerization and AWS ECS / Heroku deployment pipelines with automated CI/CD test automation.'
    ],
    technologies: ['Ruby on Rails', 'Vue.js 3', 'Next.js', 'PostgreSQL', 'MySQL', 'Redis', 'Docker', 'AWS', 'Tailwind CSS'],
    metrics: '400k+ Users • 65% Query Latency Reduction • 99.99% SLA'
  },
  {
    id: 'senior-fullstack-engineer',
    role: 'Senior Ruby on Rails & Backend Engineer',
    company: 'NexTech Systems Inc.',
    location: 'Jakarta / Hybrid',
    type: 'Full-time',
    period: '2016 - 2020',
    summary: 'Led the development of high-concurrency RESTful and GraphQL APIs, CRM platforms, and internal enterprise automation systems.',
    achievements: [
      'Designed and scaled RESTful & GraphQL API endpoints handling 25,000 requests/sec with Ruby on Rails API mode and Sidekiq workers.',
      'Built a complete custom CRM and internal operations software for enterprise clients, streamlining deal flow, lead assignment, and invoice generation.',
      'Operated and tuned high-availability PostgreSQL and MySQL database clusters with automated replication and disaster recovery.',
      'Mentored junior engineers and standardized RSpec test suites, achieving 95%+ test coverage across core microservices.'
    ],
    technologies: ['Ruby on Rails', 'GraphQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Bootstrap CSS', 'Docker', 'RSpec'],
    metrics: '25k req/sec • 95%+ Test Coverage • Enterprise CRM Delivered'
  },
  {
    id: 'software-engineer',
    role: 'Full-Stack Software Developer (Ruby & Web)',
    company: 'PixelCraft Digital Agency',
    location: 'Bandung / Remote',
    type: 'Full-time',
    period: '2014 - 2016',
    summary: 'Built bespoke e-commerce storefronts, company websites, and custom internal management tools for international and regional clients.',
    achievements: [
      'Delivered 20+ production web applications and custom e-commerce engines using Ruby on Rails, MySQL, and modern JavaScript.',
      'Engineered automated payment gateway integrations, shipping calculator APIs, and inventory sync systems.',
      'Constructed responsive client interfaces utilizing Bootstrap CSS and semantic HTML5/CSS3.'
    ],
    technologies: ['Ruby on Rails', 'MySQL', 'JavaScript', 'Bootstrap CSS', 'Heroku', 'REST APIs'],
    metrics: '20+ Production Applications Delivered'
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'scaling-rails-enterprise-saas',
    slug: 'scaling-ruby-on-rails-for-enterprise-saas-and-apis',
    title: 'Scaling Ruby on Rails for Enterprise SaaS & High-Throughput APIs: Lessons from 10+ Years in Production',
    excerpt: 'Key architectural patterns for scaling Ruby on Rails to millions of requests: ActiveRecord query optimization, Sidekiq job queues, caching strategies, and REST/GraphQL performance.',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    publishedAt: 'Aug 18, 2026',
    readTime: '7 min read',
    category: 'Ruby on Rails',
    tags: ['Ruby on Rails', 'ActiveRecord', 'Sidekiq', 'API', 'SaaS', 'Performance'],
    featured: true,
    likes: 186,
    author: {
      name: 'Hendra Gunawan',
      role: 'Senior Rails & Full-Stack Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    content: `## The Enduring Power of Ruby on Rails in Enterprise SaaS

After more than a decade of architecting web applications, Ruby on Rails remains one of the most productive, battle-tested, and performant backend foundations when paired with modern engineering patterns.

Whether building high-volume **E-Commerce platforms**, multi-tenant **SaaS software**, or **internal enterprise tools**, Rails lets you move fast without sacrificing architectural integrity.

### 1. Eliminating ActiveRecord N+1 Queries with Eager Loading & Goldiloader
The most common performance pitfall in Rails applications is the infamous N+1 query problem. Always utilize explicit eager loading:

\`\`\`ruby
# ❌ Generates N queries for order_items and products
orders = Order.where(status: 'completed').limit(50)
orders.each do |order|
  order.order_items.each { |item| puts item.product.title }
end

# ✅ Optimized: Exactly 3 queries regardless of dataset size
orders = Order.includes(order_items: :product)
              .where(status: 'completed')
              .limit(50)
\`\`\`

### 2. High-Throughput Background Processing with Sidekiq & Redis
Offload all non-blocking tasks (emails, webhooks, invoice generation, payment confirmations) to asynchronous workers:

\`\`\`ruby
class ProcessOrderCheckoutJob
  include Sidekiq::Job
  sidekiq_options queue: :critical, retry: 5

  def perform(order_id)
    order = Order.find(order_id)
    PaymentGateway::StripeService.charge!(order)
    order.update!(status: :paid)
    OrderMailer.confirmation_receipt(order).deliver_later
  end
end
\`\`\`

### 3. Multi-Tenant Data Isolation for B2B SaaS
When architecting SaaS platforms, ensuring complete data isolation between customer tenants is paramount. Combining tenant scopes with database-level constraints ensures bulletproof privacy:

\`\`\`ruby
class ApplicationController < ActionController::API
  before_action :set_current_tenant

  private

  def set_current_tenant
    @current_tenant = Tenant.find_by!(subdomain: request.subdomain)
    Current.tenant = @current_tenant
  end
end
\`\`\`

### Conclusion
By pairing clean database indexing, Sidekiq job queues, and modern API serializers, Ruby on Rails effortlessly handles millions of daily transactions with unmatched developer velocity.`
  },
  {
    id: 'modern-frontends-with-rails-api',
    slug: 'pairing-vuejs-and-nextjs-with-ruby-on-rails-apis',
    title: 'Pairing Modern Frontends (Vue.js 3 & Next.js) with Ruby on Rails APIs',
    excerpt: 'How to build seamless decoupled architectures using Ruby on Rails for robust backend logic alongside reactive Vue.js 3 and Next.js client applications.',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    publishedAt: 'Jul 30, 2026',
    readTime: '6 min read',
    category: 'Architecture',
    tags: ['Ruby on Rails', 'Vue.js', 'Next.js', 'GraphQL', 'REST API', 'TypeScript'],
    featured: true,
    likes: 124,
    author: {
      name: 'Hendra Gunawan',
      role: 'Senior Rails & Full-Stack Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    content: `## The Modern Full-Stack Stack: Decoupled Rails + Vue / Next.js

Modern product engineering thrives when you pair **Ruby on Rails** (the ultimate backend data engine and business logic layer) with modern reactive frontend frameworks like **Vue.js 3** or **Next.js**.

### Why Decouple Rails and Modern Frontends?
1. **Separation of Concerns**: Rails handles data validation, state machines, transactions, and background queues.
2. **Snappy Client Experience**: Vue.js and Next.js provide instant UI reactivity, optimistic updates, and rich interactive components.
3. **Multi-Client Readiness**: One clean Rails API serves web portals, internal dashboards, and mobile applications simultaneously.

### Structuring Fast JSON Responses in Rails
Use fast serialization libraries to generate clean JSON schemas:

\`\`\`ruby
class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :name, :email, :role, :created_at

  attribute :avatar_url do |user|
    user.avatar.attached? ? Rails.application.routes.url_helpers.url_for(user.avatar) : nil
  end
end
\`\`\`

### Consuming Rails APIs with Vue 3 & Pinia
In Vue 3 with TypeScript, managing state with Pinia provides clean, type-safe API consumption:

\`\`\`typescript
import { defineStore } from 'pinia';
import apiClient from '@/services/api';

export const useOrderStore = defineStore('orders', {
  state: () => ({
    orders: [] as Order[],
    loading: false,
  }),
  actions: {
    async fetchOrders() {
      this.loading = true;
      try {
        const response = await apiClient.get('/api/v1/orders');
        this.orders = response.data.data;
      } finally {
        this.loading = false;
      }
    }
  }
});
\`\`\`

This architecture provides the ideal balance between developer happiness, scalability, and long-term maintainability.`
  },
  {
    id: 'database-tuning-postgres-mysql',
    slug: 'database-tuning-masterclass-postgresql-mysql-mariadb',
    title: 'Database Performance Masterclass: Optimizing PostgreSQL, MySQL & MariaDB for Production',
    excerpt: 'A comprehensive guide to index strategy, connection pooling, slow query analysis, and schema tuning across PostgreSQL, MySQL, and MariaDB.',
    coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80',
    publishedAt: 'Jun 24, 2026',
    readTime: '6 min read',
    category: 'Databases',
    tags: ['PostgreSQL', 'MySQL', 'MariaDB', 'Database', 'Indexing', 'SQL'],
    featured: false,
    likes: 198,
    author: {
      name: 'Hendra Gunawan',
      role: 'Senior Rails & Full-Stack Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    content: `## The Secret to Scaling Applications: Mastering the Database Layer

Regardless of whether your stack is powered by PostgreSQL, MySQL, or MariaDB, the database is almost always the first point of contention under heavy production workloads.

Here are the key optimization principles learned from 10+ years of tuning production database systems.

### 1. Composite Index Ordering Matters
When querying with multiple conditions (e.g. \`WHERE tenant_id = 4 AND status = 'active' ORDER BY created_at DESC\`):

\`\`\`sql
-- Correct rule: Equality columns first, range/sort columns second
CREATE INDEX idx_tenant_status_created 
ON invoices (tenant_id, status, created_at DESC);
\`\`\`

### 2. Connection Pooling is Mandatory
Never allow hundreds of application server processes to open unpooled database connections. Always use **PgBouncer** (for PostgreSQL) or **ProxySQL** (for MySQL/MariaDB) to manage connection limits and prevent thread exhaustion.

### 3. Monitoring Table Bloat & Slow Query Logs
- In MySQL / MariaDB: Enable \`slow_query_log = 1\` and set \`long_query_time = 0.5\` to catch queries taking more than 500ms.
- In PostgreSQL: Use \`pg_stat_statements\` and \`EXPLAIN (ANALYZE, BUFFERS)\` to inspect buffer reads and sequential scans.

Mastering these fundamentals ensures your data layer effortlessly scales to millions of users.`
  }
];
