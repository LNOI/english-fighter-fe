import RenderMdx from '@/components/Blog/RenderMdx';
import siteMetadata from '@/utils/siteMetaData';
import { allTerms } from 'contentlayer/generated';
import { notFound } from 'next/navigation';


export default function termPage({ params }:{params: {locale:string }}) {
  const term = allTerms.find((term) => term._raw.flattenedPath === params.locale+"/terms_of_service");

  if (!term) {
    notFound();
  }


  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: term.title,
    description: term.description,
    datePublished: new Date(term.publishedAt).toISOString(),
    dateModified: new Date(term.updatedAt || term.publishedAt).toISOString(),
    author: [
      {
        '@type': 'Person',
        name: term?.author ? [term.author] : siteMetadata.author,
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
      <div className='flex flex-col justify-center items-center py-8'>
      <p className='text-xl md:text-4xl text-nowrap text-center w-full'>{term.title}</p>
      <article >
        <div className="sxl:gap-16 mt-8 py-8 grid grid-cols-8 gap-y-8 px-5 md:px-10 lg:gap-8">
          <RenderMdx blog={term} />
        </div>
      </article>
      </div>
      
    </>
  );
}
