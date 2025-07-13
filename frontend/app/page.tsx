"use client";  // <-- Add this line at the top

import TeirList from "./TeirListPage/TeirList";
import { useEffect, useRef, useState } from "react";
import SignalRService from "../Data/Socket";


import PlayerForm from "./AssetsHomePage/PlayerForm";

type joiners = {
  [userId: string]: {
    name: string;
    avatar: string; // still a string, unless you parse it
    color: string; // still a string, unless you parse it

  };
};


export default function Home() {
  const [uniqueID, setuniqueID] = useState<string>();
  const [OnlineUsers, setOnlineUsers] = useState<joiners>({});
  

  function handleNewjoiners(ClientsInfo: joiners){
    console.log("Testinggggg",ClientsInfo)
    setOnlineUsers(ClientsInfo)
  }


  const signalRServiceRef = useRef<SignalRService | null>(null);


  useEffect(() => {
    if (!(signalRServiceRef.current)){
      const service = new SignalRService("3443");
      signalRServiceRef.current = service;
      service.on("NewJoiner", handleNewjoiners)
      service.on("JoinConfirmation", (value: string) => {setuniqueID(value)})

    }


    
    return () => {

    };
  }, []);




    const [formsteps, setformsteps] = useState(0);  
    const [PlayerName, setPlayerName] = useState<string>('');
    const [playerAvatar, setPlayerAvatar] = useState<Record<string, unknown>>({});

    useEffect(() => {
      if (!(formsteps < 2)) {
        if(signalRServiceRef.current){
        signalRServiceRef.current.invoke("Join", PlayerName, JSON.stringify(playerAvatar))}
        console.log("Playerr", playerAvatar)
      }
    }, [playerAvatar])



    console.log(playerAvatar)

  return (
    <>
    { formsteps < 2 ?

    
    <div className="relative grid grid-rows-[10px_1fr_10px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans">
      <div className="grid-background -z-30"></div>
      <main className=" flex flex-col row-start-2 items-center sm:items-start w-full h-full">

        <PlayerForm formsteps={formsteps} setformsteps={setformsteps} PlayerName={PlayerName} setPlayerName={setPlayerName} playerAvatar={playerAvatar} setPlayerAvatar={setPlayerAvatar}>

        </PlayerForm>

      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">


      </footer>
    </div> : 
      
    <TeirList uniqueID={uniqueID} OnlineUsers={OnlineUsers} signalRServiceRef={signalRServiceRef}></TeirList>}

    
    </>
  );
}
