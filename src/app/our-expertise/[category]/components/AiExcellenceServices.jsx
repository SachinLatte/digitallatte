"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { getAssetPath } from "../../../../utils/assetPath";
import ContactSection from "../../../components/common/ContactSection";
import BeyondServicesCarousel from "../../../components/common/BeyondServicesCarousel";

const caseStudiesData = [
  {
    heading: (
      <>
        From brief to <br /> breakthrough
      </>
    ),
    lead: "From first idea to finished asset, we create original, brand-ready work designed to scale.",
    checklist: [
      "AI can make the process faster.",
      "But great creative still needs direction.",
      "We bring strategy, creativity and AI together in a structured workflow designed to turn ideas into brand-ready output, not just interesting experiments.",
    ],
    image: "/img/ai-excellence/AI-excellence_a.webp",
    alt: "AI Creative Production",
  },
  {
    heading: (
      <>
        More versions. <br /> More possibilities.
      </>
    ),
    lead: "One strong idea, expanded across formats, platforms, markets and moments.",
    checklist: [
      "A campaign thought can become a film.",
      "A film can become multiple edits.",
      "A key visual can become an entire visual world.",
      "One market can become many languages, formats and audiences.",
      "AI helps us extend the life of an idea without sending every new execution back to the starting line.",
    ],
    image: "/img/ai-excellence/AI-excellence_b.webp",
    alt: "More versions. More possibilities.",
  },
  {
    heading: (
      <>
        Human thinking. <br /> AI-powered making
      </>
    ),
    lead: "AI accelerates the making. Human judgment shapes what makes the cut.",
    checklist: [
      "AI can make more. We make it matter.",
      "AI brings speed, scale and possibility.",
      "We bring context, instinct, taste and intent.",
      "AI brings the possibilities. We bring the taste.",
      "The future isn't Human or AI, it is Human & AI.",
    ],
    image: "/img/ai-excellence/AI-excellence_c.webp",
    alt: "Human thinking. AI-powered making",
  },
  {
    heading: (
      <>
        From Possibility to <br /> Precision
      </>
    ),
    lead: "Generated fast. Directed, refined and finished with intent.",
    checklist: [
      "Great AI work is not about generating more.",
      "Getting every frame, expression and detail exactly right.",
      "From visual consistency to final polish",
      "Until the work feels less like a generation.",
      "And more like a creative decision.",
    ],
    image: "/img/ai-excellence/AI-excellence_d.webp",
    alt: "From Possibility to Precision",
  },
];

const aiServicesData = [
  {
    title: "AI Video Production",
    slug: "ai-video-production",
    desc: "From brand films and product stories to social-first content, we combine creative direction, AI-generated visuals, motion, editing and sound to create films without conventional production limitations.",
    image: "/img/ai-excellence/ai_service_video.webp",
    featured: true,
  },
  {
    title: "Generative AI",
    slug: "generative-ai",
    desc: "Turn ideas into visual worlds. We use Generative AI to create campaign imagery, key visuals, concept art and content variations designed around your brand - not around what the tool happens to generate.",
    image: "/img/ai-excellence/ai_service_generative.webp",
    featured: true,
  },
  {
    title: "AI Character Development",
    slug: "ai-character-development",
    desc: "Create characters people can recognise, remember and return to. From mascots and fictional personalities to digital presenters, we build distinctive characters designed for consistent, ongoing storytelling.",
    image: "/img/ai-excellence/ai_service_character.webp",
    featured: false,
  },
  {
    title: "AI Product Visualisation",
    slug: "ai-product-visualisation",
    desc: "Put your product anywhere. Without taking it everywhere. We create premium product imagery, lifestyle environments and campaign-ready visual assets without organizing a new shoot for every campaign, season or occasion.",
    image: "/img/ai-excellence/ai_service_product.webp",
    featured: false,
  },
  {
    title: "AI Audio Production",
    slug: "ai-audio-production",
    desc: "Give every idea the right voice. From AI-assisted voiceovers and multilingual localisation to music, sound design and audio adaptations, we create sound built to travel across content, markets and audiences.",
    image: "/img/ai-excellence/ai_service_voice.webp",
    featured: false,
  },
];

