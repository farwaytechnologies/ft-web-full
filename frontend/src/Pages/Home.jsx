import React from 'react';
import HomeMainSection from '../Home/HomeMainSection';
import HomeAboutSection from '../Home/HomeAboutSection';
import HomeServicesSection from '../Home/HomeServicesSection';
import HomeCourseSection from '../Home/HomeCourseSection';
import HomeWhyUsSection from '../Home/HomeWhyUsSection';
import HomeBlogSection from '../Home/HomeBlogSection';
import HomeContactSection from '../Home/HomeContactSection';
import HomeTestimonialSection from '../Home/HomeTestimonialSection'

function Home() {
  return (
    <div className="home-container">
      <HomeMainSection/>
      <HomeAboutSection/>
      <HomeServicesSection/>
      <HomeCourseSection/>
      <HomeBlogSection/>
      <HomeWhyUsSection/>
      <HomeContactSection/>
      <HomeTestimonialSection/>
    </div>
  );
}

export default Home;
