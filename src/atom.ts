import { atom, selector } from "recoil";

interface IToDoState {
    [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        to_do: ["조호성", "김하늘", "안진숙"],
        doing: ["김진순", "조선정"],
        done: ["김수정", "정명자", "조병욱"],
    },
});
