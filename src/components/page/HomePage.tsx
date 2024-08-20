import React from 'react';
import LandingPage from '@/components/ui/home/LandingPage';
import ComingSoon from '../ui/ComingSoon';
function HomePage() {
  return (
    <div className="w-full">
      <LandingPage></LandingPage>
      <ComingSoon></ComingSoon>
    </div>
  );
}

export default HomePage;
