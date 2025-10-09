import "../../index.css";
import { MdOutlineMailOutline } from "react-icons/md";
import { BiSolidPhoneCall } from "react-icons/bi";
import { PiFacebookLogoBold } from "react-icons/pi";
import { VscGithub } from "react-icons/vsc";

import type { IconType } from "react-icons";
import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  return (
    <div className="flex flex-col h-full w-full p-15 gap-20" id="contacts">
      <h2 className="text-4xl font-bold text-center">
        You think I can help? <br /> Contact Me 🧡
      </h2>

      <div className="flex flex-col md:flex-row gap-5 place-items-center justify-center">
        <div className="card  w-96 ">
          <div className="card-body gap-5">
            <h2 className="card-title text-xl font-bold">Contacts</h2>
            <ul className="text-lg space-y-3">
              {contactList(MdOutlineMailOutline, "manaoghanzphilip@gmail.com")}
              {contactList(BiSolidPhoneCall, "+63 960-427-5530")}
              {contactList(PiFacebookLogoBold, "Hanz Philip Manaog")}
              {contactList(VscGithub, "philip-dman")}
            </ul>
          </div>
        </div>

        <div className="card bg-base-200 w-96 shadow-sm">
          <div className="card-body gap-5">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">What is your name?</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Type here"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </fieldset>

            <label className="input validator w-full">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input type="email" placeholder="mail@site.com" value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
            </label>
            <div className="validator-hint hidden">
              Enter valid email address
            </div>

            <textarea
              className="textarea w-full h-full"
              placeholder="Message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>

            <div className="card-actions justify-end">
              <button
                className="btn btn-primary text-lg font-semibold"
                onClick={() => console.log({ name, email, message })}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function contactList(Icon: IconType, text: string) {
  return (
    <li className="flex flex-row items-center gap-5">
      <Icon className="w-8 h-8" />
      {text}
    </li>
  );
}

