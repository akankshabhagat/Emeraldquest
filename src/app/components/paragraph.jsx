'use client';

import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export default function Paragraph({ value }) {
  const element = useRef(null); // Create a ref to keep a reference to the DOM element
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ["start 0.9", "start 0.25"] // Define the scroll offset
  });

  const words = value.split(" "); // Split the value into individual words

  return (
    <div className="p-8">
      <p
        className=" italic font-bold flex flex-wrap"
        ref={element}
      >
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + (1 / words.length);
          return (
            <Word key={i} child={word} range={[start, end]} progress={scrollYProgress} />
          );
        })}
      </p>

   
  
    </div>
  );
}

const Word = ({ child, range, progress }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="  italic  p-1 relative ">
    <span className=" shadow-md ">
    <motion.span 
      className=" opacity-10 " 
      style={{ opacity }}
    >
      {child}
    </motion.span>
    </span></span>
  );
};