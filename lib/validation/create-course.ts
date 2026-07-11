import z from "zod";

export const courseLevel = ["Beginner", "Intermediate", "Advanced"] as const;
export const CourseStatus = ["Draft", "Published", "Archived"] as const;
export const courseCategory = [
  "Web Development",
  "Data Science",
  "Mobile Development",
  "Game Development",
  "Cloud Computing",
  "Cybersecurity",
  "Artificial Intelligence",
  "Machine Learning",
  "DevOps",
  "UI/UX Design",
  "Digital Marketing",
  "Business & Entrepreneurship",
];
export const CREATE_COURSE_SCHEME = z.object({
  title: z.string().min(5, {
    message: "Course title must be at least 5 characters long.",
  }),
  description: z.string().min(3, {
    message: "Course description must be at least 3 characters long.",
  }),
  fileKey: z.string().min(1, {
    message: "Please upload a course thumbnail or file.",
  }),
  price: z.string().min(1, {
    message: "Course price must be at least 1.",
  }),
  duration: z
    .string({
      message: "Duration must be a valid number.",
    })
    .min(1, {
      message: "Duration must be at least 1 hour.",
    })
    .max(100, {
      message: "Duration cannot exceed 100 hours.",
    }),
  level: z.enum(courseLevel, { message: "Please select a valid course level." }),
  status: z.enum(CourseStatus, { message: "Please select a valid course status." }),
  category: z.enum(courseCategory, { message: "Please select a valid course category." }),
  smallDescription: z
    .string()
    .min(3, {
      message: "Short description must be at least 3 characters long.",
    })
    .max(100, {
      message: "Short description cannot exceed 100 characters.",
    }),
  slug: z.string().min(3, {
    message: "Slug must be at least 3 characters long.",
  }),
});

export type CourseSchemeType = z.infer<typeof CREATE_COURSE_SCHEME>;
