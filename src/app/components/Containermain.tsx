"use client"

import Emerald from "./emerald";
import Paragraph from "./paragraph";


export default function Navbar() {
    const para="Your path to the Perfect University. Find your dream college with ease and embark on a journey of growth and discovery!"
    return (
        <main id="aboutme" className=" container italic mx-auto  dark:text-white  max-w-4xl h-30 max-h-300 text-5xl font-bold   ">
  <div className="grid grid-cols-12 items-center">
  <div className="col-span-6 text-left text-3xl px-5 ">
    <Paragraph value={para} />
   
  </div>
  <div className="col-span-6 flex justify-center">
    <Emerald />
  </div>
        
</div>

        
            </main>

    );
  }
  