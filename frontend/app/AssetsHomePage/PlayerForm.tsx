import { useState,useEffect } from "react";
import NameEntry from "./NameEntry";
import ProfileEntry from "./ProfileEntry";





interface props {
  formsteps: number 
  setformsteps: React.Dispatch<React.SetStateAction<number>>; 
  PlayerName: string
  setPlayerName:  React.Dispatch<React.SetStateAction<string>>;
  playerAvatar, 
  setPlayerAvatar:  React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
}




export default function PlayerForm({formsteps, setformsteps, PlayerName, setPlayerName, playerAvatar, setPlayerAvatar}: props){

  const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior (page reload)
    setformsteps(formsteps + 1)
  };


    useEffect(() => {
    console.log(PlayerName)
    console.log('playerAvatar updated:', playerAvatar);
    }, [playerAvatar,PlayerName]);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value);
  };

    return(
          <>
          <form onSubmit={handleForm} className="flex flex-col w-full h-full items-center  justify-center " action="">

              {formsteps === 0 ? 

                <NameEntry  name={PlayerName} event={handleInputChange}></NameEntry>

              : formsteps === 1 ?

                <ProfileEntry setavatar={setPlayerAvatar}></ProfileEntry>
              :
                null

              }

          </form>



          </>





    )
}