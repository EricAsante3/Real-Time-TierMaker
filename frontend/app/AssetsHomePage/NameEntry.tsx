import { motion } from "framer-motion";


interface info {
  name: string;
  event: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


export default function NameEntry({ name, event }: info) {    
    return(
            <div className="flex flex-col items-center justify-center w-full h-full space-y-4 sm:space-y-8">
                <motion.h1 
                
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1,      // Duration of 1 second
                    ease: "easeOut",  // Smooth out at the end
                  }}
                
                className="text-center text-foreground text-3xl font-mono  font-semibold tracking-widest sm:text-6xl">Player Name</motion.h1>
                <motion.input 
                
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 1,
                    duration: 1,      // Duration of 1 second
                    ease: "easeOut",  // Smooth out at the end
                  }}
                
                value={name} onChange={event}  className="text-xl text-center text-background rounded bg-foreground border-0 outline-none p-2 focus:ring-0 font-sans w-1/2 h-12 sm:h-16" type="text" id="PlayerName" placeholder="Enter Player Name" /> 
            </div>
    );
}
