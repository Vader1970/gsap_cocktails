"use client";

import { allCocktails } from "../../constants/index.js";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Menu = () => {
  // Reference to content element for potential future animations
  const contentRef = useRef();
  // State to track which cocktail is currently displayed
  const [currentIndex, setCurrentIndex] = useState(0);

  useGSAP(() => {
    // Animate the cocktail name title fading in
    gsap.fromTo("#title", { opacity: 0 }, { opacity: 1, duration: 1 });

    // Animate the cocktail image sliding in from the left
    gsap.fromTo(
      ".cocktail img",
      { opacity: 0, xPercent: -100 }, // Start invisible and 100% to the left
      {
        xPercent: 0, // End at normal position
        opacity: 1, // End fully visible
        duration: 1,
        ease: "power1.inOut",
      }
    );

    // Animate the cocktail title sliding up from bottom
    gsap.fromTo(
      ".details h2",
      { yPercent: 100, opacity: 0 }, // Start 100% below and invisible
      {
        yPercent: 0, // End at normal position
        opacity: 100, // End fully visible
        ease: "power1.inOut",
      }
    );

    // Animate the cocktail description sliding up from bottom
    gsap.fromTo(
      ".details p",
      { yPercent: 100, opacity: 0 }, // Start 100% below and invisible
      {
        yPercent: 0, // End at normal position
        opacity: 100, // End fully visible
        ease: "power1.inOut",
      }
    );

    // Create scroll-triggered parallax animation for decorative leaf elements
    // Same effect as Hero section but with different leaf images
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#menu", // Element that triggers the animation
          start: "top top", // Animation starts when top of element hits top of viewport
          end: "bottom top", // Animation ends when bottom of element hits top of viewport
          scrub: true, // Animation is tied directly to scroll position
        },
      })
      .to("#m-right-leaf", { y: 200 }, 0) // Right leaf moves down 200px
      .to("#m-left-leaf", { y: -200 }, 0); // Left leaf moves up 200px
  }, [currentIndex]); // Re-run animations when cocktail changes

  // Get total number of cocktails for navigation calculations
  const totalCocktails = allCocktails.length;

  // Navigate to a specific cocktail slide with wraparound logic
  const goToSlide = (index) => {
    // Use modulo to create infinite loop (wraps around from last to first)
    const newIndex = (index + totalCocktails) % totalCocktails;
    setCurrentIndex(newIndex);
  };

  // Get cocktail at a specific offset from current position
  // Used to get previous/next cocktails for navigation buttons
  const getCocktailAt = (indexOffset) => {
    return allCocktails[
      (currentIndex + indexOffset + totalCocktails) % totalCocktails
    ];
  };

  // Get the three cocktails needed for display: current, previous, and next
  const currentCocktail = getCocktailAt(0); // Currently displayed cocktail
  const prevCocktail = getCocktailAt(-1); // Previous cocktail (for left arrow)
  const nextCocktail = getCocktailAt(1); // Next cocktail (for right arrow)

  return (
    <section
      id="menu"
      aria-labelledby="menu-heading"
      className="overflow-y-hidden"
    >
      {/* Decorative leaf elements with parallax scroll animation */}
      <img
        src="/images/slider-left-leaf.webp"
        alt="left-leaf"
        id="m-left-leaf"
      />
      <img
        src="/images/slider-right-leaf.webp"
        alt="right-leaf"
        id="m-right-leaf"
      />

      {/* Screen reader only heading for accessibility */}
      <h2 id="menu-heading" className="sr-only">
        Cocktail Menu
      </h2>

      {/* Navigation tabs for each cocktail */}
      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {allCocktails.map((cocktail, index) => {
          const isActive = index === currentIndex;

          return (
            <button
              key={cocktail.id}
              className={`
				${isActive ? "text-white border-white" : "text-white/50 border-white/50"}
			 `}
              onClick={() => goToSlide(index)}
            >
              {cocktail.name}
            </button>
          );
        })}
      </nav>

      {/* Main content area with navigation and cocktail display */}
      <div className="content">
        {/* Navigation arrows showing previous/next cocktail names */}
        <div className="arrows">
          {/* Previous cocktail button */}
          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex - 1)}
            aria-label={`Previous cocktail: ${prevCocktail.name}`}
          >
            <span>{prevCocktail.name}</span>
            <img
              src="/images/right-arrow.webp"
              alt="right-arrow"
              aria-hidden="true"
            />
          </button>

          {/* Next cocktail button */}
          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex + 1)}
            aria-label={`Next cocktail: ${nextCocktail.name}`}
          >
            <span>{nextCocktail.name}</span>
            <img
              src="/images/left-arrow.webp"
              alt="left-arrow"
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Current cocktail image display */}
        <div className="cocktail">
          <img
            src={currentCocktail.image}
            alt={currentCocktail.name}
            className="object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Cocktail information and recipe details */}
        <div className="recipe">
          {/* Recipe header with cocktail name */}
          <div ref={contentRef} className="info">
            <p>Recipe for:</p>
            <p id="title">{currentCocktail.name}</p>
          </div>

          {/* Cocktail details (title and description) */}
          <div className="details">
            <h2>{currentCocktail.title}</h2>
            <p>{currentCocktail.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Menu;
