import { slug } from 'github-slugger';
import React from 'react';
import Category from './Category';

const Categories = ({ categories, currentSlug, locale }) => {
  return (
    <div className="mx-5 mt-10 flex flex-wrap items-start border-b-2 border-t-2 border-solid border-dark px-0 py-4 font-medium text-dark dark:border-light dark:text-light md:mx-10 md:px-10 sxl:px-20">
      {categories.map((cat) => (
        <Category
          key={cat}
          link={`/${locale}/blog-list/${cat}`}
          name={cat}
          active={currentSlug === slug(cat)}
        />
      ))}
    </div>
  );
};

export default Categories;
