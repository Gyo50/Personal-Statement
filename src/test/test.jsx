import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./styles.css";

const Test = () => {
  const cards = Array.from({ length: 6 }, (_, i) => i + 1);
  const [rotation, setRotation] = useState(0);
  const [activeCard, setActiveCard] = useState(null);

  const handleScroll = (event) => {
    setRotation((prev) => prev + (event.deltaY > 0 ? -60 : 60));
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

  return (
    <div className="scene">
      <motion.div
        className="container"
        animate={{ rotateY: rotation }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {cards.map((i) => (
          <div
            key={i}
            className={`card ${activeCard === i ? "active" : ""}`}
            style={{ "--i": i }}
            onClick={() => setActiveCard(activeCard === i ? null : i)}
          >
            {i}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Test;
