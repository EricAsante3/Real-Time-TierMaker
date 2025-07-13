"use client";  // <-- Add this line at the top

import React from 'react';
import {UniqueIdentifier, useDroppable} from '@dnd-kit/core';
import clsx from "clsx";
import { SortableContext } from "@dnd-kit/sortable";
import SortableCard from './SortableCard';
import { Item } from './types';

type joiners = {
  [userId: string]: {
    name: string;
    avatar: string; // still a string, unless you parse it
    color: string
  };
};



interface DraggableProps {
  idvalue: string;
  Cards: Item<string>[]
  GlobalActiveCards: Record<string, UniqueIdentifier>
  classname: string; // Optional className prop
  OnlineUsers: joiners

}




export default function TeirRow({ idvalue, Cards,GlobalActiveCards, classname, OnlineUsers}: DraggableProps) {


    
    
    
    const droppable = useDroppable({ id: idvalue, });
    const {setNodeRef, isOver } = droppable;

  return (
          <SortableContext items={Cards}>
            <div className="w-full  min-h-20 h-fit flex flex-row p-2 space-x-2">
              <div className={clsx("min-h-20 h-full flex items-center justify-center aspect-square font-sans text-4xl", { "text-black": isOver }, classname)}>
              <h1>
                {idvalue}
              </h1>

              </div>
              <div ref={setNodeRef} className="flex flex-row min-h-20 w-full flex-wrap h-full items-center p-2 space-x-2 border border-white ">

                {Cards.map((card) => (
                  <SortableCard OnlineUsers={OnlineUsers} GlobalActiveCards={GlobalActiveCards} key={card.id} id={card.id} name={card.name} />
                ))}

              </div>
            </div>

          </SortableContext>
  );
}
