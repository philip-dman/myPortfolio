import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Header from "./components/header/header.tsx";
import Hero from "./components/hero/hero.tsx";
import { heroDivider } from "./components/hero/hero.tsx";
import { Banner } from "./components/hero/hero.tsx";
import About from "./components/about/about.tsx";
import Projects from "./components/projects/projects.tsx";
import Contact from "./components/contact/contact.tsx";
import Footer from "./components/footer/footer.tsx";
import Skills from "./components/skills/skills.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Header />
    <Hero />
    {Banner()}
    <About />
    {heroDivider()}
    <Projects />
    <Skills />
    {heroDivider()}
    <Contact />
    <Footer />
  </StrictMode>
);
