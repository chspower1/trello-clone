import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { categoriesState, toDoState } from "./atom";
import Board from "./components/Board";
import CreateCategory from "./components/CreateCategory";
import CreateToDo from "./components/CreateToDo";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    min-height: 100vh;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #ffffff, #bbbbbb);
`;
const Title = styled.h1`
    text-align: center;
    font-size: 48px;
    margin: 100px 0px;
`;
const CreateToDoBtn = styled.button`
    font-size: 20px;
    transition: all 0.3s ease;
    &:hover {
        color: #0984e3;
        background-color: #cde6ff;
    }
`;
const CreateCategoryBtn = styled(CreateToDoBtn)``;
const Boards = styled.div`
    width: 100%;
    margin: 0px auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;
const MenuContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const MenuTitle = styled.div`
    font-size: 18px;
    margin-bottom: 5px;
`;
const MenuBox = styled(MenuContainer)`
    flex-direction: column;
    margin: 5px 20px;
`;

function App() {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const [categories, setCategories] = useRecoilState(categoriesState);
    const [onCreateForm, setOnCreateForm] = useState(false);
    const [onCreateCategoryForm, setOnCreateCategoryForm] = useState(false);
    const onDragEnd = (info: DropResult) => {
        const { draggableId, destination, source } = info;
        console.log(draggableId, destination, source);
        if (destination === null) return;
        else if (destination?.droppableId === source.droppableId) {
            setToDos((prev) => {
                const resultBoard = [...prev[destination.droppableId]];
                const newTodo = resultBoard[source.index];
                resultBoard.splice(source.index, 1);
                resultBoard.splice(destination.index, 0, newTodo);
                console.log(resultBoard);
                return {
                    ...prev,
                    [destination.droppableId]: resultBoard,
                };
            });
        } else if (destination?.droppableId !== source.droppableId) {
            setToDos((prev) => {
                const startBoard = [...prev[source.droppableId]];
                const newTodo = startBoard[source.index];
                const resultBoard = [...prev[destination?.droppableId!]];
                startBoard.splice(source.index, 1);
                resultBoard.splice(destination?.index!, 0, newTodo);
                return {
                    ...prev,
                    [source.droppableId]: startBoard,
                    [destination?.droppableId!]: resultBoard,
                };
            });
        }
    };

    console.log(toDos);
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Container>
                <Title>Trello Clone Challenge!</Title>
                <MenuContainer>
                    {onCreateForm ? (
                        <CreateToDo setOnCreateForm={setOnCreateForm} />
                    ) : (
                        <MenuBox>
                            <MenuTitle>To Do</MenuTitle>
                            <CreateToDoBtn onClick={() => setOnCreateForm((cur) => !cur)}>
                                +
                            </CreateToDoBtn>
                        </MenuBox>
                    )}
                    {onCreateCategoryForm ? (
                        <CreateCategory setOnCreateCategoryForm={setOnCreateCategoryForm} />
                    ) : (
                        <MenuBox>
                            <MenuTitle>Category</MenuTitle>
                            <CreateCategoryBtn
                                onClick={() => setOnCreateCategoryForm((cur) => !cur)}
                            >
                                +
                            </CreateCategoryBtn>
                        </MenuBox>
                    )}
                </MenuContainer>
                <Boards>
                    {categories.map((boardId) => (
                        <Board key={boardId} toDos={toDos[boardId]} boardId={boardId} />
                    ))}
                </Boards>
            </Container>
        </DragDropContext>
    );
}

export default App;
