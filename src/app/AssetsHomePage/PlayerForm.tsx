import { useState,useEffect } from "react";
import NameEntry from "./NameEntry";
import ProfileEntry from "./ProfileEntry";

export default function PlayerForm(){
    const [formsteps, setformsteps] = useState(0);  
    const [PlayerName, setPlayerName] = useState<string>('');
    const [playerAvatar, setPlayerAvatar] = useState<Record<string, unknown>>({});

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
          <form onSubmit={handleForm} className="flex flex-col w-full h-full items-center  justify-center " action="">

              {formsteps === 0 ? 

                <NameEntry  name={PlayerName} event={handleInputChange}></NameEntry>

              : 

                <ProfileEntry setavatar={setPlayerAvatar}></ProfileEntry>

                }

          </form>
    )
}