"use client";  // <-- Add this line at the top

import {closestCenter, CollisionDetection, DndContext, DragEndEvent, DragStartEvent, DragOverEvent, getFirstCollision, pointerWithin, rectIntersection, UniqueIdentifier} from '@dnd-kit/core';
import Draggable from './AssetsDrag/Draggable';
import { DragOverlay } from '@dnd-kit/core';
import TeirRow from './AssetsDrag/TeirRow';
import Card from './AssetsDrag/Card';
import { CardList } from './AssetsDrag/types';
import React, { useRef, useState } from 'react';
import CardHomeBase from './AssetsDrag/CardHomeBase';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { Data } from './AssetsDrag/types';




  const initialData: Data<string, string> = {
    ["S"]: {
      data: "S",
      children: [
      ],
    },

    ["A"]: {
      data: "A",
      children: [
      ],
    },

    ["B"]: {
      data: "B",
      children: [
      ],
    },

    ["C"]: {
      data: "C",
      children: [
      ],
    },

    ["D"]: {
      data: "D",
      children: [
      ],
    },


    ["F"]: {
      data: "F",
      children: [
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



export default function TeirList() {
  const [data, setData] = useState<Data<string, string>>(initialData);
  const [Active, SetActive] = useState<UniqueIdentifier | null>()

  const lastoverid = useRef<UniqueIdentifier | null>(null)







  function findColumnId(id: UniqueIdentifier) {
    if (data[id]) {
      return id;
  }


    const activeColumnId = Object.keys(data).find((columnId) =>
      data[columnId].children.some((item) => item.id === id)
    );


    return activeColumnId;
  }



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



    const intersection = 
      pointerWithinList.length > 0 ? pointerWithinList : rectIntersectionList

    let overId = getFirstCollision(intersection, "id")
    console.log("overid", overId)
    
    if (overId) {

      if (data[overId]) {
        const columItems = data[overId].children

        if (columItems.length > 0){
          const newDropContainer = args.droppableContainers.filter(droppable => droppable.id !== overId && columItems.find(item => item.id === droppable.id))
          const clostestbycenter = closestCenter({...args, droppableContainers: newDropContainer})
          overId = clostestbycenter[0].id
        }


      }

      lastoverid.current = overId
      return [ { id: overId } ]
    }
    
    return lastoverid.current ? [ { id: lastoverid.current } ] : []

  }

  function handleDragEnd(event: DragEndEvent) {
    const activeId = event.active.id
    const overId = event.over?.id


    const activeColumnId = findColumnId(activeId)
    
    if (!activeColumnId){
      SetActive(null)
      console.log("sasa")
      return
    }

    if (!overId){
      SetActive(null)
      return
    }

    const overColumnId = findColumnId(overId)

    if (overColumnId && activeColumnId && activeColumnId === overColumnId){

      const activeIndex = data[activeColumnId].children.findIndex(
        (item) => item.id === activeId
      );

      const overIndex = data[overColumnId].children.findIndex(
        (item) => item.id === overId
      );

      if (activeIndex !== overIndex) {
        setData((data) => {
          const newOverColumnChildren = arrayMove(
            data[overColumnId].children,
            activeIndex,
            overIndex
          );

          const newData = {
            ...data,
            [overColumnId]: {
              ...data[overColumnId],
              children: newOverColumnChildren,
            },
          };

          return newData;
        });
      }

    }

    
    SetActive(null)
  }






  function handleDragOver({ active, over }: DragOverEvent) {
      const overId = over?.id;
      const activeId = active.id;
      if (!overId || activeId in data) {
        return;
      }
      const activeColumnId = findColumnId(activeId);
      const overColumnId = findColumnId(overId);

      // Handle dragging an item from one column to another
      if (activeColumnId && overColumnId && activeColumnId !== overColumnId) {
        setData((data) => {
          const activeItems = data[activeColumnId].children;
          const overItems = data[overColumnId].children;

          const activeIndex = activeItems.findIndex(
            (item) => item.id === activeId
          );
          const overIndex = overItems.findIndex((item) => item.id === overId);

          let newIndex: number;

        // (Custom collision algorithm returns a column ID as overId only if the column has no items)
        if (overId in data) {
          newIndex = overItems.length + 1; // add one for working with Array.prototype.slice later easily
        } else {
          // over an item, need to check if the dragging item is below or above
          // the over item
          const isBelowOverItem =
            over &&
            active.rect.current.translated &&
            active.rect.current.translated.top >
              over.rect.top + over.rect.height;
          const modifier = isBelowOverItem ? 1 : 0;

          newIndex =
            overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
        }

        return {
          ...data,
          [activeColumnId]: {
            ...data[activeColumnId],
            children: activeItems.filter((item) => item.id !== activeId),
          },
          [overColumnId]: {
            ...data[overColumnId],
            children: [
              ...overItems.slice(0, newIndex),
              activeItems[activeIndex],
              ...overItems.slice(newIndex),
            ],
          },
        };
      });
    }
  }




  return (
    <div className=" h-full w-full relative grid grid-rows-[1fr_10px] items-center justify-items-center min-h-screen p-8  gap-16  font-sans">
      <div className="grid-background -z-30"></div>

      <main className="relative flex flex-col row-start-1 justify-center items-center w-full min-h-full h-fit sm:items-start ">
        <DndContext id="teir-list" onDragEnd={handleDragEnd} onDragStart={handleondragstart} collisionDetection={customDetection} onDragOver={handleDragOver}>


          <div className='absolute top-0 left-0 flex flex-col'>
            <div className='flex flex-row items-center justify-center space-x-3'>
              <div className='bg-green-300 rounded-full h-5 w-5'></div>
              <h1 className='font-sans text-lg'>Online</h1>
            </div>

            <div className=''>
              sad

            </div>
          </div>


          <div className="pr-32 pl-32 w-full min-h-96 h-fit   flex flex-col items-center justify-center">



            <TeirRow idvalue={data["S"].data} Cards={data["S"].children}>

            </TeirRow>
          
            <TeirRow idvalue={data["A"].data} Cards={data["A"].children}>

            </TeirRow>

            <TeirRow idvalue={data["B"].data} Cards={data["B"].children}>

            </TeirRow>

            <TeirRow idvalue={data["C"].data} Cards={data["C"].children}>

            </TeirRow>

            <TeirRow idvalue={data["D"].data} Cards={data["D"].children}>

            </TeirRow>

            <TeirRow idvalue={data["F"].data} Cards={data["F"].children}>

            </TeirRow>


          </div>

        <CardHomeBase idvalue={data["Home"].data} Cards={data["Home"].children}></CardHomeBase>


            


          {renderOverlay()}
        </DndContext>

      </main>




      <footer className="row-start-2 flex gap-[24px] flex-wrap items-center justify-center">
        <h1>Created by Eric Asante</h1>

      </footer>
    </div>
  );
}
