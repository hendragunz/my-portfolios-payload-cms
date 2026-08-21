export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'Fullstack' | 'Backend & DB' | 'Frontend & UI' | 'DevOps & Cloud' | string;
  featured: boolean;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  architectureHighlights: string[];
  metrics: string[];
  stack: {
    frontend?: string;
    backend?: string;
    database?: string;
    cms?: string;
    infrastructure?: string;
    tooling?: string;
    cloud?: string;
    [key: string]: string | undefined;
  };
}

export interface SkillItem {
  name: string;
  level: number; // 1-100
  experience: string;
  iconName: string;
  tags: string[];
  highlight?: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: SkillItem[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Lead';
  period: string;
  isCurrent?: boolean;
  summary: string;
  achievements: string[];
  technologies: string[];
  metrics?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  readTime: string;
  category: 'Ruby on Rails' | 'Next.js' | 'Vue.js' | 'PostgreSQL & DB' | 'Architecture' | 'DevOps' | 'Payload CMS' | 'Databases' | string;
  tags: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: string; // Markdown or structured content
  likes: number;
  featured?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  projectBudget?: string;
}
