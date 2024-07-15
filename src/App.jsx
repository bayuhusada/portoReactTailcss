import './App.css';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import UnderlineAnimation from './components/underline/UnderlineAnimation';

// Import images
import gg from './assets/gg.jpg';
import g1 from './assets/g1.jpg';
import g2 from './assets/g2.jpg';
import g3 from './assets/g3.jpg';
import g4 from './assets/g4.jpg';
import g5 from './assets/g5.jpg';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const comp = useRef(null);
  const ballRef = useRef(null);
  const ballTextRef = useRef(null);
  const underline = useRef(null);
  const gmb = useRef([]);

  const mouse = { x: 0, y: 0 };
  const pos = { x: 0, y: 0 };
  const speed = 0.1;

  const mouseEnter = (siteLink) => {
    if (siteLink) {
      gsap.to(ballRef.current, {
        width: 100,
        height: 100,
        backgroundColor: 'white',
      });
      ballRef.current?.classList.remove('mix-blend-difference');
      gsap.to(ballTextRef.current, { opacity: 1 });
    }
  };

  const mouseLeave = (siteLink) => {
    if (siteLink) {
      ballRef.current?.classList.add('mix-blend-difference');
      gsap.to(ballRef.current, { width: 20, height: 20 });
      gsap.to(ballTextRef.current, { opacity: 0 });
    }
  };

  function animatedLinkMouseEnter() {
    gsap.set(underline.current, { scaleX: 1, width: '100%' });
    gsap.from(underline.current, { scaleX: '0', transformOrigin: 'left' });
  }

  function animatedLinkMouseLeave() {
    gsap.to(underline.current, { scaleX: '0', transformOrigin: 'right' });
  }

  const textRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const t1 = gsap.timeline();
      t1.from('#intro-slider', {
        xPercent: '-100',
        duration: 1.3,
        delay: 0.3,
      })
        .from(['#title-1', '#title-2', '#title-3'], {
          opacity: 0,
          y: '+=30',
          stagger: 0.5,
        })
        .to(['#title-1', '#title-2', '#title-3'], {
          opacity: 0,
          y: '-=30',
          delay: 0.3,
          stagger: 0.5,
        })
        .to('#intro-slider', {
          xPercent: '-100',
          duration: 1.3,
        });
    }, comp);

    // Animasikan semua gambar dengan refs di gmb
    gmb.current.forEach((img, index) => {
      gsap.from(img, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: img,
          start: "top 80%",
          end: "top 50%",
          scrub: true,
          toggleActions: "play none none reverse",
        },
      });
    });

    const handleDOMContentLoaded = () => {
      const contentHolderHeight = document.querySelector('#content-holder').offsetHeight;
      const imgHolderHeight = window.innerHeight;
      const additionalScrollHeight = window.innerHeight;
      const totalBodyHeight = contentHolderHeight + imgHolderHeight + additionalScrollHeight;
      document.body.style.height = `${totalBodyHeight}px`;
    };

    document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);

    ScrollTrigger.create({
      trigger: '#web-con',
      start: '-0.1% top',
      end: 'bottom bottom',
      onEnter: () => {
        gsap.set('#web-con', { position: 'absolute', top: '195%' });
      },
      onLeaveBack: () => {
        gsap.set('#web-con', { position: 'fixed', top: '0' });
      },
    });

    gsap.to('.letter', {
      x: () => -innerWidth * 3,
      scale: 10,
      ease: 'power2.inOut',
      scrollTrigger: {
        start: 'top top',
        end: '+=200%',
        scrub: 1,
      },
    });

    gsap.to('.letter-2', {
      x: () => innerWidth * 3,
      scale: 10,
      ease: 'power2.inOut',
      scrollTrigger: {
        start: 'top top',
        end: '+=200%',
        scrub: 1,
      },
    });

    gsap.to('#img-holder', {
      rotation: 0,
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      ease: 'power2.inOut',
      scrollTrigger: {
        start: 'top',
        end: '+=200%',
        scrub: 1,
      },
    });

    gsap.to('#img-holder img', {
      scale: 1,
      ease: 'power2.inOut',
      scrollTrigger: {
        start: 'top',
        end: '+=200%',
        scrub: 1,
      },
    });

    const xSet = gsap.quickSetter(ballRef.current, 'x', 'px');
    const ySet = gsap.quickSetter(ballRef.current, 'y', 'px');

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      xSet(pos.x);
      ySet(pos.y);
    });

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
    };
  }, []);

  return (
    <>
      <div className="relative" ref={comp}>
        <div
          id="intro-slider"
          className="h-screen p-10 bg-oreng absolute top-0 left-0 font-mono z-10 w-full flex flex-col"
        >
          <h1 className="text-6xl font-semibold text-white" id="title-1">
            WELCOME
          </h1>
          <h1 className="text-6xl font-semibold text-white" id="title-2">
            TO
          </h1>
          <h1 className="text-6xl font-semibold text-white" id="title-3">
            MY PORTO
          </h1>
        </div>

        <div
          ref={ballRef}
          id="ball"
          className="bg-[#EEEEEE] rounded-full w-[20px] h-[20px] fixed top-0 left-0 pointer-events-none mix-blend-difference z-[3]"
        >
          <span
            className="text-oreng opacity-0 font-bold uppercase text-[12px] absolute left-[calc(50%-32px/2-12px)] top-[calc(50%-32px/2)]"
            ref={ballTextRef}
          >
            View Site
          </span>
        </div>
      </div>

      <div className=''>
        <div className="fixed left-0 top-0 w-full h-full z-[-1]"></div>
        <div className="flex justify-center items-center fixed mx-96 mt-96 text-abubua z-[2]" id="header">
          <div className="grid grid-cols-2 gap-4 items-center justify-center uppercase pr-48" ref={textRef}>
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

        <div id="web-con" className="z-0">
          <div id="img-holder">
            <img src={gg} alt="Main" />
          </div>

          <div className="relative h-[100vh] -top-[5px] w-full bg-abubua" id="content-holder">
            <h1 className='text-3xl text-oreng flex justify-center items-center align-middle  uppercase pt-10 '>About Me</h1>
            <UnderlineAnimation/>

            <div className='grid grid-cols-2 pt-12 px-36'>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere dicta velit quaerat repellendus architecto adipisci suscipit laborum laboriosam deserunt consequuntur saepe magnam inventore esse aperiam, consequatur, corrupti nemo qui mollitia?</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere dicta velit quaerat repellendus architecto adipisci suscipit laborum laboriosam deserunt consequuntur saepe magnam inventore esse aperiam, consequatur, corrupti nemo qui mollitia?</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere dicta velit quaerat repellendus architecto adipisci suscipit laborum laboriosam deserunt consequuntur saepe magnam inventore esse aperiam, consequatur, corrupti nemo qui mollitia?</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere dicta velit quaerat repellendus architecto adipisci suscipit laborum laboriosam deserunt consequuntur saepe magnam inventore esse aperiam, consequatur, corrupti nemo qui mollitia?</p>
            </div>

          </div>

          
          <div className='relative -top-[5px] bg-primary h-screen' id='project'>
              <h1 className='flex justify-center items-center mx-auto pt-8 text-3xl uppercase text-oreng'>Project</h1>
              <UnderlineAnimation />
              <div className='grid grid-cols-3 p-20 mx-auto gap-4'>

                <div className='flex flex-col-1 gap-10'>
                <a href="https://nekowedding.netlify.app/" className='w-full h-full'
                  onMouseEnter={() => mouseEnter(true)}
                  onMouseLeave={() => mouseLeave(true)}>
                 <img src={g1} alt="" className='rounded-3xl filter grayscale hover:filter-none duration-1000'  /> 
                </a>
                <h1 className='text-4xl font-semibold text-oreng'>WEBSITE WEDDING</h1>
                </div>

                <div></div>
                
                <div className='flex flex-col-2 gap-10'>
                <a href="https://bayu-porto-tailwindcss.netlify.app/" className='w-full h-full'
                  onMouseEnter={() => mouseEnter(true)}
                  onMouseLeave={() => mouseLeave(true)}>
                 <img src={g2} alt="" className='rounded-3xl filter grayscale hover:filter-none duration-1000'  /> 
                </a>
                <h1 className='text-4xl font-semibold text-oreng'>Porto TailwindCSS</h1>
                </div>

                <div></div>

                <div className='flex flex-col-2 gap-10'>
                <a href="https://github.com/bayuhusada/pengaduanBAWASLU.git"
                  onMouseEnter={() => mouseEnter(true)}
                  onMouseLeave={() => mouseLeave(true)}>
                 <img src={g3} alt="" className='rounded-3xl filter grayscale hover:filter-none duration-1000'  /> 
                </a>
                <h1 className='text-4xl font-semibold text-oreng'>PENGADUAN BAWASLU</h1>

                </div>

                <div></div>

                <div className='flex flex-col-2 gap-10'>
                <a href="https://github.com/bayuhusada/TODO-LIST.git" className='w-full h-full'
                  onMouseEnter={() => mouseEnter(true)}
                  onMouseLeave={() => mouseLeave(true)}>
                 <img src={g4} alt="" className='rounded-3xl filter grayscale hover:filter-none duration-1000'  /> 
                </a>
                <h1 className='text-4xl font-semibold text-oreng'>SIMPLE TOdoLIST</h1>

                </div>

                <div></div>

                <div className='flex flex-col-2 gap-10'>
                <a href="https://github.com/bayuhusada/API_anime_List.git" className='w-full h-full'
                  onMouseEnter={() => mouseEnter(true)}
                  onMouseLeave={() => mouseLeave(true)}>
                 <img src={g5} alt="" className='rounded-3xl filter grayscale hover:filter-none duration-1000'  /> 
                </a>
                <h1 className='text-4xl font-semibold text-oreng'>Project Menggunakan API</h1>

                </div>

              </div>
            </div>

        </div>
      </div>
    </>
  );
}

export default App;
