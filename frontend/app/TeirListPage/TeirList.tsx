"use client";  // <-- Add this line at the top

import Avatar, {genConfig} from 'react-nice-avatar';
import {closestCenter, CollisionDetection, DndContext, DragEndEvent, DragStartEvent, DragOverEvent, getFirstCollision, pointerWithin, rectIntersection, UniqueIdentifier} from '@dnd-kit/core';
import { DragOverlay } from '@dnd-kit/core';
import TeirRow from './AssetsDrag/TeirRow';
import React, { useEffect, useRef, useState, RefObject } from 'react';
import CardHomeBase from './AssetsDrag/CardHomeBase';
import { arrayMove } from '@dnd-kit/sortable';
import { Data } from './AssetsDrag/types';
import throttle from 'lodash.throttle';
import SignalRService from '../../Data/Socket';










type joiners = {
  [userId: string]: {
    name: string;
    avatar: string; // still a string, unless you parse it
    color: string
  };
};

type positions = {
  [userId: string]: {
    xpos: number;
    ypos: number; // still a string, unless you parse it
  };
};

interface props {
  OnlineUsers: joiners
  signalRServiceRef: RefObject<SignalRService | null>
  uniqueID: string | undefined
}


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



export default function TeirList({OnlineUsers, uniqueID, signalRServiceRef}: props) {
  const [GlobalActiveCards, setGlobalActiveCards] = useState<UniqueIdentifier[]>([])
  const [data, setData] = useState<Data<string, string>>(initialData);
  const [Active, SetActive] = useState<UniqueIdentifier | null>()
  const [positions, setpositions] = useState<positions>({})

  useEffect(() => {
    console.log(GlobalActiveCards)
  }, [GlobalActiveCards])



  useEffect(() => {
  }, [positions])

  const sendCursorPosition = throttle((event: MouseEvent) => {
      const x = event.clientX / window.innerWidth;
      const y = event.clientY / window.innerHeight;
      signalRServiceRef.current?.invoke("UpdatePosition", x, y)
  }, 100000); // 50 ms throttle (20 messages/sec)


  function handleNewPositions(Info: positions){
    setpositions(Info)
  }

  function handleDragStarted(activearray: UniqueIdentifier[]){
    setGlobalActiveCards(activearray)
  }


  function handleDragEnded(activearray: UniqueIdentifier[], newData: string){
    setGlobalActiveCards(activearray)
    setData(JSON.parse(newData))
  }


  useEffect(() => {

    window.addEventListener('mousemove', sendCursorPosition);
    signalRServiceRef.current?.on("NewPositions",handleNewPositions)
    signalRServiceRef.current?.on("NewDragged",handleDragStarted)
    signalRServiceRef.current?.on("EndedDrag",handleDragEnded)

    return () => {
    signalRServiceRef.current?.off("NewPositions")
    signalRServiceRef.current?.off("NewDragged")
    signalRServiceRef.current?.off("EndedDrag")

    };
  });


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
    console.log("dragggggggggggg",event.active.id)
    SetActive(event.active.id)
    signalRServiceRef.current?.invoke("handleDragStart", event.active.id)

  }


  function renderOverlay() {


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

    let newdata: Data<string, string> = {}


    const activeColumnId = findColumnId(activeId)
    
    if (!activeColumnId){
      SetActive(null)
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

        newdata = newData
        setData(newData);
      }

    }
    if(Object.keys(newdata).length === 0){
      newdata = data
    }
    signalRServiceRef.current?.invoke("handleDragEnd", event.active.id, JSON.stringify(newdata))
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




      {Object.keys(positions).map((position, index) => {
            let color = "#FFFFFF"

            if(uniqueID === position){
              return null
            }
            if (uniqueID){
              color = OnlineUsers[uniqueID].color
            }
            console.log("colorrr", color)
            const X = positions[position].xpos * window.innerWidth
            const Y = positions[position].ypos * window.innerHeight
        return (




              <svg className=''

                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  position: 'absolute',
                  left: `${X }px`,
                  top: `${Y }px`,
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  pointerEvents: 'none',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 1000
                }}
                key={index}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#CCCCCC"
                  strokeWidth="0.048"
                >
                  <path
                    d="M17.2607 12.4008C19.3774 11.2626 20.4357 10.6935 20.7035 10.0084C20.9359 9.41393 20.8705 8.74423 20.5276 8.20587C20.1324 7.58551 18.984 7.23176 16.6872 6.52425L8.00612 3.85014C6.06819 3.25318 5.09923 2.95471 4.45846 3.19669C3.90068 3.40733 3.46597 3.85584 3.27285 4.41993C3.051 5.06794 3.3796 6.02711 4.03681 7.94545L6.94793 16.4429C7.75632 18.8025 8.16052 19.9824 8.80519 20.3574C9.36428 20.6826 10.0461 20.7174 10.6354 20.4507C11.3149 20.1432 11.837 19.0106 12.8813 16.7454L13.6528 15.0719C13.819 14.7113 13.9021 14.531 14.0159 14.3736C14.1168 14.2338 14.2354 14.1078 14.3686 13.9984C14.5188 13.8752 14.6936 13.7812 15.0433 13.5932L17.2607 12.4008Z"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill={color}
                  />
                </g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M17.2607 12.4008C19.3774 11.2626 20.4357 10.6935 20.7035 10.0084C20.9359 9.41393 20.8705 8.74423 20.5276 8.20587C20.1324 7.58551 18.984 7.23176 16.6872 6.52425L8.00612 3.85014C6.06819 3.25318 5.09923 2.95471 4.45846 3.19669C3.90068 3.40733 3.46597 3.85584 3.27285 4.41993C3.051 5.06794 3.3796 6.02711 4.03681 7.94545L6.94793 16.4429C7.75632 18.8025 8.16052 19.9824 8.80519 20.3574C9.36428 20.6826 10.0461 20.7174 10.6354 20.4507C11.3149 20.1432 11.837 19.0106 12.8813 16.7454L13.6528 15.0719C13.819 14.7113 13.9021 14.531 14.0159 14.3736C14.1168 14.2338 14.2354 14.1078 14.3686 13.9984C14.5188 13.8752 14.6936 13.7812 15.0433 13.5932L17.2607 12.4008Z"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>


              </svg>










        )})}



          <div className='absolute m-4 top-0 left-0 flex flex-col w-32 space-y-4'>
            <div className='flex flex-row items-center justify-center w-full space-x-3'>
              <div className='bg-green-300 rounded-full h-5 w-5'></div>
              <h1 className='font-sans text-lg'>Online</h1>
            </div>

            <div className='w-full h-full space-y-2 flex flex-col items-center justify-center'>
              
              {Object.values(OnlineUsers).map((user, index) => {
                const avatarjson = JSON.parse(user.avatar)
                avatarjson["bgColor"] = user.color
                
                const avatar = genConfig(avatarjson)
                
                return (
                <div className='flex items-center w-full justify-baseline ' key={index}>
                  <Avatar className={`w-16 h-16 mr-2 border border-white`} {...avatar} />
                  <p className="truncate overflow-hidden text-ellipsis whitespace-nowrap w-12">
                    {user.name}
                  </p>
                </div>
              )})}
            </div>
          </div>

      
      <div className="grid-background -z-30"></div>

      <main className=" flex flex-col row-start-1 justify-center items-center w-7xl min-h-full h-fit sm:items-start ">
        <DndContext id="teir-list" onDragEnd={handleDragEnd} onDragStart={handleondragstart} collisionDetection={customDetection} onDragOver={handleDragOver}>





          <div className="pr-32 pl-32 w-full min-h-96 h-fit   flex flex-col items-center justify-center">



            <TeirRow idvalue={data["S"].data} GlobalActiveCards={GlobalActiveCards} Cards={data["S"].children} classname='bg-yellow-500'>

            </TeirRow>
          
            <TeirRow idvalue={data["A"].data} GlobalActiveCards={GlobalActiveCards} Cards={data["A"].children } classname='bg-green-500'>

            </TeirRow>

            <TeirRow idvalue={data["B"].data} GlobalActiveCards={GlobalActiveCards} Cards={data["B"].children} classname='bg-green-700'>

            </TeirRow>

            <TeirRow idvalue={data["C"].data} GlobalActiveCards={GlobalActiveCards} Cards={data["C"].children} classname='bg-orange-500'>

            </TeirRow>

            <TeirRow idvalue={data["D"].data} GlobalActiveCards={GlobalActiveCards} Cards={data["D"].children} classname='bg-orange-700'>

            </TeirRow>

            <TeirRow idvalue={data["F"].data} GlobalActiveCards={GlobalActiveCards}  Cards={data["F"].children} classname='bg-red-500'>

            </TeirRow>


          </div>

        <CardHomeBase idvalue={data["Home"].data} GlobalActiveCards={GlobalActiveCards} Cards={data["Home"].children}></CardHomeBase>


            


          {renderOverlay()}
        </DndContext>

      </main>




      <footer className="row-start-2 flex gap-[24px] flex-wrap items-center justify-center">
        <h1>Created by Eric Asante</h1>

      </footer>
    </div>
  );
}


