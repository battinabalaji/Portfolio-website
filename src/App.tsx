import { Toaster } from "@/components/ui/sonner";
import {
  Award,
  BookOpen,
  Brain,
  ChevronDown,
  Clock,
  Code2,
  Database,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Layout,
  Linkedin,
  Mail,
  MapPin,
  Play,
  Send,
  Shield,
  Star,
  Trophy,
  Users,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#certificates" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const SKILLS = [
  {
    icon: <Code2 size={16} />,
    title: "Languages",
    tags: ["C", "C++", "Python", "Java"],
    hue: 195,
    chroma: 0.1,
    proficiency: 0.8,
  },
  {
    icon: <Layout size={16} />,
    title: "Frameworks",
    tags: ["HTML", "CSS", "Bootstrap", "JavaScript", "React.js", "Node.js"],
    hue: 220,
    chroma: 0.1,
    proficiency: 0.85,
  },
  {
    icon: <Database size={16} />,
    title: "Tools",
    tags: ["MySQL", "MongoDB", "VS Code", "GitHub"],
    hue: 200,
    chroma: 0.09,
    proficiency: 0.75,
  },
  {
    icon: <Shield size={16} />,
    title: "Testing",
    tags: [
      "Test Case Design",
      "Automation Scripting",
      "Regression Testing",
      "Unit Testing",
      "CI/CD",
    ],
    hue: 175,
    chroma: 0.1,
    proficiency: 0.78,
  },
  {
    icon: <Brain size={16} />,
    title: "Core CS",
    tags: ["DSA", "DBMS", "OOP"],
    hue: 210,
    chroma: 0.09,
    proficiency: 0.82,
  },
  {
    icon: <Users size={16} />,
    title: "Soft Skills",
    tags: [
      "Problem-Solving",
      "Team Player",
      "Adaptability",
      "Communication",
      "Time Management",
      "Critical Thinking",
    ],
    hue: 160,
    chroma: 0.1,
    proficiency: 0.9,
  },
];

const PROJECTS = [
  {
    number: "01",
    title: "Fake Social Media Accounts Detection",
    date: "Nov 2025",
    tech: ["Python", "Streamlit", "Scikit-Learn"],
    description:
      "End-to-end ML pipeline classifying social media accounts as real or fake. Engineered feature extraction (follower-following ratio, bio length, engagement metrics) and trained/compared classifiers (Logistic Regression, Random Forest, SVM) with hyperparameter tuning.",
    github: "https://github.com/battinabalaji",
    demo: "https://battinabalaji.github.io/Fake-social-media-accounts-detection/",
    accentHue: 195,
  },
  {
    number: "02",
    title: "MBTI Personality Predictor",
    date: "Jul 2025",
    tech: ["Python", "Streamlit", "Scikit-Learn"],
    description:
      "Text-based MBTI classifier trained on 8.6K labeled posts using TF-IDF with 15K+ vocabulary. Four binary Scikit-learn models achieving 77–84% validation accuracy. Interactive Streamlit UI with Plotly radar/bar visualizations.",
    github: "https://github.com/battinabalaji",
    demo: "https://battinabalaji.github.io/MBTI-using-ML/",
    accentHue: 220,
  },
  {
    number: "03",
    title: "Automation Testing Framework",
    date: "Jul 2025",
    tech: ["Python", "Selenium", "pytest", "Docker"],
    description:
      "End-to-end test automation framework using Python, Selenium WebDriver, and pytest with the Page Object Model. Integrated into CI/CD pipelines via Azure Pipelines and Docker Compose.",
    github: "https://github.com/battinabalaji",
    demo: "https://battinabalaji.github.io/Automated-Testing-framework-Application/",
    accentHue: 175,
  },
  {
    number: "04",
    title: "Sustainable Energy & Nature",
    date: "2025",
    tech: ["HTML", "CSS", "JavaScript"],
    description:
      "A web project promoting renewable energy sources like solar, wind, and hydropower to reduce environmental impact. Highlights the importance of protecting natural resources and encourages eco-friendly solutions for a cleaner, greener, sustainable future.",
    github: "https://github.com/battinabalaji/sustainable-energy-and-nature",
    demo: undefined,
    accentHue: 145,
  },
];

