"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAssetPath } from "../utils/assetPath";
import ContactSection from "../app/components/common/ContactSection";
import BeyondServicesCarousel from "../app/components/common/BeyondServicesCarousel";
import {
  LuPalette,
  LuSparkles,
  LuMaximize2,
  LuArrowRight,
  LuX,
  LuChevronLeft,
  LuChevronRight,
  LuVideo,
  LuMic,
  LuUserCheck,
  LuBox,
  LuCompass,
  LuWrench,
  LuTarget
} from "react-icons/lu";

// What We Create Editorial Items
const whatWeCreateItems = [
  {
    title: "Campaign Visuals",
    desc: "Build distinctive campaign imagery around a central communication idea.",
  },
  {
    title: "Key Visuals",
    desc: "Create high-impact hero visuals that can become the foundation of wider campaigns.",
  },
  {
    title: "Concept Visualisation",
    desc: "See ideas before producing them - from creative pitches and treatments to visual experimentation.",
  },
  {
    title: "Branded Content",
    desc: "Create social, digital and content assets while maintaining a recognisable visual language.",
  },
  {
    title: "Impossible Worlds",
    desc: "Take products, people and stories into environments that would be difficult, expensive or impossible to create conventionally.",
  },
  {
    title: "Content Variations",
    desc: "Extend one visual direction into multiple compositions, formats, audiences and platform requirements.",
  },
];

// 6 Pipeline Stages
const pipelineStages = [
  {
    title: "Define",
    icon: LuTarget,
    desc: "Start with the communication objective, audience and role the creative needs to play.",
  },
  {
    title: "Art Direct",
    icon: LuPalette,
    desc: "Establish the visual language, mood, composition, style and creative references.",
  },
  {
    title: "Build",
    icon: LuWrench,
    desc: "Develop structured AI workflows around the chosen creative direction.",
  },
  {
    title: "Explore",
    icon: LuCompass,
    desc: "Generate possibilities and push the idea across different visual interpretations.",
  },
  {
    title: "Curate & Refine",
    icon: LuSparkles,
    desc: "Select, correct and polish the strongest outputs until they feel intentional and brand-ready.",
  },
  {
    title: "Scale",
    icon: LuMaximize2,
    desc: "Extend approved directions across campaigns, formats, platforms and content requirements.",
  },
];

// Recent Work - Batch 1 (Initial 6 items)
const batch1Items = [
  {
    id: "gen-1",
    image: "/img/generative-ai/ai_service_generative.jpg",
    alt: "Generative AI Artistry",
    category: "Visual Synthesis",
    type: "standard",
  },
  {
    id: "gen-2",
    image: "/img/generative-ai/ai_case_fashion.jpg",
    alt: "Generative Fashion Concepts",
    category: "Haute Couture AI",
    type: "standard",
  },
  {
    id: "gen-3",
    image: "/img/generative-ai/ai_case_character.jpg",
    alt: "Generative Character Art",
    category: "Persona Creation",
    type: "standard",
  },
  {
    id: "gen-4",
    image: "/img/generative-ai/ai_case_product.jpg",
    alt: "Generative Creative Suite",
    category: "Brand Architecture",
    type: "standard",
  },
  {
    id: "gen-5",
    image: "/img/generative-ai/ai_service_image.jpg",
    alt: "Generative Visual World",
    category: "Campaign Worlds",
    type: "featured",
  },
  {
    id: "gen-6",
    image: "/img/generative-ai/ai_case_localization.jpg",
    alt: "Generative Campaign Imagery",
    category: "Multimodal Systems",
    type: "standard",
  },
];

// Recent Work - Batch 2 (Load More - 6 items)
const batch2Items = [
  {
    id: "gen-7",
    image: "/img/generative-ai/ai_cta_impossible_shoot.jpg",
    alt: "Generative Surreal Worlds",
    category: "Impossible Shoots",
    type: "featured",
  },
  {
    id: "gen-8",
    image: "/img/generative-ai/ai_service_motion.jpg",
    alt: "Generative Motion Art",
    category: "Motion Diffusion",
    type: "standard",
  },
  {
    id: "gen-9",
    image: "/img/generative-ai/ai_service_product.jpg",
    alt: "Generative Product Staging",
    category: "Product Imagery",
    type: "standard",
  },
  {
    id: "gen-10",
    image: "/img/generative-ai/ai_service_character.jpg",
    alt: "Generative Digital Personas",
    category: "Character Design",
    type: "standard",
  },
  {
    id: "gen-11",
    image: "/img/generative-ai/ai_service_voice.jpg",
    alt: "Generative Multi-Modal AI",
    category: "Audio-Visual Systems",
    type: "standard",
  },
  {
    id: "gen-12",
    image: "/img/generative-ai/ai_case_fashion.jpg",
    alt: "Generative Editorial Suite",
    category: "High Fashion",
    type: "standard",
  },
];

