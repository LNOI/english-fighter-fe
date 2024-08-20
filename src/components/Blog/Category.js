import { cx } from '@/utils';
import Link from 'next/link';
import React from 'react';
// import { Link } from '@/navigation';

const Category = ({ link = '#', name, active, ...props }) => {
  return (
    <Link
      href={link}
      className={cx(
        'ease m-2 inline-block rounded-full border-2 border-solid border-dark px-6 py-1.5 transition-all duration-200 hover:scale-105 dark:border-light md:px-10 md:py-2',
        props.className,
        active
          ? 'bg-dark text-light dark:bg-light dark:text-dark'
          : 'bg-light text-dark dark:bg-dark dark:text-light'
      )}
    >
      #{name}
    </Link>
  );
};

export default Category;
