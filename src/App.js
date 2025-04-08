import React, { useEffect, useState, useRef, useMemo } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import SplineScene from './Spline';


const API_KEY = 'AIzaSyDWd0kAnwglwg5Yaojil1otnWIsFGQrTtM';
const PLAYLIST_ID = 'PLqbYO_bYE2CmPX7lwz79ZSYr-6Ir87KBc';

const ParticleField = () => {
  const ref = useRef();
  const positions = useMemo(() => {
    const count = 2000;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, []);

  useEffect(() => {
    if (ref.current) {
      gsap.to(ref.current.rotation, {
        y: Math.PI * 2,
        duration: 60,
        repeat: -1,
        ease: 'none',
      });
    }
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.material.opacity = 0.2 + 0.3 * Math.sin(time);
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        color="#292929"
        size={0.05}
        sizeAttenuation
        transparent
        depthWrite={false}
        alphaTest={0.01}
      />
    </Points>
  );
};

const Background3D = () => (
  <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, background: '#f5f5f5' }} camera={{ position: [0, 0, 10], fov: 75 }}>
    <ambientLight intensity={0.5} />
    <ParticleField />
  </Canvas>
);

const VideoCard = ({ videoId, title, author, description, onClick }) => (
  <div className="card mb-4 shadow" onClick={onClick} style={{ cursor: 'pointer', zIndex: 10, backgroundColor: '#ffffff', border: '1px solid #ccc' }}>
    <div className="card-body">
      <h5 className="card-title text-dark">{title}</h5>
      <h6 className="card-subtitle mb-2 text-muted">{author}</h6>
      <p className="card-text text-muted small">{description}</p>
    </div>
    <div className="ratio ratio-16x9">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  </div>
);

const Modal = ({ videoId, onClose }) => (
  <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1050 }}>
    <div className="modal-dialog modal-lg modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Video Preview</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
        <div className="modal-body">
          <div className="ratio ratio-16x9">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title="Video Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark shadow fixed-top" style={{ backgroundColor: '#d3d3d3', marginTop: 0 }}>
    <div className="container">
      <a className="navbar-brand fw-bold text-dark" href="#">AI4DM Fall'24 Project Gallery</a>
      <a className="nav-link text-dark" href="#gallery">Projects</a>
    </div>
  </nav>
);

