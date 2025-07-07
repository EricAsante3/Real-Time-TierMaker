"use client";  // <-- Add this line at the top

import React from 'react';
import {useDroppable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import { CardList } from './types';
import Card from './Card';
import clsx from "clsx";
import { SortableContext } from "@dnd-kit/sortable";
import SortableCard from './SortableCard';
import { DragOverlay } from '@dnd-kit/core';

interface DraggableProps {
  idvalue: string;
  Cards: CardList
  setCards: React.Dispatch<React.SetStateAction<CardList>>;
}


export default function TeirRow({ idvalue, Cards, setCards}: DraggableProps) {


    
    
    
    const droppable = useDroppable({ id: idvalue, });
    const {setNodeRef, isOver } = droppable;
    console.log(droppable)

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
