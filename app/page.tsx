"use client";

import { useState, useEffect } from "react";
import { useFadeIn } from "@/hooks/useFadeIn";
import { ProjectModal, type Project } from "@/components/ProjectModal";
import { DarkToggle } from "@/components/DarkToggle";
import { OrbitDiagram } from "@/components/diagrams/OrbitDiagram";
import { ControlLoop } from "@/components/diagrams/ControlLoop";
import { AxisFrame } from "@/components/diagrams/AxisFrame";

const PROJECTS: Project[] = [
  {
    name: "LMK",
    label: "2025–present",
    heroImage: "/lmk_card.svg",
    tags: ["Python", "React", "Product"],
    description:
      "A personal project to exercise my product design skills, learn the capabilities of vibecoding, and create a service I genuinely need.",
    body: [
      { type: "heading", text: "Overview" },
      { type: "text", text: "Personalized event discovery app designed so that you don't say \"oh man I wish I'd known that was in town\" again. Separate pipelines for event discovery and recommendation utilizing agents, embeddings, and custom algorithms for efficient event organization and matching." },
      { type: "heading", text: "Purpose" },
      { type: "text", text: "A personal project to exercise my product design skills, learn the capabilities of vibecoding, and create a service I genuinely need." },
      { type: "heading", text: "Stack" },
      { type: "text", text: "Pipelines: Python jobs triggered and run on a server. Frontend: Node.js hosted on Vercel. Backend: Convex." },
      { type: "heading", text: "Status" },
      { type: "text", text: "A working MVP but not fully maintained." },
      { type: "heading", text: "Screenshots" },
      { type: "image", src: "/drop.png", caption: "Drop: Introduces users to new events and learns their preferences" },
      { type: "image", src: "/my_events.png", caption: "My Events: A database of all future and past events" },
      { type: "image", src: "/me.png", caption: "Me: Your current taste profile and settings" },
    ],
    link: { href: "https://lmk-app.com", label: "lmk-app.com" },
  },
  {
    name: "Novel Laser Cutter",
    label: "2021",
    heroImage: "/laser_cutter_v3.png",
    tags: ["Mechanical design", "Product"],
    description:
      "What if a laser cutter and a desktop printer had a child? Replace one axis with a roller — compact footprint, effectively infinite x-axis.",
    body: [
      { type: "heading", text: "The Concept" },
      { type: "text", text: "What if a laser cutter and a desktop printer had a child? If you replace one axis with a roller, you reduce the overall footprint and have an effectively infinite axis." },
      { type: "image", src: "/laser_cutter_v3.png", caption: "3rd iteration" },
      { type: "heading", text: "Outcome" },
      { type: "text", text: "Built several iterations with a friend and were happy with the results. Still think this is a promising idea for cutting cardboard and paper for crafts." },
      { type: "heading", text: "Things It Made" },
      { type: "images", srcs: ["/laser_cutter_spiderman.jpeg", "/laser_cutter_pumpkin.jpeg"], captions: ["Detailed engraving", "Multipass full cardboard cutout"] },
      { type: "image", src: "/laser_cutter_rocket.jpeg", full: true, caption: "Demonstration of \"infinite\" axis with long engraving" },
    ],
  },
  {
    name: "Scratch-Built Autopilot",
    label: "2020–2021",
    heroImage: "/autopilot.jpeg",
    tags: ["GNC", "Firmware"],
    description:
      "Built a fully autonomous fixed-wing aircraft from scratch — airframe, avionics, firmware, algorithms, simulation, and system-ID.",
    body: [
      { type: "heading", text: "Overview" },
      { type: "text", text: "Built a fully autonomous fixed-wing aircraft from scratch — airframe, avionics, firmware, algorithms, simulation, and system-ID." },
      { type: "image", src: "/autopilot_labeled.png", caption: "First flight revision." },
      { type: "heading", text: "Purpose" },
      { type: "text", text: "Treated this as a learning experience to ensure I was capable of every step of building an autonomous vehicle." },
      { type: "heading", text: "Testing" },
      { type: "images", srcs: ["/autopilot_testing.png", "/nav_testing.jpeg"], captions: ["Flight testing", "Navigation algorithm testing"] },
      { type: "heading", text: "Status" },
      { type: "text", text: "After completing the navigation system and system identification, this project was shelved since it had successfully gotten me a job doing the same thing for real spacecraft." },
    ],
    link: { href: "https://flyingforfuns.blogspot.com/", label: "Dev blog" },
  },
  {
    name: "The Ventilator Project",
    label: "2020",
    heroImage: "/ventilator.jpg",
    tags: ["Hardware", "Startup"],
    description:
      "Dropped everything and joined a ventilator startup in early 2020. The final product went on to receive FDA approval.",
    body: [
      { type: "image", src: "/ventilator.jpg", caption: "AIRA prototype, exhibited at Cooper Hewitt, Smithsonian Design Museum." },
      { type: "text", text: "Dropped everything and joined a ventilator startup in early 2020. The final product went on to receive FDA approval. I led mechanical design and developed the control scheme for breathing assistance." },
      { type: "text", text: "The second iteration was exhibited at the Cooper Hewitt, Smithsonian Design Museum." },
      { type: "image", src: "/tvp_smithsonian.jpeg", caption: "Prototype (left) next to final product (right), exhibited at Cooper Hewitt, Smithsonian Design Museum." },
      { type: "image", src: "/tvp_work.jpeg", caption: "Early development." },
      { type: "image", src: "/tvp_final.jpeg", caption: "First fully working prototype." },
    ],
    link: { href: "https://www.cooperhewitt.org/2021/12/10/assisted-breathing/", label: "Cooper Hewitt" },
  },
  {
    name: "Parameter Estimation and Kalman Smoothing",
    label: "2020",
    heroImage: "/mae_6760.png",
    tags: ["Estimation", "Kalman Filter"],
    description:
      "Graduate coursework project on parameter estimation and Kalman smoothing.",
    body: [
      { type: "image", src: "/mae_6760.png" },
      { type: "text", text: "Final project for model estimation course titled \"Simultaneous State and Parameter Estimation of Aircraft Pitch Dynamics with Extended Kalman Filter and Kalman Smoothing\"." },
    ],
    link: { href: "https://drive.google.com/file/d/1q4fOUA1D9KU7d8IsPb4EqMX5qzqTF7ZO/view?usp=sharing", label: "Full Report" },
  },
  {
    name: "Ball Balancer",
    label: "2019",
    heroImage: "/ball_balance.png",
    tags: ["Controls", "Firmware"],
    description:
      "Final project for microcontrollers course. Wrote firmware, filter, and controls scheme for a 2D ball-balancing platform.",
    body: [
      { type: "heading", text: "Overview" },
      { type: "text", text: "Final project for microcontrollers course. Wrote firmware, filter, and controls scheme for a 2D ball-balancing platform." },
      { type: "image", src: "/ball_balance.png" },
      { type: "image", src: "/ball_balance_loop.gif" },
      { type: "heading", text: "Retrospective" },
      { type: "text", text: "After the fact, I found a logic bug that caused the measured position to bounce around discontinuously. At the time the source was unknown and corrected for with a low pass filter, leading to low phase margin and mediocre performance." },
      { type: "heading", text: "Links" },
      { type: "links", items: [
        { href: "https://people.ece.cornell.edu/land/courses/ece4760/FinalProjects/f2019/ghk48_sof23/ghk48_sof23/ghk48_sof23/index.html", label: "Full Report" },
        { href: "https://www.youtube.com/watch?v=rfGH3TfaF4s", label: "Video" },
        { href: "https://hackaday.com/2020/01/04/2d-platform-seeks-balance-with-a-touch-screen/", label: "Hackaday Article" },
      ]},
    ],
  },
  {
    name: "CUAir",
    label: "2017–2019",
    heroImage: "/cuair_wing.jpg",
    tags: [],
    description: "Cornell University Unmanned Aerial Systems. Fuselage design, test pilot, and aerodynamic architect across three years.",
    body: [
      { type: "image", src: "/cuair_plane.jpg", caption: "Orion aircraft at competition" },
      { type: "text", text: "CUAir (Cornell University Unmanned Aerial Systems). My contributions included fuselage design (sophomore year, 4th overall), test pilot (junior year, 7th overall), and aerodynamic architect (senior year)." },
    ],
    link: { href: "https://cuair.org/aircraft.html", label: "Team Website" },
  },
];

