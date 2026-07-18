'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { ADD_LESSON_SCHEMA } from '@/lib/validation/add-lesson';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import { useState, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { addLessonToChapter } from '../actions/lessons';

interface AddLessonProps {
  onClick: () => void;
  chapterId: string | null;
}

const AddLesson = ({ onClick, chapterId }: AddLessonProps) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ADD_LESSON_SCHEMA>>({
    resolver: zodResolver(ADD_LESSON_SCHEMA),
    defaultValues: {
      title: '',
    },
  });

  function onSubmit(data: z.infer<typeof ADD_LESSON_SCHEMA>) {
    if (!chapterId) {
      toast.error('Chapter ID is missing');
      return;
    }
    startTransition(async () => {
      const { message, status } = await addLessonToChapter(chapterId, data.title);

      if (status === 'success') {
        toast.promise<{ name: string }>(
          () =>
            new Promise((resolve) =>
              setTimeout(() => resolve({ name: 'Event' }), 2000),
            ),
          {
            loading: 'Adding...',
            success: () => `${message}`,
            error: 'Error',
          },
        );

        closeDialog();
      }
    });
  }

  function closeDialog() {
    setOpen(false);
    form.reset();
  }
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger
        className="w-full border border-dashed border-primary bg-transparent text-muted-forground hover:text-muted-forground/90 hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={onClick}
        render={
          <Button variant={'outline'} size={'sm'}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add new lesson
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new lesson</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="flex flex-col gap-2"
                >
                  <FieldLabel htmlFor="title" className="text-sm font-medium">
                    Title
                  </FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    id="title"
                    type="text"
                    placeholder="Lesson title"
                    {...field}
                  />
                  {fieldState.error && (
                    <p className="text-xs text-destructive">
                      {fieldState.error.message}
                    </p>
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <Button
            onSubmit={() => {}}
            type="submit"
            className="mt-4 w-full"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <svg
                  className="mr-2 h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Adding...
              </>
            ) : (
              'Add new lesson'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLesson;
