import z from 'zod';

export const ADD_LESSON_SCHEMA = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
});

export type AddLessonSchemaType = z.infer<typeof ADD_LESSON_SCHEMA>;
