import { Button } from '@/components/ui/button';
import { S3 } from '@/lib/S3Clinet';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import Link from 'next/link';
import { getAllCourses } from './create/action';

const page = async () => {
  const courses = await getAllCourses();
  console.log(courses);
  const url = await getSignedUrl(
    S3,
    new GetObjectCommand({
      Bucket: 'abdullah-lms',
      Key: courses?.data[0]?.fileKey,
    }),
    { expiresIn: 3600 },
  );

  console.log(url);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium tracking-tight">Your Courses</h1>
        <Button
          nativeButton={false}
          render={<Link href={'/admin/courses/create'} />}
        >
          <span className="text-sm font-medium">Create Course</span>
        </Button>
      </div>

      <div>
        <p className="text-muted-foreground">
          Here you will find all your courses.
        </p>
      </div>
    </>
  );
};

export default page;
