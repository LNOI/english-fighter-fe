import BlogDetails from '@/components/Blog/BlogDetails';
import RenderMdx from '@/components/Blog/RenderMdx';
import Tag from '@/components/Elements/Tag';
import siteMetadata from '@/utils/siteMetaData';
import { allBlogs } from 'contentlayer/generated';
import { slug } from 'github-slugger';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return allBlogs.map((blog) => ({ slug: blog._raw.flattenedPath , locale: blog._raw.flattenedPath.split("/")[0] }));
}

export async function generateMetadata({ params }) {
  const blog = allBlogs.find((blog) => blog._raw.flattenedPath === params.slug);
  if (!blog) {
    return;
  }

  const publishedAt = new Date(blog.publishedAt).toISOString();
  const modifiedAt = new Date(blog.updatedAt || blog.publishedAt).toISOString();

  let imageList : any = [siteMetadata.socialBanner];
  if (blog.image) {
    imageList =
      typeof blog.image.filePath === 'string'
        ? [siteMetadata.siteUrl + blog.image.filePath.replace('../public', '')]
        : blog.image;
  }
  const ogImages = imageList.map((img) => {
    return { url: img.includes('http') ? img : siteMetadata.siteUrl + img };
  });

  const authors = blog?.author ? [blog.author] : siteMetadata.author;

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: siteMetadata.siteUrl + blog.url,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author]
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.description,
      images: ogImages
    }
  };
}

export default function BlogPage({ params }:{params: {locale:string , slug:string}}) {
  const blog = allBlogs.find((blog) => blog._raw.flattenedPath === params.locale+"/blog/"+params.slug);

  if (!blog) {
    notFound();
  }
  let imageList: any = [siteMetadata.socialBanner];
  if (blog.image) {
    imageList =
      typeof blog.image.filePath === 'string'
        ? [siteMetadata.siteUrl + blog.image.filePath.replace('../public', '')]
        : blog.image;
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: blog.title,
    description: blog.description,
    image: imageList,
    datePublished: new Date(blog.publishedAt).toISOString(),
    dateModified: new Date(blog.updatedAt || blog.publishedAt).toISOString(),
    author: [
      {
        '@type': 'Person',
        name: blog?.author ? [blog.author] : siteMetadata.author,
        url: siteMetadata.twitter
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <div className="bg-dark relative mb-8 h-[70vh] w-full text-center">
          <div className="absolute left-1/2 top-1/2 z-10 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
            <Tag
              name={blog.tags[0]}
              link={`${params.locale}/blog-list/${slug(blog.tags[0])}`}
              className="px-6 py-2 text-sm"
            />
            <h1 className="text-light relative mt-6 inline-block w-5/6 text-2xl font-semibold capitalize !leading-normal md:text-3xl lg:text-5xl">
              {blog.title}
            </h1>
          </div>
          <div className="bg-dark/60 dark:bg-dark/40 absolute bottom-0 left-0 right-0 top-0 h-full" />
          <Image
            src={blog.image.filePath.replace('../public', '')}
            placeholder="blur"
            blurDataURL={blog.image.blurhashDataUrl}
            alt={blog.title}
            width={blog.image.width}
            height={blog.image.height}
            className="aspect-square h-full w-full object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>
        <BlogDetails blog={blog} slug={params.slug} />

        <div className="sxl:gap-16 mt-8 grid grid-cols-12 gap-y-8 px-5 md:px-10 lg:gap-8">
          <div className="col-span-12 lg:col-span-3">
            <details
              className="border-dark dark:border-light text-dark dark:text-light sticky top-6 max-h-[80vh] overflow-hidden overflow-y-auto rounded-lg border-[1px] border-solid p-4"
              open
            >
              <summary className="cursor-pointer text-lg font-semibold capitalize">
                Table Of Content
              </summary>
              <ul className="font-in mt-4 text-base">
                {blog.toc.map((heading) => {
                  return (
                    <li key={`#${heading.slug}`} className="py-1">
                      <a
                        href={`#${heading.slug}`}
                        data-level={heading.level}
                        className="border-dark/40 flex items-center justify-start border-solid data-[level=two]:border-t data-[level=three]:pl-4 data-[level=two]:pl-0 data-[level=two]:pt-2 sm:data-[level=three]:pl-6"
                      >
                        {heading.level === 'three' ? (
                          <span className="bg-dark mr-2 flex h-1 w-1 rounded-full">
                            &nbsp;
                          </span>
                        ) : null}

                        <span className="hover:underline">{heading.text}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </details>
          </div>
          <RenderMdx blog={blog} />
        </div>
      </article>
    </>
  );
}
