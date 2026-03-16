"use client";

import { useEffect, useRef, useState } from "react";
import { FaLinkedin, FaGithub, FaInstagram, FaPhone, FaEnvelope } from "react-icons/fa";

export default function Home() {
  const [activeTab, setActiveTab] = useState("education");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Update data-theme attribute
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Neural network canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
  
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = document.body.scrollHeight; // full page height
  
    const particles: { x: number; y: number; vx: number; vy: number }[] = [];
    const numParticles = 60;
  
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      });
    }
  
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
  
      const particleColor = getComputedStyle(document.documentElement).getPropertyValue("--particle-color");
      const lineColor = getComputedStyle(document.documentElement).getPropertyValue("--line-color");
  
      // Draw connections
      for (let i = 0; i < numParticles; i++) {
        for (let j = i + 1; j < numParticles; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
  
      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
  
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
  
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
      });
  
      requestAnimationFrame(draw);
    };
  
    draw();
  
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
  
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [theme]);

  // End NN animation

  return (
    <div className="relative flex min-h-screen justify-center font-sans">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-screen h-screen -z-10" />

      <main className="w-full max-w-5xl px-16 py-24 relative z-10">
      {/* Header with toggle */}
      <section className="mb-10 flex justify-between items-start">
        <div className="flex flex-col gap-4">

          {/* Dark/Light mode button */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="px-4 py-2 rounded-lg border border-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition self-start">
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>

          {/* Name */}
          <h1 className="text-4xl font-bold">{theme === "light" ? "Pelagia Ilektra Evrenoglou" : "Pelagia Ilektra Evrenoglou"}</h1>

          {/* Social icons */}
          <div className="mt-3 flex gap-4 flex-wrap">
            <a href="https://www.linkedin.com/in/evrenoglou/" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-blue-500 transition">
              <FaLinkedin />
            </a>
            <a href="https://github.com/peevr" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-blue-500 transition">
              <FaGithub />
            </a>
            <a href="https://www.instagram.com/peevr_/" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-blue-500 transition">
              <FaInstagram />
            </a>
            <a href="tel:+31620804099" className="flex items-center gap-1 hover:text-blue-500 transition">
              <FaPhone /> +31 6 20804099
            </a>
            <a href="mailto:pelevr22@gmail.com" className="flex items-center gap-1 hover:text-blue-500 transition">
              <FaEnvelope /> pelevr22@gmail.com
            </a>
          </div>
        </div>

        {/* Profile image */}
        <img
          src="/graduationpic.jpeg"
          alt="Pelagia Ilektra Evrenoglou"
          className="w-50 h-50 rounded-full border border-gray-400 object-cover"/>
      </section>

        {/* Tabs */}
        <div className="flex gap-4 border-b pb-4 mb-8 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200">
          {["Education", "Academic Projects", "Work Experience", "Volunteering", "Certifications", "Digital Skills", "Languages"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tab ${activeTab === tab ? "activeTab" : ""}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "Education" && (
          <section className="space-y-4">
            <div className="card">
              <p className="font-medium text-lg">
                MSc Computer Science - Foundations of Computing
              </p>
              <p className="text-m">
                Leiden University - Institute of Advanced Computer Science (LIACS), the Netherlands
              </p>
              <p className="text-sm">
                September 2022 - July 2024
              </p>
            </div>
            <div className="card">
              <p className="font-medium text-lg">
                BSc Mathematics
              </p>
              <p className="text-m">
                Aristotle University of Thessaloniki (AUTh) - Faculty of Exact Science, Greece
              </p>
              <p className="text-sm">
                September 2017 - July 2021
              </p>
            </div>
          </section>
        )}
        {activeTab === "Academic Projects" && (
          <section className="space-y-4">
            <div className="card">
              <p className="font-medium text-lg">Quantum-Inspired Games: Gameplay in Quantum Tetris</p>
              <p className="text-m">Master's thesis project supervised by Leiden Institute of Advanced Computer Science (LIACS) and Leiden Institute of Physics (LION)</p>
              <p className="text-sm">August 2024</p>
           </div>
           <div className="card">
              <p className="font-medium text-lg">Sound Event Detection for a Home Alarm System Using Deep Neural Networks in Python</p>
              <p className="text-m">Group project as part of Audio Processing and Indexing course, LIACS</p>
              <p className="text-sm">December 2023</p>
           </div>
           <div className="card">
              <p className="font-medium text-lg">Exploring players' adaptation to non-Euclidean video game environments by creating a simple game in Unity Game Engine</p>
              <p className="text-m">Group project as part of Video Games for Research course, LIACS</p>
              <p className="text-sm">November 2023</p>
           </div>
           <div className="card">
              <p className="font-medium text-lg">Testing AI algorithms in customized Flappy Bird environment in Python</p>
              <p className="text-m">Group project as part of Modern Game AI Algorithms course, LIACS</p>
              <p className="text-sm">May 2023</p>
           </div>
           <div className="card">
              <p className="font-medium text-lg">Multi-Agent Pacman 'Capture the Flag' game with Monte Carlo Tree Search in Python</p>
              <p className="text-m">Group project as part of Modern Game AI Algorithms course, LIACS</p>
              <p className="text-sm">April 2023</p>
           </div>
           <div className="card">
              <p className="font-medium text-lg">Creating a greenhouse in Minecraft with Procedural Content Generation (PCG) in Python</p>
              <p className="text-m">Solo project as part of Modern Game AI Algorithms course, LIACS</p>
              <p className="text-sm">March 2023</p>
           </div>
           <div className="card">
              <p className="font-medium text-lg">User and Computer co-creative sketching using Markov Chains in JavaScript</p>
              <p className="text-m">Group project as part of Computational Creativity course, LIACS</p>
              <p className="text-sm">December 2022</p>
           </div>
           <div className="card">
              <p className="font-medium text-lg">Creative poem generator using grammars in JavaScript</p>
              <p className="text-m">Group project as part of Computational Creativity course, LIACS</p>
              <p className="text-sm">November 222</p>
           </div>
           <div className="card">
              <p className="font-medium text-lg">Creative cookie recipe generator using a Genetic Algorithm in Python</p>
              <p className="text-m">Group project as part of Computational Creativity course, LIACS</p>
              <p className="text-sm">October 2022</p>
           </div>
           <div className="card">
              <p className="font-medium text-lg">Exploring the mathematical background of criteria used in Classical Control Theory</p>
              <p className="text-m">Solo project as part of Special Topics course, Department of Mathematics, AUTh</p>
              <p className="text-sm">July 2021</p>
           </div>
          </section>
        )}
        {activeTab === "Work Experience" && (
          <section className="space-y-4">
            <div className="card">
              <p className="font-medium text-lg">Java Software Engineer - Keylane</p>
              <p className="text-m">TODO</p>
              <p className="text-sm">2024 - Present</p>
            </div>
            <div className="card">
              <p className="font-medium text-lg">Teaching Assistant - Leiden Institute of Advanced Computer Science (LIACS)</p>
              <p className="text-m">Worked as a teaching assistant for the courses 'Computational Creativity' and 'Quantum Computing'</p>
              <p className="text-sm">September 2023 - June 2024</p>
            </div>
            <div className="card">
              <p className="font-medium text-lg">Freelance Mathematics Tutor</p>
              <p className="text-m">Taught algebra, statistics and probability theory to university students</p>
              <p className="text-sm">January 2021 - January 2022</p>
            </div>
          </section>
        )}
        {activeTab === "Volunteering" && (
          <section className="space-y-4">
          <div className="card">
            <p className="font-medium text-lg">Department of Mathematics Translation Team</p>
            <p className="text-m">Participated in a collaborative project that took place during the fall semester of 2021 to translate mathematical problems from English to Greek, used for the teaching of Greek High School students</p>
            <p className="text-sm">September 2021 - December 2021</p>
          </div>
        </section>
        )}
        {activeTab === "Certifications" && (
          <section className="space-y-4">
          <div className="card">
            <p className="font-medium text-lg">Java Programming by Great Learning</p>
            <p className="text-sm">June 2024</p>
          </div>
          <div className="card">
            <p className="font-medium text-lg">Responsive Web Design by FreeCodeCamp</p>
            <p className="text-sm">August 2023</p>
          </div>
          <div className="card">
            <p className="font-medium text-lg">Scientific Computing with Python by FreeCodeCamp</p>
            <p className="text-sm">July 2023</p>
          </div>
          <div className="card">
            <p className="font-medium text-lg">Mathematics Department Translation Team Certificate by the Scientific Project Coordinator</p>
            <p className="text-sm">February 2022</p>
          </div>
          <div className="card">
            <p className="font-medium text-lg">Certificate in Information Technology by the School of Mathematics, Faculty of Exact Science, AUTh</p>
            <p className="text-sm">July 2021</p>
          </div>
          <div className="card">
            <p className="font-medium text-lg">Certificate of Pedagogical and Didactic Competence by the School of Mathematics, Faculty of Exact Science, AUTh</p>
            <p className="text-sm">July 2021</p>
          </div>
        </section>
        )}
        {activeTab === "Digital Skills" && (
          <section className="space-y-4">
            <div className="card">
              <p>Python</p>
            </div>
            <div className="card">
              <p>C++</p>
            </div>
            <div className="card">
              <p>Javaccript</p>
            </div>
            <div className="card">
              <p>HTML</p>
            </div>
            <div className="card">
              <p>CSS</p>
            </div>
            <div className="card">
              <p>R (RStudio)</p>
            </div>
            <div className="card">
              <p>Java</p>
            </div>
            <div className="card">
              <p>LaTeX</p>
            </div>
            <div className="card">
              <p>MATLAB</p>
            </div>
            <div className="card">
              <p>Microsoft Office</p>
            </div>
            <div className="card">
              <p>Git</p>
            </div>
            <div className="card">
              <p>SQL</p>
            </div>
            <div className="card">
              <p>Angular - AngularJS</p>
            </div>
              <div className="card">
              <p>Docker</p>
            </div>
        </section>
        )}
        {activeTab === "Languages" && (
          <section className="card">
            <ul className="space-y-2">
              <li>🇬🇷 Greek - Native</li>
              <li>🇬🇧 English - Fluent</li>
              <li>🇳🇱 Dutch - Intermediate</li>
              <li>🇩🇪 German - Intermediate</li>
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}