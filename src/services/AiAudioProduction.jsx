"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAssetPath } from "../utils/assetPath";
import ContactSection from "../app/components/common/ContactSection";
import BeyondServicesCarousel from "../app/components/common/BeyondServicesCarousel";
import {
  LuTarget,
  LuMic,
  LuSparkles,
  LuMusic,
  LuSlidersHorizontal,
  LuLanguages,
  LuArrowRight,
  LuX,
  LuVideo,
  LuWand,
  LuUserCheck,
  LuBox
} from "react-icons/lu";

// What We Create Editorial Items for AI Audio
const whatWeCreateItems = [
  {
    title: "AI-Assisted Voiceovers",
    desc: "Create voice tracks across different tones, styles and content formats.",
  },
  {
    title: "Multilingual Voice Production",
    desc: "Take communication into multiple languages while maintaining the intent and tone of the original.",
  },
  {
    title: "Video Localisation",
    desc: "Create market-specific audio versions for films, explainers, social videos and campaign content.",
  },
  {
    title: "Sound Design",
    desc: "Build atmosphere, transitions, effects and sonic details that add depth to the creative.",
  },
  {
    title: "Music & Audio Beds",
    desc: "Develop audio directions that help establish pace, mood and energy.",
  },
  {
    title: "Audio Adaptations at Scale",
    desc: "Create multiple lengths, languages and versions without rebuilding every execution from the beginning.",
  },
];

// 6 Pipeline Stages for AI Audio
const pipelineStages = [
  {
    title: "Understand the Communication",
    icon: LuTarget,
    desc: "Define audience, context, platform, language and desired emotional response.",
  },
  {
    title: "Set the Voice",
    icon: LuMic,
    desc: "Establish tone, pace, personality and delivery style.",
  },
  {
    title: "Generate & Direct",
    icon: LuSparkles,
    desc: "Explore voice and audio options while directing the output around the creative intent.",
  },
  {
    title: "Design the Sound",
    icon: LuMusic,
    desc: "Add music, effects, ambience and sonic layers where required.",
  },
  {
    title: "Review & Refine",
    icon: LuSlidersHorizontal,
    desc: "Fine-tune pronunciation, pacing, emphasis, timing and overall audio balance.",
  },
  {
    title: "Localise & Adapt",
    icon: LuLanguages,
    desc: "Create additional languages, durations, markets and platform-ready versions.",
  },
];

// Recent Work - Batch 1 (Initial 6 items)
const batch1Items = [
  {
    id: "Dn_YOj54S9E",
    image: "/img/ai-audio-production/perry_jaggery_video_thumb.webp",
    alt: "AI Voice & Audio Sync",
    type: "standard",
  },
  {
    id: "dGr1lpk7pFg",
    image: "/img/ai-audio-production/ai_service_video.webp",
    alt: "AI Audio Scoring",
    type: "standard",
  },
  {
    id: "aRgCXB6ZPKw",
    image: "/img/ai-audio-production/ai_service_video.webp",
    alt: "AI Multilingual Voiceover",
    type: "standard",
  },
  {
    id: "o57QX6bj5ls",
    image: "/img/ai-audio-production/ai_service_video.webp",
    alt: "AI Cinematic Sound Design",
    type: "standard",
  },
  {
    id: "1hlV4XszayY",
    image: "/img/ai-audio-production/cravana_video_thumb.webp",
    alt: "AI Vocal Composition",
    type: "featured",
  },
  {
    id: "5zcvwykCgIo",
    image: "/img/ai-audio-production/ai_service_video1.webp",
    alt: "AI Audio Commercial",
    type: "standard",
  },
];

// Recent Work - Batch 2 (Load More - 6 items)
const batch2Items = [
  {
    id: "ntxu2XgUi8A",
    image: "/img/ai-audio-production/ai_service_video.webp",
    alt: "AI Multilingual Audio",
    type: "featured",
  },
  {
    id: "77yajMApoDs",
    image: "/img/ai-audio-production/ai_service_video1.webp",
    alt: "AI Sonic Branding",
    type: "standard",
  },
  {
    id: "WSKlX-shAwQ",
    image: "/img/ai-audio-production/ai_service_video.webp",
    alt: "AI Audio Dubbing",
    type: "standard",
  },
  {
    id: "1hfWhCjRHKg",
    image: "/img/ai-audio-production/ai_service_video.webp",
    alt: "AI Voice & Dialogue",
    type: "standard",
  },
  {
    id: "7QEC-KCNFQM",
    image: "/img/ai-audio-production/ai_service_video.webp",
    alt: "AI Foley & Atmosphere",
    type: "standard",
  },
  {
    id: "csJ2qEm6YWk",
    image: "/img/ai-audio-production/ai_service_video.webp",
    alt: "AI Studio Mastering",
    type: "standard",
  },
];

