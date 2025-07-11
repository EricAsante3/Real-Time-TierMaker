"use client";  // <-- Add this line at the top

import React from 'react';
import {useDroppable} from '@dnd-kit/core';
import { SortableContext } from "@dnd-kit/sortable";
import SortableCard from './SortableCard';
import { Item } from './types';


interface DraggableProps {
  idvalue: string;
  Cards: Item<string>[]
}



export default function CardHomeBase({ idvalue, Cards}: DraggableProps) {


    
    
    
    const droppable = useDroppable({ id: idvalue, });
    const {setNodeRef, isOver } = droppable;

  return (
          <SortableContext items={Cards}>
            <div ref={setNodeRef} className=" w-full min-h-96 h-fit  m-0 bg-green-300/50">
                <div className='flex flex-row  flex-wrap w-full h-full bg-amber-500'>

                  {Cards.map((card) => (
                    <SortableCard key={card.id} id={card.id} name={card.name} />
                  ))}

                </div>


            </div>

          </SortableContext>
  );
}
