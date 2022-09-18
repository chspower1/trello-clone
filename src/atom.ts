import { config } from "process";
import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
export interface ToDo {
    id: number;
    text: string;
}

interface IToDoState {
    [key: string]: ToDo[];
}
export type ICategories = string[];

export const categoriesState = atom<ICategories>({
    key: "Categories",
    default: ["to_do", "doing", "done"],
    effects_UNSTABLE: [recoilPersist().persistAtom],
});
export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        to_do: [],
        doing: [],
        done: [],
    },
    effects_UNSTABLE: [recoilPersist().persistAtom],
});
