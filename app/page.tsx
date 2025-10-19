import About from "./components/about/about";
import ChatBot from "./components/chatBot/chatBot";
import Contact from "./components/contact/contact";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import Hero, { Banner, HeroDivider } from "./components/hero/hero";
import Projects from "./components/projects/projects";
import Skills from "./components/skills/skills";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Banner />
      <About />
      <HeroDivider />
      <Projects />
      <Skills />
      <HeroDivider />
      <Contact />
      <Footer />
      <ChatBot />
    </>
  );
}
