import { atom, selector } from "recoil";

export const toDoState = atom({
    key: "toDo",
    default: ["조호성", "김하늘", "김진숙", "김진순", "조선정", "김수정", "정명자", "조병욱"],
});
