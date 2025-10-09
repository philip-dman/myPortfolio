import "../../index.css";
import profIcon from "../../assets/profIcon.jpg";
import { TiThMenu } from "react-icons/ti";
import { useState, useEffect } from 'react';

const ThemeToggleButton = () => {
  const [theme, setTheme] = useState('lofiModInverse');

  useEffect(() => {
    // Set the initial theme from the document element
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme) {
      setTheme(currentTheme);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "lofiMod" ? "lofiModInverse" : "lofiMod";
    document.documentElement.setAttribute("data-theme", nextTheme);
    setTheme(nextTheme);
  };

  return (
    <button
      className={`btn btn-ghost swap swap-rotate ${theme === "lofiModInverse" ? "swap-active" : ""}`}
      aria-label="Toggle theme"
      onClick={toggleTheme}
    >
      {/* Sun icon for light mode */}
      <span className="swap-on">
        <svg
          className="h-10 w-10 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
        </svg>
      </span>
      {/* Moon icon for dark mode */}
      <span className="swap-off">
        <svg
          className="h-10 w-10 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
        </svg>
      </span>
    </button>
  );
};

export { ThemeToggleButton };

export default function Header() {
  return (
    <div className="navbar bg-base-100 shadow-sm px-10 fixed top-0 left-0 w-full z-50">
      <div className="avatar">
        <div className="w-10 rounded-full">
          <img src={profIcon} />
        </div>
      </div>

      <div className="text-xl font-bold px-3">Hanz Philip Manaog</div>

      <div className="flex ml-auto gap-5">
        {headerBtnDefault("Home", "home")}
        {headerBtnDefault("About", "about")}
        {headerBtnDefault("Projects", "projects")}
        {headerBtnDefault("Skills", "skills")}
        {headerBtnDefault("Contacts", "contacts")}

        <ThemeToggleButton />

        <div className="dropdown dropdown-end md:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <TiThMenu className="h-7 w-7" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>{headerBtnDropdown("Home", "home")}</li>
            <li>{headerBtnDropdown("About", "about")}</li>
            <li>{headerBtnDropdown("Projects", "projects")}</li>
            <li>{headerBtnDropdown("Skills", "skills")}</li>
            <li>{headerBtnDropdown("Contacts", "contacts")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function headerBtnDefault(text: string, id: string) {
  return (
    <button
      className="btn btn-ghost hidden md:block"
      onClick={() =>
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
      }
    >
      {text}
    </button>
  );
}

function headerBtnDropdown(text: string, id: string) {
  return (
    <button
      className="btn btn-ghost"
      onClick={() =>
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
      }
    >
      {text}
    </button>
  );
}

