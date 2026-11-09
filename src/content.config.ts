import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const link = z.object({ label: z.string(), url: z.string() });

// One file: src/content/profile.md (frontmatter = facts, body = bio).
const profile = defineCollection({
  loader: glob({ pattern: 'profile.md', base: './src/content' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      title: z.string(),
      department: z.string(),
      email: z.string(),
      agenda: z.string(),
      headshot: image().optional(),
      links: z.array(link).default([]),
      cv: z.object({ file: z.string(), updated: z.coerce.date() }),
      teaching: z
        .array(
          z.object({
            course: z.string(),
            role: z.string(),
            term: z.string(),
            note: z.string().optional(),
          }),
        )
        .default([]),
      studioTeaser: z.string(),
    }),
});

// One file: src/content/research.yaml (a list of entries).
const research = defineCollection({
  loader: file('src/content/research.yaml'),
  schema: z.object({
    section: z.enum(['wip', 'publication', 'ra']),
    title: z.string(),
    coauthors: z.array(z.object({ name: z.string(), url: z.string().optional() })).default([]),
    venue: z.string().optional(),
    year: z.number().optional(),
    status: z.string().optional(),
    abstract: z.string().optional(),
    links: z.array(link).default([]),
    updated: z.coerce.date().optional(),
    order: z.number().default(0),
  }),
});

// One Markdown file per piece in src/content/studio/.
const studio = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/studio' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      medium: z.enum(['photography', 'ceramics', 'sound']),
      year: z.number().optional(),
      location: z.string().optional(),
      caption: z.string().optional(),
      image: image().optional(),
      alt: z.string().optional(),
      audio: z.string().optional(),
      aspect: z.string().default('3 / 2'),
      order: z.number().default(0),
      teaser: z.boolean().default(false),
    }),
});

export const collections = { profile, research, studio };
