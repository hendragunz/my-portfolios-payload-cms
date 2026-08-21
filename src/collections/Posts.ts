import type { CollectionConfig } from 'payload';

/**
 * Blog posts — powers the `/blogs` list + detail pages.
 * Content is stored as a markdown-style string to keep the existing
 * custom renderer working as-is.
 */
export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', 'featured'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'excerpt', type: 'textarea' },
    { name: 'coverImage', type: 'text' },
    { name: 'publishedAt', type: 'text' },
    { name: 'readTime', type: 'text' },
    {
      name: 'category',
      type: 'select',
      options: [
        'Ruby on Rails',
        'Next.js',
        'Vue.js',
        'PostgreSQL & DB',
        'Architecture',
        'DevOps',
        'Payload CMS',
        'Databases',
      ],
    },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text' }],
    },
    {
      name: 'author',
      type: 'group',
      fields: [
        { name: 'name', type: 'text' },
        { name: 'role', type: 'text' },
        { name: 'avatar', type: 'text' },
      ],
    },
    { name: 'content', type: 'textarea', required: true },
    { name: 'likes', type: 'number', defaultValue: 0 },
    { name: 'featured', type: 'checkbox', defaultValue: false },
  ],
};
