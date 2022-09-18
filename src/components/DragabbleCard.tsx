import { Draggable } from "@hello-pangea/dnd";
import { Btn } from "./../App";
import React from "react";
import styled from "styled-components";
import { ToDo } from "../atom";

interface IDragabbleCardProps {
    toDo: ToDo;
    index: number;
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
const DelBtn = styled.button`
    background: none;
    transition: color 0.3s ease;
    color: #d47373;
    &:hover {
        color: #d63031;
    }
`;

function DragabbleCard({ toDo, index }: IDragabbleCardProps) {
    console.log(toDo, "has been rendered");
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
                    <DelBtn>X</DelBtn>
                </Card>
            )}
        </Draggable>
    );
}
export default React.memo(DragabbleCard);
