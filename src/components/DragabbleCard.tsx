import { Draggable } from "@hello-pangea/dnd";
import { Btn } from "./../App";
import React from "react";
import styled from "styled-components";

interface IDragabbleCardProps {
    item: string;
    index: number;
}
const Card = styled.div`
    display: flex;
    align-items: center;
    /* width: 80%; */
    height: auto;
    padding: 10px 30px;
    margin-top: 10px;
    background-color: ${(props) => props.theme.cardColor};
    color: ${(props) => props.theme.cardTextColor};
    border-radius: 10px;
`;

function DragabbleCard({ item, index }: IDragabbleCardProps) {
    console.log(item, "has been rendered");
    return (
        <Draggable key={item} draggableId={item} index={index}>
            {(magic) => (
                <Card ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>
                    {item}
                    {/* <Btn>Click!</Btn> */}
                </Card>
            )}
        </Draggable>
    );
}
export default React.memo(DragabbleCard);