export default function Home() {
  useFadeIn();
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [navLogoVisible, setNavLogoVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const intro = document.getElementById("intro");
      if (!intro) return;
      setNavLogoVisible(window.scrollY > intro.offsetHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav>
        <a href="#intro" className={`nav-logo${navLogoVisible ? " visible" : ""}`}>Sam Feibel.</a>
        <ul className="nav-links">
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><DarkToggle /></li>
        </ul>
      </nav>

      {/* ── INTRO ── */}
      <section id="intro">
        {/* Orbit diagram — decorative, bottom-right */}
        <div className="diagram-float" style={{ bottom: "3rem", right: "3rem" }}>
          <OrbitDiagram />
        </div>
        <div className="container">
          <div className="intro-grid">
            <div>
              <p className="hero-eyebrow">Engineer</p>
              <h1 className="hero-name">
                Sam Feibel<span className="accent-dot">.</span>
              </h1>
              <p className="hero-sub">
                My first C grade was on a high school physics test. I decided 
                right then that I had to major in physics. My approach to challenges 
                hasn&apos;t changed since.
              </p>
              <p className="hero-sub">
                At Cornell, I studied engineering physics and aerospace engineering,
                spending most of my time building and testing autonomous aircraft.
                At Inversion, I designed the GNC stack and led the mission for the
                company&apos;s first spacecraft. These days I lead the team developing
                accurate landing parachute systems.
              </p>
              <div className="hero-scroll-hint">
                <svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6 Q4.5 7.5 12 14 Q19.5 7 21 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 16 Q4.5 17.5 12 24 Q19.5 17 21 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.35"/>
                </svg>
              </div>
            </div>
            <div className="about-details">
              <div className="detail-item">
                <span className="detail-label">Education</span>
                <span className="detail-value">
                  M.Eng., Aerospace Engineering<br />
                  B.S., Engineering Physics<br />
                  Cornell University
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Day job</span>
                <span className="detail-value">
                  Director of Accurate Landing · Inversion Space
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Also into</span>
                <span className="detail-value">
                  Boston Red Sox · Baseball Analytics · Cycling · Climbing · Vibecoding
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── EXPERIENCE ── */}
      <section id="experience">
        {/* Control loop diagram — top-right corner */}
        <div className="diagram-float" style={{ top: "4rem", right: "2.5rem" }}>
          <ControlLoop />
        </div>
        <div className="container">
          <span className="section-label fade-in">Experience</span>
          <div className="experience-split">

            {/* LEFT — Education */}
            <div className="fade-in">
              <p className="col-heading">Education</p>

              <div className="edu-entry">
                <p className="edu-degree">M.Eng., Aerospace Engineering</p>
                <p className="edu-school">Cornell University</p>
                <p className="edu-year">2020</p>
                <p className="edu-note">Focus on dynamics and estimation.</p>
              </div>

              <div className="edu-entry">
                <p className="edu-degree">B.S., Engineering Physics</p>
                <p className="edu-school">Cornell University</p>
                <p className="edu-year">2016 – 2020</p>
                <p className="edu-note">Focus on mathematical physics. Member of CUAir and Space Systems Design Studio.</p>
              </div>
            </div>

            {/* RIGHT — Work */}
            <div>
              <p className="col-heading fade-in">Work</p>

              <div className="job">
                <div className="job-header">
                  <p className="job-company">Inversion Space</p>
                  <p className="job-date">2022 – Present</p>
                </div>
                <p className="job-title">Director, Accurate Landing</p>
                <p className="job-desc">
                  I joined Inversion as their 3rd engineer to do the hardest
                  thing I could think of: build a spacecraft from scratch at a
                  seed-stage startup. Over three years I owned the GNC stack,
                  led mission design, and eventually ran the mission itself —
                  Ray demonstrated multiple orbital maneuvers and remains
                  operational. I now lead the team developing the technology to
                  accurately land spacecraft under parachutes.
                </p>
                <div className="video-links">
                  <a href="https://youtu.be/72j-qqmpXNs?si=P--2KSLesEz9jCjJ" target="_blank" rel="noopener noreferrer" className="video-thumb">
                    <img src="https://img.youtube.com/vi/72j-qqmpXNs/hqdefault.jpg" alt="Inversion Space launch video" />
                    <span className="video-thumb-label">Watch on YouTube</span>
                  </a>
                  <a href="https://youtu.be/vG6Gxr3Rv4E?si=O64tGihnOnkGXxzV" target="_blank" rel="noopener noreferrer" className="video-thumb">
                    <img src="https://img.youtube.com/vi/vG6Gxr3Rv4E/hqdefault.jpg" alt="Inversion Space video" />
                    <span className="video-thumb-label">Watch on YouTube</span>
                  </a>
                </div>
              </div>

              <div className="job">
                <div className="job-header">
                  <p className="job-company">Draper</p>
                  <p className="job-date">2021</p>
                </div>
                <p className="job-title">GNC Analyst</p>
                <p className="job-desc">My introduction to professional GNC working on celestial navigation algorithms.</p>
              </div>

              <div className="job">
                <div className="job-header">
                  <p className="job-company">SpaceX</p>
                  <p className="job-date">Summer 2020</p>
                </div>
                <p className="job-title">Multibody Dynamics Engineer</p>
                <p className="job-desc">
                  Dynamics analysis for Starship stage separation and Dragon splashdown during
                  the Demo-2 mission.
                </p>
              </div>

              <div className="job">
                <div className="job-header">
                  <p className="job-company">Skydio</p>
                  <p className="job-date">Summer 2019</p>
                </div>
                <p className="job-title">Hardware Design Intern</p>
                <p className="job-desc">
                  Designed latches for propeller guards and performed dynamics
                  analysis for the Skydio 2 autonomous drone.
                </p>
              </div>

              <div className="job">
                <div className="job-header">
                  <p className="job-company">Ursa Space Systems</p>
                  <p className="job-date">Summer 2018</p>
                </div>
                <p className="job-title">Orbits Intern</p>
                <p className="job-desc">Developed internal orbit propagator for predicting satellite imaging passes.</p>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* ── PROJECTS ── */}
      <section id="projects">
        {/* Axis frame diagram — top-right corner */}
        <div className="diagram-float" style={{ top: "4rem", right: "3rem" }}>
          <AxisFrame />
        </div>
        <div className="container">
          <span className="section-label fade-in">Projects</span>
          <h2 className="section-heading fade-in">Things I&apos;ve built.</h2>
          <div className="projects-grid">
            {PROJECTS.map((p) => (
              <div
                key={p.name}
                className="project-card"
                onClick={() => setActiveProject(p)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setActiveProject(p); }}
              >
                <div className="project-card-image-wrap">
                  <img className="project-card-image" src={p.heroImage} alt={p.name} />
                  {p.tags && p.tags.length > 0 && (
                    <div className="project-card-tags">
                      {p.tags.slice(0, 3).map((t) => (
                        <span key={t} className="tag">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="project-card-footer">
                  <p className="project-name">{p.name}</p>
                  {p.label && <p className="project-label">{p.label}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact">
        <div className="container">
          <span className="section-label">Contact</span>
          <h2 className="section-heading">Say <em>hello</em>.</h2>
          <p className="contact-sub">
            Always happy to talk about interesting problems, weird projects, or
            what you&apos;re working on.
          </p>
          <div className="contact-links">
            <a href="mailto:sof23@cornell.edu" className="contact-link">✉ Email</a>
            <a href="https://www.linkedin.com/in/samuel-feibel-b646a5155/" className="contact-link">LinkedIn</a>
            <a href="https://github.com/samuel-feibel" className="contact-link">GitHub</a>
          </div>
        </div>
      </section>

      <footer>
        <p>Sam Feibel — Vibecoded by hand.</p>
      </footer>

      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </>
  );
}
