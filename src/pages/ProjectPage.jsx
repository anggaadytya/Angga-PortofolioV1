import { projectData } from "../utils/data";
import { motion } from "framer-motion";
import { useState } from "react";
import { CarouselCustomNavigation } from "../components/Caraousel";
import { Helmet } from "react-helmet";

const ProjectPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const scaleVariants = {
    whileInView: {
      scale: [0, 1],
      opacity: [0, 1],
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
    whileHover: {
      scale: [1, 1.1],
      transition: {},
    },
  };

  const handleOpenModal = (index) => {
    setSelectedImage(index);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Project - Angga Adytya</title>
        <meta name="description" content="Project Angga Adytya" />
        <meta name="keywords" content="angga, adytya, portofolio, react, vite, tailwind, vercel" />
        <meta name="author" content="Angga Adytya" />
      </Helmet>
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-5 mb-10 md:mb-0 py-10 md:py-28 mx-1 md:mx-auto">
        {projectData.map((project, index) => {
          return (
            <motion.div
              variants={scaleVariants}
              whileInView={scaleVariants.whileInView}
              key={index}
              className=" rounded-2xl shadow-2xl border-2 border-gray-500 relative mx-4 md:mx-0 h-[18em] cursor-pointer dark:bg-white dark:border-none"
            >
              <div className="absolute top-0 right-0 text-white bg-black px-4 py-1 rounded-bl-lg rounded-tr-xl text-xs tracking-widest">
                <p>{project.label}</p>
              </div>
              <img
                src={project.img[0]}
                alt={project.title}
                onClick={() => handleOpenModal(index)}
                className="rounded-2xl h-full w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 text-white bg-black  px-4 py-1 rounded-br-lg rounded-bl-xl text-xs w-full text-center">
                <p>{project.title}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
      {modalOpen && (
        <div className=" fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white flex flex-col md:flex-row gap-4 mx-3 w-full">
            <div className="md:flex-[50%] relative">
              {projectData[selectedImage] && (
                <CarouselCustomNavigation
                  img={projectData[selectedImage].img}
                  selectedImage={selectedImage}
                />
              )}
            </div>

            <div className="relative flex-1 ml-2 py-5">
              <div className="bg-black cursor-pointer hover:cursor-pointer">
                <button
                  className="absolute top-3 right-4 text-sm md:text-lg font-semibold bg-black cursor-pointer h-5 w-5 md:h-6 md:w-6 rounded-lg text-white"
                  onClick={handleCloseModal}
                >
                  X
                </button>
              </div>
              <h1 className="pt-2 font-bold tracking-wider">
                {projectData[selectedImage].title}
              </h1>
              <h2 className="pt-2 font-bold tracking-wider">Introduction</h2>
              <p className="p-text">{projectData[selectedImage].subtitle}</p>
              <h2 className="pt-2 font-bold tracking-wider">Tech Stack :</h2>
              <div className="flex gap-4 py-2">
                {projectData[selectedImage].tech.map((tech, index) => {
                  return (
                    <img
                      src={tech}
                      className="h-5 w-5 md:h-7 md:w-7"
                      key={index}
                    />
                  );
                })}
              </div>
              <div className="flex gap-5 py-4 ">
                <button
                  className="bg-black text-white text-sm w-14 h-8 md:h-10 md:w-20 rounded-lg tracking-wider"
                  onClick={() => window.open(projectData[selectedImage].demo)}
                >
                  Demo
                </button>
                <button
                  className="bg-black text-white text-sm w-14 h-8 md:h-10 md:w-20 rounded-lg tracking-wider"
                  onClick={() => window.open(projectData[selectedImage].code)}
                >
                  Github
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectPage;