const uspData = [
  {
    title: "STRATEGY BEFORE PROMPTS",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    paragraphs: [
      "We start with the problem, not the platform.",
      "Brand. Audience. Objective. Idea.",
      "AI comes after.",
    ],
  },
  {
    title: "BUILT AROUND YOUR BRAND",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    paragraphs: [
      "We develop visual directions around your identity, tone, product, audience & existing brand language to create work that feels recognisable, not generic.",
    ],
  },
  {
    title: "HUMAN + AI",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="20" x2="12" y2="12" />
        <line x1="12" y1="12" x2="6" y2="6" />
        <line x1="12" y1="12" x2="18" y2="6" />
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="18" cy="6" r="2.5" />
        <circle cx="12" cy="20" r="2.5" />
      </svg>
    ),
    paragraphs: [
      "AI expands the possibilities.",
      "People make the decisions.",
      "Our teams direct, curate and refine every output until it feels crafted - not generated.",
    ],
  },
  {
    title: "BUILT TO SCALE",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 19 22 12 13 5 13 19" />
        <polygon points="2 19 11 12 2 5 2 19" />
      </svg>
    ),
    paragraphs: [
      "One strong idea can travel further.",
      "Across formats. Platforms. Markets. Languages.",
      "Without rebuilding the creative process every time.",
    ],
  },
];

const clientLogos = [
  { name: "Hell Energy", src: "/img/clientele/top_brands/hell-energy-logo.webp" },
  { name: "Cradle of Life", src: "/img/clientele/real-estate/cradleoflife_logo.webp" },
  { name: "Cravana", src: "/img/clientele/fmcg/cravana_logo.webp" },
  { name: "Suhana", src: "/img/clientele/top_brands/suhana.webp" },
  { name: "Parrys", src: "/img/clientele/fmcg/parrys-logo.webp" },
  { name: "Goldiee", src: "/img/clientele/top_brands/goldiee_logo.webp" },
  { name: "Puneri Paltan", src: "/img/clientele/top_brands/puneripaltan_logo.webp" },
  { name: "EPL Global", src: "/img/clientele/B2B/essel.webp" },
  { name: "Revae Beaute", src: "/img/clientele/beauty/revae_logo.webp" },
];

const faqCol1 = [
  {
    question: "What is an AI creative agency?",
    answer:
      "An AI creative agency combines human strategy, creativity and brand thinking with artificial intelligence to develop content faster and explore new creative possibilities. At Digital Latte, AI supports the creative process across video, visuals, characters, product imagery and audio, while human teams continue to direct, curate and refine the final output.",
  },
  {
    question: "What AI creative services does Digital Latte offer?",
    answer: (
      <>
        Digital Latte&apos;s AI Excellence offering includes{" "}
        <Link href="/our-expertise/ai-excellence/ai-video-production" className="text-[#ff9000] font-semibold hover:underline">
          AI Video Production,
        </Link>{" "}
        <Link href="/our-expertise/ai-excellence/generative-ai" className="text-[#ff9000] font-semibold hover:underline">
          Generative AI,
        </Link>{" "}
        <Link href="/our-expertise/ai-excellence/ai-character-development" className="text-[#ff9000] font-semibold hover:underline">
          AI Character Development,
        </Link>{" "}
        <Link href="/our-expertise/ai-excellence/ai-product-visualisation" className="text-[#ff9000] font-semibold hover:underline">
          AI Product Visualisation,
        </Link>{" "}
        and{" "}
        <Link href="/our-expertise/ai-excellence/ai-audio-production" className="text-[#ff9000] font-semibold hover:underline">
          AI Audio Production.
        </Link>{" "}
        Together, these capabilities help brands create films, campaign visuals, digital characters, product imagery, voiceovers, sound and scalable content across platforms and markets.
      </>
    ),
  },
  {
    question: "How can brands use AI in marketing and creative campaigns?",
    answer:
      "Brands can use AI to create campaign visuals, advertising films, social content, product imagery, digital characters, multilingual voiceovers and multiple creative adaptations. AI also makes it possible to explore concepts and visual worlds that may be difficult or expensive to produce conventionally, while allowing approved ideas to scale across formats and audiences.",
  },
];

