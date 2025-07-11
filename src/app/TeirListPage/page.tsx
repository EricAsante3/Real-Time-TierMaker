"use client";  // <-- Add this line at the top

import {CollisionDetection, DndContext, DragStartEvent, pointerWithin, rectIntersection, UniqueIdentifier} from '@dnd-kit/core';
import Draggable from './AssetsDrag/Draggable';
import { DragOverlay } from '@dnd-kit/core';
import TeirRow from './AssetsDrag/TeirRow';
import Card from './AssetsDrag/Card';
import { CardList } from './AssetsDrag/types';
import React, { useState } from 'react';
import CardHomeBase from './AssetsDrag/CardHomeBase';
import { SortableContext } from '@dnd-kit/sortable';
import { Data } from './AssetsDrag/types';




  const initialData: Data<string, string> = {
    ["S"]: {
      data: "S",
      children: [
        { id: "todo-item-1", name: "Todo 1" },
        { id: "todo-item-2", name: "Todo 2" },
        { id: "todo-item-3", name: "Todo 3" },
        { id: "todo-item-4", name: "Todo 4" },
      ],
    },

    ["Home"]: {
      data: "Home",
      children: [
        { id: "in-progress-item-1", name: "In progress 1" },
        { id: "in-progress-item-2", name: "In progress 2" },
        { id: "in-progress-item-3", name: "In progress 3" },
      ],
    }
  };



export default function Home() {
  const [data, setData] = useState<Data<string, string>>(initialData);
  const [Active, SetActive] = useState<UniqueIdentifier>()

  const [Scards, setScards] = useState<CardList>([
    {id: 1, name: "Card A"},
    {id: 2, name: "Card B"},
    {id: 3, name: "Card C"},
  ])
  const [Homecards, setHomecards] = useState<CardList>(
    [
  {id: 4, name: "Luffy"},
  {id: 5, name: "Zoro"},
  {id: 6, name: "Sanji"},
  {id: 7, name: "Nami"},
  {id: 8, name: "Usopp"},

]
  )











  function handleondragstart(event:  DragStartEvent){
    SetActive(event.active.id)
    console.log(event.active.id)
    console.log(Object.keys(data))
  }


  function renderOverlay() {

    let content: React.ReactNode = null;

    return <DragOverlay> <div className='bg-red-400'>{Active}</div></DragOverlay>
    
  }


  const customDetection : CollisionDetection = (args) => {

    const pointerWithinList = pointerWithin(args)
    const rectIntersectionList = rectIntersection(args)

    console.log("pointerWithinList", pointerWithinList)
    console.log("rectIntersectionList", rectIntersectionList)

    const intersection = 
      pointerWithinList.length > 0 ? pointerWithinList : rectIntersectionList

    return [ ...intersection ]

  }

  return (
    <div className="relative grid grid-rows-[1fr_10px] items-center justify-items-center min-h-screen p-8  gap-16  font-sans">
      <div className="grid-background -z-30"></div>




      <main className=" flex flex-col row-start-1 justify-center items-center w-full min-h-full h-fit sm:items-start ">
        <DndContext id="teir-list" onDragEnd={(event) => {
          console.log("active", event.active)
          console.log("over", event.over)

        }} onDragStart={handleondragstart} collisionDetection={customDetection}>





          <div className="pr-32 pl-32 w-full min-h-96 h-fit   flex flex-col items-center justify-center">



            <TeirRow idvalue={data["S"].data} Cards={data["S"].children}>

            </TeirRow>
          








          </div>

        <CardHomeBase idvalue={data["Home"].data} Cards={data["Home"].children}></CardHomeBase>


            


          {renderOverlay()}
        </DndContext>

      </main>




      <footer className="row-start-2 flex gap-[24px] flex-wrap items-center justify-center">
        <h1>sdsa</h1>

      </footer>
    </div>
  );
}
