import { useSortable } from "@dnd-kit/sortable";
import { UniqueIdentifier } from "@dnd-kit/core";

export type CardDataItem = {
  id: number;
  name: string;
};










export type CardList = CardDataItem[];

export type SortableReturn = ReturnType<typeof useSortable>;

export type SortableProps = Partial<
  Pick<SortableReturn, "attributes" | "listeners">
>;

export type Data<T, E> = {
  [key: UniqueIdentifier]: Column<T, E>;
};



export type Column<T, E> = {
  data: T;
  children: Item<E>[];
};




export type Item<T> = {
  id: UniqueIdentifier;
  name: T;
};