// Other AI Services (Kinetic stream)
const otherAiServices = [
  {
    title: "AI Video Production",
    slug: "ai-video-production",
    icon: LuVideo,
    image: "/img/generative-ai/ai_service_video.jpg",
  },
  {
    title: "AI Character Development",
    slug: "ai-character-development",
    icon: LuUserCheck,
    image: "/img/generative-ai/ai_service_character.jpg",
  },
  {
    title: "AI Product Visualisation",
    slug: "ai-product-visualisation",
    icon: LuBox,
    image: "/img/generative-ai/ai_service_product.jpg",
  },
  {
    title: "AI Audio Production",
    slug: "ai-audio-production",
    icon: LuMic,
    image: "/img/generative-ai/ai_service_voice.jpg",
  },
];

export default function GenerativeAi() {
  // Mosaic load more state
  const [showBatch2, setShowBatch2] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Active kinetic stream index
  const [activeKineticIndex, setActiveKineticIndex] = useState(0);

  // Image Lightbox Modal state
  const [activeLightboxImage, setActiveLightboxImage] = useState(null);
  const allGalleryItems = showBatch2 ? [...batch1Items, ...batch2Items] : batch1Items;

  const openLightbox = (item) => {
    setActiveLightboxImage(item);
  };

  const closeLightbox = () => {
    setActiveLightboxImage(null);
  };

  const nextLightbox = () => {
    if (!activeLightboxImage) return;
    const currentIndex = allGalleryItems.findIndex((i) => i.id === activeLightboxImage.id);
    const nextIndex = (currentIndex + 1) % allGalleryItems.length;
    setActiveLightboxImage(allGalleryItems[nextIndex]);
  };

  const prevLightbox = () => {
    if (!activeLightboxImage) return;
    const currentIndex = allGalleryItems.findIndex((i) => i.id === activeLightboxImage.id);
    const prevIndex = (currentIndex - 1 + allGalleryItems.length) % allGalleryItems.length;
    setActiveLightboxImage(allGalleryItems[prevIndex]);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeLightboxImage) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxImage, allGalleryItems]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setShowBatch2(true);
      setIsLoadingMore(false);
    }, 400);
  };

  return (
    <main className="w-full bg-[#0a0a0c] text-white font-sans overflow-x-hidden selection:bg-[#fd6400] selection:text-white">
      {/* ========================================================================= */}
      {/* 1. HERO BANNER SECTION                                                   */}
      {/* ========================================================================= */}
      <section
        className="relative min-h-[85vh] flex items-center justify-center pt-32 pb-20 px-4 md:px-8 overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 10, 12, 0.78), rgba(10, 10, 12, 0.94)), url(${getAssetPath('/img/ai-excellence/ai-excellence-bg.webp')})`,
        }}
      >
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#fd6400]/20 via-[#fd3a00]/10 to-transparent blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-[1320px] mx-auto w-full relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold uppercase tracking-tight text-white mb-4">
            GENERATIVE AI
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-300 mb-6 max-w-3xl mx-auto">
            Create worlds. Not just assets.
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10">
            We use Generative AI to turn creative ideas into campaign imagery, visual worlds, <br className="hidden md:block" />
            key visuals and content systems designed to go further than a single execution.
          </p>
          <div>
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#fd6400] hover:bg-[#ff771f] text-white text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(253,100,0,0.4)]"
            >
              START A PROJECT
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. BREADCRUMB & SERVICE BIO                                               */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b border-white/10 bg-[#0e0e12]">
        <div className="max-w-[1320px] mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8 text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">
            <ul className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/what-we-brew" className="hover:text-white transition-colors">
                  <strong className="text-white">Our</strong> Expertise
                </Link>
              </li>
              <li className="text-gray-600">/</li>
              <li>
                <Link href="/our-expertise/ai-excellence" className="hover:text-white transition-colors">
                  <strong className="text-white">AI</strong> Excellence
                </Link>
              </li>
              <li className="text-gray-600">/</li>
              <li className="text-[#fd6400] font-semibold">Generative AI</li>
            </ul>
          </nav>

          {/* Heading & Bio copy */}
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            From one thought to many possibilities.
          </h2>
          <div className="text-base sm:text-lg text-gray-300 max-w-4xl space-y-4 leading-relaxed">
            <p>
              Generative AI makes exploration almost limitless. But limitless output isn&apos;t the goal.
              We combine brand thinking, art direction and AI workflows to find the visual
              direction worth pursuing and then develop it into creative that can actually be used.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. WHAT WE CREATE SECTION                                                 */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-[#0a0a0c] relative">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Sticky Sidebar */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase tracking-tight mb-8">
                <strong className="font-extrabold text-white">WHAT WE</strong> <br />
                <span className="text-[#fd6400]">CREATE</span>
              </h2>

              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={getAssetPath("/img/generative-ai/ai_service_generative.jpg")}
                    alt="Generative AI"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                </div>
              </div>
            </div>

            {/* Editorial Grid (6 items) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {whatWeCreateItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#121217] hover:bg-[#181820] border border-white/5 hover:border-[#fd6400]/40 rounded-2xl p-6 md:p-8 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-xs font-mono font-bold text-[#fd6400] mb-3 block">
                      0{idx + 1}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#fd6400] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. AI PIPELINE SECTION                                                    */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-[#0e0e14] border-t border-b border-white/5 relative">
        <div className="max-w-[1320px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              From possibility to precision.
            </h2>
            <p className="text-base sm:text-lg text-gray-400">
              A rigorous 6-stage generative pipeline ensuring brand consistency and pixel perfection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {pipelineStages.map((stage, idx) => {
              const IconComponent = stage.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#14141c] hover:bg-[#1a1a24] border border-white/5 hover:border-[#fd6400]/40 rounded-2xl p-8 transition-all duration-300 relative group"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-black text-white/20 group-hover:text-[#fd6400]/40 transition-colors">
                      0{idx + 1}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-[#fd6400]/10 text-[#fd6400] flex items-center justify-center group-hover:bg-[#fd6400] group-hover:text-white transition-all duration-300">
                      <IconComponent className="text-2xl" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#fd6400] transition-colors">
                    {stage.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CREATIVE DIRECTION MANIFESTO SECTION                                   */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 px-4 md:px-8 bg-gradient-to-b from-[#111118] to-[#0a0a0c] border-b border-white/5 relative overflow-hidden">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left Side */}
            <div className="lg:col-span-6">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
                Generating is easy. Knowing what to keep isn&apos;t.
              </h2>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#fd6400] mb-6">
                Taste gives it substance.
              </h3>
              <div className="w-20 h-1 bg-[#fd6400] rounded-full" />
            </div>

            {/* Right Side */}
            <div className="lg:col-span-6 space-y-6">
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                More output doesn&apos;t automatically mean better creative. Our role is to bring taste, context and judgment to the process - because the strongest AI-powered work shouldn&apos;t look like an experiment.
              </p>
              <p className="text-base sm:text-lg font-medium text-white">
                It should simply look brilliantly made.
              </p>
              <div className="pt-4">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#fd6400] hover:bg-[#ff771f] text-white text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-[0_0_25px_rgba(253,100,0,0.3)]"
                >
                  START A PROJECT
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. RECENT WORK MOSAIC GALLERY SECTION                                     */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-[#0a0a0c] relative">
        <div className="max-w-[1320px] mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              <strong className="text-white">Recent</strong> Work
            </h2>
          </div>

          {/* Mosaic Grid - Batch 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
            {/* Left 4 items (2x2 Grid) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {batch1Items.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  onClick={() => openLightbox(item)}
                  className="group relative aspect-video rounded-2xl overflow-hidden bg-[#14141a] border border-white/10 hover:border-[#fd6400]/50 transition-all duration-500 cursor-pointer shadow-lg"
                >
                  <Image
                    src={getAssetPath(item.image)}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                  {/* Caption & Category */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <span className="text-xs uppercase tracking-wider text-[#fd6400] font-semibold mb-1 block">
                      {item.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#fd6400] transition-colors">
                      {item.alt}
                    </h3>
                  </div>

                  {/* Zoom Indicator */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <LuMaximize2 className="text-sm" />
                  </div>
                </div>
              ))}
            </div>

            {/* Right 2 items (Featured tall + standard) */}
            <div className="lg:col-span-4 flex flex-col gap-4 md:gap-6">
              {/* Item 5: Featured */}
              <div
                onClick={() => openLightbox(batch1Items[4])}
                className="group relative flex-1 min-h-[220px] rounded-2xl overflow-hidden bg-[#14141a] border border-white/10 hover:border-[#fd6400]/50 transition-all duration-500 cursor-pointer shadow-lg"
              >
                <Image
                  src={getAssetPath(batch1Items[4].image)}
                  alt={batch1Items[4].alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <span className="text-xs uppercase tracking-wider text-[#fd6400] font-semibold mb-1 block">
                    {batch1Items[4].category}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#fd6400] transition-colors">
                    {batch1Items[4].alt}
                  </h3>
                </div>

                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <LuMaximize2 className="text-sm" />
                </div>
              </div>

              {/* Item 6: Standard */}
              <div
                onClick={() => openLightbox(batch1Items[5])}
                className="group relative aspect-video rounded-2xl overflow-hidden bg-[#14141a] border border-white/10 hover:border-[#fd6400]/50 transition-all duration-500 cursor-pointer shadow-lg"
              >
                <Image
                  src={getAssetPath(batch1Items[5].image)}
                  alt={batch1Items[5].alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <span className="text-xs uppercase tracking-wider text-[#fd6400] font-semibold mb-1 block">
                    {batch1Items[5].category}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#fd6400] transition-colors">
                    {batch1Items[5].alt}
                  </h3>
                </div>

                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <LuMaximize2 className="text-sm" />
                </div>
              </div>
            </div>
          </div>

          {/* Mosaic Grid - Batch 2 (Revealed on Load More - Flipped Layout) */}
          {showBatch2 && (
            <div className="mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 animate-fadeIn">
              {/* Left Column (Featured tall + standard) */}
              <div className="lg:col-span-4 flex flex-col gap-4 md:gap-6">
                {/* Item 7: Featured */}
                <div
                  onClick={() => openLightbox(batch2Items[0])}
                  className="group relative flex-1 min-h-[220px] rounded-2xl overflow-hidden bg-[#14141a] border border-white/10 hover:border-[#fd6400]/50 transition-all duration-500 cursor-pointer shadow-lg"
                >
                  <Image
                    src={getAssetPath(batch2Items[0].image)}
                    alt={batch2Items[0].alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                  <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <span className="text-xs uppercase tracking-wider text-[#fd6400] font-semibold mb-1 block">
                      {batch2Items[0].category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#fd6400] transition-colors">
                      {batch2Items[0].alt}
                    </h3>
                  </div>

                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <LuMaximize2 className="text-sm" />
                  </div>
                </div>

                {/* Item 8: Standard */}
                <div
                  onClick={() => openLightbox(batch2Items[1])}
                  className="group relative aspect-video rounded-2xl overflow-hidden bg-[#14141a] border border-white/10 hover:border-[#fd6400]/50 transition-all duration-500 cursor-pointer shadow-lg"
                >
                  <Image
                    src={getAssetPath(batch2Items[1].image)}
                    alt={batch2Items[1].alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                  <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <span className="text-xs uppercase tracking-wider text-[#fd6400] font-semibold mb-1 block">
                      {batch2Items[1].category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#fd6400] transition-colors">
                      {batch2Items[1].alt}
                    </h3>
                  </div>

                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <LuMaximize2 className="text-sm" />
                  </div>
                </div>
              </div>

              {/* Right Column: 4 items (2x2 Grid) */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {batch2Items.slice(2, 6).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => openLightbox(item)}
                    className="group relative aspect-video rounded-2xl overflow-hidden bg-[#14141a] border border-white/10 hover:border-[#fd6400]/50 transition-all duration-500 cursor-pointer shadow-lg"
                  >
                    <Image
                      src={getAssetPath(item.image)}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                    <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <span className="text-xs uppercase tracking-wider text-[#fd6400] font-semibold mb-1 block">
                        {item.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#fd6400] transition-colors">
                        {item.alt}
                      </h3>
                    </div>

                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <LuMaximize2 className="text-sm" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Load More Button */}
          {!showBatch2 && (
            <div className="mt-12 md:mt-16 text-center">
              <button
                type="button"
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-[#fd6400] hover:border-[#fd6400] text-white text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <span>{isLoadingMore ? "Loading..." : "Load More Work"}</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. OTHER AI SERVICES (KINETIC SECTION)                                    */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-[#0e0e14] border-t border-white/10 relative">
        <div className="max-w-[1320px] mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-12">
            <strong className="text-[#fd6400]">Other</strong> AI Services
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Interactive Stream */}
            <div className="lg:col-span-7 flex flex-col space-y-4">
              {otherAiServices.map((service, idx) => {
                const IconComp = service.icon;
                const isActive = activeKineticIndex === idx;
                return (
                  <Link
                    key={service.slug}
                    href={`/our-expertise/ai-excellence/${service.slug}`}
                    onMouseEnter={() => setActiveKineticIndex(idx)}
                    className={`group relative p-6 sm:p-8 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                      isActive
                        ? "bg-[#181822] border-[#fd6400] shadow-[0_0_30px_rgba(253,100,0,0.15)]"
                        : "bg-[#121218] border-white/5 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-4 sm:gap-6">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-colors ${
                          isActive
                            ? "bg-[#fd6400] text-white"
                            : "bg-white/5 text-gray-400 group-hover:text-white"
                        }`}
                      >
                        <IconComp />
                      </div>
                      <h3
                        className={`text-lg sm:text-2xl font-bold transition-colors ${
                          isActive ? "text-[#fd6400]" : "text-white group-hover:text-[#fd6400]"
                        }`}
                      >
                        {service.title}
                      </h3>
                    </div>

                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform ${
                        isActive
                          ? "bg-[#fd6400] text-white translate-x-1"
                          : "bg-white/5 text-gray-400 group-hover:text-white group-hover:translate-x-1"
                      }`}
                    >
                      <LuArrowRight className="text-lg" />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Sticky Preview Spotlight Pane */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#14141c]">
                <Image
                  src={getAssetPath(otherAiServices[activeKineticIndex].image)}
                  alt={otherAiServices[activeKineticIndex].title}
                  fill
                  className="object-cover transition-all duration-500"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-xs uppercase font-mono tracking-wider text-[#fd6400] font-semibold mb-1 block">
                    EXPLORE SERVICE
                  </span>
                  <h4 className="text-xl font-bold text-white">
                    {otherAiServices[activeKineticIndex].title}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. CTA SECTION (LIGHT THEMED CARD)                                        */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 px-4 md:px-8 bg-[#0a0a0c]">
        <div className="max-w-[1320px] mx-auto">
          <div className="bg-white rounded-3xl p-10 sm:p-14 md:p-20 text-center text-black relative overflow-hidden shadow-2xl">
            {/* Subtle light accents */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#fd6400]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#fd6400]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#111111] mb-4">
                Start with an idea.
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-medium mb-8">
                We&apos;ll see how far it can go.
              </p>
              <div>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-[#fd6400] hover:bg-[#ff771f] text-white text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(253,100,0,0.35)]"
                >
                  Let&apos;s Generate
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. LIGHTBOX MODAL FOR FULL SCREEN IMAGE PREVIEW                           */}
      {/* ========================================================================= */}
      {activeLightboxImage && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fadeIn">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-[#fd6400] text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <LuX className="text-2xl" />
          </button>

          {/* Prev button */}
          <button
            onClick={prevLightbox}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-[#fd6400] text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Previous image"
          >
            <LuChevronLeft className="text-2xl" />
          </button>

          {/* Next button */}
          <button
            onClick={nextLightbox}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-[#fd6400] text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Next image"
          >
            <LuChevronRight className="text-2xl" />
          </button>

          {/* Image Container */}
          <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center">
            <div className="relative w-full h-[75vh]">
              <Image
                src={getAssetPath(activeLightboxImage.image)}
                alt={activeLightboxImage.alt}
                fill
                className="object-contain"
                priority
                sizes="90vw"
              />
            </div>
            <div className="mt-4 text-center">
              <span className="text-xs uppercase font-mono tracking-wider text-[#fd6400] font-semibold block mb-1">
                {activeLightboxImage.category}
              </span>
              <h3 className="text-lg md:text-xl font-bold text-white">
                {activeLightboxImage.alt}
              </h3>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 10. BEYOND SERVICES CAROUSEL & 11. CONTACT FORM                           */}
      {/* ========================================================================= */}
      <BeyondServicesCarousel />
      <ContactSection />
    </main>
  );
}