const EDUCATION = [
  {
    institution: "Lovely Professional University",
    degree: "B.Tech in Computer Science (AI & ML)",
    grade: "CGPA: 6.66",
    period: "Aug 2023 – Present",
    location: "Phagwara, Punjab",
    icon: <GraduationCap size={18} />,
  },
  {
    institution: "SR Junior College",
    degree: "Intermediate",
    grade: "95.6%",
    period: "Jun 2021 – May 2023",
    location: "Vijayawada, Andhra Pradesh",
    icon: <BookOpen size={18} />,
  },
  {
    institution: "St.Ann's EM/TM High School",
    degree: "Matriculation",
    grade: "96.2%",
    period: "Jun 2020 – Mar 2021",
    location: "Podili, Andhra Pradesh",
    icon: <BookOpen size={18} />,
  },
];

const CERTIFICATES = [
  {
    title: "Master Generative AI & Generative AI Tools (ChatGPT & more)",
    issuer: "Infosys",
    date: "Dec 2025",
    link: "https://drive.google.com/file/d/1rW2L8pxvLudxcX_NZKjD2NldfeyZ_U7P/view",
  },
  {
    title: "Computational Theory: Language Principle & Finite Automata Theory",
    issuer: "Infosys",
    date: "Sep 2025",
    link: "https://drive.google.com/file/d/1B4H9t-_HuVhQq6XK3ArcdGtH71m7puaJ/view",
  },
  {
    title: "Object-Oriented Programming (OOP) Training",
    issuer: "Lovely Professional University",
    date: "Jul 2025",
    link: "https://drive.google.com/file/d/1iJSMkTjkrJwPIhfCQMY7PItJHVKCBtV9/view",
  },
  {
    title: "Legacy Responsive Web Design V8",
    issuer: "FreeCodeCamp",
    date: "Sep 2023",
    link: "https://www.freecodecamp.org/certification/balaji123/responsive-web-design",
  },
];

const ACHIEVEMENTS = [
  {
    icon: <Trophy size={20} />,
    title: "Binary Blitz Hackathon Finalist",
    detail: "Selected among 200+ teams — Coding Ninjas (LPU) · Oct 2024",
  },
  {
    icon: <Star size={20} />,
    title: "100+ LeetCode Problems Solved",
    detail: "Consistent problem-solving practice in DSA",
  },
];

const PARTICLES = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  left: `${5 + ((i * 6.3) % 88)}%`,
  bottom: `${-10 + ((i * 7) % 15)}%`,
  size: `${4 + ((i * 3) % 8)}px`,
  delay: `${(i * 0.65) % 7}s`,
  duration: `${6 + ((i * 1.2) % 8)}s`,
  opacity: +(0.15 + ((i * 0.014) % 0.2)).toFixed(2),
  hue: i % 2 === 0 ? 195 : 220,
}));

const BATTINA_CHARS = "BATTINA"
  .split("")
  .map((char, i) => ({ char, id: `battina-char-${i}`, delay: 0.2 + i * 0.05 }));
const BALAJI_CHARS = "BALAJI"
  .split("")
  .map((char, i) => ({ char, id: `balaji-char-${i}`, delay: 0.55 + i * 0.05 }));

function scrollToId(id: string) {
  document
    .getElementById(id.replace("#", ""))
    ?.scrollIntoView({ behavior: "smooth" });
}

function useScrolled(threshold = 30) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);
  return scrolled;
}

