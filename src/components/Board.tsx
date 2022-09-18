import { DraggableId, Droppable } from "@hello-pangea/dnd";
import { useRef } from "react";
import styled from "styled-components";
import { ToDo, toDoState } from "../atom";
import DragabbleCard from "./DragabbleCard";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

export const Wrapper = styled.div`
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
            <Droppable droppableId={boardId}>
                {(magic, snapshot) => (
                    <Area
                        ref={magic.innerRef}
                        isDraggingOver={snapshot.isDraggingOver}
                        draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
                        {...magic.droppableProps}
                    >
                        {toDos.map((toDo, index) => (
                            <DragabbleCard key={toDo.id} toDo={toDo} index={index} />
                        ))}
                        {magic.placeholder}
                    </Area>
                )}
            </Droppable>
        </Wrapper>
    );
}
export default Board;
