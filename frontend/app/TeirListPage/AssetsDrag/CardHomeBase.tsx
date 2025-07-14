"use client";  // <-- Add this line at the top

import React from 'react';
import {useDroppable,UniqueIdentifier} from '@dnd-kit/core';
import { SortableContext} from "@dnd-kit/sortable";
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
  OnlineUsers: joiners
}



export default function CardHomeBase({ idvalue, Cards, GlobalActiveCards, OnlineUsers}: DraggableProps) {


    
    
    
    const droppable = useDroppable({ id: idvalue, });
    const {setNodeRef} = droppable;

  return (
          <SortableContext items={Cards}>
            <div ref={setNodeRef} className="  w-full h-fit m-0 border border-white  ">
                <div className='flex flex-row  flex-wrap w-full h-fit items-center p-2 space-x-2 '>

                  {Cards.map((card) => (
                    <SortableCard OnlineUsers={OnlineUsers} GlobalActiveCards={GlobalActiveCards} key={card.id} id={card.id} name={card.name} />
                  ))}

                </div>


            </div>

          </SortableContext>
  );
}
