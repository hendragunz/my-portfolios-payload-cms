'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { BlogPost, Project, SkillCategory, Experience } from '../types';
import {
  INITIAL_BLOG_POSTS,
  INITIAL_PROJECTS,
  SKILL_CATEGORIES,
  WORK_EXPERIENCE
} from '../data/initialData';
import {
  fetchExperiences,
  fetchPosts,
  fetchProjects,
  fetchSkillCategories
} from '../lib/api';

interface DataContextType {
  // Content read from Payload CMS (public REST API)
  posts: BlogPost[];
  projects: Project[];
  skillCategories: SkillCategory[];
  experiences: Experience[];
  // Local-only UI interaction (not persisted to Payload)
  likePost: (id: string) => void;
  // Re-fetch all content from Payload
  refresh: () => Promise<void>;
  loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize to seed content so the site renders instantly; Payload data
  // replaces it after mount. No server/client mismatch since these are static.
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(SKILL_CATEGORIES);
  const [experiences, setExperiences] = useState<Experience[]>(WORK_EXPERIENCE);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const [fetchedPosts, fetchedProjects, fetchedSkills, fetchedExperiences] = await Promise.all([
        fetchPosts(),
        fetchProjects(),
        fetchSkillCategories(),
        fetchExperiences()
      ]);
      if (fetchedPosts.length > 0) setPosts(fetchedPosts);
      if (fetchedProjects.length > 0) setProjects(fetchedProjects);
      if (fetchedSkills.length > 0) setSkillCategories(fetchedSkills);
      if (fetchedExperiences.length > 0) setExperiences(fetchedExperiences);
    } catch (err) {
      console.warn('[DataContext] Failed to load Payload content:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load content from Payload after mount (client-only).
  useEffect(() => {
    refresh();
  }, [refresh]);

  // Like count is a playful, session-only interaction on the public site.
  // Persisted like counts come from Payload.
  const likePost = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  return (
    <DataContext.Provider
      value={{
        posts,
        projects,
        skillCategories,
        experiences,
        likePost,
        refresh,
        loading
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
