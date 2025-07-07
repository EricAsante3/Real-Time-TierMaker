import { useSortable } from "@dnd-kit/sortable";
import { useRef, CSSProperties, Ref } from "react";
import {CSS} from '@dnd-kit/utilities';


type sortableProps = Pick< ReturnType<typeof useSortable>, "attributes" | "listeners">


interface props extends sortableProps {
    id: number
    name: string
    ref?: Ref<HTMLDivElement>
    style?: CSSProperties
    
} 



export default function Card({id, name, style, ref, attributes, listeners}: props) {




    // const sortableProps = useSortable({id: id})
    // const {setNodeRef, attributes, listeners, transform} = sortableProps

    // const style = {
        // Outputs `translate3d(x, y, 0)`
       //  transform: CSS.Translate.toString(transform),
     //  };
  
  return (
    <div ref={ref} {...attributes} {...listeners} style={style} className="h-16 w-16 bg-green-200 text-black">{name}</div>

  );
}
