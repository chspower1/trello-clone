import { Draggable } from "@hello-pangea/dnd";
import React from "react";
import styled from "styled-components";
import { ToDo, toDoState } from "../atom";
import { useRecoilState } from "recoil";

interface IDragabbleCardProps {
    toDo: ToDo;
    index: number;
    boardId: string;
}
const Card = styled.div<{ isDragging: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: auto;
    padding: 10px;
    color: ${(props) => props.theme.cardTextColor};
    transition: background-color 1s ease;
    background-color: ${(props) => (props.isDragging ? "#a5c3da" : "#dfe6e9")};
    border: 1px solid white;
`;
export const DelBtn = styled.button`
    background: none;
    transition: background-color 0.3s ease;
    color: white;
    padding: 5px 10px;
    background-color: #d47373;
    &:hover {
        background-color: #d63031;
    }
`;

function DragabbleCard({ toDo, index, boardId }: IDragabbleCardProps) {
    console.log(toDo, "has been rendered");
    const [toDos, setToDos] = useRecoilState(toDoState);
    return (
        <Draggable key={toDo.id} draggableId={String(toDo.id)} index={index}>
            {(magic, snapshot) => (
                <Card
                    ref={magic.innerRef}
                    {...magic.draggableProps}
                    {...magic.dragHandleProps}
                    isDragging={snapshot.isDragging}
                >
                    {toDo.text}
                    <DelBtn
                        onClick={() =>
                            setToDos((prev) => {
                                const resultToDos = [...prev[boardId]];
                                resultToDos.splice(index, 1);
                                return { ...prev, [boardId]: resultToDos };
                            })
                        }
                    >
                        X
                    </DelBtn>
                </Card>
            )}
        </Draggable>
    );
}
export default React.memo(DragabbleCard);
