interface info {
  name: string;
  event: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


export default function NameEntry({ name, event }: info) {    
    return(
            <div className="flex flex-col items-center justify-center w-full h-full space-y-4 sm:space-y-8">
                <h1 className="text-center text-foreground text-3xl font-mono  font-semibold tracking-widest sm:text-6xl">Player Name</h1>
                <input value={name} onChange={event}  className="text-xl text-center text-background rounded bg-foreground border-0 outline-none p-2 focus:ring-0 font-sans w-1/2 h-12 sm:h-16" type="text" id="PlayerName" placeholder="Enter Player Name" /> 
            </div>
    );
}
