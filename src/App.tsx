import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atom";
const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.bgColor};
`;
const Boards = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    background-color: ${(props) => props.theme.accentColor};
`;
const Board = styled(Container)`
    width: 500px;
    height: 500px;
    background-color: ${(props) => props.theme.bgColor};
`;
const Card = styled(Container)`
    padding: 10px 30px;
    margin: 10px;
    background-color: ${(props) => props.theme.cardColor};
    color: ${(props) => props.theme.cardTextColor};
    border-radius: 10px;
`;
const Btn = styled.button`
    margin: 10px;
    padding: 10px;
    background-color: ${(props) => props.theme.btnColor};
    color: ${(props) => props.theme.btnTextColor};
    border: none;
    border-radius: 10px;
`;

function App() {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
        setToDos((prev) => {
            const newToDos = [...prev];
            newToDos.splice(source.index, 1);
            console.log(newToDos);
            newToDos.splice(destination?.index!, 0, draggableId);
            console.log(newToDos);
            return newToDos;
            // const newToDos = prev;
        });
    };
    const DropList = (name: string, arr: string[]) => (
        <Droppable droppableId={name}>
            {(magic) => (
                <Board ref={magic.innerRef} {...magic.droppableProps}>
                    {arr.map((item, index) => CardItem(item, index))}
                    {magic.placeholder}
                </Board>
            )}
        </Droppable>
    );
    const CardItem = (item: string, index: number) => (
        
    );
    // console.log(toDos);
    return (
        <Container>
            <Boards>
                <DragDropContext onDragEnd={onDragEnd}>{DropList("list", toDos)}</DragDropContext>
            </Boards>
        </Container>
    );
}

export default App;
