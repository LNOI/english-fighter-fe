import RenderMdx from '@/components/Blog/RenderMdx';
import siteMetadata from '@/utils/siteMetaData';
import { allPrivacies } from 'contentlayer/generated';
import { notFound } from 'next/navigation';


export default function privacyPage({ params }:{params: {locale:string }}) {
  const privacy = allPrivacies.find((privacy) => privacy._raw.flattenedPath === params.locale+"/privacy_policy");

  if (!privacy) {
    notFound();
  }


  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: privacy.title,
    description: privacy.description,
    datePublished: new Date(privacy.publishedAt).toISOString(),
    dateModified: new Date(privacy.updatedAt || privacy.publishedAt).toISOString(),
    author: [
      {
        '@type': 'Person',
        name: privacy?.author ? [privacy.author] : siteMetadata.author,
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
      <p className='text-xl md:text-4xl text-nowrap text-center w-full'>{privacy.title}</p>
      <article >
        <div className="sxl:gap-16 mt-8 py-8 grid grid-cols-8 gap-y-8 px-5 md:px-10 lg:gap-8">
          <RenderMdx blog={privacy} />
        </div>
      </article>
      </div>
      
    </>
  );
}
