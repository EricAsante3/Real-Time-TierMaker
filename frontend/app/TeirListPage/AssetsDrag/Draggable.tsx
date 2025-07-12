"use client";  // <-- Add this line at the top

import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';

interface DraggableProps {
  idvalue: string;
  children: React.ReactNode; // Children will typically be any valid React content
}


export default function Draggable({ idvalue, children }: DraggableProps) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: idvalue,
  });
  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
  };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </button>
  );
}