export default function App() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const projectDetails = [
    {
      videoId: 'VIDEO_ID_1',
      title: 'Closet Care Buddy',
      author: 'Gabriela Buraglia',
      description: 'This application is focused on supporting people as they clean out their closet by first describing the clothing item they are considering discarding and then by providing outfit inspiration ideas.'
    },
    {
      videoId: 'VIDEO_ID_2',
      title: 'Chiikana AI',
      author: 'Chunqin Cao',
      description: "I imagine a future where 'Integrated AI Robots' become fully customizable virtual companions that seamlessly integrate into daily life. These robots are designed to reflect the voice and likeness of the user’s favorite celebrity or fictional character, offering both emotional and functional support."
    },
    {
      videoId: 'VIDEO_ID_3',
      title: 'Ouroboros',
      author: 'Chelsi Cocking',
      description: "Ouroboros — name derived from the ancient symbol of a serpent or dragon eating its own tail, representing a cycle of death — is small prototypical interactive website in which a user can input an informative excerpt or message of their choice and witness what happens when OpenAI's GPT-4o references itself, over and over again, in a cyclical loop."
    },
    {
      videoId: 'VIDEO_ID_4',
      title: 'Mood Tracker',
      author: 'Shi Ding',
      description: "The idea of this project is an interactive GenAI application that designed to guide users through journal prompts such as date, location, weather and feelings and then provide personalized music playlist as a way to improve mental health. "
    },
    {
      videoId: 'VIDEO_ID_5',
      title: 'RecipeCraft',
      author: 'Jane He',
      description: "RecipeCraft is an AI tool that can generate recipes based on available food ingredients provided by the users. It is designed to speed up the decision-making process of what to cook. Users can manually enter food ingredients, or upload a photo to the object recognition model"
    },
    {
      videoId: 'VIDEO_ID_6',
      title: 'AI Corp',
      author: 'Freya (Huijia) Huang',
      description: "The game, AI Corp: Front Desk Challenge, is a dynamic and educational experience designed to teach players fundamental principles of AI workflows through interactive gameplay. Players take on the role of a front desk operator at an AI corporation, tasked with classifying NPC requests into the appropriate AI departments."
    },
    {
      videoId: 'VIDEO_ID_7',
      title: 'Personalize Learning with AI',
      author: 'Yujiao Liu',
      description: "The goal of this project is to demonstrate how AI can be used to promote creativity and critical thinking. Early ideas about AI in education focused on AI taking over or assisting teachers with teaching tasks. However, this project sees AI as part of a larger learning system that works with, rather than replaces, human educators."
    },
    {
      videoId: 'VIDEO_ID_8',
      title: 'NEXUS',
      author: 'Jingyi Ma',
      description: "NEXUS envisions a future where AGI seamlessly orchestrates daily travel experiences in 2080. The project began with implementing its restaurant recommendation scenario, where users can naturally converse with an AI assistant to discover dining options. "
    },
    {
      videoId: 'VIDEO_ID_9',
      title: 'AI Assistant for Teaching Assistants',
      author: 'Vyshnavi Namani',
      description: "Computer science teaching assistants will use this AI model application to better prepare for office hours and recitations. Using GPT and a knowledge library of related past student scenarios, this will be a conversational application. "
    },
    {
      videoId: 'VIDEO_ID_10',
      title: 'Dreamlab',
      author: 'Chengzhi Zhang',
      description: "Dreamlab is an web app for supporting designers and clients collaborate remotely to achieve the same design vision. Usually at the beginning of a design project, the design space is ambiguous and hard to interpret. With the dream lab artboard, participants can collaborate with each other and see each other’s design ideas with images, which creates a more solid shared understanding for design communication"
    }
  ];

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/playlistItems`,
          {
            params: {
              part: 'contentDetails',
              maxResults: 50,
              playlistId: PLAYLIST_ID,
              key: API_KEY,
            },
          }
        );
        const videoIds = response.data.items.map(item => item.contentDetails.videoId);
        const combined = projectDetails.map((project, index) => ({
          ...project,
          videoId: videoIds[index] || project.videoId
        }));
        setVideos(combined);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setVideos(projectDetails);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="bg-light pt-5" style={{ minHeight: '100vh', position: 'relative' }}>
      <Navbar />
      <div className="container-fluid bg-secondary text-white py-3" style={{ marginTop: '56px' }}>
        <div className="container">
          <h5 className="fw-bold">Instructors - Dr. Brian Magerko & Dr. Manoj Deshpande</h5>
          <p className="mb-1">
            The course was crafted to take creative technologists on a journey from novices in AI to builders of complex generative AI applications. What made this course unique was its interdisciplinary, human-centered approach, combining technical skills with critical AI literacy.

            The course, structured as a seminar, featured weekly readings along with hands-on lab sessions exploring foundational questions like "What is AI?" alongside critical AI literacy and technical concepts, ranging from feedforward neural networks to transformers and multimodal models.
          </p>
        </div>
      </div>
      <div className="container pt-5">
        <h1 className="text-center fw-bold text-dark" style={{  zIndex: 10 }}>Web Application Design</h1>
      </div>
      <SplineScene />
      {/* <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', zIndex: 0 }}>
        <Background3D />
      </div> */}
      <div className="container pt-5">
        <h1 className="text-center mb-5 fw-bold text-dark" style={{  zIndex: 10 }}>🎓 Gen-AI Projects</h1>
        
        <div id="gallery" className="row row-cols-1 row-cols-md-2 g-4 position-relative">
          {videos.map((video, index) => (
            <div key={index} className="col">
              <VideoCard
                {...video}
                onClick={() => setSelectedVideo(video.videoId)}
              />
            </div>
          ))}
        </div>
      </div>
      {selectedVideo && <Modal videoId={selectedVideo} onClose={() => setSelectedVideo(null)} />}
    </div>
  );
}


