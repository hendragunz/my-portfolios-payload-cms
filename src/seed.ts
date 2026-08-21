/* eslint-disable no-console */
/**
 * Seeds the Payload database with:
 *  - an admin user (admin@hendragunz.dev / password123)
 *  - the initial portfolio content (posts, projects, skills, experiences)
 *
 * Idempotent: skips any collection that already has documents.
 * Run with: npm run seed
 */
import { getPayload } from 'payload';
import config from '@payload-config';
import {
  INITIAL_BLOG_POSTS,
  INITIAL_PROJECTS,
  SKILL_CATEGORIES,
  WORK_EXPERIENCE,
} from './data/initialData';
import type { BlogPost, Experience, Project, SkillCategory } from './types';

const tagRow = (tag: string) => ({ tag });
const itemRow = (item: string) => ({ item });

const mapPost = (p: BlogPost) => ({
  title: p.title,
  slug: p.slug,
  excerpt: p.excerpt,
  coverImage: p.coverImage,
  publishedAt: p.publishedAt,
  readTime: p.readTime,
  category: p.category,
  tags: (p.tags ?? []).map(tagRow),
  author: { ...p.author },
  content: p.content,
  likes: p.likes ?? 0,
  featured: !!p.featured,
});

const mapProject = (p: Project) => ({
  title: p.title,
  tagline: p.tagline,
  description: p.description,
  category: p.category,
  featured: !!p.featured,
  image: p.image,
  tags: (p.tags ?? []).map(tagRow),
  githubUrl: p.githubUrl,
  liveUrl: p.liveUrl,
  architectureHighlights: (p.architectureHighlights ?? []).map(itemRow),
  metrics: (p.metrics ?? []).map(itemRow),
  stack: { ...p.stack },
});

const mapSkillCategory = (s: SkillCategory) => ({
  category: s.category,
  description: s.description,
  skills: (s.skills ?? []).map((skill) => ({
    name: skill.name,
    level: skill.level,
    experience: skill.experience,
    iconName: skill.iconName,
    tags: (skill.tags ?? []).map(tagRow),
    highlight: skill.highlight,
  })),
});

const mapExperience = (e: Experience) => ({
  role: e.role,
  company: e.company,
  companyUrl: e.companyUrl,
  location: e.location,
  type: e.type,
  period: e.period,
  isCurrent: !!e.isCurrent,
  summary: e.summary,
  achievements: (e.achievements ?? []).map(itemRow),
  technologies: (e.technologies ?? []).map(itemRow),
  metrics: e.metrics,
});

async function seed() {
  const payload = await getPayload({ config });

  // 1. Admin user
  const existingUsers = await payload.find({ collection: 'users', limit: 1 });
  if (existingUsers.docs.length === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@hendragunz.dev',
        password: 'password123',
        name: 'Administrator',
      },
    });
    console.log('✅ Created admin user: admin@hendragunz.dev / password123');
  } else {
    console.log('ℹ️ Admin user already exists, skipping.');
  }

  // 2. Content collections
  const collections = [
    { slug: 'posts', docs: INITIAL_BLOG_POSTS, map: mapPost },
    { slug: 'projects', docs: INITIAL_PROJECTS, map: mapProject },
    { slug: 'skill-categories', docs: SKILL_CATEGORIES, map: mapSkillCategory },
    { slug: 'experiences', docs: WORK_EXPERIENCE, map: mapExperience },
  ] as const;

  for (const { slug, docs, map } of collections) {
    const existing = await payload.find({ collection: slug, limit: 1 });
    if (existing.docs.length === 0) {
      for (const doc of docs) {
        await payload.create({ collection: slug, data: map(doc as any) });
      }
      console.log(`✅ Seeded ${docs.length} document(s) into "${slug}".`);
    } else {
      console.log(`ℹ️ "${slug}" already has data, skipping.`);
    }
  }

  console.log('🎉 Seed complete.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
