import { useSortable } from "@dnd-kit/sortable";
import { useRef, CSSProperties, Ref } from "react";
import {CSS} from '@dnd-kit/utilities';
import { UniqueIdentifier } from "@dnd-kit/core";

type sortableProps = Pick< ReturnType<typeof useSortable>, "attributes" | "listeners">


interface props extends sortableProps {
    id: UniqueIdentifier
    name: string
    ref?: Ref<HTMLDivElement>
    style?: CSSProperties
    className: string
    
} 



export default function Card({id, className, name, style, ref, attributes, listeners}: props) {




    // const sortableProps = useSortable({id: id})
    // const {setNodeRef, attributes, listeners, transform} = sortableProps

    // const style = {
        // Outputs `translate3d(x, y, 0)`
       //  transform: CSS.Translate.toString(transform),
     //  };
  
  return (
    <div ref={ref} {...attributes} {...listeners} style={style} className={className}>{name}</div>

  );
}
