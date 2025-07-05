import { useState } from "react";
import NameEntry from "./NameEntry";
import ProfileEntry from "./ProfileEntry";

export default function PlayerForm(){
  const [formsteps, setformsteps] = useState(0);  
  const [PlayerName, setPlayerName] = useState<string>('');  // For example, storing user input

  const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior (page reload)
    console.log(formsteps)

    if (formsteps === 1){
      console.log(PlayerName)
    }

    setformsteps(formsteps + 1)
  };





  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value);
  };

    return(
          <form onSubmit={handleForm} className="flex flex-col w-full h-full items-center  justify-center " action="">

              {formsteps === 0 ? 

                <NameEntry name={PlayerName} event={handleInputChange}></NameEntry>

              : 

                <ProfileEntry></ProfileEntry>

                }

          </form>
    )
}