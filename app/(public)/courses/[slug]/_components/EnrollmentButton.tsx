'use client';

import { Button } from '@/components/ui/button';
import { tryCatch } from '@/hooks/try-catch';
import { ConfettiEffect } from '@/utils/confetti';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { enrollInCourseAction } from '../action';

const EnrollmentButton = ({ courseId }: { courseId: string }) => {
  const [isPending, setTransition] = useTransition();

  function onSubmit() {
    setTransition(async () => {
      const { data, error } = await tryCatch(enrollInCourseAction(courseId));
      if (error) {
        toast.error('Something went wrong. Please try again later.');
        return;
      }

      if (data?.status === 'success') {
        toast.success('You have been enrolled in the course.');
        ConfettiEffect();
      }
    });
  }
  return (
    <Button disabled={isPending} className={'w-full'} onClick={onSubmit}>
      {isPending ? (
        <>
          <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
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
          Enrolling...
        </>
      ) : (
        'Enroll Now.!'
      )}
    </Button>
  );
};
export default EnrollmentButton;
