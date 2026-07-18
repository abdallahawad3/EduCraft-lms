/* eslint-disable @typescript-eslint/no-explicit-any */
export type ApiResponse = {
  status: 'error' | 'success';
  message: string;
  data?: null | any;
};

/**
 *
 *   model Course  { id, title, description, fileKey, price, duration, level,
 *                   status, category, smallDescription, slug, userId, chapters[] }
 *   model Chapter { id, title, position, courseId, lessons[] }
 *   model Lesson  { id, title, description?, thumbnailKey?, videoKey?, position, chapterId }
 */

export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type CourseStatus = 'Draft' | 'Published' | 'Archived';

export interface Lesson {
  id: string;
  title: string;
  description: string | null;
  thumbnailKey: string | null;
  videoKey: string | null;
  /** 1-based order within its chapter — kept in sync with the drag order. */
  position: number;
  chapterId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Chapter {
  id: string;
  title: string;
  /** 1-based order within its course — kept in sync with the drag order. */
  position: number;
  courseId: string;
  lessons: Lesson[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  fileKey: string;
  price: number;
  duration: number;
  level: CourseLevel;
  status: CourseStatus;
  category: string;
  smallDescription: string;
  slug: string;
  userId: string;
  chapters: Chapter[];
  createAt?: string;
  updateAt?: string;
}

/** What the builder needs from a `Course` — just its id and its chapter tree. */
export type CourseData = Pick<Course, 'id' | 'chapters'>;

/** Row shape sent to the server when persisting a new chapter order. */
export interface ChapterPositionUpdate {
  id: string;
  position: number;
}

/** Row shape sent to the server when persisting a new lesson order. */
export interface LessonPositionUpdate {
  id: string;
  position: number;
  chapterId: string;
}
