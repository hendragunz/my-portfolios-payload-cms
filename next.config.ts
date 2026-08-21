import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Next.js 16 auto-generates AGENTS.md/CLAUDE.md unless disabled.
  agentRules: false,
};

export default withPayload(nextConfig);
