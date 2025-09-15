import { gsap } from "gsap";
import { ScrollTrigger, SplitText, ScrollSmoother } from "gsap/all";
import { useGSAP } from "@gsap/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Cocktails from "./components/Cocktails";
import About from "./components/About";
import Art from "./components/Art";
import Menu from "./components/Menu";
import Contact from "./components/Contact";

// Register all GSAP plugins including ScrollSmoother for enhanced scroll experience
gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

const App = () => {
  // Initialize ScrollSmoother with useGSAP hook for optimal performance
  useGSAP(() => {
    // Create ScrollSmoother instance with optimized settings for this cocktail website
    ScrollSmoother.create({
      smooth: 2, // Smooth scrolling intensity (1-3, where 2 provides good balance for complex animations)
      effects: true, // Enable effects for parallax animations (leaf movements, video scrubbing)
      normalizeScroll: true, // Normalize scroll behavior across different devices and browsers
      ignoreMobileResize: true, // Prevent layout issues on mobile orientation changes
    });
  });

  return (
    <main>
      {/* Fixed navigation that stays on top during scroll */}
      <Navbar />

      {/* ScrollSmoother wrapper - required structure for smooth scrolling to work */}
      <div id="smooth-wrapper">
        {/* ScrollSmoother content container - all scrollable content goes here */}
        <div id="smooth-content">
          {/* Hero section with video background and title animations */}
          <Hero />

          {/* Cocktails section with drink listings and decorative elements */}
          <Cocktails />

          {/* About section with image grid and rating information */}
          <About />

          {/* Art section with mask animations and feature lists */}
          <Art />

          {/* Menu section with interactive cocktail carousel */}
          <Menu />

          {/* Contact section with location and social information */}
          <Contact />
        </div>
      </div>
    </main>
  );
};

export default App;
