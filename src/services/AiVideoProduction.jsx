"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAssetPath } from "../utils/assetPath";
import ContactSection from "../app/components/common/ContactSection";
import BeyondServicesCarousel from "../app/components/common/BeyondServicesCarousel";
import {
  LuSearch,
  LuLightbulb,
  LuPalette,
  LuSlidersHorizontal,
  LuFilm,
  LuLayers,
  LuX,
  LuWand,
  LuUserCheck,
  LuBox,
  LuMic,
  LuChevronDown,
} from "react-icons/lu";

// What We Create Editorial Items
const whatWeCreateItems = [
  {
    title: "Brand Films",
    desc: "Concept-led films that build brand worlds, communicate stories and create impact.",
  },
  {
    title: "Product Films",
    desc: "Turn products into protagonists with cinematic environments, movement and visual storytelling.",
  },
  {
    title: "Social-First Video",
    desc: "Reels, short-form films and platform-native content designed to move at the speed of social.",
  },
  {
    title: "Campaign Films",
    desc: "Extend campaign ideas into motion without requiring a conventional production setup for every execution.",
  },
  {
    title: "Concept & Previsualisation",
    desc: "Bring scripts, treatments and ambitious creative ideas to life before committing to large-scale production.",
  },
  {
    title: "Adaptations at Scale",
    desc: "Create multiple formats, durations, markets and language versions from one strong creative foundation.",
  },
];

// 6 Pipeline Stages
const pipelineStages = [
  {
    title: "Discover",
    desc: "Understand the brand, audience, objective, platform and communication challenge.",
  },
  {
    title: "Concept & Script",
    desc: "Develop the creative thought, narrative, script and storytelling structure.",
  },
  {
    title: "Visual Direction",
    desc: "Define characters, environments, frames, references, camera language and overall aesthetic.",
  },
  {
    title: "Generate & Direct",
    desc: "Create sequences using AI while continuously directing, selecting and refining the output.",
  },
  {
    title: "Edit & Finish",
    desc: "Bring everything together through editing, transitions, typography, grading, music, voice and sound design.",
  },
  {
    title: "Adapt & Deliver",
    desc: "Build platform, duration, language and format variations ready for wherever the film needs to live.",
  },
];

// SVG icons for pipeline cards matching reference site
const pipelineIcons = [
  // Discover — magnifier
  <svg key="discover" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  // Concept & Script — lightbulb
  <svg key="concept" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z"/></svg>,
  // Visual Direction — document
  <svg key="visual" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  // Generate & Direct — grid/storyboard
  <svg key="generate" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="2" y1="8" x2="22" y2="8"/><line x1="2" y1="16" x2="22" y2="16"/><line x1="8" y1="4" x2="8" y2="20"/><line x1="16" y1="4" x2="16" y2="20"/></svg>,
  // Edit & Finish — star/sparkle
  <svg key="edit" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  // Adapt & Deliver — sliders
  <svg key="adapt" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>,
];

// Recent Work - Batch 1 (Initial 6 items) - using reference images
const batch1Items = [
  {
    id: "AFh_ulQfvVc",
    image: "/img/ai-excellence/ai-video-production/5.webp",
    alt: "AI Video Production",
    type: "standard",
  },
  {
    id: "1hfWhCjRHKg",
    image: "/img/ai-excellence/ai-video-production/1.webp",
    alt: "AI Character Animation",
    type: "standard",
  },
  {
    id: "1QkCTTCuLf0",
    image: "/img/ai-excellence/ai-video-production/3.webp",
    alt: "AI Commercial Production",
    type: "standard",
  },
  {
    id: "dKuuCB6bh1U",
    image: "/img/ai-excellence/ai-video-production/6.webp",
    alt: "AI Cinematic Production",
    type: "standard",
  },
  {
    id: "Pn0JBdLc8uw",
    image: "/img/ai-excellence/ai-video-production/2.webp",
    alt: "AI Fashion Video",
    type: "featured",
  },
  {
    id: "fwmLCN_31xw",
    image: "/img/ai-excellence/ai-video-production/6.webp",
    alt: "AI Product Showcase",
    type: "standard",
  },
];

