import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import photo from "./photo.jpg";

/* ── SCROLL ANIMATION HOOK ── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ── REVEAL WRAPPER ── */
function Reveal({ children, delay = 0, dir = "up", className = "" }) {
  const [ref, visible] = useReveal();
  const transforms = { up: "translateY(40px)", left: "translateX(-40px)", right: "translateX(40px)", fade: "scale(0.96)" };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : (transforms[dir] || transforms.up),
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── SVG ICONS ── */
const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "6px" }}>
    <path d="m8 12 4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 16V4M19 17v.6c0 1.33-1.07 2.4-2.4 2.4H7.4C6.07 20 5 18.93 5 17.6V17" stroke="currentColor" strokeWidth="1.8" strokeMiterlimit="10" strokeLinecap="round" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);
const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.3a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 18l.19-1.08z" />
  </svg>
);
const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "6px" }}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const ExternalLink = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "6px" }}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
  </svg>
);

/* ── APP ── */
export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = ["home", "services", "about", "skills", "projects", "education", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 90 && rect.bottom > 90) { setActiveSection(id); break; }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* NAV */}
      <nav className={`portfolio-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo"><span className="accent">A</span>rsad Ahamad</div>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {["home", "services", "about", "skills", "projects", "education", "contact"].map((s) => (
            <button key={s} className={`nav-link ${activeSection === s ? "active" : ""}`} onClick={() => scrollTo(s)}>{s}</button>
          ))}
        </div>
        <button className="nav-cta" onClick={() => scrollTo("contact")}>Let's Talk</button>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "✕" : "☰"}</button>
      </nav>

      {/* HERO */}
      <section id="home" className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-left">
              <Reveal delay={0}>
                <p className="section-tag">— Available for opportunities</p>
              </Reveal>
              <Reveal delay={100}>
                <h1 className="hero-name">Arsad Ahamad M</h1>
              </Reveal>
              <Reveal delay={180}>
                <p className="hero-role">Python Full Stack Developer</p>
              </Reveal>
              <Reveal delay={250}>
                <p className="hero-desc">
                  Aspiring Python Full Stack Developer skilled in HTML, CSS, JavaScript, ReactJS,
                  Python, Django, and MySQL. Passionate about building responsive web applications
                  and writing clean, efficient code.
                </p>
              </Reveal>
              <Reveal delay={320}>
                <div className="hero-btns">
                  <button className="btn-primary-custom" onClick={() => scrollTo("projects")}>
                    View Projects <ArrowRight />
                  </button>
                  <button className="cv-btn" onClick={() => window.open("./public/", "_blank")}>
                    Download CV <DownloadIcon />
                  </button>
                  <button className="btn-outline-custom" onClick={() => scrollTo("contact")}>
                    Contact Me
                  </button>
                </div>
              </Reveal>
              <Reveal delay={400}>
                <div className="hero-socials">
                  <a href="https://www.linkedin.com/in/arsadahamad-m" target="_blank" rel="noreferrer" className="social-link" title="LinkedIn"><LinkedInIcon /></a>
                  <a href="github - https://github.com/ahamadarsad?tab=repositories" target="_blank" rel="noreferrer" className="social-link" title="GitHub"><GitHubIcon /></a>
                  <a href="mailto:arsadahamad17@gmail.com" className="social-link" title="Email"><EmailIcon /></a>
                </div>
              </Reveal>
            </div>

            {/* PHOTO */}
            <Reveal delay={200} dir="right">
              <div className="hero-photo-wrap">
                <div className="hero-photo-frame">
                  <div className="photo-glow" />
                  <img src={photo} alt="Arsad Ahamad M" className="hero-photo" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* SERVICES */}
      <section id="services" className="portfolio-section">
        <div className="container">
          <Reveal>
            <div className="section-header">
              <p className="section-tag">What I do</p>
              <h2 className="section-title">Services</h2>
              <p className="section-sub">Designing and developing complete web solutions — from clean UI to Python-powered backends.</p>
            </div>
          </Reveal>
          <div className="row g-4">
            {services.map((s, i) => (
              <div className="col-sm-6 col-lg-3" key={s.title}>
                <Reveal delay={i * 100}>
                  <div className="service-card">
                    <div className="service-icon-wrap">{s.icon}</div>
                    <h3 className="service-title">{s.title}</h3>
                    <p className="service-desc">{s.desc}</p>
                    <div className="tag-row">
                      {s.tags.map((t) => <span className="s-tag" key={t}>{t}</span>)}
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ABOUT */}
      <section id="about" className="portfolio-section">
        <div className="container">
          <div className="about-grid">
            <Reveal dir="left">
              <div>
                <p className="section-tag">Who I am</p>
                <h2 className="section-title">About Me</h2>
                <p className="body-text">
                  I'm an aspiring Python Full Stack Developer skilled in HTML, CSS, JavaScript, and
                  ReactJS on the front end — and Python, Django, and MySQL on the back end.
                </p>
                <p className="body-text" style={{ marginTop: "1rem" }}>
                  I'm passionate about building responsive web applications and writing clean,
                  efficient code. I'm seeking an entry-level opportunity to grow and contribute
                  meaningfully in a collaborative development team.
                </p>
                <div className="about-meta">
                  <div><div className="meta-label">Location</div><div className="meta-value">Rajapalayam, India</div></div>
                  <div><div className="meta-label">Degree</div><div className="meta-value">BSc Computer Science</div></div>
                  <div><div className="meta-label">Languages</div><div className="meta-value">English, Tamil</div></div>
                </div>
              </div>
            </Reveal>
            <Reveal dir="right" delay={150}>
              <div>
                <p className="approach-label">MY APPROACH</p>
                {approach.map((a, i) => (
                  <Reveal key={a.num} delay={i * 100}>
                    <div className="approach-item">
                      <div className="approach-num">{a.num}</div>
                      <div>
                        <div className="approach-heading">{a.title}</div>
                        <div className="approach-text">{a.desc}</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* SKILLS */}
      <section id="skills" className="portfolio-section">
        <div className="container">
          <Reveal>
            <div className="section-header">
              <p className="section-tag">What I know</p>
              <h2 className="section-title">Skills</h2>
              <p className="section-sub">A Python-centered full-stack toolkit spanning frontend, backend, and databases.</p>
            </div>
          </Reveal>
          <div className="skills-grid">
            {skillGroups.map((g, i) => (
              <Reveal key={g.title} delay={i * 110}>
                <div className="skill-card">
                  <div className="skill-card-title" style={{ color: g.color }}>{g.title}</div>
                  <div className="tag-row">
                    {g.skills.map((sk) => (
                      <span className="skill-badge" key={sk} style={{ borderColor: g.color + "55", color: g.color, background: g.color + "14" }}>{sk}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* PROJECTS */}
      <section id="projects" className="portfolio-section">
        <div className="container">
          <Reveal>
            <div className="section-header">
              <p className="section-tag">What I've built</p>
              <h2 className="section-title">Projects</h2>
              <p className="section-sub">Real-world web applications built from scratch with clean code and attention to functionality.</p>
            </div>
          </Reveal>
          <div className="row g-4">
            {projects.map((p, i) => (
              <div className="col-md-6 col-lg-6" key={p.title}>
                <Reveal delay={i * 100}>
                  <div className={`project-card ${p.featured ? "project-featured" : ""}`}>
                    <div className="project-header">
                      <div className="project-num">0{i + 1}</div>
                      {p.featured && <span className="project-live-badge">● Live</span>}
                    </div>
                    <div className="tag-row" style={{ marginBottom: "0.9rem" }}>
                      {p.tech.map((t) => <span className="p-tag" key={t}>{t}</span>)}
                    </div>
                    <h3 className="project-title">{p.title}</h3>
                    <p className="project-desc">{p.desc}</p>
                    {p.link !== "#" ? (
                      <a href={p.link} className="project-link" target="_blank" rel="noopener noreferrer">
                        View Project <ExternalLink />
                      </a>
                    ) : (
                      <span className="project-link-disabled">Source Available on Request</span>
                    )}
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* EDUCATION */}
      <section id="education" className="portfolio-section">
        <div className="container">
          <Reveal>
            <div className="section-header">
              <p className="section-tag">Background</p>
              <h2 className="section-title">Education</h2>
            </div>
          </Reveal>
          <div className="edu-list">
            {education.map((e, i) => (
              <Reveal key={e.degree} delay={i * 90}>
                <div className="edu-card">
                  <div className="edu-dot" style={{ background: e.color }} />
                  <div className="edu-info">
                    <div className="edu-degree">{e.degree}</div>
                    <div className="edu-school">{e.school}</div>
                    <div className="edu-period" style={{ color: e.color }}>{e.period} {e.percentage && `• ${e.percentage}`}</div>
                    {e.link && (
                      <a href={e.link} className="project-link" target="_blank" rel="noopener noreferrer">
                        View Certificate <ExternalLink />
                      </a>
                    )}
                  </div>
                  <span className="edu-badge" style={{ borderColor: e.color + "50", color: e.color, background: e.color + "12" }}>{e.type}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* CONTACT */}
      <section id="contact" className="portfolio-section">
        <div className="container">
          <div className="contact-grid">
            <Reveal dir="left">
              <div>
                <p className="section-tag">Get in touch</p>
                <h2 className="section-title">Let's Work<br />Together</h2>
                <p className="body-text" style={{ marginBottom: "2rem" }}>
                  I'm actively looking for entry-level full-stack developer roles. If you have an
                  opportunity or just want to connect, drop me a message.
                </p>
                <a href="mailto:arsadahamad17@gmail.com" className="btn-primary-custom">
                  Send Email <ArrowRight />
                </a>
              </div>
            </Reveal>
            <Reveal dir="right" delay={150}>
              <div className="contact-items">
                {contactItems.map((c, i) => (
                  <Reveal key={c.label} delay={i * 80}>
                    <div className="contact-item">
                    <div className="contact-icon">{c.icon}</div>
                    <div>
                      <div className="contact-label">{c.label}</div>
                      {c.link ? (
                        <a
                          href={c.link}
                          className="contact-val"
                          target={c.external ? "_blank" : undefined}
                          rel={c.external ? "noopener noreferrer" : undefined}
                        >
                          {c.value}
                        </a>
                      ) : (
                        <div className="contact-val">{c.value}</div>
                      )}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <footer className="portfolio-footer">
        <Reveal>
          <p>© 2026 Arsad Ahamad M — Python Full Stack Developer &nbsp;|&nbsp; Built with React + Bootstrap</p>
        </Reveal>
      </footer>
    </>
  );
}

/* ── DATA ── */
const services = [
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#e8ff47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
    title: "Frontend Development",
    desc: "Responsive interfaces using HTML5, CSS3, JavaScript, and React.js for clean, reliable performance across all devices.",
    tags: ["React.js", "Bootstrap", "Responsive"]
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#47b8ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
    title: "Backend Development",
    desc: "Django-based backends with CRUD operations, form validation, and clean, well-structured logic for maintainability.",
    tags: ["Python", "Django", "CRUD"]
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ff8c6b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>,
    title: "Database Design",
    desc: "Structured MySQL schemas for efficient, reliable data management across student and e-commerce systems.",
    tags: ["MySQL", "Data Modeling", "SQL"]
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#b8ff88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>,
    title: "E-Commerce Sites",
    desc: "Multi-page shopping experiences with product categories, cart logic, and responsive, user-friendly layouts.",
    tags: ["Cart Logic", "Context API", "UX"]
  },
];

const approach = [
  { num: "01", title: "Understand requirements", desc: "Break down the problem before writing a single line of code." },
  { num: "02", title: "Build clean architecture", desc: "Layered, maintainable code on both front end and back end." },
  { num: "03", title: "Test and refine", desc: "Validate data entry, handle edge cases, ensure responsiveness." },
];

const skillGroups = [
  { title: "Languages", color: "#e8ff47", skills: ["Python", "JavaScript", "HTML5", "CSS3"] },
  { title: "Frameworks & Libraries", color: "#47b8ff", skills: ["Django", "React.js", "Bootstrap"] },
  { title: "Database", color: "#ff8c6b", skills: ["MySQL"] },
];

const projects = [
  {
    title: "Student Management System",
    tech: ["Django", "MySQL"],
    desc: "Developed a Student Management System using Django and MySQL to manage student records efficiently, with CRUD operations and form validations for accurate, reliable data entry.",
    link: "#",
    featured: false,
  },
  {
    title: "BookZone — Bookstore Web Application",
    tech: ["React.js", "React Router", "Context API"],
    desc: "Built a responsive bookstore web application using React.js and React Router, with cart functionality via Context API and Local Storage, and reusable UI components for smooth navigation.",
    link: "https://bookzone-nine.vercel.app/",
    featured: false,
  },
  {
    title: "E-Commerce Clothing Website",
    tech: ["HTML", "CSS", "JavaScript"],
    desc: "Built a responsive multi-page clothing store website with product categories, image-based product cards, and Add to Cart functionality — clean, user-friendly, and fully responsive.",
    link: "https://cloth-shopping-online.netlify.app/",
    featured: false,
  },
  {
    title: "Happy Travel",
    tech: ["HTML", "CSS", "Bootstrap"],
    desc: "Developed a responsive travel website using HTML, CSS, and Bootstrap, featuring a clean layout, image galleries, and interactive elements for an engaging user experience.",
    link: "https://happy-travel-com.vercel.app/",
    featured: false,
  },

];

const education = [
  { degree: "Bachelor's Degree (Computer Science)", school: "Manonmaniam Sundaranar University, Sankarankovil, Tenkasi", period: "2022 – 2025", percentage: "69%", type: "Degree", color: "#e8ff47" },
  { degree: "Higher Secondary Certificate (HSC)", school: "TNPM Marimuthu Nadar Higher Secondary School, Rajapalayam", period: "2020 – 2022", percentage: "62%", type: "HSC", color: "#47b8ff" },
  { degree: "Secondary School Leaving Certificate (SSLC)", school: "TNPM Marimuthu Nadar Higher Secondary School, Rajapalayam", period: "2019 – 2020", percentage: "57%", type: "SSLC", color: "#888888" },
  { degree: "Python Full Stack Development Certification", school: "Zukun Academy, Chennai", period: "Certification", type: "Certificate", color: "#e8ff47" },
];

const contactItems = [
  { icon: <EmailIcon />, label: "Email", value: "arsadahamad17@gmail.com", link: "mailto:arsadahamad17@gmail.com" },
  { icon: <PhoneIcon />, label: "Phone", value: "+91 7200768633", link: "tel:+917200768633" },
  { icon: <LocationIcon />, label: "Location", value: "Rajapalayam, India" },
  { icon: <LinkedInIcon />, label: "LinkedIn", value: "View Profile", link: "https://www.linkedin.com/in/arsadahamad-m", external: true },
];