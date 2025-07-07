"use client";  // <-- Add this line at the top

import {DndContext} from '@dnd-kit/core';
import Draggable from './AssetsDrag/Draggable';
import { DragOverlay } from '@dnd-kit/core';
import TeirRow from './AssetsDrag/TeirRow';
import Card from './AssetsDrag/Card';
import { CardList } from './AssetsDrag/types';
import { useState } from 'react';
import CardHomeBase from './AssetsDrag/CardHomeBase';



export default function Home() {
  const [Scards, setScards] = useState<CardList>([
    {id: 1, name: "Card A"},
    {id: 2, name: "Card B"},
    {id: 3, name: "Card C"},
  ])
  const [Homecards, setHomecards] = useState<CardList>([
    {id: 4, name: "Luffy"},
    {id: 5, name: "Zoro"},
    {id: 6, name: "Sanji"},
  ])



  return (
    <div className="relative grid grid-rows-[1fr_10px] items-center justify-items-center min-h-screen p-8  gap-16  font-sans">
      <div className="grid-background -z-30"></div>




      <main className=" flex flex-col row-start-1 justify-center items-center w-full min-h-full h-fit sm:items-start ">
        <DndContext id="teir-list" onDragEnd={(event) => {
          console.log("active", event.active)
          console.log("over", event.over)

        }}>





          <div className="pr-32 pl-32 w-full min-h-96 h-fit   flex flex-col items-center justify-center">



            <TeirRow idvalue='S' Cards={Scards} setCards={setScards}>

            </TeirRow>
          








          </div>

        <CardHomeBase idvalue={"home"} Cards={Homecards} setCards={setHomecards}></CardHomeBase>


            <DragOverlay>
                <Card id={8} name={"ssa"}></Card>
            </DragOverlay>
            
        </DndContext>

      </main>




      <footer className="row-start-2 flex gap-[24px] flex-wrap items-center justify-center">
        <h1>sdsa</h1>

      </footer>
    </div>
  );
}
