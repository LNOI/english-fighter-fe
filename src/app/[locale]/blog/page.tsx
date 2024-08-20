import { allBlogs } from 'contentlayer/generated';
import HomeCoverSection from '@/components/Home/HomeCoverSection';
import FeaturedPosts from '@/components/Home/FeaturedPosts';
import RecentPosts from '@/components/Home/RecentPosts';

export default function Page({ params }: { params: { locale: string } }) {
  const blogs = allBlogs.filter((blog) =>
    blog._raw.flattenedPath.includes(params.locale)
  );
  return (
    <main className="flex flex-col items-center justify-center">
      {/* <HomeCoverSection blogs={blogs} /> */}
      <FeaturedPosts blogs={blogs} />
      <RecentPosts blogs={blogs} />
    </main>
  );
}
