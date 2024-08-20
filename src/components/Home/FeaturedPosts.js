import { sortBlogs } from "@/utils";
import React from "react";
import BlogLayoutOne from "../Blog/BlogLayoutOne";
import BlogLayoutTwo from "../Blog/BlogLayoutTwo";

const FeaturedPosts = ({ blogs }) => {
  const sortedBlogs = sortBlogs(blogs);
  return <section className="w-full mt-2 px-5 sm:px-10 md:px-24  sxl:px-32 flex flex-col items-center justify-center">
    <h2 className="w-full inline-block font-bold capitalize text-2xl md:text-3xl text-dark dark:text-light">Market News</h2>
    <div className="grid grid-cols-3 grid-rows-2 gap-6 mt-2">
      <article className="col-span-2 bg-red-200 sxl:col-span-1 rounded-2xl row-span-2 relative">
        <BlogLayoutOne blog={sortedBlogs[1]} />
      </article>
      <article className="col-span-2 sm:col-span-1 bg-blue rounded-xl  row-span-1 relative">
                <BlogLayoutTwo blog={sortedBlogs[2]} />

      </article>
      <article className="col-span-2 sm:col-span-1 rounded-xl row-span-1 relative">
                <BlogLayoutTwo blog={sortedBlogs[3]} />

      </article>
      <article className="col-span-2 sm:col-span-1  rounded-xl row-span-1 relative">
                <BlogLayoutTwo blog={sortedBlogs[4]} />

      </article>
      <article className="col-span-2 sm:col-span-1 row-span-1 rounded-xl relative">
                <BlogLayoutTwo blog={sortedBlogs[5]} />

      </article>
    </div>
  </section>;
};

export default FeaturedPosts;
