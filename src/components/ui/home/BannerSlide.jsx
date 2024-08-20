'use client'
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Banner from './Banner';
// import './styles.css';

// import required modules
import { useTranslations } from 'next-intl';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function BannerSlide() {
    const t = useTranslations('Home');
  return (
    <div className='w-full '>
      <Swiper
        spaceBetween={100}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        // pagination={{
        //   clickable: true,
        // }}
        
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
        
        <Banner
            title={t('banner_1.title')}
            desc={t('banner_1.desc')}
            btn_name={t('banner_1.btn_name')}
            btn_href={t('banner_1.btn_href')}
        ></Banner>
        </SwiperSlide>   
        <SwiperSlide>
        <Banner
            title={t('banner_2.title')}
            desc={t('banner_2.desc')}
            btn_name={t('banner_2.btn_name')}
            btn_href={t('banner_2.btn_href')}
        ></Banner>
        </SwiperSlide>
        <SwiperSlide>
        <Banner
            title={t('banner_3.title')}
            desc={t('banner_3.desc')}
            btn_name={t('banner_3.btn_name')}
            btn_href={t('banner_3.btn_href')}
        ></Banner>
        </SwiperSlide>        
      </Swiper>
    </div>
  );
}
