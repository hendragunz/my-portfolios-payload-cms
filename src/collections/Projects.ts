import type { CollectionConfig } from 'payload';

/**
 * Projects — powers the `/projects` list + detail pages and the home showcase.
 */
export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featured'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'tagline', type: 'text' },
    { name: 'description', type: 'textarea' },
    {
      name: 'category',
      type: 'select',
      options: ['Fullstack', 'Backend & DB', 'Frontend & UI', 'DevOps & Cloud'],
    },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'image', type: 'text' },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text' }],
    },
    { name: 'githubUrl', type: 'text' },
    { name: 'liveUrl', type: 'text' },
    {
      name: 'architectureHighlights',
      type: 'array',
      fields: [{ name: 'item', type: 'text' }],
    },
    {
      name: 'metrics',
      type: 'array',
      fields: [{ name: 'item', type: 'text' }],
    },
    {
      name: 'stack',
      type: 'group',
      fields: [
        { name: 'frontend', type: 'text' },
        { name: 'backend', type: 'text' },
        { name: 'database', type: 'text' },
        { name: 'cms', type: 'text' },
        { name: 'infrastructure', type: 'text' },
        { name: 'tooling', type: 'text' },
        { name: 'cloud', type: 'text' },
      ],
    },
  ],
};
