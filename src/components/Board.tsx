import { DraggableId, Droppable } from "@hello-pangea/dnd";
import { useRef } from "react";
import styled from "styled-components";
import { ToDo, toDoState } from "../atom";
import DragabbleCard, { DelBtn } from "./DragabbleCard";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { categoriesState } from "./../atom";

export const Wrapper = styled.div`
    position: relative;
    width: 300px;
    height: 500px;
    background-color: ${(props) => props.theme.accentColor};
    margin: 20px;
    display: flex;
    flex-direction: column;
`;
const Title = styled.h1`
    text-align: center;
    font-size: 20px;
    font-weight: bolder;
    margin: 16px;
    color: black;
`;
const BoardDelBtn = styled(DelBtn)`
    position: absolute;
    margin: 10px;
    top: 3px;
    right: 0px;
`;
const Area = styled.div<{ isDraggingOver: boolean; draggingFromThisWith: boolean }>`
    transition: background 0.3s ease;
    background-color: ${(props) => (props.isDraggingOver ? "#b2bec3" : "#dfe6e9")};
    flex-grow: 1;
`;
interface IBoardProps {
    toDos: ToDo[];
    boardId: string;
}
interface IForm {
    toDo: string;
}
function Board({ toDos, boardId }: IBoardProps) {
    const setToDos = useSetRecoilState(toDoState);
    const [categories, setcategories] = useRecoilState(categoriesState);
    const { register, handleSubmit } = useForm<IForm>();
    const onvalid = ({ toDo }: IForm) => {
        const newToDo: ToDo = {
            id: Date.now(),
            text: toDo,
        };
        setToDos((prev) => {
            return { ...prev, [boardId]: [...prev[boardId], newToDo] };
        });
    };
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <BoardDelBtn
                onClick={() =>
                    setcategories((prev) => {
                        const resultCategories = prev.filter((category) => boardId !== category);
                        return resultCategories;
                    })
                }
            >
                X
            </BoardDelBtn>
            <Droppable droppableId={boardId}>
                {(magic, snapshot) => (
                    <Area
                        ref={magic.innerRef}
                        isDraggingOver={snapshot.isDraggingOver}
                        draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
                        {...magic.droppableProps}
                    >
                        {toDos.map((toDo, index) => (
                            <DragabbleCard
                                key={toDo.id}
                                toDo={toDo}
                                index={index}
                                boardId={boardId}
                            />
                        ))}
                        {magic.placeholder}
                    </Area>
                )}
            </Droppable>
        </Wrapper>
    );
}
export default Board;