// Other AI Services (Kinetic stream) — using reference images
const otherAiServices = [
  {
    title: "Generative AI",
    slug: "generative-ai",
    image: "/img/ai-excellence/generative-ai/generative-ai.webp",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M14.5 4.5l5 5L7 22H2v-5L14.5 4.5z"/>
        <path d="M13 6l5 5"/>
        <path d="M5 2l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z"/>
        <path d="M19 15l.7 1.3 1.3.7-1.3.7-.7 1.3-.7-1.3-1.3-.7 1.3-.7.7-1.3z"/>
      </svg>
    ),
  },
  {
    title: "AI Character Development",
    slug: "ai-character-development",
    image: "/img/ai-excellence/ai-character-development/character-development.webp",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <circle cx="12" cy="8" r="5"/>
        <path d="M4 21v-2a6 6 0 0 1 12 0v2"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        <path d="M21 21v-2a4 4 0 0 0-3-3.87"/>
      </svg>
    ),
  },
  {
    title: "AI Product Visualisation",
    slug: "ai-product-visualization",
    image: "/img/ai-excellence/ai-product-visualization/product-visualilzation.webp",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
        <path d="m3.3 7 8.7 5 8.7-5"/>
        <path d="M12 22V12"/>
      </svg>
    ),
  },
  {
    title: "AI Audio Production",
    slug: "ai-audio-production",
    image: "/img/ai-excellence/ai-audio-production/audio-production.webp",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="23"/>
        <line x1="8" y1="23" x2="16" y2="23"/>
      </svg>
    ),
  },
];

// FAQ data
const faqColumns = [
  [
    {
      q: "What is AI video production?",
      a: "AI video production uses artificial intelligence alongside traditional creative skills such as concept development, scripting, art direction, editing, motion and sound to create video content. It can help brands develop visually ambitious films and explore scenes, characters and environments without depending entirely on conventional shoots or physical production setups.",
    },
    {
      q: "What types of AI videos can you create for brands?",
      a: "We create AI-powered brand films, product films, advertising and campaign videos, social-first videos, reels, concept visualisations and previsualisation films. Content can also be adapted into different durations, aspect ratios, markets and languages depending on the campaign and platform requirements.",
    },
    {
      q: "How is AI video production different from traditional video production?",
      a: "Traditional video production typically relies on physical locations, sets, crews, actors and cameras. AI video production can generate or enhance many visual elements digitally, opening up creative possibilities that may otherwise require significant physical production. The right approach can also combine conventional production with AI rather than treating the two as mutually exclusive.",
    },
  ],
  [
    {
      q: "Can AI video production maintain brand and visual consistency?",
      a: "Yes. Strong AI video production requires much more than generating individual clips. We establish the visual direction, characters, environments, camera language and brand cues before production, then continuously select and refine frames and sequences to maintain consistency throughout the finished film.",
    },
    {
      q: "Can AI-generated videos be used for advertising and social media?",
      a: "Yes. AI-generated video can be developed for digital advertising, social media campaigns, reels, product launches, brand storytelling and other marketing applications. A master creative can also be adapted into multiple lengths, formats and platform-specific versions to help brands extend the life of a campaign idea.",
    },
    {
      q: "What should I look for when choosing an AI video production agency?",
      a: "Look beyond the AI tools an agency uses. A strong AI video production agency should demonstrate expertise in concept development, storytelling, creative direction, visual consistency, editing and post-production. The objective should be to create a compelling film—not simply to generate impressive-looking individual shots.",
    },
  ],
];

