import Avatar, {genConfig} from 'react-nice-avatar';

interface info {
  name: string;
  event: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


export default function ProfileEntry() {
    const Kyla = genConfig({
    sex: "woman",
    faceColor: "#6d3800",
    earSize: "small",
    eyeStyle: "circle",
    noseStyle: "short",
    mouthStyle: "smile",
    shirtStyle: "hoody",
    glassesStyle: "round",
    hairColor: "#000000",
    hairStyle: "womanShort",
    hatStyle: "none",
    hatColor: "#000000",
    bgColor: "linear-gradient(135deg, #009B3A, #FED100, #000000)", // saffron-white-green (Indian flag)
  })




    const Me = genConfig({
    sex: "man",
    faceColor: "#3c2004",
    earSize: "small",
    eyeStyle: "oval",
    noseStyle: "round",
    mouthStyle: "peace",
    shirtStyle: "polo",
    glassesStyle: "none",
    hairColor: "#000000",
    hairStyle: "womanShort",
    hatStyle: "beanie",
    hatColor: "#000000",
    bgColor: "linear-gradient(135deg, #EF3340, #FFD100, #009739)", // saffron-white-green (Indian flag)
  })


    const Colin = genConfig({
    sex: "man",
    faceColor: "#F9C9B6",
    earSize: "small",
    eyeStyle: "smile",
    noseStyle: "short",
    mouthStyle: "laugh",
    shirtStyle: "short",
    glassesStyle: "none",
    hairColor: "#000000",
    hairStyle: "thick",
    hatStyle: "none",
    hatColor: "#000000",
    bgColor: "linear-gradient(135deg, #0032A0, #BF0D3E, #FFFFFF, #FED141)", // saffron-white-green (Indian flag)
  })





    const Ethan = genConfig({
    sex: "man", // or "woman"
    faceColor: "#8D5524", // medium/dark brown skin tone
    earSize: "small",
    glassesStyle: "none",
    eyeStyle: "oval",
    noseStyle: "short",
    mouthStyle: "smile",
    shirtStyle: "hoody",
    shirtColor: "#FF9933", // saffron (Indian flag color)
    bgColor: "linear-gradient(135deg, #FF9933, #FFFFFF, #138808)", // saffron-white-green (Indian flag)
    hairColor: "#000000",
    hairStyle: "thick", // "womanLong" for female
    hatStyle: "none",
  })

    const config5 = genConfig({


  })


    return(
              <div className="flex flex-col items-center justify-center w-full h-full space-y-4 sm:space-y-8">

                <h1 className="text-center text-foreground text-3xl font-mono  font-semibold tracking-widest sm:text-6xl">Avatar Select</h1>
                <ul className="flex flex-row items-center justify-evenly space-x-8 w-fit h-fit sm:h-fit">
                
                  <figure className='flex flex-col items-center justify-center space-y-2'>
                    <Avatar className="w-32 h-32" {...Kyla} />
                    <figcaption>KyKy</figcaption>
                  </figure>

                
                  <figure className='flex flex-col items-center justify-center space-y-2'>
                    <Avatar className="w-32 h-32" {...Me} />
                    <figcaption>GriddyEric</figcaption>
                  </figure>

                  <figure className='flex flex-col items-center justify-center space-y-2'>
                    <Avatar className="w-32 h-32" {...Colin} />
                    <figcaption>Mr.Chill</figcaption>
                  </figure>

                  <figure className='flex flex-col items-center justify-center space-y-2'>
                    <Avatar className="w-32 h-32" {...Ethan} />
                    <figcaption>ETmaster</figcaption>
                  </figure>

                  <figure className='flex flex-col items-center justify-center space-y-2'>
                    <div className="w-32 h-32 rounded-full bg-blue-400"  />
                    <figcaption>John Doe</figcaption>
                  </figure>


                </ul>

              </div>
    );
}
