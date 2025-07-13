import { useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
import Card from "./Card";
import clsx from "clsx";
import { UniqueIdentifier } from "@dnd-kit/core";


interface Sortableprops {
    id: UniqueIdentifier
    name: string
    GlobalActiveCards: UniqueIdentifier[]
} 



export default function SortableCard({id, name,GlobalActiveCards}: Sortableprops) {
    const sortableProps = useSortable({id: id})
    const {setNodeRef, attributes, listeners, transform,transition,isDragging} = sortableProps

    const style = {
        //Outputs `translate3d(x, y, 0)`
       transform: CSS.Translate.toString(transform),
       transition,
     };
  
  return (
    <Card id={id} className={clsx({" opacity-40 border border-red-400": isDragging },{"opacity-5 pointer-events-none": GlobalActiveCards.includes(id)},   "h-16 w-16 bg-green-200 text-black")} name={name} ref={setNodeRef} attributes={attributes} listeners={listeners} style={style} ></Card>

  );
}
