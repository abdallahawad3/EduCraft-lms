import { useSortable } from '@dnd-kit/react/sortable';
import { GripVertical, ImageOff, PlayCircle, VideoOff } from 'lucide-react';

import { Lesson } from '@/lib/types';
import { ITEM_TYPE } from '../../hooks/use-course-builder';
import { cn } from '../../lib/utils';
import Link from 'next/link';

export interface LessonRowProps {
  lesson: Lesson;
  index: number;
  chapterId: string;
}

/**
 * A single, sortable lesson. `group` is the owning chapter's id — that's
 * what allows a lesson to be dragged both within its chapter (reordering)
 * and across chapters (re-parenting, i.e. updating `Lesson.chapterId`),
 * while chapters never mix with lessons because they use a different `type`.
 */
export function LessonRow({ lesson, index, chapterId }: LessonRowProps) {
  const { ref, handleRef, isDragging, isDropTarget } = useSortable({
    id: lesson.id,
    index,
    type: ITEM_TYPE.LESSON,
    accept: ITEM_TYPE.LESSON,
    group: chapterId,
    data: { chapterId },
  });

  return (
    <Link
      href={`/courses/`}
      ref={ref}
      className={cn(
        'group/lesson flex items-center gap-2 rounded-md border border-transparent px-2 py-2 text-sm transition-colors',
        'bg-background hover:border-border hover:bg-muted/50',
        isDragging && 'opacity-40',
        isDropTarget && 'border-primary/60 bg-primary/5',
      )}
    >
      <button
        ref={handleRef}
        type="button"
        aria-label={`Reorder lesson: ${lesson.title}`}
        className={cn(
          'flex h-6 w-6 shrink-0 cursor-grab items-center justify-center rounded text-muted-foreground/60',
          'opacity-0 transition-opacity group-hover/lesson:opacity-100 active:cursor-grabbing',
          isDragging && 'cursor-grabbing opacity-100',
        )}
      >
        <GripVertical className="h-3.5 w-3.5" />
      </button>

      {lesson.videoKey ? (
        <PlayCircle className="h-4 w-4 shrink-0 text-muted-foreground" />
      ) : (
        <VideoOff
          className="h-4 w-4 shrink-0 text-muted-foreground/40"
          aria-label="No video uploaded yet"
        />
      )}

      <div className="min-w-0 flex-1">
        <div className="truncate text-foreground">{lesson.title}</div>
        {lesson.description && (
          <div className="truncate text-xs text-muted-foreground">
            {lesson.description}
          </div>
        )}
      </div>

      {!lesson.thumbnailKey && (
        <ImageOff
          className="h-3.5 w-3.5 shrink-0 text-muted-foreground/40"
          aria-label="No thumbnail uploaded yet"
        />
      )}
    </Link>
  );
}
