import type { CollectionConfig } from 'payload';

/**
 * Admin users — authenticate against the Payload admin panel.
 */
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'createdAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
};
