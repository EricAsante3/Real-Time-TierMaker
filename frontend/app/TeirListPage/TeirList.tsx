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
  { id: "319591-53585-buggy-the-clown.jpg", name: "319591-53585-buggy-the-clown" },
  { id: "814634-vivi.jpg", name: "814634-vivi" },
  { id: "1090020-61600.jpg", name: "1090020-61600" },
  { id: "1152176-current_blackbeard.png", name: "1152176-current_blackbeard" },
  { id: "1153175-lucci.jpg", name: "1153175-lucci" },
  { id: "2434105-render_nicorobin.png", name: "2434105-render_nicrobin" },
  { id: "2434111-473592_sanji_time_skip_1.png", name: "2434111-473592_sanji_time_skip_1" },
  { id: "2434113-chopper_time_skip_2.png", name: "2434113-chopper_time_skip_2" },
  { id: "2434117-473497_brook_timeskip1.png", name: "2434117-473497_brook_timeskip1" },
  { id: "2841730-law.jpg", name: "2841730-law" },
  { id: "3042581-5993700850-Hatto.png", name: "3042581-5993700850-Hatto" },
  { id: "3044479-9455687908-Kaku_.png", name: "3044479-9455687908-Kaku" },
  { id: "3056239-7978640494-Jinbe.png", name: "3056239-7978640494-Jinbe" },
  { id: "5307627-2542054701-latest.png", name: "5307627-2542054701-latest" },
  { id: "5871669-66fe3267-f7ee-405d-c083-9f3e6e5f00f9.png", name: "5871669-66fe3267-f7ee-405d-c083-9f3e6e5f00f9" },
  { id: "5895735-c91f4ecc-6492-4212-c284-9cfaacff994a.jpg", name: "5895735-c91f4ecc-6492-4212-c284-9cfaacff994a" },
  { id: "7078589-6540662132-latest.png", name: "7078589-6540662132-latest" },
  { id: "7078592-4966747295-latest.png", name: "7078592-4966747295-latest" },
  { id: "7078991-3720139327-unkno.png", name: "7078991-3720139327-unkno" },
  { id: "7079118-6306836166-Scree.jpg", name: "7079118-6306836166-Scree" },
  { id: "7079191-0722026288-unkno.png", name: "7079191-0722026288-unkno" },
  { id: "7079389-7485116704-unkno.png", name: "7079389-7485116704-unkno" },
  { id: "7079988-1235599403-Scree.jpg", name: "7079988-1235599403-Scree" },
  { id: "7080185-3598363858-Scree.jpg", name: "7080185-3598363858-Scree" },
  { id: "7080194-7382724028-unkno.png", name: "7080194-7382724028-unkno" },
  { id: "7080201-7164581366-unkno.png", name: "7080201-7164581366-unkno" },
  { id: "7080202-1635462455-unkno.png", name: "7080202-1635462455-unkno" },
  { id: "7080203-3155899631-unkno.png", name: "7080203-3155899631-unkno" },
  { id: "7080204-8435747647-unkno.png", name: "7080204-8435747647-unkno" },
  { id: "7080205-0870339526-unkno.png", name: "7080205-0870339526-unkno" },
  { id: "7097941-volume_94 (1) - kopya.png", name: "7097941-volume_94 (1) - kopya" },
  { id: "7097956-0655-008.jpg", name: "7097956-0655-008" },
  { id: "7097959-0719212084-unkno.png", name: "7097959-0719212084-unkno" },
  { id: "7097964-0795-016.png", name: "7097964-0795-016" }
      ],
    }
  };



export default function TeirList({OnlineUsers, signalRServiceRef}: props) {
  const [GlobalActiveCards, setGlobalActiveCards] = useState<Record<string, UniqueIdentifier>>({})
  const [data, setData] = useState<Data<string, string>>(initialData);
  const [Active, SetActive] = useState<UniqueIdentifier | null>()
  const [positions, setpositions] = useState<positions>({})




  const [uniqueID, setuniqueID] = useState<string>();








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

  function handleDragStarted(activearray: Record<string, UniqueIdentifier>){
    console.log("aaaaaaaaaaaaaaa",activearray)
    setGlobalActiveCards(activearray)
  }


  function handleDragEnded(activearray: Record<string, UniqueIdentifier>, newData: string){
    setGlobalActiveCards(activearray)
    setData(JSON.parse(newData))
  }


  useEffect(() => {

    window.addEventListener('mousemove', sendCursorPosition);
    signalRServiceRef.current?.on("NewPositions",handleNewPositions)
    signalRServiceRef.current?.on("NewDragged",handleDragStarted)
    signalRServiceRef.current?.on("EndedDrag",handleDragEnded)
    signalRServiceRef.current?.on("JoinConfirmation", (value: string, currentcardstate: string) => {
    setuniqueID(value)
        if (currentcardstate.length > 0){
          setData(JSON.parse(currentcardstate))
        }
      })


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


    return <DragOverlay > <div style={{ backgroundImage: `url('/images/${Active}')`}} className='bg-no-repeat bg-contain bg-center h-20 w-20  text-black'></div></DragOverlay>
    

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
    signalRServiceRef.current?.invoke("handleDragEnd", JSON.stringify(newdata))
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
            if (position){
              color = OnlineUsers[position] ? OnlineUsers[position].color : "#FFFFFF"
            }
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



            <TeirRow   OnlineUsers={OnlineUsers} idvalue={data["S"].data} GlobalActiveCards={GlobalActiveCards} Cards={data["S"].children} classname='bg-yellow-500'>

            </TeirRow>
          
            <TeirRow OnlineUsers={OnlineUsers} idvalue={data["A"].data} GlobalActiveCards={GlobalActiveCards} Cards={data["A"].children } classname='bg-green-500'>

            </TeirRow>

            <TeirRow OnlineUsers={OnlineUsers} idvalue={data["B"].data} GlobalActiveCards={GlobalActiveCards} Cards={data["B"].children} classname='bg-green-700'>

            </TeirRow>

            <TeirRow OnlineUsers={OnlineUsers} idvalue={data["C"].data} GlobalActiveCards={GlobalActiveCards} Cards={data["C"].children} classname='bg-orange-500'>

            </TeirRow>

            <TeirRow OnlineUsers={OnlineUsers} idvalue={data["D"].data} GlobalActiveCards={GlobalActiveCards} Cards={data["D"].children} classname='bg-orange-700'>

            </TeirRow>

            <TeirRow OnlineUsers={OnlineUsers} idvalue={data["F"].data} GlobalActiveCards={GlobalActiveCards}  Cards={data["F"].children} classname='bg-red-500'>

            </TeirRow>


          </div>

        <CardHomeBase OnlineUsers={OnlineUsers} idvalue={data["Home"].data} GlobalActiveCards={GlobalActiveCards} Cards={data["Home"].children}></CardHomeBase>


            


          {renderOverlay()}
        </DndContext>

      </main>




      <footer className="row-start-2 flex flex-wrap items-center justify-center">
        <h1>Created by Eric Asante</h1>

      </footer>
    </div>
  );
}


