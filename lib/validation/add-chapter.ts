import z from 'zod';

export const ADD_CHAPTER_SCHEMA = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
});

export type AddChapterSchemaType = z.infer<typeof ADD_CHAPTER_SCHEMA>;
