import { useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
import Card from "./Card";
import clsx from "clsx";
import { UniqueIdentifier } from "@dnd-kit/core";


type joiners = {
  [userId: string]: {
    name: string;
    avatar: string; // still a string, unless you parse it
    color: string
  };
};



interface Sortableprops {
    id: UniqueIdentifier
    name: string
    GlobalActiveCards: Record<string, UniqueIdentifier>
    OnlineUsers: joiners
} 



export default function SortableCard({id, name, GlobalActiveCards, OnlineUsers}: Sortableprops) {

    const key = Object.entries(GlobalActiveCards).find(([, value]) => value === id as string)?.[0];
    const sortableProps = useSortable({id: id})
    const {setNodeRef, attributes, listeners, transform,transition,isDragging} = sortableProps

    const style = {
        //Outputs `translate3d(x, y, 0)`
      transform: CSS.Translate.toString(transform),
      transition,
      borderColor: key ? OnlineUsers[key].color : undefined,
      borderStyle: 'solid', 
      borderWidth: '4px',
      backgroundImage: `url('/images/${id}')`
    };

  return (
    <Card id={id} className={clsx({" border": isDragging },{" opacity-50 pointer-events-none": (Object.values(GlobalActiveCards)).includes(id as string)},   "bg-no-repeat bg-contain bg-center h-20 w-20  text-black")} name={name} ref={setNodeRef} attributes={attributes} listeners={listeners} style={style} ></Card>

  );
}