// Other AI Services (Kinetic stream)
const otherAiServices = [
  {
    title: "Generative AI",
    slug: "generative-ai",
    icon: LuWand,
    image: "/img/ai-audio-production/ai_service_generative.jpg",
  },
  {
    title: "AI Character Development",
    slug: "ai-character-development",
    icon: LuUserCheck,
    image: "/img/ai-audio-production/ai_service_character.jpg",
  },
  {
    title: "AI Product Visualisation",
    slug: "ai-product-visualisation",
    icon: LuBox,
    image: "/img/ai-audio-production/ai_service_product.jpg",
  },
  {
    title: "AI Video Production",
    slug: "ai-video-production",
    icon: LuVideo,
    image: "/img/ai-audio-production/ai_service_video.jpg",
  },
];

export default function AiAudioProduction() {
  const [hoveredVideoId, setHoveredVideoId] = useState(null);
  const debounceTimerRef = useRef(null);
  const [activeModalVideoId, setActiveModalVideoId] = useState(null);
  const [showBatch2, setShowBatch2] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
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
      if (e.key === "Escape") {
        handleCloseModal();
      }
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

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setShowBatch2(true);
      setIsLoadingMore(false);
    }, 350);
  };

  return (
    <main className="flex-grow flex flex-col w-full font-sans bg-white text-[#16110f] overflow-x-hidden">
      {/* 1. HERO BANNER */}
      <section
        className="w-full min-h-[560px] w769:min-h-[440px] bg-cover bg-center flex items-center py-20 select-none bg-black relative"
        style={{ backgroundImage: `url('${getAssetPath("/img/ai-excellence/ai-excellence-bg.webp")}')` }}
      >
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto relative z-10">
          <div className="max-w-[850px] text-left">
            <h1 className="font-sans text-[42px] w1470:text-[40px] w1281:text-[34px] w769:text-[26px] text-white font-bold uppercase tracking-[2px] leading-tight mb-3">
              AI Audio Production
            </h1>
            <h2 className="font-libre text-[26px] w769:text-[20px] font-semibold text-[#ff9000] tracking-[0.5px] mb-4">
              Give every idea the right voice.
            </h2>
            <p className="font-libre text-[20px] w769:text-[15px] text-white leading-[1.5] mb-8 font-normal max-w-[700px]">
              From voiceovers and localisation to sound design and audio adaptations, we use AI-assisted production to help brands create more audio possibilities, faster.
            </p>
            <button
              type="button"
              onClick={scrollToContact}
              className="px-8 py-3 rounded-full border border-white text-white hover:bg-[#ff9000] hover:border-[#ff9000] font-libre text-[12px] font-semibold tracking-[1.5px] uppercase transition-all duration-300 cursor-pointer"
            >
              Start An Audio Project
            </button>
          </div>
        </div>
      </section>

      {/* 2. BREADCRUMBS */}
      <div className="w-full bg-white py-6 select-none">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto font-libre font-bold text-[14px] text-[#000] tracking-[1.5px] flex items-center gap-1 flex-wrap">
          <Link href="/what-we-brew" className="hover:text-[#ff9000] transition-colors">
            Our Expertise
          </Link>
          <Image
            src={getAssetPath("/img/right_arrow_new.webp")}
            alt="arrow"
            width={10}
            height={10}
            className="w-[10px] h-[10px] object-contain select-none pointer-events-none mx-1 shrink-0"
          />
          <Link href="/our-expertise/ai-excellence" className="hover:text-[#ff9000] transition-colors">
            AI Excellence
          </Link>
          <Image
            src={getAssetPath("/img/right_arrow_new.webp")}
            alt="arrow"
            width={10}
            height={10}
            className="w-[10px] h-[10px] object-contain select-none pointer-events-none mx-1 shrink-0"
          />
          <span className="text-[#ff9000] font-medium">AI Audio Production</span>
        </div>
      </div>

      {/* 3. INTRO STATEMENT / SERVICE BIO */}
      <section className="w-full bg-white pb-16 select-none">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto px-4 flex flex-col text-center">
          <h2 className="font-sans text-[36px] w769:text-[28px] text-[#16110f] tracking-normal mb-8 select-none">
            <span className="block font-medium">
              Sound changes how an idea feels.
            </span>
          </h2>
          <div className="font-libre text-center mx-auto text-[#000] text-[16px] w769:text-[14px] leading-[1.8] flex flex-col gap-6 select-none max-w-[950px]">
            <p className="font-light text-[#16110f] text-[16px] w769:text-[16px] leading-[1.6]">
              The right visual can get attention.
            </p>
            <p className="font-light text-[#16110f] text-[16px] w769:text-[16px] leading-[1.6]">
              The right voice, music and sound can make it stay.
            </p>
            <p className="font-light text-[#16110f] text-[16px] w769:text-[16px] leading-[1.6]">
              We combine AI-assisted audio production with human creative direction to develop audio that supports the story, fits the brand and works across audiences and markets.
            </p>
          </div>
        </div>
      </section>

      {/* 4. WHAT WE CREATE SECTION (EDITORIAL SPLIT SHOWCASE) */}
      <section className="w-full bg-[#0b0a0f] py-24 w769:py-16 select-none border-t border-white/5">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          <div className="flex flex-row w992:flex-col justify-between items-start gap-16 w992:gap-10">
            {/* Left Sticky Sidebar */}
            <div className="w-[30%] w992:w-full lg:sticky lg:top-28 shrink-0">
              <h2 className="font-sans text-[46px] w1281:text-[38px] w769:text-[30px] font-bold text-white uppercase tracking-[2px] leading-[1.15] mb-6">
                <span className="text-[#ff9000]">WHAT WE</span> <br />
                CREATE
              </h2>
              <div className="relative w-full max-w-[290px] aspect-[4/3] rounded-[14px] overflow-hidden border border-white/10 shadow-[0_16px_36px_-10px_rgba(0,0,0,0.7),0_0_20px_rgba(255,144,0,0.12)] bg-[#111018] group">
                <Image
                  src={getAssetPath("/img/ai-audio-production/ai_service_voice.jpg")}
                  alt="AI Audio Production"
                  fill
                  sizes="290px"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a0f]/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Right Editorial Grid */}
            <div className="w-[66%] w992:w-full grid grid-cols-2 w769:grid-cols-1 gap-x-12 gap-y-12 w769:gap-y-8">
              {whatWeCreateItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col text-left transition-transform duration-300 hover:-translate-y-1 group"
                >
                  <h3 className="font-sans text-[22px] w769:text-[19px] font-bold text-[#ff9000] group-hover:text-white tracking-[0.5px] mb-3 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="font-libre text-[15px] w769:text-[14px] leading-[1.65] text-[#dfdfe2]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROCESS PIPELINE SECTION ("From script to sound.") */}
      <section className="w-full py-20 w769:py-14 bg-[#f8f9fb] bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] select-none border-y border-neutral-200/60">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          <div className="text-center max-w-[820px] mx-auto mb-14 w769:mb-8">
            <h2 className="font-sans text-[42px] w1281:text-[36px] w769:text-[25px] font-bold text-[#111111] leading-[1.25] mb-4">
              From script to sound.
            </h2>
            <p className="font-libre text-[17px] w769:text-[14px] text-[#555555] font-medium leading-[1.6]">
              A streamlined 6-stage auditory pipeline delivering broadcast-ready acoustic excellence.
            </p>
          </div>

          <div className="grid grid-cols-3 w1281:grid-cols-2 w769:grid-cols-1 gap-6 w769:gap-3.5">
            {pipelineStages.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-[#ffd39b] hover:border-[#ff9000] rounded-[16px] p-7 w769:p-5 flex flex-col justify-start transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_14px_30px_rgba(0,0,0,0.08),0_0_20px_rgba(255,144,0,0.12)] group"
                >
                  <div className="flex items-center justify-between mb-3 w769:flex-col-reverse w769:items-start w769:gap-2">
                    <h3 className="font-sans text-[21px] w769:text-[18px] font-bold text-[#111111] tracking-[0.5px] leading-snug">
                      {stage.title}
                    </h3>
                    <div className="w-[38px] h-[38px] w769:w-[44px] w769:h-[44px] rounded-[10px] bg-[#ff9000] text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="font-libre text-[16px] w769:text-[13.5px] text-[#373737] leading-[26px] w769:leading-[20px]">
                    {stage.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. AI CREATIVE DIRECTION MANIFESTO & CTA SECTION */}
      <section
        className="w-full py-16 w769:py-12 bg-[#08080a] bg-cover bg-center select-none relative border-y border-white/10"
        style={{
          backgroundImage: `linear-gradient(rgba(8, 8, 10, 0.88), rgba(8, 8, 10, 0.93)), url('${getAssetPath(
            "/img/ai-audio-production/ai_service_voice.jpg"
          )}')`,
        }}
      >
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          <div className="grid grid-cols-[1.1fr_1fr] w992:grid-cols-1 gap-14 w992:gap-8 items-center text-left">
            {/* Left Headings */}
            <div>
              <h2 className="font-sans text-[38px] w1281:text-[32px] w769:text-[26px] font-bold text-white tracking-[1.5px] uppercase leading-[1.15] mb-2.5">
                AI can synthesize audio.
              </h2>
              <h3 className="font-sans text-[26px] w1281:text-[22px] w769:text-[19px] font-bold text-[#ff9000] tracking-[1px] uppercase leading-[1.25] mb-5">
                Emotion makes it resonate.
              </h3>
              <div className="w-[50px] h-[3px] bg-[#ff9000] rounded-[3px] shadow-[0_0_10px_rgba(255,144,0,0.5)]" />
            </div>

            {/* Right Copy & CTA */}
            <div>
              <div className="mb-6">
                <p className="font-libre text-[19px] w769:text-[16px] font-semibold text-white leading-[1.45] mb-2.5">
                  A message can be technically correct and still feel completely wrong.
                </p>
                <p className="font-libre text-[15px] w769:text-[14px] text-[#dfdfe2] leading-[1.65]">
                  We look beyond words to tone, rhythm, pronunciation, pacing and context - so adaptations retain the intent of the original communication rather than simply reproducing it in another language.
                </p>
              </div>
              <button
                type="button"
                onClick={scrollToContact}
                className="px-8 py-3 rounded-full border border-white text-white hover:bg-[#ff9000] hover:border-[#ff9000] font-libre text-[13px] font-semibold tracking-[1.5px] uppercase transition-all duration-300 cursor-pointer"
              >
                START A PROJECT
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. RECENT WORK SECTION (INTERACTIVE MOSAIC AUDIO/VIDEO GALLERY) */}
      <section className="w-full py-20 w769:py-12 bg-white select-none relative">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          <h2 className="font-sans text-[42px] w1281:text-[36px] w769:text-[28px] font-bold text-[#16110f] uppercase tracking-[2px] text-center mb-12 w769:mb-8">
            <span className="font-light mr-2">Recent</span>
            <span>Work</span>
          </h2>

          {/* Batch 1 Mosaic Grid: Left 2x2 + Right (1 Featured + 1 Standard) */}
          <div className="grid grid-cols-[2fr_1fr] w992:grid-cols-1 gap-5 w992:gap-4 h-[680px] w1281:h-[540px] w992:h-auto">
            {/* Left Block (2x2 grid) */}
            <div className="grid grid-cols-2 grid-rows-2 w501:grid-cols-1 w501:grid-rows-none gap-5 w992:gap-4 h-full">
              {batch1Items.slice(0, 4).map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleOpenModal(item.id)}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                  className="relative rounded-[14px] overflow-hidden bg-[#11141b] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full min-h-[200px] w501:h-[200px] group border border-transparent hover:border-[#ff9000]/60"
                >
                  <Image
                    src={getAssetPath(item.image)}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105 select-none pointer-events-none"
                  />

                  {/* Hover Silent Video Preview */}
                  {hoveredVideoId === item.id && (
                    <div className="absolute inset-0 z-10 overflow-hidden bg-black transition-opacity duration-300 opacity-100 pointer-events-none">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${item.id}?autoplay=1&mute=1&controls=0&playsinline=1&showinfo=0&rel=0&disablekb=1&modestbranding=1&fs=0`}
                        title="Audio Preview"
                        className="absolute top-1/2 left-1/2 w-[320%] h-[140%] -translate-x-1/2 -translate-y-1/2 border-0 pointer-events-none"
                        allow="autoplay; encrypted-media"
                      />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/10 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
                </div>
              ))}
            </div>

            {/* Right Block (1 Featured Top + 1 Standard Bottom) */}
            <div className="flex flex-col w992:grid w992:grid-cols-2 w501:flex w501:flex-col gap-5 w992:gap-4 h-full">
              {/* Featured Top */}
              <div
                onClick={() => handleOpenModal(batch1Items[4].id)}
                onMouseEnter={() => handleMouseEnter(batch1Items[4].id)}
                onMouseLeave={handleMouseLeave}
                className="relative rounded-[14px] overflow-hidden bg-[#11141b] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex-[2] w992:flex-none h-full min-h-[220px] w992:h-[200px] group border border-transparent hover:border-[#ff9000]/60"
              >
                <Image
                  src={getAssetPath(batch1Items[4].image)}
                  alt={batch1Items[4].alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105 select-none pointer-events-none"
                />

                {hoveredVideoId === batch1Items[4].id && (
                  <div className="absolute inset-0 z-10 overflow-hidden bg-black transition-opacity duration-300 opacity-100 pointer-events-none">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${batch1Items[4].id}?autoplay=1&mute=1&controls=0&playsinline=1&showinfo=0&rel=0&disablekb=1&modestbranding=1&fs=0`}
                      title="Featured Audio Preview"
                      className="absolute top-1/2 left-1/2 w-[200%] h-[140%] -translate-x-1/2 -translate-y-1/2 border-0 pointer-events-none"
                      allow="autoplay; encrypted-media"
                    />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/10 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* Standard Bottom */}
              <div
                onClick={() => handleOpenModal(batch1Items[5].id)}
                onMouseEnter={() => handleMouseEnter(batch1Items[5].id)}
                onMouseLeave={handleMouseLeave}
                className="relative rounded-[14px] overflow-hidden bg-[#11141b] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex-[1] w992:flex-none h-full min-h-[180px] w992:h-[200px] group border border-transparent hover:border-[#ff9000]/60"
              >
                <Image
                  src={getAssetPath(batch1Items[5].image)}
                  alt={batch1Items[5].alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105 select-none pointer-events-none"
                />

                {hoveredVideoId === batch1Items[5].id && (
                  <div className="absolute inset-0 z-10 overflow-hidden bg-black transition-opacity duration-300 opacity-100 pointer-events-none">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${batch1Items[5].id}?autoplay=1&mute=1&controls=0&playsinline=1&showinfo=0&rel=0&disablekb=1&modestbranding=1&fs=0`}
                      title="Audio Preview"
                      className="absolute top-1/2 left-1/2 w-[320%] h-[140%] -translate-x-1/2 -translate-y-1/2 border-0 pointer-events-none"
                      allow="autoplay; encrypted-media"
                    />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/10 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Batch 2 (Flipped Grid Layout: Left 1 Featured + 1 Standard, Right 2x2) */}
          {showBatch2 && (
            <div className="grid grid-cols-[1fr_2fr] w992:grid-cols-1 gap-5 w992:gap-4 h-[680px] w1281:h-[540px] w992:h-auto mt-5 animate-fadeIn">
              {/* Left Block (1 Featured + 1 Standard) */}
              <div className="flex flex-col w992:grid w992:grid-cols-2 w501:flex w501:flex-col gap-5 w992:gap-4 h-full">
                <div
                  onClick={() => handleOpenModal(batch2Items[0].id)}
                  onMouseEnter={() => handleMouseEnter(batch2Items[0].id)}
                  onMouseLeave={handleMouseLeave}
                  className="relative rounded-[14px] overflow-hidden bg-[#11141b] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex-[2] w992:flex-none h-full min-h-[220px] w992:h-[200px] group border border-transparent hover:border-[#ff9000]/60"
                >
                  <Image
                    src={getAssetPath(batch2Items[0].image)}
                    alt={batch2Items[0].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105 select-none pointer-events-none"
                  />

                  {hoveredVideoId === batch2Items[0].id && (
                    <div className="absolute inset-0 z-10 overflow-hidden bg-black transition-opacity duration-300 opacity-100 pointer-events-none">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${batch2Items[0].id}?autoplay=1&mute=1&controls=0&playsinline=1&showinfo=0&rel=0&disablekb=1&modestbranding=1&fs=0`}
                        title="Featured Audio Preview"
                        className="absolute top-1/2 left-1/2 w-[200%] h-[140%] -translate-x-1/2 -translate-y-1/2 border-0 pointer-events-none"
                        allow="autoplay; encrypted-media"
                      />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/10 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
                </div>

                <div
                  onClick={() => handleOpenModal(batch2Items[1].id)}
                  onMouseEnter={() => handleMouseEnter(batch2Items[1].id)}
                  onMouseLeave={handleMouseLeave}
                  className="relative rounded-[14px] overflow-hidden bg-[#11141b] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex-[1] w992:flex-none h-full min-h-[180px] w992:h-[200px] group border border-transparent hover:border-[#ff9000]/60"
                >
                  <Image
                    src={getAssetPath(batch2Items[1].image)}
                    alt={batch2Items[1].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105 select-none pointer-events-none"
                  />

                  {hoveredVideoId === batch2Items[1].id && (
                    <div className="absolute inset-0 z-10 overflow-hidden bg-black transition-opacity duration-300 opacity-100 pointer-events-none">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${batch2Items[1].id}?autoplay=1&mute=1&controls=0&playsinline=1&showinfo=0&rel=0&disablekb=1&modestbranding=1&fs=0`}
                        title="Audio Preview"
                        className="absolute top-1/2 left-1/2 w-[320%] h-[140%] -translate-x-1/2 -translate-y-1/2 border-0 pointer-events-none"
                        allow="autoplay; encrypted-media"
                      />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/10 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
                </div>
              </div>

              {/* Right Block (2x2 grid) */}
              <div className="grid grid-cols-2 grid-rows-2 w501:grid-cols-1 w501:grid-rows-none gap-5 w992:gap-4 h-full">
                {batch2Items.slice(2, 6).map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleOpenModal(item.id)}
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                    className="relative rounded-[14px] overflow-hidden bg-[#11141b] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full min-h-[200px] w501:h-[200px] group border border-transparent hover:border-[#ff9000]/60"
                  >
                    <Image
                      src={getAssetPath(item.image)}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105 select-none pointer-events-none"
                    />

                    {hoveredVideoId === item.id && (
                      <div className="absolute inset-0 z-10 overflow-hidden bg-black transition-opacity duration-300 opacity-100 pointer-events-none">
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${item.id}?autoplay=1&mute=1&controls=0&playsinline=1&showinfo=0&rel=0&disablekb=1&modestbranding=1&fs=0`}
                          title="Audio Preview"
                          className="absolute top-1/2 left-1/2 w-[320%] h-[140%] -translate-x-1/2 -translate-y-1/2 border-0 pointer-events-none"
                          allow="autoplay; encrypted-media"
                        />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/10 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Load More Button */}
          {!showBatch2 && (
            <div className="text-center mt-12 w769:mt-8">
              <button
                type="button"
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="inline-flex items-center justify-center gap-2.5 px-10 py-3.5 rounded-full bg-[#16110f] hover:bg-white text-white hover:text-[#16110f] border-2 border-[#16110f] font-sans font-bold text-[13px] tracking-[2px] uppercase transition-all duration-300 shadow-md hover:-translate-y-0.5 cursor-pointer disabled:opacity-60"
              >
                {isLoadingMore ? (
                  <>
                    <span>Loading...</span>
                    <span className="inline-block w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
                  </>
                ) : (
                  <span>Load More Work</span>
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 8. OTHER AI SERVICES SECTION (KINETIC STREAM) */}
      <section className="w-full bg-[#080808] text-[#f5f5f5] py-20 w769:py-14 select-none relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-[5%] right-[15%] w-[550px] h-[550px] rounded-full bg-[#f59e0b]/10 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[5%] w-[450px] h-[450px] rounded-full bg-[#f59e0b]/5 blur-[130px] pointer-events-none" />

        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto relative z-10">
          <h2 className="font-sans text-[36px] w769:text-[28px] font-normal text-[#e77809] uppercase tracking-[2px] text-center mb-10">
            <strong className="font-bold text-white mr-2">Other</strong>
            <span>AI Services</span>
          </h2>

          <div className="grid grid-cols-[7fr_5fr] w992:grid-cols-1 gap-14 w992:gap-10 items-center">
            {/* Left Stream List */}
            <div className="flex flex-col divide-y divide-white/10">
              {otherAiServices.map((srv, idx) => {
                const Icon = srv.icon;
                const isActive = activeKineticIndex === idx;
                return (
                  <Link
                    key={srv.slug}
                    href={`/our-expertise/ai-excellence/${srv.slug}`}
                    onMouseEnter={() => setActiveKineticIndex(idx)}
                    className={`group relative py-7 px-2 flex items-center justify-between transition-all duration-300 cursor-pointer ${
                      isActive ? "translate-x-3 text-[#ff9000]" : "hover:translate-x-2 text-white"
                    }`}
                  >
                    <div className="flex items-center gap-6">
                      <h3
                        className={`font-sans text-[28px] w1281:text-[24px] w769:text-[20px] font-bold tracking-[0.5px] transition-all duration-300 ${
                          isActive
                            ? "text-[#e77809] drop-shadow-[0_0_35px_rgba(245,158,11,0.45)]"
                            : "text-white group-hover:text-[#e77809]"
                        }`}
                      >
                        {srv.title}
                      </h3>
                    </div>

                    <div
                      className={`w-[52px] h-[52px] rounded-xl flex items-center justify-center transition-all duration-300 shrink-0 ${
                        isActive
                          ? "text-[#e77809] scale-110"
                          : "text-neutral-500 group-hover:text-[#e77809] group-hover:scale-105"
                      }`}
                    >
                      <Icon className="w-8 h-8" />
                    </div>

                    {/* Glowing bottom line */}
                    <div
                      className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#ff9000] via-white/20 to-transparent transition-all duration-500 ${
                        isActive ? "w-full" : "w-0 group-hover:w-1/2"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Right Spotlight Preview Card */}
            <aside className="w992:hidden flex items-center justify-center">
              <div className="relative w-full max-w-[420px] aspect-[4/3] rounded-[16px] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(255,144,0,0.15)] bg-[#111] transition-all duration-500">
                <Image
                  src={getAssetPath(otherAiServices[activeKineticIndex]?.image)}
                  alt={otherAiServices[activeKineticIndex]?.title || "AI Service"}
                  fill
                  sizes="420px"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-5 right-5 z-10">
                  <span className="font-sans text-[18px] font-bold text-white drop-shadow">
                    {otherAiServices[activeKineticIndex]?.title}
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 9. AI AUDIO PRODUCTION CTA SECTION (LIGHT THEME) */}
      <section className="w-full bg-[#f7f7f8] py-14 select-none border-y border-[#ebebeb]">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          <div className="max-w-[750px] text-left">
            <h2 className="font-sans text-[36px] w769:text-[26px] font-bold text-[#16110f] leading-tight mb-3">
              More voices. More markets.
            </h2>
            <p className="font-libre text-[16px] w769:text-[14px] text-[#4a4a4a] leading-[25px] mb-5 max-w-[650px]">
              Let&apos;s make your creative heard.
            </p>
            <button
              type="button"
              onClick={scrollToContact}
              className="px-8 py-3 rounded-full border border-[#16110f] bg-transparent text-[#16110f] hover:bg-[#ff9000] hover:border-[#ff9000] hover:text-white font-libre text-[12px] font-semibold tracking-[1.5px] uppercase transition-all duration-300 cursor-pointer"
            >
              LET&apos;S TALK AUDIO
            </button>
          </div>
        </div>
      </section>

      {/* 10. BEYOND AI CAROUSEL */}
      <BeyondServicesCarousel currentCategory="ai-excellence" titleHighlight="AI" />

      {/* 11. CONTACT SECTION */}
      <div id="say_hello">
        <ContactSection />
      </div>

      {/* 12. FULLSCREEN INTERACTIVE VIDEO/AUDIO MODAL */}
      {activeModalVideoId && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              aria-label="Close Video Modal"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg backdrop-blur-sm"
            >
              <LuX className="w-6 h-6" />
            </button>

            {/* Video Player */}
            <iframe
              src={`https://www.youtube.com/embed/${activeModalVideoId}?autoplay=1&rel=0&modestbranding=1&cc_load_policy=0&iv_load_policy=3&cc_lang_pref=off`}
              title="YouTube Audio Player"
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
