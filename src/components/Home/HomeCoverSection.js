import { sortBlogs } from '@/utils'
import Image from 'next/image';
import Link from 'next/link';
// import { Link } from '@/navigation';
import React from 'react'
import Tag from '../Elements/Tag';
import { slug } from 'github-slugger';

const HomeCoverSection = ({blogs}) => {
    const sortedBlogs = sortBlogs(blogs);
    const blog = sortedBlogs[0];
    return (
        <div className='w-full my-2 md:my-4'>
            <article className='flex flex-col w-full md:w-1/3 items-start justify-end mx-5 sm:mx-10 relative'>
                <div className='absolute top-0 left-0 bottom-0 right-0 h-full max-w-full
                bg-gradient-to-b from-transparent from-0% to-dark/90 rounded-3xl z-0
                ' />
            <Image src={blog.image.filePath.replace("../public", "")}
            placeholder='blur'
            blurDataURL={blog.image.blurhashDataUrl}
            alt={blog.title}
            fill
            className='w-full h-full object-center object-cover rounded-3xl -z-10'
            sizes='100vw'
            priority
            />
            <div className='w-full md:w-3/4 lg:p-16 flex flex-col items-start justify-center z-0 text-light'>
                <Tag link={`/blog-list/${slug(blog.tags[0])}`} name={blog.tags[0]} />
                <Link href={blog.url} className='mt-6'>
                <h1 className='font-bold capitalize text-lg sm:text-xl md:text-2xl'>
                    <span className='bg-gradient-to-r from-accent to-accent dark:from-accentDark/50 
                    dark:to-accentDark/50 bg-[length:0px_6px]
                    hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 '>
                    {blog.title}
                    </span>
                </h1>
                </Link>
                <p className='hidden  sm:inline-block mt-4 md:text-lg lg:text-xl font-in'>
                    {blog.description}
                </p>
            </div>
        </article>
        </div>
  )
}

export default HomeCoverSection