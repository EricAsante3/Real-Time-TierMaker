import { useSortable } from "@dnd-kit/sortable";

export type CardDataItem = {
  id: number;
  name: string;
};

export type CardList = CardDataItem[];

export type SortableReturn = ReturnType<typeof useSortable>;

export type SortableProps = Partial<
  Pick<SortableReturn, "attributes" | "listeners">
>;