const faqCol2 = [
  {
    question: "Does AI replace human creativity in advertising and marketing?",
    answer: (
      <>
        No. AI expands what creative teams can explore and produce, but strategy, storytelling, taste and judgment still require human direction. Digital Latte follows a <strong className="font-semibold text-[#111111]">Human + AI</strong> approach where ideas and brand objectives lead the process, while AI helps bring those ideas to life in new and more scalable ways.
      </>
    ),
  },
  {
    question: "How do you ensure AI-generated content stays consistent with a brand?",
    answer:
      "We start with the brand rather than the AI tool. Existing identity, visual language, tone, audience, product details and campaign objectives guide the creative direction. Every output is then selected, refined and quality-checked so that the work feels intentionally designed for the brand rather than looking like generic AI-generated content.",
  },
  {
    question: "Why work with an AI-powered digital marketing agency in Mumbai, India?",
    answer:
      "Working with an AI-powered digital marketing agency gives brands access to creative strategy, digital expertise and AI production within one integrated team. Digital Latte combines its experience across digital marketing, design and content production with AI capabilities to help brands create, adapt and scale high-quality creative across India and global markets.",
  },
];

export default function AiExcellenceServices({ data, categoryKey }) {
  const sectionRef = useRef(null);
  const mobileContainerRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [openFaqCol1, setOpenFaqCol1] = useState(null);
  const [openFaqCol2, setOpenFaqCol2] = useState(null);

  const scrollToContact = (e) => {
    e?.preventDefault?.();
    const contactEl = document.getElementById("contact-us") || document.querySelector("footer");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToSlide = (index) => {
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 991;
    if (isMobile && mobileContainerRef.current) {
      const container = mobileContainerRef.current;
      const target = container.children[index];
      if (target) {
        container.scrollTo({
          left: target.offsetLeft - container.offsetLeft,
          behavior: "smooth",
        });
      }
      setActiveSlide(index);
      return;
    }

    const section = sectionRef.current || document.getElementById("ai-case-studies");
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const sectionHeight = section.offsetHeight;
    const windowHeight = window.innerHeight;
    const totalScrollable = sectionHeight - windowHeight;
    if (totalScrollable <= 0) return;
    const targetScroll = sectionTop + (index / (caseStudiesData.length - 1)) * totalScrollable;
    if (window.lenis) {
      window.lenis.scrollTo(targetScroll, { duration: 1.2 });
    } else {
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }
  };

  // Desktop Stacked Scroll Animation (Exact logic matching live reference)
  useEffect(() => {
    const section = sectionRef.current || document.getElementById("ai-case-studies");
    if (!section) return;

    const dots = section.querySelectorAll(".ai-case-dot");
    const steps = section.querySelectorAll(".ai-case-step");
    const numSlides = steps.length;
    let currentActive = -1;

    function update() {
      const isMobile = window.innerWidth <= 991;
      if (isMobile) {
        steps.forEach(function (step) {
          step.classList.remove("past", "future");
          step.classList.add("active");
          const media = step.querySelector(".ai-case-step-media");
          const content = step.querySelector(".ai-case-step-content");
          if (media) {
            media.style.transform = "";
            media.style.opacity = "";
            media.style.zIndex = "";
          }
          if (content) {
            content.style.transform = "";
            content.style.opacity = "";
          }
        });
        return;
      }

      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;
      const totalScrollable = sectionHeight - windowHeight;
      if (totalScrollable <= 0) return;
      const scrolled = -rect.top;
      const rawProgress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      const floatIndex = rawProgress * (numSlides - 1);

      steps.forEach(function (step, i) {
        const diff = i - floatIndex;
        const media = step.querySelector(".ai-case-step-media");
        const content = step.querySelector(".ai-case-step-content");

        // 3D Media Stack Animation (Exact Live Formula)
        if (media) {
          const translateY = diff * 620;
          const rotate = diff * 18;
          const scale = Math.max(0.85, 1 - Math.abs(diff) * 0.05);
          let opacity = 1;
          if (diff < 0) {
            opacity = Math.max(0, 1 + diff * 0.9);
          } else if (diff > 1.1) {
            opacity = Math.max(0, 1 - (diff - 1.1) * 0.85);
          } else {
            opacity = 1;
          }
          const zIndex = Math.round(30 - diff * 5);
          media.style.transform = `translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`;
          media.style.opacity = opacity;
          media.style.zIndex = zIndex;
        }

        // Smooth Crossfading Text Animation (Exact Live Formula)
        if (content) {
          const textTranslateY = diff * 20;
          const textOpacity = Math.max(0, 1 - Math.abs(diff) * 1.5);
          content.style.transform = `translateY(${textTranslateY}px)`;
          content.style.opacity = textOpacity;
        }

        step.style.pointerEvents = Math.abs(diff) < 0.4 ? "auto" : "none";
        step.classList.toggle("active", Math.abs(diff) < 0.5);
      });

      const currentSlide = Math.min(numSlides - 1, Math.max(0, Math.round(floatIndex)));
      if (currentSlide !== currentActive) {
        currentActive = currentSlide;
        setActiveSlide(currentSlide);
        dots.forEach(function (dot, idx) {
          dot.classList.toggle("active", idx === currentSlide);
        });
      }
    }

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(function () {
          update();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    if (window.lenis) {
      window.lenis.on("scroll", onScroll);
    }
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (window.lenis) {
        window.lenis.off("scroll", onScroll);
      }
    };
  }, []);

  // Mobile Autoplay Carousel
  useEffect(() => {
    let autoplayTimer = null;
    let isInteracting = false;
    let resumeTimeout = null;

    const handleMobileAutoplay = () => {
      if (window.innerWidth > 991 || isInteracting || !mobileContainerRef.current) return;
      setActiveSlide((prev) => {
        const next = (prev + 1) % caseStudiesData.length;
        if (mobileContainerRef.current) {
          const target = mobileContainerRef.current.children[next];
          if (target) {
            mobileContainerRef.current.scrollTo({
              left: target.offsetLeft - mobileContainerRef.current.offsetLeft,
              behavior: "smooth",
            });
          }
        }
        return next;
      });
    };

    const startTimer = () => {
      if (autoplayTimer) clearInterval(autoplayTimer);
      autoplayTimer = setInterval(handleMobileAutoplay, 4000);
    };

    if (typeof window !== "undefined" && window.innerWidth <= 991) {
      startTimer();
    }

    const container = mobileContainerRef.current;
    const pauseAutoplay = () => {
      isInteracting = true;
      if (autoplayTimer) clearInterval(autoplayTimer);
      if (resumeTimeout) clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => {
        isInteracting = false;
        startTimer();
      }, 5000);
    };

    const handleScroll = () => {
      if (!container || window.innerWidth > 991) return;
      const scrollLeft = container.scrollLeft;
      const slideWidth = container.offsetWidth;
      if (slideWidth > 0) {
        const idx = Math.round(scrollLeft / slideWidth);
        setActiveSlide(Math.min(caseStudiesData.length - 1, Math.max(0, idx)));
      }
    };

    if (container) {
      container.addEventListener("touchstart", pauseAutoplay, { passive: true });
      container.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      if (autoplayTimer) clearInterval(autoplayTimer);
      if (resumeTimeout) clearTimeout(resumeTimeout);
      if (container) {
        container.removeEventListener("touchstart", pauseAutoplay);
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <main className="flex-grow flex flex-col w-full font-sans bg-white">
      {/* 1. HERO BANNER */}
      <section className="home_banner ai-excellence-bg-big w-full bg-[#ececec] relative overflow-hidden flex flex-row w992:flex-col items-center justify-between min-h-[700px] w1281:min-h-[600px] w992:min-h-0 pt-24 pb-12 w992:py-16 px-[13%] w1470:px-[10%] w1281:px-[6%] w992:px-6 w501:px-4 select-none">
        <div className="home_banner_content relative z-10 max-w-[58%] w1281:max-w-[55%] w992:max-w-full w992:text-center select-none shrink-0">
          <h1 className="font-sans text-[44px] w1601:text-[40px] w1470:text-[35px] w1281:text-[29px] w1025:text-[24px] w769:text-[20px] w501:text-[16px] text-[#181414] leading-[1.5] tracking-[1.5px] uppercase select-none">
            <span className="block whitespace-nowrap">
              TURNING <strong className="font-bold">IMAGINATION</strong> INTO
            </span>
            <span className="block whitespace-nowrap">
              EXTRAORDINARY <strong className="font-bold">POSSIBILITIES</strong>,
            </span>
            <span className="block whitespace-nowrap">
              POWERED BY <strong className="font-bold">AI</strong>.
            </span>
          </h1>
        </div>
        <div className="ai-excellence-banner-video w-[40%] w1281:w-[42%] w992:w-full max-w-[620px] flex items-center justify-end w992:justify-center mt-0 w992:mt-8">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-auto max-h-[620px] w1470:max-h-[560px] w1281:max-h-[490px] w769:max-h-[380px] w501:max-h-[280px] object-contain rounded-2xl"
          >
            <source src={getAssetPath("/img/ai-excellence/ai-excellence-right-video.mp4")} type="video/mp4" />
          </video>
        </div>
      </section>

      {/* 2. BREADCRUMBS & BIO */}
      <div className="service-bio w-full bg-white pt-8 pb-16 select-none">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          <div className="bread-crumb mb-10 font-libre font-bold text-[14px] text-[#000] tracking-[1.5px] flex items-center gap-1 flex-wrap">
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
            <span className="text-[#ff9000] font-medium">AI Excellence</span>
          </div>

          <h2 className="service-main-head font-sans text-[36px] w769:text-[28px] text-[#16110f] tracking-normal mb-8 text-center font-semibold">
            AI can generate <br /> almost anything.
          </h2>
          <div className="service-bio-copy font-libre text-center mx-auto text-[#000] text-[16px] w769:text-[14px] leading-[1.8] flex flex-col gap-6 select-none max-w-[950px]">
            <p className="font-light text-[#16110f] text-[16px] w769:text-[15px] leading-[1.6]">
              The difference is knowing what&apos;s worth generating.
            </p>
            <p className="font-light text-[#16110f] text-[16px] w769:text-[15px] leading-[1.6]">
              We combine human imagination, strategic thinking and creative craft with the possibilities of{" "}
              <span className="text-[#ff9000] font-medium">Generative AI</span> to create content that moves faster, goes further and still feels unmistakably yours.
            </p>
            <p className="font-light text-[#16110f] text-[16px] w769:text-[15px] leading-[1.6]">
              From AI films and campaign visuals to product worlds, characters, avatars and content at scale. We turn prompts into possibilities and possibilities into brand-ready creative.
            </p>
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE CASE STUDIES STICKY STACK */}
      <section className="ai-case-studies-section relative w-full bg-white h-[360vh] w992:h-auto w992:py-16 clear-both" id="ai-case-studies" ref={sectionRef}>
        {/* Desktop Sticky Viewport */}
        <div className="ai-sticky-track relative w-full h-full w992:hidden">
          <div className="ai-sticky-viewport sticky top-0 left-0 w-full h-screen flex items-center bg-white overflow-hidden">
            <div className="custom_container w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] mx-auto relative flex items-center">
              {/* Left Side Dot Progress Indicators (Desktop) */}
              <div className="ai-case-nav absolute -left-[48px] top-1/2 -translate-y-1/2 flex flex-col gap-[12px] z-50">
                {caseStudiesData.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => scrollToSlide(dotIdx)}
                    className={`ai-case-dot cursor-pointer transition-all duration-[350ms] border-none p-0 outline-none ${
                      activeSlide === dotIdx
                        ? "active w-[7px] h-[22px] bg-[#ffad43] rounded-[10px] shadow-[0_0_10px_rgba(0,0,0,0.25)]"
                        : "w-[7px] h-[7px] rounded-full bg-black/22 hover:bg-black/60 hover:scale-125"
                    }`}
                    data-slide={dotIdx}
                    aria-label={`Slide ${dotIdx + 1}`}
                  />
                ))}
              </div>

              <div className="ai-case-steps-container relative w-full min-h-[550px]">
                {caseStudiesData.map((item, idx) => (
                  <div
                    key={idx}
                    className={`ai-case-step absolute top-1/2 left-0 w-full -translate-y-1/2 flex items-center justify-between gap-[60px] pointer-events-none ${
                      activeSlide === idx ? "active pointer-events-auto" : ""
                    }`}
                    data-index={idx}
                  >
                    {/* Left Content */}
                    <div className="ai-case-step-content flex-[0_0_46%] max-w-[46%] relative text-left">
                      <h2 className="ai-case-heading font-sans text-[50px] w1470:text-[44px] w1281:text-[38px] font-extrabold leading-[65px] w1470:leading-[56px] text-[#111111] mb-[45px] tracking-[1px] uppercase">
                        {item.heading}
                      </h2>
                      <h3 className="ai-case-lead font-libre text-[22px] w1281:text-[20px] font-medium leading-[32px] w1281:leading-[28px] text-[#111111] mb-[45px] max-w-[535px] normal-case">
                        {item.lead}
                      </h3>
                      <ul className="ai-case-checklist flex flex-col gap-[16px] list-none p-0 m-0">
                        {item.checklist.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-center gap-[14px]">
                            <span className="ai-case-check-icon flex-shrink-0 w-[22px] h-[22px] rounded-full bg-[#111111] text-[#ffffff] flex items-center justify-center mt-[1px]">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </span>
                            <span className="font-libre text-[16px] leading-[1.5] text-[#2b2b2b] font-medium">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right 3D Media Card */}
                    <div
                      className="ai-case-step-media flex-[0_0_50%] max-w-[50%] relative flex items-center justify-center"
                      style={{ willChange: "transform, opacity" }}
                    >
                      <div className="ai-case-img-holder w-full max-w-[550px] rounded-[20px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.22)] bg-[#f0f0f0] border border-black/8 relative">
                        <Image
                          src={getAssetPath(item.image)}
                          alt={item.alt}
                          width={550}
                          height={550}
                          priority={idx === 0}
                          className="w-full h-[550px] object-cover block"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Horizontal Carousel */}
        <div className="hidden w992:block w-full px-6 w501:px-4">
          <div
            ref={mobileContainerRef}
            className="flex flex-row overflow-x-auto snap-x snap-mandatory scroll-smooth gap-6 pb-6 no-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {caseStudiesData.map((item, idx) => (
              <div
                key={idx}
                className="w-full min-w-[85vw] max-w-[420px] snap-center shrink-0 flex flex-col gap-6 bg-[#fbfbfb] p-6 rounded-2xl border border-neutral-200 shadow-sm"
              >
                <div className="w-full h-[260px] relative rounded-xl overflow-hidden bg-neutral-900">
                  <Image
                    src={getAssetPath(item.image)}
                    alt={item.alt}
                    width={420}
                    height={260}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-sans text-[24px] font-bold text-[#111111] leading-tight mb-3 uppercase">
                    {item.heading}
                  </h2>
                  <h3 className="font-libre text-[14.5px] font-medium text-[#444444] leading-relaxed mb-4">
                    {item.lead}
                  </h3>
                  <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                    {item.checklist.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-[18px] h-[18px] rounded-full bg-[#111111] text-white flex items-center justify-center mt-0.5">
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span className="font-libre text-[14px] leading-snug text-[#333333]">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel Dots */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {caseStudiesData.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => scrollToSlide(dotIdx)}
                className={`transition-all duration-300 ${activeSlide === dotIdx
                  ? "w-6 h-2 bg-[#ff9000] rounded-full"
                  : "w-2 h-2 bg-neutral-300 rounded-full"
                  }`}
                aria-label={`Slide ${dotIdx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. AI SERVICES MOSAIC GRID */}
      <section className="ai-services-section w-full bg-white py-24 select-none">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          <div className="ai-services-header mb-12">
            <h2 className="ai-services-main-heading font-sans text-[44px] w1470:text-[38px] w769:text-[28px] font-semibold leading-[1.2] text-[#111111] mb-[18px] capitalize">
              Where Ideas Meet Intelligence
            </h2>
            <p className="font-libre text-[16px] w769:text-[14px] text-[#555555] leading-relaxed max-w-[850px]">
              From visual storytelling to characters, products and sound, we use AI to push creative possibilities further.
            </p>
          </div>

          <div className="grid grid-cols-6 w1101:grid-cols-2 w769:grid-cols-1 gap-6">
            {aiServicesData.map((item, idx) => (
              <Link
                key={idx}
                href={`/our-expertise/ai-excellence/${item.slug}`}
                className={`${item.featured ? "col-span-3 w1101:col-span-1 min-h-[540px] w769:min-h-[400px]" : "col-span-2 w1101:col-span-1 min-h-[580px] w769:min-h-[380px]"
                  } relative rounded-[16px] overflow-hidden bg-[#121212] flex flex-col justify-end p-8 w769:p-6 shadow-md hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 cursor-pointer group block`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${getAssetPath(item.image)})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none transition-colors duration-300 group-hover:via-black/75" />
                <div className="relative z-10 text-left">
                  <h3 className="font-sans text-[28px] w1281:text-[23px] font-medium text-white mb-2.5 drop-shadow">
                    {item.title}
                  </h3>
                  <p className="font-libre text-[14.5px] w1281:text-[13.5px] text-white/90 leading-relaxed drop-shadow-sm line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MID-PAGE BANNER / QUOTE */}
      <section
        className="home_banner service-bg ai-excellence-bg w-full min-h-[660px] w769:min-h-[420px] bg-cover bg-center flex items-center py-20 select-none bg-black relative"
        style={{ backgroundImage: `url('${getAssetPath("/img/ai-excellence/ai-excellence-bg.webp")}')` }}
      >
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          <div className="max-w-[850px]">
            <h2 className="font-sans text-[4em] w1470:text-[4em] w1281:text-[3.2em] w769:text-[2.2em] w501:text-[1.8em] text-[#ffffff] font-medium uppercase tracking-[3px] w769:tracking-[1.5px] leading-[85px] w1470:leading-[1.15] mb-[20px]">
              THE BEST AI DOESN&apos;T <br /> LOOK LIKE AI.
            </h2>
            <p className="font-libre text-[20px] w769:text-[16px] text-[#ffffff] leading-[1.5] mb-8">
              It doesn&apos;t ask for attention. It gives the idea more room to earn it.
            </p>
            <button
              type="button"
              onClick={scrollToContact}
              className="px-8 py-3 rounded-full border border-white text-white hover:bg-white hover:text-[#16110f] font-libre text-[12px] font-semibold tracking-[1.5px] uppercase transition-colors duration-300 cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* 6. AI USP SECTION */}
      <section className="ai-usp-section w-full bg-white py-24 select-none">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          <div className="text-center mb-16">
            <h2 className="ai-usp-main-heading font-sans text-[44px] w1470:text-[38px] w769:text-[28px] font-semibold leading-[1.2] text-[#111111] text-center mb-[24px] capitalize">
              Because AI can generate. <br /> Taste still needs humans
            </h2>
            <p className="font-libre text-[16px] w769:text-[14px] text-[#555555] text-center max-w-[850px] mx-auto leading-relaxed">
              Everyone has access to AI tools. What matters is the thinking, taste and creative judgment behind them. We bring years of brand, digital, design and content experience into AI-powered production, so the technology serves the idea, rather than becoming the idea.
            </p>
          </div>

          <div className="grid grid-cols-4 w1101:grid-cols-2 w769:grid-cols-1 gap-8">
            {uspData.map((usp, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group hover:-translate-y-1 transition-transform">
                <div className="w-[54px] h-[54px] rounded-[10px] bg-[#ff9000] group-hover:bg-[#16110f] text-white flex items-center justify-center mb-5 transition-colors duration-300 shadow-sm">
                  {usp.icon}
                </div>
                <h3 className="font-libre text-[20px] w1281:text-[18px] w769:text-[16px] leading-[30px] text-[#111111] mb-[12px] font-bold capitalize text-center">
                  {usp.title}
                </h3>
                {usp.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="font-libre text-[16px] w769:text-[14px] leading-[26px] text-[#4a4a4a] text-center mb-2 last:mb-0">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. AI CLIENTS / CREATIVE ADVANTAGE */}
      <section className="ai-clients-section w-full bg-white pb-24 select-none">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          <div className="flex flex-row w992:flex-col gap-12 items-stretch">
            {/* Left Astronaut Image */}
            <div className="w-[38%] w992:w-full min-h-[480px] w992:min-h-[360px] w501:min-h-[260px] rounded-[20px] overflow-hidden shadow-xl relative bg-black flex">
              <Image
                src={getAssetPath("/img/ai-excellence/ai_clients_astronaut.webp")}
                alt="Creative Advantage"
                fill
                sizes="(max-width: 991px) 100vw, 40vw"
                className="w-full h-full object-cover rounded-[20px] transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Right Copy & 9-Logo Grid */}
            <div className="w-[58%] w992:w-full flex flex-col justify-between">
              <div>
                <h2 className="ai-clients-heading font-sans text-[44px] w1470:text-[38px] w769:text-[28px] font-semibold leading-[1.2] text-[#111111] mb-[24px] capitalize">
                  Fresh Ideas. Now with infinite possibilities
                </h2>
                <p className="font-libre text-[16px] text-[#4a4a4a] leading-relaxed mb-8">
                  Built for brands that need to move at the speed of culture. Strategy. Content. Design. Digital. Production. And now AI. Different capabilities, one integrated creative partner.
                </p>
              </div>

              <div className="grid grid-cols-3 w501:grid-cols-3 gap-4 w769:gap-3 w501:gap-2">
                {clientLogos.map((logo, idx) => (
                  <div
                    key={idx}
                    className="relative bg-[#f8f9fa] border border-[#e9ecef] hover:border-[#ff9000] rounded-[14px] h-[125px] w769:h-[90px] w501:h-[70px] flex items-center justify-center px-[22px] w501:px-[8px] shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:shadow-md hover:-translate-y-1 transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer group"
                    title={logo.name}
                  >
                    <Image
                      src={getAssetPath(logo.src)}
                      alt={logo.name}
                      width={120}
                      height={60}
                      className="w-[70%] object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. AI CTA CARD */}
      <section className="ai-cta-section w-full bg-[#16110f] py-20 select-none">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          <div className="max-w-[700px]">
            <h2 className="ai-cta-title font-sans text-[42px] w1470:text-[36px] w769:text-[28px] text-white font-medium leading-tight mb-4 tracking-[0.8px] capitalize">
              Ready to put AI to work <br /> for your brand?
            </h2>
            <p className="font-libre text-[17px] text-neutral-300 leading-relaxed mb-8 max-w-[650px]">
              Just sharper ideas, faster experimentation, smarter production and more ways to bring great creative to life. Tell us what you want to create. We&apos;ll explore how far we can take it.
            </p>
            <button
              type="button"
              onClick={scrollToContact}
              className="px-8 py-3 rounded-full bg-white text-[#16110f] hover:bg-[#ff9000] hover:text-white font-libre text-[13px] font-semibold tracking-[1.5px] uppercase transition-colors duration-300 cursor-pointer"
            >
              LET&apos;S TALK AI
            </button>
          </div>
        </div>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS ACCORDION */}
      <section className="questions-accordion-section w-full bg-white py-24 select-none">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          <h2 className="font-sans text-[44px] w1470:text-[38px] w769:text-[28px] font-semibold leading-[1.2] text-[#111111] mb-12 text-center capitalize">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-2 w992:grid-cols-1 gap-6 items-start">
            {/* Column 1 */}
            <div className="flex flex-col gap-4">
              {faqCol1.map((faq, idx) => {
                const isOpen = openFaqCol1 === idx;
                return (
                  <div
                    key={idx}
                    className={`bg-[#fbfbfb] border rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? "border-[#ff9000] shadow-md" : "border-[#ebebeb]"
                      }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqCol1(isOpen ? null : idx)}
                      className="w-full text-left p-6 w769:p-4 flex items-center justify-between gap-4 cursor-pointer select-none"
                    >
                      <h3 className="font-sans text-[18px] w769:text-[16px] font-semibold text-[#111111] leading-snug">
                        {faq.question}
                      </h3>
                      <span
                        className={`w-7 h-7 flex-shrink-0 flex items-center justify-center transition-transform duration-300 ${isOpen ? "rotate-180 text-[#ff9000]" : "text-[#111111]"
                          }`}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 w769:px-4 w769:pb-4 pt-0">
                        <div className="font-libre text-[15px] w769:text-[14px] text-[#555555] leading-relaxed">
                          {faq.answer}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4">
              {faqCol2.map((faq, idx) => {
                const isOpen = openFaqCol2 === idx;
                return (
                  <div
                    key={idx}
                    className={`bg-[#fbfbfb] border rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? "border-[#ff9000] shadow-md" : "border-[#ebebeb]"
                      }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqCol2(isOpen ? null : idx)}
                      className="w-full text-left p-6 w769:p-4 flex items-center justify-between gap-4 cursor-pointer select-none"
                    >
                      <h3 className="font-sans text-[18px] w769:text-[16px] font-semibold text-[#111111] leading-snug">
                        {faq.question}
                      </h3>
                      <span
                        className={`w-7 h-7 flex-shrink-0 flex items-center justify-center transition-transform duration-300 ${isOpen ? "rotate-180 text-[#ff9000]" : "text-[#111111]"
                          }`}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 w769:px-4 w769:pb-4 pt-0">
                        <div className="font-libre text-[15px] w769:text-[14px] text-[#555555] leading-relaxed">
                          {faq.answer}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 10. BEYOND AI SERVICES CAROUSEL */}
      <BeyondServicesCarousel currentCategory="ai-excellence" titleHighlight="AI" />

      {/* 11. CONTACT SECTION */}
      <div id="contact-us">
        <ContactSection />
      </div>
    </main>
  );
}
