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
import { ADD_CHAPTER_SCHEMA } from '@/lib/validation/add-chapter';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { addChapter } from '../action';
import { ConfettiEffect } from '@/utils/confetti';

const AddChapter = () => {
  const courseId = usePathname().split('/')[3];
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ADD_CHAPTER_SCHEMA>>({
    resolver: zodResolver(ADD_CHAPTER_SCHEMA),
    defaultValues: {
      title: '',
    },
  });

  function onSubmit(data: z.infer<typeof ADD_CHAPTER_SCHEMA>) {
    startTransition(async () => {
      const { message, status } = await addChapter({
        data,
        courseId,
      });

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
        ConfettiEffect();
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
        render={
          <Button variant="outline">
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Chapter
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new chapter</DialogTitle>
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
                    placeholder="Chapter title"
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

          <Button type="submit" className="mt-4 w-full" disabled={isPending}>
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
              'Add Chapter'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddChapter;
