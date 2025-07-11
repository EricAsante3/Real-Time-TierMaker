import { useSortable } from "@dnd-kit/sortable";
import { useRef, CSSProperties, Ref } from "react";
import {CSS} from '@dnd-kit/utilities';
import Card from "./Card";
import clsx from "clsx";
import { UniqueIdentifier } from "@dnd-kit/core";


interface Sortableprops {
    id: UniqueIdentifier
    name: string

} 



export default function SortableCard({id, name}: Sortableprops) {




    const sortableProps = useSortable({id: id})
    const {setNodeRef, attributes, listeners, transform,transition,isDragging} = sortableProps

    const style = {
        //Outputs `translate3d(x, y, 0)`
       transform: CSS.Translate.toString(transform),
       transition,
     };
  
  return (
    <Card id={id} className={clsx({"opacity-40 border border-red-400": isDragging },   "h-16 w-16 bg-green-200 text-black")} name={name} ref={setNodeRef} attributes={attributes} listeners={listeners} style={style} ></Card>

  );
}
