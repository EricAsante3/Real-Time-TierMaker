"use client";  // <-- Add this line at the top

import React from 'react';
import {useDroppable,UniqueIdentifier} from '@dnd-kit/core';
import { SortableContext} from "@dnd-kit/sortable";
import SortableCard from './SortableCard';
import { Item } from './types';


interface DraggableProps {
  idvalue: string;
  Cards: Item<string>[]
  GlobalActiveCards: UniqueIdentifier[]
}



export default function CardHomeBase({ idvalue, Cards, GlobalActiveCards}: DraggableProps) {


    
    
    
    const droppable = useDroppable({ id: idvalue, });
    const {setNodeRef} = droppable;

  return (
          <SortableContext items={Cards}>
            <div ref={setNodeRef} className="  w-full h-56 m-0 border border-white  ">
                <div className='flex flex-row  flex-wrap w-full h-fit items-center p-2 space-x-2 '>

                  {Cards.map((card) => (
                    <SortableCard GlobalActiveCards={GlobalActiveCards} key={card.id} id={card.id} name={card.name} />
                  ))}

                </div>


            </div>

          </SortableContext>
  );
}
