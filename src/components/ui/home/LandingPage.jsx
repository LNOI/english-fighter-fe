import React from 'react';
import Banner from './Banner';
import BannerBrand from "./BannerBrand"
import BannerSlide from "./BannerSlide"
// import { useTranslations } from 'next-intl';

const LandingPage = () => {
  // const t = useTranslations('Home');
  return (
    <div className='w-full flex flex-col dark:bg-black space-y-12 md:pt-10'>
      <BannerSlide></BannerSlide>
      <BannerBrand></BannerBrand>
    </div>
  );
};

export default LandingPage;
