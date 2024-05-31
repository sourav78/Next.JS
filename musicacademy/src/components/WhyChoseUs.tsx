"use client";

import React from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";
import courseData from "../data/music_data.json";


const WhyChoseUs = () => {
  return <div>
    <StickyScroll content={courseData.musicSchoolContent}/>
  </div>;
};

export default WhyChoseUs;
