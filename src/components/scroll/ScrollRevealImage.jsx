import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollDisappear = () => {
  const textRef = useRef(null);

  useLayoutEffect(() => {
    ScrollTrigger.create({
      trigger:"#web-con",
      start: "0.5% top",
      end:"bottom bottom",

      onEnter: () => {
        gsap.set("#web-con", {position:'absolute', top:'195%'});
      },
      onLeaveBack:() =>{
        gsap.set("#web-con", {position:'fixed', top:'0'});
      }
    });

    gsap.to(".letter", {
      x: () => -innerWidth * 3,
      scale: 10,
      ease: "power2.inOut",
      scrollTrigger: {
        start: "top top",
        end: `+=200%`,
        scrub: 1,
      },
    });
    gsap.to(".letter-2", {
      x: () => innerWidth * 3,
      scale: 10,
      ease: "power2.inOut",
      scrollTrigger: {
        start: "top top",
        end: `+=200%`,
        scrub: 1,
      },
    });

    
    gsap.to("#img-holder", {
      rotation:0,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "power2.inOut",
      scrollTrigger: {
        start: "top",
        end: `+=200%`,
        scrub: 1,
      },
      
    });

    gsap.to("#img-holder img", {
      scale:1,
      ease: "power2.inOut",
      scrollTrigger: {
        start: "top",
        end: `+=200%`,
        scrub: 1,
      },
      
    });

    
    
    
  }, []);

  return (
    <>
    
    <div className="flex justify-center items-center fixed mx-96 mt-96 z-[2]" id='header'>
      <div className="grid grid-cols-2 gap-4 items-center justify-center" ref={textRef}>
        <div className="flex">
          <div className="font-bold text-[200px] letter">B</div>
          <div className="font-bold text-[200px] letter">a</div>
          <div className="font-bold text-[200px] letter">y</div>
          <div className="font-bold text-[200px] letter">u</div>
        </div>
        <div className="flex">
          <div className="font-bold text-[200px] letter-2">H</div>
          <div className="font-bold text-[200px] letter-2">u</div>
          <div className="font-bold text-[200px] letter-2">s</div> 
          <div className="font-bold text-[200px] letter-2">a</div>
          <div className="font-bold text-[200px] letter-2">d</div>
          <div className="font-bold text-[200px] letter-2">a</div>
        </div>
      </div>
    </div>

    <div id='web-con' >
      <div id='img-holder'>
        <img src="./src/assets/gg.jpg" alt=""  />
      </div>
    </div>

    <div className='h-screen relative'>
      
    </div>
    </>
  );
};

export default ScrollDisappear;
