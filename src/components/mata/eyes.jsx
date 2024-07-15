import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Eyes = () => {
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);

  useEffect(() => {
    const leftEye = leftEyeRef.current;
    const rightEye = rightEyeRef.current;

    const eyeFollow = (event) => {
      const { clientX, clientY } = event;

      const moveEye = (eye, mouseX, mouseY) => {
        const eyeRect = eye.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;
        const angle = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);
        const offsetX = Math.cos(angle) * 10;
        const offsetY = Math.sin(angle) * 10;

        gsap.to(eye.querySelector('.pupil'), {
          x: offsetX,
          y: offsetY,
          duration: 0.2,
        });
      };

      moveEye(leftEye, clientX, clientY);
      moveEye(rightEye, clientX, clientY);
    };

    window.addEventListener('mousemove', eyeFollow);

    return () => {
      window.removeEventListener('mousemove', eyeFollow);
    };
  }, []);

  return (
      <>
    <div className="flex justify-between">
    <div className='flex items-center '>
      <div
        className="eye w-8 h-8 border-2  border-oreng rounded-full flex hover:h-[2px] justify-center items-center relative m-4"
        ref={leftEyeRef}
        >
        <div className="pupil bg-primary w-2 h-2  hover:hidden rounded-full absolute"></div>
      </div>
      <div
        className="eye w-8 h-8 border-2  border-oreng rounded-full flex hover:bg-slate-400 justify-center items-center relative m-4"
        ref={rightEyeRef}
        >
        <div className="pupil bg-primary w-2 h-2  hover:bg-red-950 rounded-full absolute"></div>
      </div> 
      </div>
      <div className='px-4 py-4 '>
      <h1 className='px-4 py-3 text-white text-xs font-semibold uppercase bg-oreng rounded-xl'>bayu husada</h1>
      </div>
    </div>
      <div className='w-[70px] rounded-md  bg-[#ECECEC] text-black h-[5px] mx-[30px] my-[10px]'></div>
     
        </>
  );
};

export default Eyes;
