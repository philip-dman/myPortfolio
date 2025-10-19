"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// Define the structure of a project object for type safety
interface Project {
  id: number;
  title: string;
  content: string;
  details: string;
  image: string;
}

// Cast the imported data to the Project array type
const projects: Project[] = [
  {
    id: 1,
    image: "assistant.png",
    title: "AI Assistant",
    content:
      "I created an AI assistant using N8N, Gemini LLM's, MCP server, and telegram bot API.",
    details:
      "I created an AI assistant using N8N, Gemini LLM's, MCP server, and telegram bot API. The assistant can perform various tasks such as answering questions, providing recommendations, and automating workflows. It leverages the power of Gemini LLM's for natural language understanding and generation, while N8N orchestrates the workflows and integrations with other services. The MCP server hosts the assistant, ensuring it is always available to respond to user requests via the Telegram bot API.",
  },
  {
    id: 2,
    image: "plane.png",
    title: "Project Management Tool",
    content:
      "I self-hosted Plane, a project management tool for agile kanban projects using Docker.",
    details:
      "I self-hosted Plane, a project management tool for agile kanban projects using Docker. Plane provides a simple and intuitive interface for managing tasks, tracking progress, and collaborating with team members. By self-hosting it using Docker, I was able to easily deploy and manage the application on my own server, ensuring that my project data remains secure and under my control.",
  },
  {
    id: 3,
    image: "safeHub.png",
    title: "SafeHub",
    content: "Our team developed SafeHub, an online booking platform.",
    details:
      "Our team developed SafeHub, an online booking platform designed to streamline the reservation process for various services. The platform allows users to easily browse available options, make bookings, and manage their reservations. We focused on creating a user-friendly interface and ensuring a smooth user experience. SafeHub also includes features such as real-time availability updates and customer support integration.",
  },
  {
    id: 4,
    image: "gmailAuto.png",
    title: "Gmail Automation",
    content: "I built an automatic email sorting workflow using N8N.",
    details:
      "I built an automatic email sorting workflow using N8N to help manage my Gmail inbox more efficiently. The workflow automatically categorizes incoming emails based on predefined criteria such as sender, subject, and keywords. It then moves the emails to designated folders, applies labels, and can even trigger notifications for important messages. This automation has significantly reduced the time I spend organizing my emails and has improved my overall productivity.",
  },
  {
    id: 5,
    image: "projectReport.png",
    title: "Daily & Weekly Report Automation",
    content: "I built an AI project assistant for daily and weekly reports.",
    details:
      "I built an AI project assistant using N8N to automate the generation and distribution of daily and weekly reports based on the activity in Plane. The assistant collects data from Plane, and saves it in a database. It then uses those data to generate daily report updates. While the daily reports are saved in the database, and used for the weekly reports. The reports are sent to my email to notify me immediately. This allows me to track progress and solve potential issues in the future.",
  },
  {
    id: 6,
    image: "githubSync.png",
    title: "Workflow to GitHub Repo Sync",
    content:
      "I built a worflow on N8N to sync my workflow files to GitHub repository.",
    details:
      "I built a workflow on N8N to sync my workflow files to a GitHub repository. This automation ensures that my workflows will have backups incase of emergencies, it autosaves daily on my github repository. This setup not only saves time but also reduces the risk of forgetting to update the repository after making changes.",
  },
  {
    id: 7,
    image: "myWebsite.png",
    title: "This Portfolio Website",
    content:
      "I built this website using React, Tailwind CSS, and DaisyUI to showcase my work.",
    details:
      "I built this website using React, Tailwind CSS, and DaisyUI to showcase my work. The site features a modern design, responsive layout, and smooth animations to enhance the user experience. I also implemented various components to display my projects, skills, and contact information effectively.",
  },
  {
    id: 8,
    image: "figmaProj.png",
    title: "Website Design in Figma",
    content:
      "I built the design prototype of most of my web projects using Figma.",
    details:
      "I built the design prototype of most of my web projects using Figma. This process involved creating wireframes, user flows, and high-fidelity mockups to visualize the final product. Figma's collaborative features allowed me to work closely with stakeholders and gather feedback throughout the design process.",
  },
];

// PROJECTS COMPONENT (Manages State and Modal)

export default function Projects() {
  // State to hold the data of the project to be viewed in the modal
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Function to open the modal
  const openModal = (project: Project) => {
    setSelectedProject(project);
    // Use the native dialog API to show the modal (Required for Daisy UI)
    (
      document.getElementById("project_modal") as HTMLDialogElement
    )?.showModal();
  };

  // Function to close the modal (Optional, but good practice for cleanup)
  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div
      className="flex flex-col h-full w-full p-15 bg-base-200 gap-20"
      id="projects"
    >
      <h2 className="text-4xl font-bold text-center">Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 place-items-center items-stretch">
        {projects.map((project) => (
          <CardComponent
            key={project.id}
            project={project}
            imgSrc={`/${project.image}`}
            openModal={openModal}
          />
        ))}
      </div>

      {/* DAISY UI MODAL COMPONENT */}
      <dialog id="project_modal" className="modal">
        <div className="modal-box w-11/12 max-w-4xl bg-base-100 p-8 shadow-2xl">
          {selectedProject && (
            <>
              <h3 className="font-bold text-3xl mb-4 text-primary">
                {selectedProject.title}
              </h3>

              {/* Image for the expanded view */}
              <motion.figure
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-6 w-full h-72 overflow-hidden rounded-xl"
              >
                <img
                  src={`/${selectedProject.image}`}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </motion.figure>

              {/* The detailed description */}
              <label className="py-4 text-lg whitespace-pre-line">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {selectedProject.details}
                </motion.div>
              </label>
            </>
          )}

          <div className="modal-action">
            {/* The form method="dialog" automatically closes the modal */}
            <form method="dialog">
              <button className="btn btn-primary" onClick={closeModal}>
                Close
              </button>
            </form>
          </div>
        </div>

        {/* Click outside to close (modal-backdrop) */}
        <form method="dialog" className="modal-backdrop">
          <button onClick={closeModal}>close</button>
        </form>
      </dialog>
    </div>
  );
}

// CARD COMPONENT (Handles Display and Click)
interface CardProps {
  project: Project;
  imgSrc: string;
  openModal: (project: Project) => void;
}

function CardComponent({ project, imgSrc, openModal }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", stiffness: 100, damping: 10 },
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      }}
      layout
      className="h-full w-full"
    >
      <div className="card bg-base-100 h-full w-full shadow-lg transition-all duration-300">
        {/* Image Container */}
        <div className="rounded-tl-2xl rounded-tr-2xl w-full h-40 overflow-hidden">
          <img
            src={imgSrc}
            className="w-full h-full object-cover"
            alt={project.title}
          />
        </div>

        {/* Card Body */}
        <div className="card-body gap-3 p-6 flex flex-col justify-between">
          <h2 className="card-title text-xl font-bold">{project.title}</h2>
          <p className="text-base flex-grow">{project.content}</p>

          {/* Action Button */}
          <div className="card-actions justify-end mt-4">
            <button
              className="btn btn-primary text-base font-semibold"
              onClick={() => openModal(project)} // Call the handler, passing this project's data
            >
              More Details
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// NOTE: The separate openCard function is no longer needed.
