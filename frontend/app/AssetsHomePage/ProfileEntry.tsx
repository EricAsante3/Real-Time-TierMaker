import Avatar, {genConfig} from 'react-nice-avatar';

import {motion} from "framer-motion"

interface info {
    setavatar: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
}


export default function ProfileEntry({setavatar}: info) {
    const kyla = {
    sex: "woman",
    faceColor: "#6d3800",
    earSize: "small",
    eyeStyle: "circle",
    noseStyle: "short",
    mouthStyle: "smile",
    shirtStyle: "hoody",
    glassesStyle: "round",
    shirtColor: "#FF9933", // saffron (Indian flag color)
    hairColor: "#000000",
    hairStyle: "womanShort",
    hatStyle: "none",
    hatColor: "#000000",
    bgColor: "linear-gradient(135deg, #009B3A, #FED100, #000000)", // saffron-white-green (Indian flag)
  }

  const me = {
    sex: "man",
    faceColor: "#3c2004",
    earSize: "small",
    eyeStyle: "oval",
    noseStyle: "round",
    mouthStyle: "peace",
    shirtStyle: "polo",
    glassesStyle: "none",
    hairColor: "#000000",
    shirtColor: "#FF9933", // saffron (Indian flag color)
    hairStyle: "womanShort",
    hatStyle: "beanie",
    hatColor: "#000000",
    bgColor: "linear-gradient(135deg, #EF3340, #FFD100, #009739)", // saffron-white-green (Indian flag)
  }

  const colin = {
    sex: "man",
    faceColor: "#F9C9B6",
    earSize: "small",
    eyeStyle: "smile",
    noseStyle: "short",
    mouthStyle: "laugh",
    shirtStyle: "short",
    glassesStyle: "none",
    shirtColor: "#FF9933", // saffron (Indian flag color)
    hairColor: "#000000",
    hairStyle: "thick",
    hatStyle: "none",
    hatColor: "#000000",
    bgColor: "linear-gradient(135deg, #0032A0, #BF0D3E, #FFFFFF, #FED141)", // saffron-white-green (Indian flag)
  }

  const ethan = {
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
  }

    const KylaAvatar = genConfig({
    sex: "woman",
    faceColor: "#6d3800",
    earSize: "small",
    eyeStyle: "circle",
    noseStyle: "short",
    mouthStyle: "smile",
    shirtStyle: "hoody",
    shirtColor: "#FF9933", // saffron (Indian flag color)
    glassesStyle: "round",
    hairColor: "#000000",
    hairStyle: "womanShort",
    hatStyle: "none",
    hatColor: "#000000",
    bgColor: "linear-gradient(135deg, #009B3A, #FED100, #000000)", // saffron-white-green (Indian flag)
  })

    const MeAvatar = genConfig({
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
    shirtColor: "#FF9933", // saffron (Indian flag color)
    hatColor: "#000000",
    bgColor: "linear-gradient(135deg, #EF3340, #FFD100, #009739)", // saffron-white-green (Indian flag)
  })

    const ColinAvatar  = genConfig({
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
    shirtColor: "#FF9933", // saffron (Indian flag color)
    hatStyle: "none",
    hatColor: "#000000",
    bgColor: "linear-gradient(135deg, #0032A0, #BF0D3E, #FFFFFF, #FED141)", // saffron-white-green (Indian flag)
  })

    const EthanAvatar  = genConfig({
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

    function handleDivClick(avatar: Record<string, unknown>) {
        setavatar(avatar)
        const submitBtn = document.getElementById("hiddenSubmit");
        submitBtn?.click();
    }


    return(
              <div className="flex flex-col items-center justify-center w-full h-full space-y-4 sm:space-y-8">

                <h1 className="text-center text-foreground text-3xl font-mono  font-semibold tracking-widest sm:text-6xl">Avatar Select</h1>

                <ul className="flex flex-col space-y-0 items-center justify-evenly  w-fit h-fit sm:h-fit sm:space-x-8 sm:space-y-0 sm:flex-row">
                
                  <motion.figure initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1,ease: "easeOut",}} onClick={() => handleDivClick(kyla)} className='flex flex-col items-center justify-center space-y-2 '>
                    <Avatar className="w-32 h-32 border border-white" {...KylaAvatar} />
                    <figcaption className='tracking-widest font-serif text-lg'>KyKy</figcaption>
                  </motion.figure>

                
                  <motion.figure initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{delay: 0.5, duration: 1,ease: "easeOut",}} onClick={() => handleDivClick(me)} className='flex flex-col items-center justify-center space-y-2'>
                    <Avatar className="w-32 h-32 border border-white" {...MeAvatar} />
                    <figcaption className='tracking-widest font-serif text-lg'>GriddyEric</figcaption>
                  </motion.figure>

                  <motion.figure initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{delay: 1, duration: 1,ease: "easeOut",}} onClick={() => handleDivClick(colin)} className='flex flex-col items-center justify-center space-y-2'>
                    <Avatar className="w-32 h-32 border border-white" {...ColinAvatar} />
                    <figcaption className='tracking-widest font-serif text-lg'>Mr.Chill</figcaption>
                  </motion.figure>

                  <motion.figure initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{delay: 1.5, duration: 1,ease: "easeOut",}} onClick={() => handleDivClick(ethan)} className='flex flex-col items-center justify-center space-y-2'>
                    <Avatar className="w-32 h-32 border border-white" {...EthanAvatar } />
                    <figcaption className='tracking-widest font-serif text- text-lg'>ETmaster</figcaption>
                  </motion.figure>



                </ul>
                <div className='flex flex-row  items-center w-full justify-evenly  space-x-12'>
                  <motion.figure initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{delay: 2, duration: 1,ease: "easeOut",}} className='flex flex-col items-center justify-center space-y-2'>
                    <div className="w-32 h-32 rounded-full bg-[linear-gradient(135deg,_#FF6B6B,_#6A82FB,_#F9ED69)]"  />
                    <figcaption className='tracking-widest font-serif  text-lg'>Mr.FoldAlot - aka Joel</figcaption>

                  </motion.figure>

                  <motion.figure initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{delay: 2.5, duration: 1,ease: "easeOut",}} className='flex flex-col items-center justify-center space-y-2'>
                    <div className="w-32 h-32 rounded-full border border-white"  />
                    <figcaption className='tracking-widest font-serif  text-lg'>Locked: Germain</figcaption>
                  </motion.figure>
                </div>
                <button type="submit" id="hiddenSubmit" style={{ display: "none" }} />
              </div>
    );
}
