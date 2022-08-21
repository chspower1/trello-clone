import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atom";
import Board from "./components/Board";
import DragabbleCard from "./components/DragabbleCard";
export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.bgColor};
`;
export const Boards = styled.div`
    display: grid;
    width: 540px;
    gap: 10;
    grid-template-columns: repeat(3, 1fr);
`;

export const Btn = styled.button`
    margin: 10px;
    padding: 10px;
    background-color: ${(props) => props.theme.btnColor};
    color: ${(props) => props.theme.btnTextColor};
    border-radius: 10px;
`;

function App() {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
        console.log(draggableId, destination, source);
        setToDos((prev) => {
            const resultToDos = { ...prev };
            console.log(Object.values(resultToDos[destination?.droppableId!]));
            console.log(resultToDos);
            return resultToDos;
        });
    };

    // console.log(toDos);
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Container>
                <Boards>
                    {Object.keys(toDos).map((boardId) => (
                        <Board key={boardId} toDos={toDos[boardId]} boardId={boardId} />
                    ))}
                </Boards>
            </Container>
        </DragDropContext>
    );
}

export default App;
