import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const UnderlineAnimation = () => {
  const underlineRef = useRef(null);

  useEffect(() => {
    gsap.to(underlineRef.current, {
      scrollTrigger: {
        trigger: underlineRef.current,
        start: "top 80%",
        end: "top 50%",
        scrub: true,
      },
      width: "10%",
      ease: "power1.inOut"
    });
  }, []);

  return (
    <div className="relative my-6 text-center">
      <div
        className="absolute bottom-0 left-1/2 w-0 h-1 bg-oreng transform -translate-x-1/2"
        ref={underlineRef}
      ></div>
    </div>
  );
};

export default UnderlineAnimation;
