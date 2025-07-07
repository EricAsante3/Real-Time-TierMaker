import { useSortable } from "@dnd-kit/sortable";
import { useRef, CSSProperties, Ref } from "react";
import {CSS} from '@dnd-kit/utilities';
import Card from "./Card";



interface Sortableprops {
    id: number
    name: string

} 



export default function SortableCard({id, name}: Sortableprops) {




    const sortableProps = useSortable({id: id})
    const {setNodeRef, attributes, listeners, transform} = sortableProps

    const style = {
        //Outputs `translate3d(x, y, 0)`
       transform: CSS.Translate.toString(transform),
     };
  
  return (
    <Card id={id} name={name} ref={setNodeRef} attributes={attributes} listeners={listeners} style={style} ></Card>

  );
}
