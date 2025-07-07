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


export default function CardHomeBase({ idvalue, Cards, setCards}: DraggableProps) {


    
    
    
    const droppable = useDroppable({ id: idvalue, });
    const {setNodeRef, isOver } = droppable;
    console.log(droppable)

  return (
          <SortableContext items={Cards}>
            <div ref={setNodeRef} className="flex flex-row w-full min-h-96 h-fit bg-green-300/50">

                {Cards.map((card) => (
                  <SortableCard key={card.id} id={card.id} name={card.name} />
                ))}

            </div>

          </SortableContext>
  );
}
