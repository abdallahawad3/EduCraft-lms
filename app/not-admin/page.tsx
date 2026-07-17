import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeftIcon, LucideShieldX } from 'lucide-react';
import Link from 'next/link';

const page = () => {
  return (
    <div className="min-h-dvh flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="bg-destructive/10 p-4 rounded-full mx-auto w-fit">
            <LucideShieldX className="size-16 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Access Restricted</CardTitle>
          <CardDescription className="w-xs mx-auto">
            Hey! Your are not an admin, which means you can&apos;t create course
            or stuff like that
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            href={'/'}
            className={buttonVariants({
              className: 'w-full',
            })}
          >
            <ArrowLeftIcon />
            Back to home
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
