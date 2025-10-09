import "../../index.css";
import projectsData from "./envProjects.json";
import { motion } from "framer-motion"; 
import { useState } from 'react';
import Typewriter from "../../typewriter";

// Define the structure of a project object for type safety
interface Project {
  id: number;
  title: string;
  content: string;
  details: string; 
  image: string;
}

// Cast the imported data to the Project array type
const projects: Project[] = projectsData as Project[];


// PROJECTS COMPONENT (Manages State and Modal)

export default function Projects() {
  // State to hold the data of the project to be viewed in the modal
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Function to open the modal
  const openModal = (project: Project) => {
    setSelectedProject(project);
    // Use the native dialog API to show the modal (Required for Daisy UI)
    (document.getElementById('project_modal') as HTMLDialogElement)?.showModal();
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
        {projects.map((project) =>
          <CardComponent 
            key={project.id}
            project={project}
            imgSrc={new URL(`../../assets/${project.image}`, import.meta.url).href}
            openModal={openModal}
          />
        )}
      </div>

      
      {/* DAISY UI MODAL COMPONENT */}
      <dialog id="project_modal" className="modal">
        <div className="modal-box w-11/12 max-w-4xl bg-base-100 p-8 shadow-2xl">
          {selectedProject && (
            <>
              <h3 className="font-bold text-3xl mb-4 text-primary">{selectedProject.title}</h3>
              
              {/* Image for the expanded view */}
              <motion.figure
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-6 w-full h-72 overflow-hidden rounded-xl"
              >
                <img
                  src={new URL(`../../assets/${selectedProject.image}`, import.meta.url).href}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </motion.figure>
              
              {/* The detailed description */}
              <label className="py-4 text-lg whitespace-pre-line">
                <motion.div
                  initial={{ opacity: 0 , y: 20 }}
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
              <button className="btn btn-primary" onClick={closeModal}>Close</button>
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
      whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
      layout
      className="h-full w-full"
    >
      <div className="card bg-base-100 h-full w-full shadow-lg transition-all duration-300">
        {/* Image Container */}
        <div className="rounded-tl-2xl rounded-tr-2xl w-full h-40 overflow-hidden">
          <img src={imgSrc} className="w-full h-full object-cover" alt={project.title} />
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