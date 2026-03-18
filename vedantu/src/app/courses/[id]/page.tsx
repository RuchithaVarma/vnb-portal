import CourseDetailClient from './CourseDetailClient';
import { getLocalCourses } from '@/lib/localData';

export async function generateStaticParams() {
  const courses = getLocalCourses();
  return courses.map(course => ({
    id: course.id
  }));
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return <CourseDetailClient id={params.id} />;
}
