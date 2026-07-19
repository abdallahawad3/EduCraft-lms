'use client';

import { ChevronDown, ChevronUp, Play } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

interface CollapsibleChapterProps {
  chapter: {
    id: string;
    title: string;
    lessons: {
      id: string;
      title: string;
    }[];
  };
  idx: number;
}
export function CollapsibleChapters({ chapter, idx }: CollapsibleChapterProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2"
    >
      <Card
        className={cn(
          'py-5 shadow-2xl border-2 gap-0',
          isOpen && 'border-primary/50 pb-0',
        )}
      >
        <CardHeader className="flex items-center justify-between space-x-4 p-4">
          <div className="flex items-center gap-4">
            <span className="text-xl flex items-center justify-center md:text-3xl font-semibold size-12 p-1 bg-primary/10 text-primary/90 rounded-full">
              {idx + 1}
            </span>
            <h4 className="text-lg md:text-3xl font-semibold">
              {chapter.title}
            </h4>
          </div>
          <div className="flex items-center gap-2">
            {chapter.lessons.length} Lessons
            <CollapsibleTrigger
              render={
                <Button variant="outline" size="icon-lg">
                  {isOpen ? (
                    <ChevronDown className="" />
                  ) : (
                    <ChevronUp className="" />
                  )}
                  <span className="sr-only">Toggle</span>
                </Button>
              }
            />
          </div>
        </CardHeader>

        <CollapsibleContent className="space-y-2">
          <CardContent className="p-4 bg-card-foreground/5">
            <ul className="space-y-2">
              {chapter.lessons.map((lesson, idx) => (
                <li
                  key={lesson.id}
                  className="flex items-center gap-2 hover:bg-card-foreground/5 p-2 rounded-lg transition-colors duration-200 cursor-pointer "
                >
                  <div className="flex items-center justify-center size-10 p-1 bg-primary/10 text-primary/90 rounded-full border border-primary/20">
                    <Play />
                  </div>
                  <div>
                    <h5 className="text-lg font-semibold">Lesson {idx + 1}</h5>
                    <p className="text-sm text-muted-foreground">
                      {lesson.title}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
