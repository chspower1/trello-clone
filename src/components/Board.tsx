import { Droppable } from "@hello-pangea/dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";

export const Wrapper = styled.div`
    padding: 20px 10px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.accentColor};
`;

interface IBoardProps {
    toDos: string[];
    boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
    return (
        <Wrapper>
            <h1>{boardId}</h1>
            <Droppable droppableId={boardId}>
                {(magic) => (
                    <div ref={magic.innerRef} {...magic.droppableProps}>
                        {toDos.map((item, index) => (
                            <DragabbleCard item={item} index={index} />
                        ))}
                        {magic.placeholder}
                    </div>
                )}
            </Droppable>
        </Wrapper>
    );
}
export default Board;
