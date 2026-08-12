import z from "zod";

export const ADD_LESSON_SCHEMA = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});
export const ADD_LESSON_SCHEMA_WITH_OPTIONAL_FIELDS = ADD_LESSON_SCHEMA.extend({
  description: z.any().nullable(),
  thumbnailKey: z.string().optional(),
  videoKey: z.string().optional(),
  courseId: z.string().optional(),
});
export type AddLessonSchemaType = z.infer<typeof ADD_LESSON_SCHEMA>;
export type AddLessonSchemaWithOptionalFieldsType = z.infer<
  typeof ADD_LESSON_SCHEMA_WITH_OPTIONAL_FIELDS
>;
