import type { BlogPost, Experience, Project, SkillCategory, SkillItem } from '@/types';

/**
 * Client-side helpers for reading content from the Payload CMS REST API.
 * Reads are public; all writes happen in the Payload admin panel at /admin.
 */

const API_BASE = '/api';
const PAGE_SIZE = 100;

// Fallbacks used when admin-created content is missing images.
const FALLBACK_BLOG_IMAGE =
  'https://images.unsplash.com/photo-1618401471353-b98aedd04e11?auto=format&fit=crop&w=1200&q=80';
const FALLBACK_PROJECT_IMAGE =
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80';

type PayloadListResponse<T> = {
  docs: T[];
  totalDocs: number;
  totalPages: number;
  page: number;
};

async function getCollection<T>(slug: string): Promise<T[]> {
  try {
    const res = await fetch(`${API_BASE}/${slug}?limit=${PAGE_SIZE}&depth=1`);
    if (!res.ok) {
      console.warn(`[api] Failed to fetch /${slug}:`, res.status);
      return [];
    }
    const data = (await res.json()) as PayloadListResponse<T>;
    return data.docs ?? [];
  } catch (err) {
    console.warn(`[api] Error fetching /${slug}:`, err);
    return [];
  }
}

/* ---------------- Posts ---------------- */

type PayloadTag = { tag?: string | null } | null;
type PayloadAuthor = { name?: string | null; role?: string | null; avatar?: string | null } | null;

export async function fetchPosts(): Promise<BlogPost[]> {
  const docs = await getCollection<Record<string, any>>('posts');
  return docs.map((d) => ({
    id: String(d.id),
    slug: d.slug ?? '',
    title: d.title ?? '',
    excerpt: d.excerpt ?? '',
    coverImage: d.coverImage || FALLBACK_BLOG_IMAGE,
    publishedAt: d.publishedAt ?? '',
    readTime: d.readTime ?? '',
    category: d.category ?? '',
    tags: (d.tags ?? []).map((t: PayloadTag) => t?.tag ?? '').filter(Boolean),
    author: {
      name: (d.author as PayloadAuthor)?.name ?? 'Hendra Gunawan',
      role: (d.author as PayloadAuthor)?.role ?? '',
      avatar: (d.author as PayloadAuthor)?.avatar ?? '',
    },
    content: d.content ?? '',
    likes: d.likes ?? 0,
    featured: !!d.featured,
  }));
}

/* ---------------- Projects ---------------- */

export async function fetchProjects(): Promise<Project[]> {
  const docs = await getCollection<Record<string, any>>('projects');
  return docs.map((d) => ({
    id: String(d.id),
    title: d.title ?? '',
    tagline: d.tagline ?? '',
    description: d.description ?? '',
    category: d.category ?? '',
    featured: !!d.featured,
    image: d.image || FALLBACK_PROJECT_IMAGE,
    tags: (d.tags ?? []).map((t: PayloadTag) => t?.tag ?? '').filter(Boolean),
    githubUrl: d.githubUrl ?? '',
    liveUrl: d.liveUrl ?? '',
    architectureHighlights: (d.architectureHighlights ?? []).map((a: any) => a?.item ?? '').filter(Boolean),
    metrics: (d.metrics ?? []).map((m: any) => m?.item ?? '').filter(Boolean),
    stack: {
      frontend: d.stack?.frontend ?? undefined,
      backend: d.stack?.backend ?? undefined,
      database: d.stack?.database ?? undefined,
      cms: d.stack?.cms ?? undefined,
      infrastructure: d.stack?.infrastructure ?? undefined,
      tooling: d.stack?.tooling ?? undefined,
      cloud: d.stack?.cloud ?? undefined,
    },
  }));
}

/* ---------------- Skills ---------------- */

export async function fetchSkillCategories(): Promise<SkillCategory[]> {
  const docs = await getCollection<Record<string, any>>('skill-categories');
  return docs.map((d) => ({
    category: d.category ?? '',
    description: d.description ?? '',
    skills: (d.skills ?? []).map((s: Record<string, any>): SkillItem => ({
      name: s.name ?? '',
      level: s.level ?? 0,
      experience: s.experience ?? '',
      iconName: s.iconName ?? 'Cpu',
      tags: (s.tags ?? []).map((t: PayloadTag) => t?.tag ?? '').filter(Boolean),
      highlight: s.highlight ?? undefined,
    })),
  }));
}

/* ---------------- Experiences ---------------- */

export async function fetchExperiences(): Promise<Experience[]> {
  const docs = await getCollection<Record<string, any>>('experiences');
  return docs.map((d) => ({
    id: String(d.id),
    role: d.role ?? '',
    company: d.company ?? '',
    companyUrl: d.companyUrl ?? undefined,
    location: d.location ?? '',
    type: d.type ?? 'Full-time',
    period: d.period ?? '',
    isCurrent: !!d.isCurrent,
    summary: d.summary ?? '',
    achievements: (d.achievements ?? []).map((a: any) => a?.item ?? '').filter(Boolean),
    technologies: (d.technologies ?? []).map((t: any) => t?.item ?? '').filter(Boolean),
    metrics: d.metrics ?? undefined,
  }));
}