// FAQ Accordion Item
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#e0e0e0] last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group cursor-pointer"
      >
        <h3 className="font-sans text-[15px] w769:text-[14px] font-semibold text-[#111111] leading-snug group-hover:text-[#e77809] transition-colors duration-200">
          {q}
        </h3>
        <span className={`shrink-0 w-7 h-7 rounded-full border border-[#ccc] flex items-center justify-center transition-transform duration-300 ${open ? "rotate-180 border-[#e77809]" : ""}`}>
          <LuChevronDown className={`w-4 h-4 transition-colors duration-200 ${open ? "text-[#e77809]" : "text-[#666]"}`} />
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[400px] pb-5" : "max-h-0"}`}>
        <p className="font-libre text-[14px] text-[#444] leading-[1.75]">{a}</p>
      </div>
    </div>
  );
}

export default function AiVideoProduction() {
  const [hoveredVideoId, setHoveredVideoId] = useState(null);
  const debounceTimerRef = useRef(null);
  const [activeModalVideoId, setActiveModalVideoId] = useState(null);
  const [activeKineticIndex, setActiveKineticIndex] = useState(0);

  const scrollToContact = (e) => {
    e?.preventDefault?.();
    const contactEl =
      document.getElementById("say_hello") ||
      document.getElementById("contact-us") ||
      document.querySelector("footer");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMouseEnter = (videoId) => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      setHoveredVideoId(videoId);
    }, 180);
  };

  const handleMouseLeave = () => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    setHoveredVideoId(null);
  };

  const handleOpenModal = (videoId) => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    setHoveredVideoId(null);
    setActiveModalVideoId(videoId);
  };

  const handleCloseModal = () => {
    setActiveModalVideoId(null);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleCloseModal();
    };
    if (activeModalVideoId) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeModalVideoId]);

  return (
    <main className="flex-grow flex flex-col w-full font-sans bg-white text-[#16110f] overflow-x-hidden">

      {/* 1. HERO BANNER */}
      <section
        className="w-full min-h-[560px] w769:min-h-[440px] bg-cover bg-center flex items-center py-20 select-none relative"
        style={{ backgroundImage: `url('${getAssetPath("/img/ai-excellence/ai-video-production/video-production-ai-excellence-bg.webp")}')` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto relative z-10">
          <div className="max-w-[850px] text-left">
            <h1 className="font-sans text-[42px] w1470:text-[40px] w1281:text-[34px] w769:text-[26px] text-white font-bold uppercase tracking-[2px] leading-tight mb-3">
              AI VIDEO PRODUCTION
            </h1>
            <h2 className="font-libre text-[26px] w769:text-[20px] font-semibold text-white tracking-[0.5px] mb-4">
              Film what used to be impossible.
            </h2>
            <p className="font-libre text-[18px] w769:text-[15px] text-white leading-[1.6] mb-8 font-normal max-w-[680px]">
              From brand films and product stories to social content and campaign videos,{" "}
              we combine creative direction with AI-powered production to turn ambitious{" "}
              ideas into finished films.
            </p>
            <button
              type="button"
              onClick={scrollToContact}
              className="px-8 py-3 rounded-full border border-white text-white hover:bg-white hover:text-[#16110f] font-libre text-[12px] font-semibold tracking-[1.5px] uppercase transition-all duration-300 cursor-pointer"
            >
              START A PROJECT
            </button>
          </div>
        </div>
      </section>

      {/* 2. BREADCRUMBS + SERVICE BIO */}
      <div className="w-full bg-white pt-8 pb-0 select-none">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          {/* Breadcrumb */}
          <ul className="flex items-center gap-2 flex-wrap font-libre text-[13px] text-[#555] mb-6">
            <li>
              <Link href="/what-we-brew" className="hover:text-[#e77809] transition-colors">
                <strong className="font-bold text-[#111]">Our</strong> Expertise
              </Link>
            </li>
            <li className="text-[#aaa]">/</li>
            <li>
              <Link href="/our-expertise/ai-excellence" className="hover:text-[#e77809] transition-colors">
                <strong className="font-bold text-[#111]">AI</strong> Excellence
              </Link>
            </li>
            <li className="text-[#aaa]">/</li>
            <li className="text-[#e77809] font-medium">AI Video Production</li>
          </ul>

          {/* Service Bio */}
          <h2 className="font-sans text-[34px] w1281:text-[28px] w769:text-[24px] font-medium text-[#111111] leading-[1.25] mb-6">
            From imagination to final frame.
          </h2>
          <div className="flex flex-col gap-3 font-libre text-[16px] w769:text-[14px] text-[#333] leading-[1.75] pb-16 max-w-[820px]">
            <p>AI changes what can be produced.</p>
            <p>It doesn&apos;t change what makes a film worth watching.</p>
            <p>
              The idea, storytelling, pacing, visual language and craft still matter. We bring those together
              with AI-powered production workflows to create films that feel intentionally directed rather
              than simply generated.
            </p>
          </div>
        </div>
      </div>

      {/* 3. WHAT WE CREATE SECTION */}
      <section className="w-full bg-white py-16 w769:py-10 select-none border-t border-[#ebebeb]">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          <div className="flex flex-row w992:flex-col justify-between items-start gap-16 w992:gap-10">

            {/* Left Sticky Sidebar */}
            <div className="w-[30%] w992:w-full lg:sticky lg:top-28 shrink-0">
              <h2 className="font-sans text-[46px] w1281:text-[38px] w769:text-[30px] font-bold text-[#111111] uppercase tracking-[1px] leading-[1.1] mb-8">
                <strong>WHAT WE</strong>{" "}
                <br />
                CREATE
              </h2>
              {/* Sidebar visual box-img */}
              <div className="relative w-full max-w-[320px] rounded-[14px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.14)] bg-[#f0f0f0] aspect-[4/5]">
                <Image
                  src={getAssetPath("/img/ai-excellence/ai-video-production/video-production-ai-excellence-box-img.webp")}
                  alt="AI Video Creation"
                  fill
                  sizes="320px"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Right Editorial Grid */}
            <div className="w-[66%] w992:w-full grid grid-cols-2 w769:grid-cols-1 gap-x-10 gap-y-10 w769:gap-y-8 pt-4">
              {whatWeCreateItems.map((item, idx) => (
                <div key={idx} className="flex flex-col text-left border-t border-[#dddddd] pt-6">
                  <h3 className="font-sans text-[20px] w769:text-[18px] font-bold text-[#111111] tracking-[0.3px] mb-3">
                    {item.title}
                  </h3>
                  <p className="font-libre text-[15px] w769:text-[14px] leading-[1.7] text-[#555555]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. PIPELINE / PROCESS SECTION */}
      <section className="w-full py-20 w769:py-14 bg-[#f6f6f6] select-none border-y border-[#e5e5e5]">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          <div className="text-center mb-14 w769:mb-8">
            <h2 className="font-sans text-[38px] w1281:text-[32px] w769:text-[24px] font-semibold text-[#111111] leading-[1.25] mb-3">
              From Brief to Final Frame.
            </h2>
            <p className="font-libre text-[17px] w769:text-[14px] text-[#666666] leading-[1.6]">
              A streamlined, transparent 6-stage production journey delivering studio master excellence.
            </p>
          </div>

          <div className="grid grid-cols-3 w1281:grid-cols-2 w769:grid-cols-1 gap-6 w769:gap-4">
            {pipelineStages.map((stage, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#e0e0e0] hover:border-[#e77809] rounded-[14px] p-7 w769:p-5 flex flex-col justify-start transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] group"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-sans text-[19px] w769:text-[17px] font-bold text-[#111111] tracking-[0.3px] leading-snug">
                    {stage.title}
                  </h3>
                  <div className="w-[36px] h-[36px] rounded-[8px] border border-[#ddd] group-hover:border-[#e77809] text-[#888] group-hover:text-[#e77809] flex items-center justify-center transition-all duration-300 shrink-0">
                    {pipelineIcons[idx]}
                  </div>
                </div>
                <p className="font-libre text-[14.5px] w769:text-[13px] text-[#555555] leading-[1.65]">
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. AI DIRECTION MANIFESTO SECTION */}
      <section className="w-full py-20 w769:py-14 bg-white select-none border-b border-[#ebebeb]">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          <div className="grid grid-cols-2 w992:grid-cols-1 gap-16 w992:gap-10 items-center">

            {/* Left Headings */}
            <div>
              <h2 className="font-sans text-[42px] w1281:text-[34px] w769:text-[26px] font-bold text-[#111111] leading-[1.15] mb-2">
                AI can generate frames.
              </h2>
              <h3 className="font-sans text-[24px] w1281:text-[20px] w769:text-[18px] font-normal text-[#666666] leading-[1.3] mb-6">
                Direction makes them a film.
              </h3>
              <div className="w-[48px] h-[3px] bg-[#e77809] rounded-full" />
            </div>

            {/* Right Copy & CTA */}
            <div>
              <div className="mb-7">
                <p className="font-libre text-[18px] w769:text-[16px] font-medium text-[#111111] leading-[1.5] mb-3">
                  The value isn&apos;t in generating more footage.
                </p>
                <p className="font-libre text-[15px] w769:text-[14px] text-[#555555] leading-[1.7] mb-3">
                  It&apos;s knowing which frame works. Which movement feels right. Which expression belongs. Which shot needs another iteration.
                </p>
                <p className="font-libre text-[15px] w769:text-[14px] font-semibold text-[#333333] leading-[1.6]">
                  That&apos;s where human creative direction makes the difference.
                </p>
              </div>
              <button
                type="button"
                onClick={scrollToContact}
                className="px-8 py-3 rounded-full border border-[#16110f] text-[#16110f] hover:bg-[#16110f] hover:text-white font-libre text-[12px] font-semibold tracking-[1.5px] uppercase transition-all duration-300 cursor-pointer"
              >
                START A PROJECT
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. RECENT WORK SECTION (INTERACTIVE MOSAIC VIDEO GALLERY) */}
      <section className="w-full pt-16 pb-20 w769:py-12 bg-white select-none">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          <h2 className="font-sans text-[36px] w1281:text-[30px] w769:text-[26px] text-[#111111] mb-10 w769:mb-7">
            <strong>Recent</strong> Work
          </h2>

          {/* Mosaic Grid: Left 2x2 + Right (1 Featured + 1 Standard) */}
          <div className="grid grid-cols-[2fr_1fr] w992:grid-cols-1 gap-4 h-[680px] w1281:h-[540px] w992:h-auto">

            {/* Left Block (2x2 grid) */}
            <div className="grid grid-cols-2 grid-rows-2 w501:grid-cols-1 w501:grid-rows-none gap-4 h-full">
              {batch1Items.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleOpenModal(item.id)}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                  className="relative rounded-[10px] overflow-hidden bg-[#11141b] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 h-full min-h-[200px] w501:h-[200px] group"
                >
                  <Image
                    src={getAssetPath(item.image)}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105 select-none pointer-events-none"
                  />
                  {hoveredVideoId === item.id && (
                    <div className="absolute inset-0 z-10 overflow-hidden bg-black pointer-events-none">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${item.id}?autoplay=1&mute=1&controls=0&playsinline=1&showinfo=0&rel=0&disablekb=1&modestbranding=1&fs=0`}
                        title="Video Preview"
                        className="absolute top-1/2 left-1/2 w-[320%] h-[140%] -translate-x-1/2 -translate-y-1/2 border-0 pointer-events-none"
                        allow="autoplay; encrypted-media"
                      />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300 pointer-events-none" />
                  {/* Play icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#111] fill-current ml-0.5"><polygon points="5,3 19,12 5,21"/></svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Block (1 Featured Top + 1 Standard Bottom) */}
            <div className="flex flex-col w992:grid w992:grid-cols-2 w501:flex w501:flex-col gap-4 h-full">
              {/* Featured Top */}
              <div
                onClick={() => handleOpenModal(batch1Items[4].id)}
                onMouseEnter={() => handleMouseEnter(batch1Items[4].id)}
                onMouseLeave={handleMouseLeave}
                className="relative rounded-[10px] overflow-hidden bg-[#11141b] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 flex-[2] w992:flex-none h-full min-h-[220px] w992:h-[200px] group"
              >
                <Image
                  src={getAssetPath(batch1Items[4].image)}
                  alt={batch1Items[4].alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105 select-none pointer-events-none"
                />
                {hoveredVideoId === batch1Items[4].id && (
                  <div className="absolute inset-0 z-10 overflow-hidden bg-black pointer-events-none">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${batch1Items[4].id}?autoplay=1&mute=1&controls=0&playsinline=1&showinfo=0&rel=0&disablekb=1&modestbranding=1&fs=0`}
                      title="Featured Video Preview"
                      className="absolute top-1/2 left-1/2 w-[200%] h-[140%] -translate-x-1/2 -translate-y-1/2 border-0 pointer-events-none"
                      allow="autoplay; encrypted-media"
                    />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300 pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#111] fill-current ml-0.5"><polygon points="5,3 19,12 5,21"/></svg>
                  </div>
                </div>
              </div>

              {/* Standard Bottom */}
              <div
                onClick={() => handleOpenModal(batch1Items[5].id)}
                onMouseEnter={() => handleMouseEnter(batch1Items[5].id)}
                onMouseLeave={handleMouseLeave}
                className="relative rounded-[10px] overflow-hidden bg-[#11141b] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 flex-[1] w992:flex-none h-full min-h-[180px] w992:h-[200px] group"
              >
                <Image
                  src={getAssetPath(batch1Items[5].image)}
                  alt={batch1Items[5].alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105 select-none pointer-events-none"
                />
                {hoveredVideoId === batch1Items[5].id && (
                  <div className="absolute inset-0 z-10 overflow-hidden bg-black pointer-events-none">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${batch1Items[5].id}?autoplay=1&mute=1&controls=0&playsinline=1&showinfo=0&rel=0&disablekb=1&modestbranding=1&fs=0`}
                      title="Video Preview"
                      className="absolute top-1/2 left-1/2 w-[320%] h-[140%] -translate-x-1/2 -translate-y-1/2 border-0 pointer-events-none"
                      allow="autoplay; encrypted-media"
                    />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300 pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#111] fill-current ml-0.5"><polygon points="5,3 19,12 5,21"/></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. OTHER AI SERVICES SECTION (KINETIC STREAM) */}
      <section className="w-full bg-white text-[#111] py-20 w769:py-14 select-none border-t border-[#ebebeb]">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          <h2 className="font-sans text-[34px] w769:text-[26px] mb-10">
            <strong className="font-bold">Other</strong>{" "}
            <span className="font-normal">AI Services</span>
          </h2>

          <div className="grid grid-cols-[7fr_5fr] w992:grid-cols-1 gap-14 w992:gap-8 items-center">
            {/* Left Kinetic Stream */}
            <div className="flex flex-col divide-y divide-[#e5e5e5]">
              {otherAiServices.map((srv, idx) => {
                const isActive = activeKineticIndex === idx;
                return (
                  <Link
                    key={srv.slug}
                    href={`/our-expertise/ai-excellence/${srv.slug}`}
                    onMouseEnter={() => setActiveKineticIndex(idx)}
                    className={`group relative py-6 px-1 flex items-center justify-between transition-all duration-300 cursor-pointer ${
                      isActive ? "translate-x-2" : "hover:translate-x-1"
                    }`}
                  >
                    <h3
                      className={`font-sans text-[26px] w1281:text-[22px] w769:text-[18px] font-bold tracking-[0.3px] transition-all duration-300 ${
                        isActive ? "text-[#e77809]" : "text-[#111111] group-hover:text-[#e77809]"
                      }`}
                    >
                      {srv.title}
                    </h3>
                    <div
                      className={`shrink-0 transition-all duration-300 ${
                        isActive ? "text-[#e77809]" : "text-[#aaa] group-hover:text-[#e77809]"
                      }`}
                    >
                      {srv.icon}
                    </div>
                    {/* bottom line */}
                    <div
                      className={`absolute bottom-0 left-0 h-[2px] bg-[#e77809] transition-all duration-400 ${
                        isActive ? "w-full" : "w-0 group-hover:w-1/3"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Right Spotlight Preview Card */}
            <aside className="w992:hidden flex items-center justify-center">
              <div className="relative w-full max-w-[400px] aspect-[4/3] rounded-[14px] overflow-hidden border border-[#e5e5e5] shadow-[0_16px_40px_rgba(0,0,0,0.10)] bg-[#f5f5f5] transition-all duration-500">
                <Image
                  src={getAssetPath(otherAiServices[activeKineticIndex]?.image)}
                  alt={otherAiServices[activeKineticIndex]?.title || "AI Service"}
                  fill
                  sizes="400px"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-5 right-5 z-10">
                  <span className="font-sans text-[17px] font-bold text-white drop-shadow">
                    {otherAiServices[activeKineticIndex]?.title}
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 8. CTA SECTION (light card) */}
      <section className="w-full bg-[#f7f7f7] py-16 w769:py-12 select-none border-y border-[#e5e5e5]">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          <div className="max-w-[720px]">
            <h2 className="font-sans text-[36px] w769:text-[24px] font-bold text-[#111111] leading-tight mb-4">
              Have an idea that feels <br className="hidden w769:inline" /> impossible to shoot?
            </h2>
            <p className="font-libre text-[16px] w769:text-[14px] text-[#555555] leading-[1.7] mb-6 max-w-[640px]">
              Just sharper ideas, faster experimentation, smarter production and more ways to bring great creative to life. Tell us what you want to create. We&apos;ll explore how far we can take it.
            </p>
            <button
              type="button"
              onClick={scrollToContact}
              className="px-8 py-3 rounded-full border border-[#16110f] bg-transparent text-[#16110f] hover:bg-[#16110f] hover:text-white font-libre text-[12px] font-semibold tracking-[1.5px] uppercase transition-all duration-300 cursor-pointer"
            >
              LET&apos;S MAKE IT
            </button>
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION SECTION */}
      <section className="w-full bg-white py-20 w769:py-14 select-none">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          <h2 className="font-sans text-[34px] w769:text-[24px] font-bold text-[#111111] mb-12 w769:mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-2 w992:grid-cols-1 gap-x-16 w992:gap-x-0 gap-y-0">
            {faqColumns.map((col, ci) => (
              <div key={ci} className="flex flex-col">
                {col.map((item, idx) => (
                  <FaqItem key={idx} q={item.q} a={item.a} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. BEYOND AI CAROUSEL */}
      <BeyondServicesCarousel currentCategory="ai-excellence" titleHighlight="AI" />

      {/* 11. CONTACT SECTION */}
      <div id="say_hello">
        <ContactSection />
      </div>

      {/* 12. FULLSCREEN VIDEO MODAL */}
      {activeModalVideoId && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              aria-label="Close Video Modal"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg backdrop-blur-sm"
            >
              <LuX className="w-6 h-6" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${activeModalVideoId}?autoplay=1&rel=0&modestbranding=1&cc_load_policy=0&iv_load_policy=3`}
              title="YouTube Video Player"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </main>
  );
}
