import type { CollectionConfig } from 'payload';

/**
 * Work experiences — powers the home "Work Experience & Impact" timeline.
 */
export const Experiences: CollectionConfig = {
  slug: 'experiences',
  admin: {
    useAsTitle: 'role',
    defaultColumns: ['role', 'company', 'period', 'isCurrent'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'role', type: 'text', required: true },
    { name: 'company', type: 'text', required: true },
    { name: 'companyUrl', type: 'text' },
    { name: 'location', type: 'text' },
    {
      name: 'type',
      type: 'select',
      options: ['Full-time', 'Contract', 'Lead'],
    },
    { name: 'period', type: 'text' },
    { name: 'isCurrent', type: 'checkbox', defaultValue: false },
    { name: 'summary', type: 'textarea' },
    {
      name: 'achievements',
      type: 'array',
      fields: [{ name: 'item', type: 'text' }],
    },
    {
      name: 'technologies',
      type: 'array',
      fields: [{ name: 'item', type: 'text' }],
    },
    { name: 'metrics', type: 'text' },
  ],
};
