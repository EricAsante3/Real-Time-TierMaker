"use client";  // <-- Add this line at the top

import Image from "next/image";
import { useState } from "react";
import PlayerForm from "./AssetsHomePage/PlayerForm";



export default function Home() {





  return (
    <div className="relative grid grid-rows-[10px_1fr_10px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans">
      <div className="grid-background -z-30"></div>
      <main className=" flex flex-col row-start-2 items-center sm:items-start w-full h-full">

        <PlayerForm></PlayerForm>

      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">


      </footer>
    </div>
  );
}
