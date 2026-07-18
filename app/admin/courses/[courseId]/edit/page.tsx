'use clinet';

import { adminGetCourse } from '@/actions/admin/get-course-data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getImageUrl } from '@/utils/get-url';
import MainStructure from './_component/CourseBuilder';
import EditCourseForm from './_component/EditCourseForm';
import { getAllChapters } from './action';

interface IProps {
  params: Promise<{ courseId: string }>;
}

const page = async ({ params }: IProps) => {
  const { courseId } = await params;

  const course = await adminGetCourse(courseId);
  const imageUrl = await getImageUrl(course.fileKey);
  const chapters = await getAllChapters(courseId);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Edit Course:{' '}
        <span className="text-pretty underline">{course.title}</span>
      </h1>
      <Tabs defaultValue={'basic-info'}>
        <TabsList className={'w-full h-12!'}>
          <TabsTrigger className={'cursor-pointer'} value={'basic-info'}>
            Basic Info
          </TabsTrigger>
          <TabsTrigger className={'cursor-pointer'} value={'course-structure'}>
            Course Structure
          </TabsTrigger>
        </TabsList>
        <TabsContent value={'basic-info'}>
          <Card>
            <CardHeader>
              <CardTitle>Basic Info</CardTitle>
              <CardDescription>Edit basic course information</CardDescription>
            </CardHeader>
            <CardContent>
              <EditCourseForm data={course} imageUrl={imageUrl} id={courseId} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value={'course-structure'}>
          <MainStructure
            courseId={courseId}
            initialData={chapters?.data ?? []}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
