"use client";

import type { CourseSidebar } from "@/app/data/courses/get-course-sidebar";
import { useMemo } from "react";
interface IAppProps {
  course: CourseSidebar["course"];
}

interface CourseProgressResult {
  totalLesson: number;
  totalComplete: number;
  progressPercentage: number;
}
export const useCourseProgress = ({ course }: IAppProps): CourseProgressResult => {
  return useMemo(() => {
    let totalLesson = 0;
    let completedLesson = 0;
    let progressPercentage = 0;

    course.chapters.map((ch) => {
      ch.lessons.forEach((lesson) => {
        totalLesson++;
        const lessonIsCompleted = lesson.lessonProgress.some(
          (progress) => progress.lessonId == lesson.id && progress.completed,
        );
        if (lessonIsCompleted) completedLesson++;
      });

      progressPercentage = totalLesson > 0 ? Math.round((completedLesson / totalLesson) * 100) : 0;
    });

    return {
      progressPercentage: progressPercentage,
      totalLesson,
      totalComplete: completedLesson,
    };
  }, [course]);
};
