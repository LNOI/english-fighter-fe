import { allBlogs } from 'contentlayer/generated';
import BlogLayoutThree from '@/components/Blog/BlogLayoutThree';
import Categories from '@/components/Blog/Categories';
import GithubSlugger, { slug } from 'github-slugger';

const slugger = new GithubSlugger();

export async function generateStaticParams() {
  const categories = [];
  const paths = [{ slug: 'all' }];

  allBlogs.map((blog) => {
    if (blog.isPublished) {
      blog.tags.map((tag) => {
        let slugified = slugger.slug(tag);
        if (!categories.includes(slugified)) {
          categories.push(slugified);
          paths.push({ slug: slugified });
        }
      });
    }
  });

  return paths;
}

export async function generateMetadata({ params }) {
  return {
    title: `${params.slug.replaceAll('-', ' ')} Blogs`,
    description: `Learn more about ${params.slug === 'all' ? 'web development' : params.slug} through our collection of expert blogs and tutorials`
  };
}

const CategoryPage = ({ params }) => {
  console.log('params', params);
  // Separating logic to create list of categories from all blogs
  const allCategories = ['all']; // Initialize with 'all' category
  allBlogs.forEach((blog) => {
    blog.tags.forEach((tag) => {
      const slugified = slug(tag);
      if (!allCategories.includes(slugified)) {
        allCategories.push(slugified);
      }
    });
  });

  // Sort allCategories to ensure they are in alphabetical order
  allCategories.sort();

  // Step 2: Filter blogs based on the current category (params.slug)
  const blogs = allBlogs.filter((blog) => {
    if (params.slug === 'all' &&  blog._raw.flattenedPath.includes(params.locale)) {
      return true; // Include all blogs if 'all' category is selected
    }
    return blog.tags.some((tag) => slug(tag) === params.slug && blog._raw.flattenedPath.includes(params.locale));
  });

  return (
    <article className="text-dark dark:text-light mt-12 flex flex-col">
      <div className="sxl:px-32 flex flex-col px-5 sm:px-10 md:px-24">
        <h1 className="mt-6 text-2xl font-semibold md:text-4xl lg:text-5xl">
          #{params.slug}
        </h1>
        <span className="mt-2 inline-block">
          Discover more categories and expand your knowledge!
        </span>
      </div>
      <Categories categories={allCategories} currentSlug={params.slug} locale={params?.locale} />

      <div className="sxl:mt-32 sxl:px-32 mt-5 grid grid-cols-1 grid-rows-2 gap-16 px-5 sm:mt-10 sm:grid-cols-2 sm:px-10 md:mt-24 md:px-24 lg:grid-cols-3">
        {blogs.map((blog, index) => (
          <article key={index} className="relative col-span-1 row-span-1">
            <BlogLayoutThree blog={blog} />
          </article>
        ))}
      </div>
    </article>
  );
};

export default CategoryPage;
