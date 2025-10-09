import "../../index.css";
import skillsData from "./envSkills.json";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Typewriter from "../../typewriter";

const eskills = skillsData as {
  id: number;
  name: string;
  description: string;
  icon: string;
  tags: string[];
}[];

export default function Skills() {
  const [details, setDetails] = useState<string | null>(eskills[0].description);
  const [icon, setIcon] = useState<string | null>(eskills[0].icon);
  const [name, setName] = useState<string | null>(eskills[0].name);
  const [tags, setTags] = useState<string[]>(eskills[0].tags);

  return (
    <div
      className="flex flex-col h-full w-full p-15 bg-base-200 gap-20"
      id="skills"
    >
      <div className="mockup-window bg-base-100 border border-base-300 shadow-lg">
        <h2 className="text-4xl font-bold text-center">My Skills</h2>
        <div className="flex flex-col-reverse place-items-center">
          <div className="grid grid-cols-4 gap-5 md:gap-10 p-5 place-items-center h-fit w-full md:w-4/5">
            {eskills.map((skill) => {
              return (
                <React.Fragment key={skill.id}>
                  {skillBtn(
                    skill.name,
                    skill.id,
                    skill.description,
                    setDetails,
                    setIcon,
                    setName,
                    setTags
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {skillDisplay(icon, name, tags, details)}
        </div>
      </div>
    </div>
  );
}

function skillBtn(
  name?: string,
  id?: number,
  deets?: string,
  setDetails?: React.Dispatch<React.SetStateAction<string | null>>,
  setIcon?: React.Dispatch<React.SetStateAction<string | null>>,
  setName?: React.Dispatch<React.SetStateAction<string | null>>,
  setTags?: any
) {
  let toCheck = false;
  if (id === 1) {
    toCheck = true;
  }
  return (
    <motion.input
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="btn btn-square w-full h-full p-2 text-semibold text-lg"
      type="radio"
      name="options"
      aria-label={name}
      defaultChecked={toCheck}
      onClick={() => {
        if (setDetails) {
          setDetails(deets || "");
        }
        if (setIcon) {
          setIcon(eskills.find((skill) => skill.id === id)?.icon || null);
        }
        if (setName) {
          setName(eskills.find((skill) => skill.id === id)?.name || null);
        }
        if (setTags) {
          setTags(eskills.find((skill) => skill.id === id)?.tags || []);
        }
      }}
    />
  );
}

function skillDisplay(
  icon: string | null,
  name: string | null,
  tags: string[] | null,
  details: string | null
) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full h-fit py-5 px-5 md:px-10 gap-5">
      <div className="flex flex-col items-center justify-center w-full h-fit p-2 md:p-5 gap-5">
        <motion.img
          src={`/src/assets/${icon}`}
          alt={name || "Skill Icon"}
          className="h-24 w-24"
          animate={{
            scale: [1, 1.1, 1], // Pulsing effect
          }}
          transition={{
            duration: 1, // Duration of one pulse
            repeat: Infinity, // Infinite repetition
          }}
        />
        <h2 className="text-2xl font-bold">{name}</h2>
        <div className="flex flex-row justify-center gap-2">
          {tags &&
            tags.map((tag) => (
              <span key={tag} className="badge badge-outline">
                {tag}
              </span>
            ))}
        </div>
      </div>
      <div className="flex justify-center w-full h-fit p-2 md:p-5">
        {details && (
          <label className="details-display text-2xl text-center md:text-left">
            <Typewriter text={details} typingSpeed={0.01} />
          </label>
        )}
      </div>
    </div>
  );
}
