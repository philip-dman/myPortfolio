"use client";

import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Typewriter from "../typewriter";

export default function Hero() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    // DaisyUI sets data-theme on html element
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute("data-theme"));
    });
    setTheme(document.documentElement.getAttribute("data-theme"));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  // Use techBgWhite for lofiMod (light theme), otherwise use techBgDark (default or lofiModInverse)
  const videoSrc = theme === "lofiMod" ? "/techBgWhite.mp4" : "/techBgDark.mp4";
  console.log("Current theme:", theme, "Video src:", videoSrc);

  return (
    <div className="hero h-200 w-screen" id="home">
      <video
        key={theme} // Force remount on theme change
        className="absolute inset-0 w-full h-full object-cover -z-10 opacity-70"
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="hero-content flex-row gap-10 px-10 w-screen">
        <div className="flex-col w-screen space-y-5">
          <div>
            <h1 className="text-5xl font-bold">
              <Typewriter text="Hi 👋" />
            </h1>
          </div>
          <div>
            <h1 className="text-5xl font-regular">
              <Typewriter
                text="I'm Hanz Philip Manaog"
                startDelay={0.5}
                typingSpeed={0.05}
              />
            </h1>
          </div>
          <div>
            <h1 className="text-6xl font-bold flex flex-row items-center space-x-2">
              <Typewriter
                text="Tech Enthusiast"
                startDelay={1.3}
                typingSpeed={0.05}
              />
              <motion.label
                className="text-6xl font-extrabold items-baseline"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: 1.8 }}
              >
                |
              </motion.label>
            </h1>
          </div>

          <div className="avatar flex-row gap-10">
            <FaGithub
              className="w-10 h-10"
              onClick={() =>
                window.open("https://github.com/philip-dman?tab=overview")
              }
            />
            <FaFacebook
              className="w-10 h-10"
              onClick={() =>
                window.open("https://www.facebook.com/hanz.philip.manaog.2024/")
              }
            />
            <MdEmail
              className="w-10 h-10"
              onClick={() =>
                document
                  .getElementById("contacts")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            />
            <FaLinkedin className="w-10 h-10" />
          </div>

          <div>
            <button
              className="btn btn-primary h-15 w-45 text-xl font-bold"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Check my work
            </button>
          </div>
        </div>

        <img
          src="/profIcon.png"
          className="w-100 h-100 rounded-full object-cover shadow-2xl hidden md:block"
        />
      </div>
    </div>
  );
}

export function HeroDivider() {
  return <div className="divider divider-primary"></div>;
}

import { FaCss3Alt, FaDocker, FaHtml5, FaJava, FaPython } from "react-icons/fa";
import { LuFigma } from "react-icons/lu";
import { RiJavascriptFill } from "react-icons/ri";
import { SiN8N } from "react-icons/si";
import { TbBrandReact } from "react-icons/tb";

export function Banner() {
  // List of icons to render
  const icons = [
    <SiN8N key="n8n" className="h-10 w-10" />,
    <TbBrandReact key="react" className="h-10 w-10" />,
    <FaHtml5 key="html" className="h-10 w-10" />,
    <FaCss3Alt key="css" className="h-10 w-10" />,
    <RiJavascriptFill key="javascript" className="h-10 w-10" />,
    <LuFigma key="figma" className="h-10 w-10" />,
    <FaGithub key="github" className="h-10 w-10" />,
    <FaDocker key="docker" className="h-10 w-10" />,
    <FaJava key="java" className="h-10 w-10" />,
    <FaPython key="python" className="h-10 w-10" />,
  ];
  return (
    <div className="overflow-hidden w-full bg-base-200 px-10 py-5">
      <div className="flex min-w-max gap-16 justify-between animate-banner-scroll">
        {icons}
        {icons}
        {icons}
      </div>
    </div>
  );
}