function useTypewriter(words: string[], speed = 70, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const word = words[wordIdx];
    if (!deleting && charIdx < word.length) {
      timeout.current = setTimeout(() => {
        setDisplay(word.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, speed);
    } else if (!deleting && charIdx === word.length) {
      timeout.current = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout.current = setTimeout(() => {
        setDisplay(word.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      }, speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

function useCountUp(target: number, inView: boolean, duration = 1500) {
  const [value, setValue] = useState(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(eased * target);
      if (progress < 1) {
        rafId.current = requestAnimationFrame(animate);
      } else {
        setValue(target);
      }
    };
    rafId.current = requestAnimationFrame(animate);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [inView, target, duration]);

  return value;
}

function AnimatedStat({
  target,
  suffix,
  decimals = 0,
}: {
  target: number;
  suffix: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const value = useCountUp(target, inView);
  return (
    <span ref={ref}>
      {decimals > 0 ? value.toFixed(decimals) : Math.floor(value)}
      {suffix}
    </span>
  );
}

export default function App() {
  const [activeNav, setActiveNav] = useState("#home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [tilts, setTilts] = useState(PROJECTS.map(() => ({ x: 0, y: 0 })));
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [formSent, setFormSent] = useState(false);
  const [formSending, setFormSending] = useState(false);
  const scrolled = useScrolled();
  const role = useTypewriter([
    "ML Engineer",
    "Full-Stack Developer",
    "AI & ML Student",
  ]);

  useEffect(() => {
    const handler = (e: MouseEvent) =>
      setMousePos({ x: e.clientX, y: e.clientY });
    document.addEventListener("mousemove", handler, { passive: true });
    return () => document.removeEventListener("mousemove", handler);
  }, []);

  const handleProjectMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    idx: number,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilts((prev) =>
      prev.map((t, i) => (i === idx ? { x: -dy * 8, y: dx * 8 } : t)),
    );
  };

  const handleProjectMouseLeave = (idx: number) => {
    setTilts((prev) => prev.map((t, i) => (i === idx ? { x: 0, y: 0 } : t)));
  };

  const handleNavClick = (href: string) => {
    setActiveNav(href);
    setMenuOpen(false);
    scrollToId(href);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setFormSending(true);
    // Open mailto link as fallback (no backend on GitHub Pages)
    window.location.href = `mailto:balajibattina327@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(`${form.message}

From: ${form.email}`)}`;
    setTimeout(() => {
      setFormSending(false);
      setFormSent(true);
      setForm({ name: "", email: "", message: "" });
      toast.success("Opening your email client to send the message!");
    }, 800);
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "oklch(0.12 0.018 200)",
        color: "oklch(0.94 0.006 200)",
      }}
    >
      <Toaster position="top-right" />

      {/* Glowing cursor dot */}
      <div
        className="hidden md:block fixed pointer-events-none z-[9999]"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: "oklch(0.62 0.12 195 / 0.6)",
          filter: "blur(8px)",
          mixBlendMode: "overlay",
          transform: "translate(-50%, -50%)",
          transition: "left 80ms ease, top 80ms ease",
        }}
      />

      {/* NAVIGATION */}
      <header
        className={`sticky top-0 z-50 w-full nav-glass transition-all duration-300 ${
          scrolled ? "nav-glass-scrolled" : ""
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
          <span
            className="font-display font-bold text-sm tracking-widest uppercase"
            style={{ color: "oklch(0.62 0.12 195)" }}
          >
            B.Balaji
          </span>

          <nav className="nav-links hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                type="button"
                className="text-sm font-medium relative pb-1 transition-colors duration-200"
                style={{
                  color:
                    activeNav === link.href
                      ? "oklch(0.62 0.12 195)"
                      : "oklch(0.65 0.014 200)",
                }}
              >
                {link.label}
                {activeNav === link.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ backgroundColor: "oklch(0.62 0.12 195)" }}
                  />
                )}
              </button>
            ))}
          </nav>

          <button
            type="button"
            aria-label="Toggle menu"
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-5 h-0.5 rounded-full transition-all duration-200"
                style={{ backgroundColor: "oklch(0.62 0.12 195)" }}
              />
            ))}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
              style={{
                background: "oklch(0.13 0.018 200 / 0.98)",
                borderTop: "1px solid oklch(0.22 0.024 200)",
              }}
            >
              <nav className="flex flex-col gap-0 px-6 py-4">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    type="button"
                    className="text-sm font-medium text-left transition-colors py-3 border-b last:border-0"
                    style={{
                      color:
                        activeNav === link.href
                          ? "oklch(0.62 0.12 195)"
                          : "oklch(0.72 0.016 200)",
                      borderColor: "oklch(0.18 0.020 200)",
                    }}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden hero-grid"
        style={{ backgroundColor: "oklch(0.12 0.018 200)" }}
      >
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              bottom: p.bottom,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
              opacity: p.opacity,
              backgroundColor: `oklch(0.62 0.12 ${p.hue})`,
            }}
          />
        ))}

        <div
          className="hero-orb"
          style={{
            width: "500px",
            height: "500px",
            top: "-100px",
            right: "-100px",
            background: "oklch(0.50 0.10 195 / 0.07)",
          }}
        />
        <div
          className="hero-orb"
          style={{
            width: "400px",
            height: "400px",
            bottom: "-60px",
            left: "-60px",
            background: "oklch(0.50 0.10 220 / 0.06)",
          }}
        />

        <div className="max-w-[1200px] mx-auto px-6 md:px-8 w-full py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col md:flex-row items-center justify-between gap-12"
          >
            <div className="flex flex-col gap-7 max-w-2xl flex-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide"
                  style={{
                    background: "oklch(0.62 0.12 195 / 0.12)",
                    border: "1px solid oklch(0.62 0.12 195 / 0.30)",
                    color: "oklch(0.72 0.10 195)",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: "oklch(0.72 0.10 195)" }}
                  />
                  Open to Opportunities
                </span>
              </motion.div>

              <h1
                className="font-display leading-[0.92] tracking-tight"
                style={{ fontSize: "clamp(64px, 9vw, 108px)" }}
              >
                <span
                  style={{ color: "oklch(0.94 0.006 200)", display: "block" }}
                >
                  {BATTINA_CHARS.map((item) => (
                    <motion.span
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: item.delay,
                        ease: "easeOut",
                      }}
                      style={{ display: "inline-block" }}
                    >
                      {item.char}
                    </motion.span>
                  ))}
                </span>
                <span className="text-shimmer" style={{ display: "block" }}>
                  {BALAJI_CHARS.map((item) => (
                    <motion.span
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: item.delay,
                        ease: "easeOut",
                      }}
                      style={{ display: "inline-block" }}
                    >
                      {item.char}
                    </motion.span>
                  ))}
                </span>
              </h1>

              <p
                className="text-lg md:text-xl font-medium tracking-wide"
                style={{ color: "oklch(0.62 0.016 200)", minHeight: "1.75rem" }}
              >
                {role}
                <span
                  className="inline-block w-0.5 h-5 ml-0.5 align-middle animate-pulse"
                  style={{ backgroundColor: "oklch(0.62 0.12 195)" }}
                />
              </p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-3"
              >
                {[
                  { value: "3", label: "ML Projects" },
                  { value: "100+", label: "LeetCode" },
                  { value: "6.66", label: "CGPA" },
                ].map((stat) => (
                  <div key={stat.label} className="stat-chip">
                    <span
                      className="font-display font-bold text-base"
                      style={{ color: "oklch(0.62 0.12 195)" }}
                    >
                      {stat.value}
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: "oklch(0.60 0.014 200)" }}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="flex flex-wrap gap-4 items-center"
              >
                <button
                  onClick={() => handleNavClick("#projects")}
                  type="button"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.03] active:scale-95"
                  style={{
                    backgroundColor: "oklch(0.62 0.12 195)",
                    color: "oklch(0.11 0.018 200)",
                  }}
                >
                  View Projects
                  <ChevronDown size={16} />
                </button>
                <button
                  onClick={() => handleNavClick("#contact")}
                  type="button"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm border transition-all duration-200"
                  style={{
                    border: "1px solid oklch(0.30 0.028 200)",
                    color: "oklch(0.68 0.016 200)",
                  }}
                >
                  Get in Touch
                </button>
                <a
                  href="/assets/uploads/final_cv_balaji_drcode-019d2aaf-08d0-72cb-8cca-c96914591c06-1.pdf"
                  download
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm border transition-all duration-200"
                  style={{
                    border: "1px solid oklch(0.62 0.12 195 / 0.40)",
                    color: "oklch(0.62 0.12 195)",
                  }}
                >
                  <Download size={16} />
                  Download CV
                </a>
              </motion.div>
            </div>

            {/* Profile photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="hidden md:flex flex-shrink-0 items-center justify-center"
            >
              <div
                className="ring-pulse absolute rounded-full"
                style={{
                  width: "300px",
                  height: "300px",
                  borderRadius: "50%",
                  background: "oklch(0.62 0.12 195 / 0.12)",
                  filter: "blur(16px)",
                }}
              />
              <div
                className="photo-float relative w-72 h-72 rounded-full"
                style={{
                  boxShadow:
                    "0 0 40px oklch(0.62 0.12 195 / 0.35), 0 0 80px oklch(0.62 0.12 195 / 0.15)",
                  border: "3px solid oklch(0.62 0.12 195 / 0.60)",
                  padding: "4px",
                  background: "oklch(0.14 0.022 200)",
                }}
              >
                <img
                  src="/assets/uploads/image-019d2ad0-59ff-77cd-a1cf-6f301fcc8864-1.png"
                  alt="Battina Balaji"
                  className="w-full h-full rounded-full object-cover"
                />
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, oklch(0.62 0.12 195 / 0.10), transparent 70%)",
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: "oklch(0.40 0.012 200)" }}
          >
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.6 }}
            className="w-0.5 h-8"
            style={{
              background:
                "linear-gradient(to bottom, oklch(0.62 0.12 195), transparent)",
            }}
          />
        </motion.div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="py-24"
        style={{ backgroundColor: "oklch(0.14 0.020 200)" }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          >
            <div>
              <p className="section-label">{"// About Me"}</p>
              <h2
                className="font-display text-3xl md:text-4xl font-bold mb-6 leading-tight"
                style={{ color: "oklch(0.94 0.006 200)" }}
              >
                Computer Scientist.
                <br />
                <span style={{ color: "oklch(0.62 0.12 195)" }}>
                  ML Enthusiast.
                </span>
              </h2>
              <p
                className="text-base leading-relaxed mb-8"
                style={{ color: "oklch(0.64 0.014 200)" }}
              >
                I'm pursuing B.Tech in CS (AI &amp; ML) at Lovely Professional
                University, Phagwara, Punjab. I have a strong foundation in Data
                Structures &amp; Algorithms, OOP, and DBMS, with hands-on
                experience building ML models and automation testing frameworks.
                I love applying technology to solve real-world problems and am
                continuously learning through projects and certifications.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  {
                    icon: <GraduationCap size={14} />,
                    text: "LPU B.Tech AI/ML",
                  },
                  { icon: <MapPin size={14} />, text: "Phagwara, Punjab" },
                  {
                    icon: (
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                    ),
                    text: "Open to Work",
                  },
                ].map((item) => (
                  <span
                    key={item.text}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                    style={{
                      background: "oklch(0.20 0.026 200)",
                      border: "1px solid oklch(0.26 0.028 200)",
                      color: "oklch(0.78 0.014 200)",
                    }}
                  >
                    <span style={{ color: "oklch(0.62 0.12 195)" }}>
                      {item.icon}
                    </span>
                    {item.text}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="rounded-2xl p-8 grid grid-cols-2 gap-5"
              style={{
                background: "oklch(0.17 0.022 200)",
                border: "1px solid oklch(0.24 0.026 200)",
              }}
            >
              {[
                {
                  target: 3,
                  suffix: "+",
                  decimals: 0,
                  label: "ML / AI Projects",
                  sub: "End-to-end pipelines",
                },
                {
                  target: 100,
                  suffix: "+",
                  decimals: 0,
                  label: "LeetCode Solved",
                  sub: "DSA consistency",
                },
                {
                  target: 4,
                  suffix: "",
                  decimals: 0,
                  label: "Certifications",
                  sub: "Infosys · LPU · FCC",
                },
                {
                  target: 6.66,
                  suffix: "",
                  decimals: 2,
                  label: "CGPA at LPU",
                  sub: "B.Tech AI & ML",
                },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex flex-col gap-1 p-4 rounded-xl"
                  style={{
                    background: "oklch(0.20 0.024 200)",
                    border: "1px solid oklch(0.26 0.028 200)",
                  }}
                >
                  <span
                    className="font-display text-2xl font-bold"
                    style={{ color: "oklch(0.62 0.12 195)" }}
                  >
                    <AnimatedStat
                      target={s.target}
                      suffix={s.suffix}
                      decimals={s.decimals}
                    />
                  </span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "oklch(0.84 0.010 200)" }}
                  >
                    {s.label}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "oklch(0.50 0.012 200)" }}
                  >
                    {s.sub}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SKILLS */}
      <section
        id="skills"
        className="py-24"
        style={{ backgroundColor: "oklch(0.12 0.018 200)" }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="section-label">{"// Expertise"}</p>
            <h2
              className="font-display text-3xl md:text-4xl font-bold"
              style={{ color: "oklch(0.94 0.006 200)" }}
            >
              Skills &amp; Tools
            </h2>
          </motion.div>
          <div className="flex flex-col gap-5">
            {SKILLS.map((skill, i) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col py-4 px-5 rounded-xl"
                style={{
                  background: "oklch(0.16 0.022 200)",
                  border: "1px solid oklch(0.22 0.024 200)",
                }}
              >
                <div className="flex items-start gap-6">
                  <div className="flex items-center gap-3 min-w-[140px] flex-shrink-0">
                    <span
                      style={{
                        color: `oklch(0.62 ${skill.chroma} ${skill.hue})`,
                      }}
                    >
                      {skill.icon}
                    </span>
                    <span
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "oklch(0.55 0.014 200)" }}
                    >
                      {skill.title}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="skill-pill"
                        style={{
                          background: `oklch(0.20 ${skill.chroma * 0.5} ${skill.hue} / 0.7)`,
                          border: `1px solid oklch(0.30 ${skill.chroma * 0.6} ${skill.hue} / 0.5)`,
                          color: `oklch(0.78 ${skill.chroma * 0.5} ${skill.hue})`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  className="mt-3"
                  style={{
                    height: "2px",
                    background: "oklch(0.22 0.024 200)",
                    borderRadius: "1px",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: skill.proficiency }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.0,
                      delay: i * 0.1,
                      ease: "easeOut",
                    }}
                    style={{
                      height: "100%",
                      transformOrigin: "left",
                      background: `linear-gradient(90deg, oklch(0.62 ${skill.chroma} ${skill.hue}), oklch(0.50 0.10 ${skill.hue + 20}))`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        className="py-24"
        style={{ backgroundColor: "oklch(0.14 0.020 200)" }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="section-label">{"// Work"}</p>
            <h2
              className="font-display text-3xl md:text-4xl font-bold"
              style={{ color: "oklch(0.94 0.006 200)" }}
            >
              Selected Projects
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map((project, i) => (
              <div
                key={project.title}
                style={{
                  transform: `perspective(800px) rotateX(${tilts[i].x}deg) rotateY(${tilts[i].y}deg)`,
                  transition: "transform 0.15s ease",
                }}
                onMouseMove={(e) => handleProjectMouseMove(e, i)}
                onMouseLeave={() => handleProjectMouseLeave(i)}
              >
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="project-card rounded-2xl overflow-hidden flex flex-col h-full"
                >
                  <div
                    style={{
                      height: "4px",
                      background: `linear-gradient(90deg, oklch(0.62 0.12 ${project.accentHue}), oklch(0.50 0.10 ${project.accentHue + 20}))`,
                    }}
                  />
                  <div className="p-6 flex flex-col gap-4 flex-1 relative">
                    <span
                      className="absolute top-4 right-5 font-display font-black select-none pointer-events-none"
                      style={{
                        fontSize: "3.5rem",
                        lineHeight: 1,
                        color: "oklch(0.22 0.024 200)",
                      }}
                    >
                      {project.number}
                    </span>
                    <span
                      className="text-xs font-medium px-2.5 py-1 rounded-full self-start"
                      style={{
                        background: `oklch(0.20 0.04 ${project.accentHue} / 0.6)`,
                        color: `oklch(0.72 0.10 ${project.accentHue})`,
                        border: `1px solid oklch(0.30 0.06 ${project.accentHue} / 0.4)`,
                      }}
                    >
                      {project.date}
                    </span>
                    <h3
                      className="font-display font-bold text-base leading-snug pr-10"
                      style={{ color: "oklch(0.92 0.006 200)" }}
                    >
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2 py-0.5 rounded-md font-medium"
                          style={{
                            background: "oklch(0.20 0.020 200)",
                            color: "oklch(0.58 0.012 200)",
                            border: "1px solid oklch(0.26 0.024 200)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <p
                      className="text-sm leading-relaxed flex-1"
                      style={{ color: "oklch(0.56 0.014 200)" }}
                    >
                      {project.description}
                    </p>
                    <div className="flex gap-2 mt-1 flex-wrap">
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 hover:opacity-90"
                          style={{
                            background: `oklch(0.62 0.12 ${project.accentHue})`,
                            color: "oklch(0.10 0.012 200)",
                          }}
                        >
                          <Play size={11} /> Live Demo
                        </a>
                      )}
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border transition-all duration-200"
                        style={{
                          borderColor: "oklch(0.28 0.028 200)",
                          color: "oklch(0.62 0.014 200)",
                        }}
                      >
                        <Github size={11} /> GitHub <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATES & ACHIEVEMENTS */}
      <section
        id="certificates"
        className="py-24"
        style={{ backgroundColor: "oklch(0.14 0.020 200)" }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="section-label">{"// Recognition"}</p>
            <h2
              className="font-display text-3xl md:text-4xl font-bold"
              style={{ color: "oklch(0.94 0.006 200)" }}
            >
              Certificates &amp; Achievements
            </h2>
          </motion.div>
          <div className="flex flex-col gap-10">
            <div>
              <h3
                className="text-xs font-semibold uppercase tracking-wider mb-5 flex items-center gap-2"
                style={{ color: "oklch(0.50 0.012 200)" }}
              >
                <Award size={14} style={{ color: "oklch(0.62 0.12 195)" }} />
                Certificates
              </h3>
              <div className="flex flex-col gap-3">
                {CERTIFICATES.map((cert, i) => (
                  <motion.div
                    key={cert.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="cert-card rounded-r-xl p-4"
                  >
                    <p
                      className="text-sm font-semibold leading-snug"
                      style={{ color: "oklch(0.86 0.008 200)" }}
                    >
                      {cert.title}
                    </p>
                    <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
                      <span
                        className="text-xs"
                        style={{ color: "oklch(0.50 0.012 200)" }}
                      >
                        {cert.issuer}
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-full"
                          style={{
                            background: "oklch(0.20 0.024 200)",
                            color: "oklch(0.58 0.012 200)",
                          }}
                        >
                          {cert.date}
                        </span>
                        {cert.link && (
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full transition-all duration-200 hover:opacity-80"
                            style={{
                              background: "oklch(0.62 0.12 195 / 0.15)",
                              color: "oklch(0.62 0.12 195)",
                              border: "1px solid oklch(0.62 0.12 195 / 0.3)",
                            }}
                          >
                            <ExternalLink size={10} />
                            View
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3
                className="text-xs font-semibold uppercase tracking-wider mb-5 flex items-center gap-2"
                style={{ color: "oklch(0.50 0.012 200)" }}
              >
                <Trophy size={14} style={{ color: "oklch(0.62 0.12 195)" }} />
                Achievements
              </h3>
              <div className="flex flex-col gap-4">
                {ACHIEVEMENTS.map((ach, i) => (
                  <motion.div
                    key={ach.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="achievement-card rounded-xl p-5 flex items-start gap-4"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "oklch(0.62 0.12 195 / 0.12)",
                        color: "oklch(0.62 0.12 195)",
                        border: "1px solid oklch(0.62 0.12 195 / 0.25)",
                      }}
                    >
                      {ach.icon}
                    </div>
                    <div>
                      <p
                        className="font-semibold text-sm"
                        style={{ color: "oklch(0.88 0.006 200)" }}
                      >
                        {ach.title}
                      </p>
                      <p
                        className="text-xs mt-1 leading-relaxed"
                        style={{ color: "oklch(0.52 0.012 200)" }}
                      >
                        {ach.detail}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section
        id="education"
        className="py-24"
        style={{ backgroundColor: "oklch(0.12 0.018 200)" }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="section-label">{"// Background"}</p>
            <h2
              className="font-display text-3xl md:text-4xl font-bold"
              style={{ color: "oklch(0.94 0.006 200)" }}
            >
              Education
            </h2>
          </motion.div>
          <div className="relative pl-8">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
              className="absolute left-3 top-2 bottom-2 w-px timeline-line"
              style={{ transformOrigin: "top" }}
            />
            <div className="flex flex-col gap-10">
              {EDUCATION.map((edu, i) => (
                <motion.div
                  key={edu.institution}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative"
                >
                  <div
                    className="absolute -left-5 top-4 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                    style={{
                      background: "oklch(0.12 0.018 200)",
                      borderColor:
                        i === 0
                          ? "oklch(0.62 0.12 195)"
                          : "oklch(0.34 0.030 200)",
                      boxShadow:
                        i === 0
                          ? "0 0 12px oklch(0.62 0.12 195 / 0.4)"
                          : undefined,
                    }}
                  >
                    {i === 0 && (
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: "oklch(0.62 0.12 195)" }}
                      />
                    )}
                  </div>
                  <div
                    className="rounded-2xl p-6 ml-2"
                    style={{
                      background: "oklch(0.16 0.022 200)",
                      border: `1px solid ${i === 0 ? "oklch(0.62 0.12 195 / 0.20)" : "oklch(0.22 0.024 200)"}`,
                    }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3
                          className="font-display font-bold text-lg"
                          style={{ color: "oklch(0.92 0.006 200)" }}
                        >
                          {edu.institution}
                        </h3>
                        <p
                          className="text-sm mt-0.5"
                          style={{ color: "oklch(0.60 0.014 200)" }}
                        >
                          {edu.degree}
                        </p>
                      </div>
                      <span
                        className="text-sm font-bold px-3 py-1 rounded-full flex-shrink-0"
                        style={{
                          background: `oklch(0.62 0.12 195 / ${i === 0 ? "0.15" : "0.08"})`,
                          color: "oklch(0.62 0.12 195)",
                          border: "1px solid oklch(0.62 0.12 195 / 0.25)",
                        }}
                      >
                        {edu.grade}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-3">
                      <span
                        className="text-xs flex items-center gap-1.5"
                        style={{ color: "oklch(0.48 0.012 200)" }}
                      >
                        <BookOpen size={11} /> {edu.period}
                      </span>
                      <span
                        className="text-xs flex items-center gap-1.5"
                        style={{ color: "oklch(0.48 0.012 200)" }}
                      >
                        <MapPin size={11} /> {edu.location}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="py-24"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.12 0.018 200) 0%, oklch(0.15 0.022 200) 100%)",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label">{"// Contact"}</p>
            <h2
              className="font-display text-3xl md:text-4xl font-black leading-tight mb-5"
              style={{ color: "oklch(0.94 0.006 200)" }}
            >
              Let's Build
              <br />
              <span style={{ color: "oklch(0.62 0.12 195)" }}>Something</span>
              <br />
              Together
            </h2>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "oklch(0.54 0.014 200)" }}
            >
              Have a project in mind? I'd love to hear about it. Whether it's an
              ML pipeline or a web application, let's talk.
            </p>
            <div
              className="flex items-center gap-2 mb-8 text-sm"
              style={{ color: "oklch(0.60 0.012 200)" }}
            >
              <Clock size={14} style={{ color: "oklch(0.62 0.12 195)" }} />
              Typically responds within 24h
            </div>
            <div className="flex items-center gap-3">
              {[
                {
                  icon: <Linkedin size={18} />,
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/Balaji24",
                },
                {
                  icon: <Github size={18} />,
                  label: "GitHub",
                  href: "https://github.com/battinabalaji",
                },
                {
                  icon: <Mail size={18} />,
                  label: "Email",
                  href: "mailto:balajibattina327@gmail.com",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={
                    social.href.startsWith("mailto") ? undefined : "_blank"
                  }
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: "oklch(0.18 0.022 200)",
                    border: "1px solid oklch(0.26 0.028 200)",
                    color: "oklch(0.62 0.12 195)",
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
                className="input-pro"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, email: e.target.value }))
                }
                className="input-pro"
              />
            </div>
            <textarea
              rows={5}
              placeholder="Your Message"
              value={form.message}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, message: e.target.value }))
              }
              className="input-pro resize-none"
            />
            <AnimatePresence>
              {formSent && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-sm font-medium px-4 py-3 rounded-xl"
                  style={{
                    background: "oklch(0.25 0.06 160)",
                    color: "oklch(0.75 0.10 160)",
                    border: "1px solid oklch(0.40 0.10 160 / 0.4)",
                  }}
                >
                  ✓ Email client opened! Send the email to reach me directly.
                </motion.div>
              )}
            </AnimatePresence>
            <button
              type="submit"
              disabled={formSending}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.99] disabled:opacity-60"
              style={{
                background: "oklch(0.62 0.12 195)",
                color: "oklch(0.10 0.012 200)",
              }}
            >
              {formSending ? (
                "Opening..."
              ) : (
                <>
                  <Send size={15} /> Send Message
                </>
              )}
            </button>
          </motion.form>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          backgroundColor: "oklch(0.10 0.016 200)",
          borderTop: "1px solid oklch(0.18 0.022 200)",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p
              className="font-display font-bold tracking-widest uppercase text-sm mb-1"
              style={{ color: "oklch(0.62 0.12 195)" }}
            >
              Battina Balaji
            </p>
            <p className="text-xs" style={{ color: "oklch(0.40 0.010 200)" }}>
              © {new Date().getFullYear()}. Built with passion.
            </p>
          </div>
          <nav className="flex items-center gap-5">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                type="button"
                className="text-xs font-medium transition-colors"
                style={{ color: "oklch(0.42 0.010 200)" }}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
