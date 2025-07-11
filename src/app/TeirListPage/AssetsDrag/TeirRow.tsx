"use client";  // <-- Add this line at the top

import React from 'react';
import {useDroppable} from '@dnd-kit/core';
import clsx from "clsx";
import { SortableContext } from "@dnd-kit/sortable";
import SortableCard from './SortableCard';
import { Item } from './types';


interface DraggableProps {
  idvalue: string;
  Cards: Item<string>[]
}




export default function TeirRow({ idvalue, Cards}: DraggableProps) {


    
    
    
    const droppable = useDroppable({ id: idvalue, });
    const {setNodeRef, isOver } = droppable;

  return (
          <SortableContext items={Cards}>
            <div className="w-full min-h-20 h-fit flex flex-row p-2 space-x-2">
              <div className={clsx("min-h-20 h-full aspect-square bg-amber-500", { "text-black": isOver })}>asa</div>
              <div ref={setNodeRef} className="flex flex-row min-h-20 w-full flex-wrap h-full bg-amber-100">

                {Cards.map((card) => (
                  <SortableCard key={card.id} id={card.id} name={card.name} />
                ))}

              </div>
            </div>

          </SortableContext>
  );
}
