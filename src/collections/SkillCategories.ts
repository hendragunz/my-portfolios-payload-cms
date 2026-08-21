import type { CollectionConfig } from 'payload';

/**
 * Skill categories — each document is one category containing an array
 * of skills. Powers the home "Skills & Engineering Matrix" section.
 */
export const SkillCategories: CollectionConfig = {
  slug: 'skill-categories',
  admin: {
    useAsTitle: 'category',
    defaultColumns: ['category', 'description'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'category', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'skills',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'level', type: 'number', min: 1, max: 100 },
        { name: 'experience', type: 'text' },
        { name: 'iconName', type: 'text' },
        {
          name: 'tags',
          type: 'array',
          fields: [{ name: 'tag', type: 'text' }],
        },
        { name: 'highlight', type: 'text' },
      ],
    },
  ],
};
