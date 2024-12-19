import { gsap } from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";

function App() {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const workRef = useRef(null);
  const projectRef = useRef(null);
  // const certifRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const [bgColor, setBgColor] = useState("rgb(0, 0, 0)");
  const [bgNavColor, setBgNavColor] = useState("rgba(0, 0, 0,0)");

  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      // once: true,
      offset: 50,
    });

    gsap.set(".flair", { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(".flair", "x", { duration: 0.6, ease: "power3" }),
      yTo = gsap.quickTo(".flair", "y", { duration: 0.6, ease: "power3" });

    window.addEventListener("mousemove", (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    });

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight - viewportHeight;

      if (scrollTop <= viewportHeight) {
        // Stay at initial color for the first 100vh
        setBgColor("rgb(0, 0, 0)");
        return;
      }

      // Adjust scrollTop to start from after 100vh
      const adjustedScrollTop = scrollTop - viewportHeight;
      const adjustedDocHeight = docHeight - viewportHeight;

      // Calculate the scroll percentage after the first 100vh
      const scrollPercentage = adjustedScrollTop / adjustedDocHeight;

      if (scrollPercentage <= 0.8) {
        // Transition from A (red) to B (blue) for the first 50% of the scroll
        const startColor = [0, 0, 0]; // Red
        const endColor = [7, 7, 14]; // Blue
        const percentage = scrollPercentage / 0.7; // Map 0-50% to 0-100%

        const newColor = startColor.map((start, i) =>
          Math.round(start + (endColor[i] - start) * percentage)
        );

        setBgColor(`rgb(${newColor[0]}, ${newColor[1]}, ${newColor[2]})`);
        setBgNavColor(`rgba(0, 0, 0,0)`);
      } else if (scrollPercentage <= 0.9) {
        // Transition from B (blue) to C (green) for the remaining 50% of the scroll
        const startColor = [7, 7, 14]; // Blue
        const endColor = [252, 227, 227]; // Green
        const percentage = (scrollPercentage - 0.8) / 0.1; // Map 50-100% to 0-100%

        const newColor = startColor.map((start, i) =>
          Math.round(start + (endColor[i] - start) * percentage)
        );

        setBgColor(`rgb(${newColor[0]}, ${newColor[1]}, ${newColor[2]})`);
        setBgNavColor(`#fc008c`);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = (ref: HTMLElement | null) => {
    window.scrollTo({
      top: ref?.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="relative flex flex-col items-center justify-center w-screen overflow-hidden scroll-smooth"
    >
      <div className="flair flair--3 hidden md:block"></div>
      <div
        style={{
          backgroundColor: isHovered ? "#fc008c" : bgNavColor,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed inset-0 h-12 !hover:bg-[#fc008c] text-white w-full z-20 transition-all duration-300 hidden lg:flex items-center justify-center gap-8 px-8"
      >
        <a
          onClick={() => {
            handleScroll(homeRef.current);
          }}
          className="hover:text-white"
        >
          Home
        </a>
        <a
          onClick={() => {
            handleScroll(aboutRef.current);
          }}
          className="hover:text-white"
        >
          About me
        </a>
        <a
          onClick={() => {
            handleScroll(workRef.current);
          }}
          className="hover:text-white"
        >
          Work Experience
        </a>
        <a
          onClick={() => {
            handleScroll(projectRef.current);
          }}
          className="hover:text-white"
        >
          Projects
        </a>
        <a
          href="https://yslmcmzwo4n.typeform.com/to/htyrDVU8"
          className="hover:text-white"
          target="_blank"
        >
          Contact
        </a>
      </div>
      <div className="fixed inset-0 h-12 bg-[#fc008c] text-black w-full z-20 transition-all duration-300 lg:hidden flex items-center justify-center gap-8 px-8">
        <a
          onClick={() => {
            handleScroll(aboutRef.current);
          }}
          className="hover:text-white"
        >
          About
        </a>
        <a
          onClick={() => {
            handleScroll(workRef.current);
          }}
          className="hover:text-white"
        >
          Experience
        </a>
        <a
          onClick={() => {
            handleScroll(projectRef.current);
          }}
          className="hover:text-white"
        >
          Project
        </a>
      </div>
      <div
        className="relative w-full h-screen flex flex-col justify-center items-center"
        id="home"
        ref={homeRef}
      >
        <div className="absolute w-full h-full flex lg:justify-center">
          <video
            className="h-full scale-[3] lg:scale-100"
            src="/bg.mp4"
            autoPlay
            loop
            muted
          ></video>
        </div>
        <TypeAnimation
          className="text-white text-center font-bold lg:flex hidden z-10 mix-blend-difference mb-8 px-8 w-3/4 ml-6"
          sequence={["Hi there, \n Vito here.", 1000]}
          wrapper="span"
          speed={20}
          style={{ fontSize: "8em" }}
          repeat={0}
          cursor={false}
        />
        <TypeAnimation
          className="text-white text-center font-bold flex lg:hidden z-10 mix-blend-difference !leading-loose px-8 mb-18"
          sequence={["Hi there, \n Vito here.", 1000]}
          wrapper="span"
          speed={20}
          style={{ fontSize: "3em" }}
          repeat={0}
          cursor={false}
        />
        <div
          onClick={() => {
            handleScroll(aboutRef.current);
          }}
          className="p-6 mt-8 bg-[#e60071] z-10 mix-blend-difference hover:mix-blend-normal hover:scale-110 transition-all duration-100"
        >
          <p className="flex flex-row">
            Learn More{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
              />
            </svg>
          </p>
        </div>
      </div>
      <div
        className="relative w-full h-screen flex lg:flex-row flex-col justify-between px-16 items-center"
        id="about"
        ref={aboutRef}
      >
        <img
          src="/line-1.png"
          className="absolute top-[30%] right-0 w-full z-[1]"
        />
        <p
          data-aos="zoom-in-up"
          className="z-10 text-white hover:text-black font-bold text-5xl lg:text-8xl hover:bg-[#fc008c] mix-blend-difference mb-8 mt-16"
        >
          About Me.
        </p>
        <p data-aos="zoom-in-left" className="z-10 text-white text-xl lg:w-1/2">
          Hey, I’m{" "}
          <span className="text-[#fc008c] hover:text-white mix-blend-difference hover:bg-[#fc008c]">
            Vito Varian Laman
          </span>
          . I build{" "}
          <span className="hover:text-[#fc008c]">websites and apps</span> for
          companies, working on both frontend and backend. While I can do both,
          I’m more into backend stuff, it’s where the fun happens for me. I also
          make <span className="hover:text-[#fc008c]">mobile apps</span> and
          work as an app developer right now. Lately, I’ve been diving into{" "}
          <span className="hover:text-[#fc008c]">crypto and Web3</span>,
          learning how to build cool things in that space. I started coding back
          in junior high by messing around with the layout of my blogspot site.
          That got me hooked on web development, and I’ve been building things
          ever since.
        </p>
      </div>
      <div
        className="relative w-full flex flex-col mt-56 p-16 items-center"
        id="experience"
        ref={workRef}
      >
        <img
          src="/line-3.png"
          className="absolute top-[30%] -right-0 lg:w-[40vw] w-[40vh] -rotate-12 opacity-80 z-[1] lg:mt-48"
        />
        <p
          data-aos="fade-up"
          data-aos-anchor-placement="center-bottom"
          className="text-white hover:text-black font-bold text-5xl lg:text-8xl hover:bg-[#fc008c] mix-blend-difference mb-24"
        >
          Work Experience.
        </p>
        <div className="flex flex-col flex-wrap items-center gap-8 lg:w-2/3">
          <div
            data-aos="fade-right"
            className="hover:scale-110 transition-all duration-200 flex justify-center w-full px-8 self-start gap-8 items-center border border-transparent hover:bg-[#fc008c]/10 hover:border-[#fc008c] rounded-sm p-8"
          >
            <a
              href="https://www.u2play.co.id"
              className="w-1/3 hidden lg:flex "
              target="_blank"
            >
              <img src="/u2play.png" className="mb-2" />
            </a>
            <div className="flex flex-col gap-1 w-2/3">
              <div className="flex lg:flex-row flex-col items-center justify-between gap-2">
                <p className="text-white text-3xl lg:text-5xl mb-2 font-semibold text-center lg:text-left">
                  U2play
                </p>
                <div className="flex justify-center p-2 bg-[#fc008c]/25  text-[#fc008c] text-md font-semibold lg:w-1/4 rounded-full">
                  Freelance
                </div>
              </div>

              <p className="text-white lg:text-3xl text-center lg:text-left">
                UI Designer
              </p>
              <p className="text-white text-sm lg:text-xl text-center lg:text-left">
                July 2021 - October 2021
              </p>
            </div>
          </div>
          <div
            data-aos="fade-left"
            className="hover:scale-110 transition-all duration-200 flex justify-center w-full px-8 self-start gap-8 items-center border border-transparent hover:bg-[#fc008c]/10 hover:border-[#fc008c] rounded-sm p-8"
          >
            <a
              href="https://ifg-life.id/"
              className="w-1/3 hidden lg:flex "
              target="_blank"
            >
              <img src="/ifg.svg" className="mb-2" />
            </a>
            <div className="flex flex-col gap-1 w-2/3">
              <div className="flex lg:flex-row flex-col items-center justify-between gap-2">
                <p className="text-white text-3xl lg:text-5xl mb-2 font-semibold text-center lg:text-left">
                  IFG LIFE
                </p>
                <div className="flex justify-center p-2 bg-[#fc008c]/25  text-[#fc008c] text-md font-semibold lg:w-1/4 rounded-full">
                  Contract
                </div>
              </div>

              <p className="text-white lg:text-3xl text-center lg:text-left">
                Mobile Developer
              </p>
              <p className="text-white text-sm lg:text-xl text-center lg:text-left">
                September 2022 - February 2023
              </p>
            </div>
          </div>
          <div
            data-aos="fade-right"
            className="hover:scale-110 transition-all duration-200 flex justify-center w-full px-8 self-start gap-8 items-center border border-transparent hover:bg-[#fc008c]/10 hover:border-[#fc008c] rounded-sm p-8"
          >
            <a
              href="https://jesseltoncap.com/"
              className="w-1/3 hidden lg:flex "
              target="_blank"
            >
              <img src="/jesselton.png" className="mb-2" />
            </a>
            <div className="flex flex-col gap-1 w-2/3">
              <div className="flex lg:flex-row flex-col items-center justify-between gap-2">
                <p className="text-white text-3xl lg:text-5xl mb-2 font-semibold text-center lg:text-left">
                  Jesselton Capital
                </p>
                <div className="flex justify-center p-2 bg-[#fc008c]/25  text-[#fc008c] text-md font-semibold lg:w-1/4 rounded-full">
                  Contract
                </div>
              </div>

              <p className="text-white lg:text-3xl text-center lg:text-left">
                Fullstack Developer
              </p>
              <p className="text-white text-sm lg:text-xl text-center lg:text-left">
                April 2023 - September 2023
              </p>
            </div>
          </div>
          <div
            data-aos="fade-left"
            className="hover:scale-110 transition-all duration-200 flex justify-center w-full px-8 self-start gap-8 items-center border border-transparent hover:bg-[#fc008c]/10 hover:border-[#fc008c] rounded-sm p-8"
          >
            <a
              href="https://sonarplatform.com/"
              className="w-1/3 hidden lg:flex "
              target="_blank"
            >
              <img src="/sonar.png" className="mb-2" />
            </a>
            <div className="flex flex-col gap-1 w-2/3">
              <div className="flex lg:flex-row flex-col items-center justify-between gap-2">
                <p className="text-white text-3xl lg:text-5xl mb-2 font-semibold text-center lg:text-left">
                  Dataxet:Sonar
                </p>
                <div className="flex justify-center p-2 bg-[#fc008c]/25  text-[#fc008c] text-md font-semibold lg:w-1/4 rounded-full">
                  Freelance
                </div>
              </div>

              <p className="text-white lg:text-3xl text-center lg:text-left">
                Backend Developer
              </p>
              <p className="text-white text-sm lg:text-xl text-center lg:text-left">
                November 2023 - February 2024
              </p>
            </div>
          </div>
          <div
            data-aos="fade-right"
            className="hover:scale-110 transition-all duration-200 flex justify-center w-full px-8 self-start gap-8 items-center border border-transparent hover:bg-[#fc008c]/10 hover:border-[#fc008c] rounded-sm p-8"
          >
            <a
              href="https://seeds.finance/"
              className="w-1/3 hidden lg:flex "
              target="_blank"
            >
              <img src="/seeds.webp" className="mb-2" />
            </a>
            <div className="flex flex-col gap-1 w-2/3">
              <div className="flex lg:flex-row flex-col items-center justify-between gap-2">
                <p className="text-white text-3xl lg:text-5xl mb-2 font-semibold text-center lg:text-left">
                  Seeds Finance
                </p>
                <div className="flex justify-center p-2 bg-[#fc008c]/25  text-[#fc008c] text-md font-semibold lg:w-1/4 rounded-full">
                  Fulltime
                </div>
              </div>

              <p className="text-white lg:text-3xl text-center lg:text-left">
                Mobile Developer
              </p>
              <p className="text-white text-sm lg:text-xl text-center lg:text-left">
                March 2024 - Present
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="relative w-full flex flex-col lg:mt-56 p-16 items-center"
        id="project"
        ref={projectRef}
      >
        <img
          src="/line-2.png"
          className="absolute top-[30%] lg:-right-10 right-0 opacity-80 z-[1] !w-[120%]"
        />
        <p
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in-back"
          className="text-white hover:text-black font-bold text-5xl lg:text-8xl hover:bg-[#fc008c] mix-blend-difference mb-24"
        >
          Project.
        </p>
        <div className="z-10 flex flex-col lg:flex-row flex-wrap justify-center items-center gap-8 p-4 lg:p-16 lg:w-2/3">
          <div
            data-aos="fade-zoom-in"
            data-aos-easing="ease-in-back"
            className="relative hover:scale-105 transition-all duration-100 lg:w-5/12"
          >
            <div className="border-4 border-black p-8 bg-[#fc008c] flex flex-col">
              <a
                href="https://www.innout.co.id/"
                target="_blank"
                className="text-black hover:text-white text-2xl font-semibold mb-2"
              >
                In-N-Out →
              </a>
              <p className="text-black">
                Drive thru Carwash company profile website
              </p>
            </div>
            <div className="border-4 border-black  absolute w-full -top-3 -left-3 p-8 bg-[#fc008c] z-[-1]">
              <a
                href="https://www.innout.co.id/"
                target="_blank"
                className="text-black hover:text-white text-2xl font-semibold mb-2"
              >
                In-N-Out →
              </a>
              <p className="text-black">
                Drive thru Carwash company profile website
              </p>
            </div>
          </div>
          <div
            data-aos="fade-zoom-in"
            data-aos-easing="ease-in-back"
            data-aos-delay="200"
            className="relative hover:scale-105 transition-all duration-100 lg:w-5/12"
          >
            <div className="border-4 border-black p-8 bg-[#fc008c] flex flex-col">
              <a
                href="https://talentvibes.io/"
                target="_blank"
                className="text-black hover:text-white text-2xl font-semibold mb-2"
              >
                Talentvibes →
              </a>
              <p className="text-black">
                Job boards and applicant tracking system
              </p>
            </div>
            <div className="border-4 border-black absolute w-full -top-3 -left-3 p-8 bg-[#fc008c] z-[-1]">
              <a
                href="https://talentvibes.io/"
                target="_blank"
                className="text-black hover:text-white text-2xl font-semibold mb-2"
              >
                Talentvibes →
              </a>
              <p className="text-black">
                Job boards and applicant tracking system
              </p>
            </div>
          </div>
          <div
            data-aos="fade-zoom-in"
            data-aos-easing="ease-in-back"
            data-aos-delay="400"
            className="relative hover:scale-105 transition-all duration-100 lg:w-5/12"
          >
            <div className="border-4 border-black p-8 bg-[#fc008c] flex flex-col">
              <a
                href="https://ihgma.org/"
                target="_blank"
                className="text-black hover:text-white text-2xl font-semibold mb-2"
              >
                IHGMA →
              </a>
              <p className="text-black">
                Company profile and internal e-commerce
              </p>
            </div>
            <div className="border-4 border-black  absolute w-full -top-3 -left-3 p-8 bg-[#fc008c] z-[-1]">
              <a
                href="https://ihgma.org/"
                target="_blank"
                className="text-black hover:text-white text-2xl font-semibold mb-2"
              >
                IHGMA →
              </a>
              <p className="text-black">
                Company profile and internal e-commerce
              </p>
            </div>
          </div>
          <div
            data-aos="fade-zoom-in"
            data-aos-easing="ease-in-back"
            data-aos-delay="600"
            className="relative hover:scale-105 transition-all duration-100 lg:w-5/12"
          >
            <div className="border-4 border-black p-8 bg-[#fc008c] flex flex-col">
              <a
                href="https://spixconnect.com/"
                target="_blank"
                className="text-black hover:text-white text-2xl font-semibold mb-2"
              >
                SpixConnect →
              </a>
              <p className="text-black">
                Community Dashboard and Forum Website
              </p>
            </div>
            <div className="border-4 border-black absolute w-full -top-3 -left-3 p-8 bg-[#fc008c] z-[-1]">
              <a
                href="https://spixconnect.com/"
                target="_blank"
                className="text-black hover:text-white text-2xl font-semibold mb-2"
              >
                SpixConnect →
              </a>
              <p className="text-black">
                Community Dashboard and Forum Website
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#fc008c] p-4 flex items-center justify-center">
        <p>Copyright © 2024 - Vito Varian Laman</p>
      </div>
    </div>
  );
}

export default App;
