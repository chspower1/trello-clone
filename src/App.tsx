import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { categoriesState, toDoState } from "./atom";
import Board from "./components/Board";
import DragabbleCard from "./components/DragabbleCard";
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #ffffff, #bbbbbb);
`;
const Title = styled.h1`
    font-size: 28px;
    margin-bottom: 20px;
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const Boards = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
const RadioBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Label = styled.label<{ for: string }>`
    font-size: 12px;
    margin: 7px 0px;
`;
const Input = styled.input`
    border: none;
    padding: 5px;
    outline: none;
`;
const Error = styled.div`
    color: #d63031;
    font-size: 10px;
    place-self: end;
    margin: 5px 0px;
`;
export const Btn = styled.button`
    width: 30%;
    place-self: end;
    margin: 10px 0px;
    padding: 5px;
    background-color: ${(props) => props.theme.btnColor};
    color: ${(props) => props.theme.btnTextColor};
`;

interface IForm {
    text: string;
    category: string;
}

function App() {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const [categories, setCategories] = useRecoilState(categoriesState);
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<IForm>();
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
    const onvalid = ({ text, category }: IForm) => {
        setToDos((prev) => {
            return { ...prev, [category]: [...prev[category], { text, id: Date.now() }] };
        });
        reset();
    };

    console.log(toDos);
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Container>
                <Title>Trello Clone Challenge!</Title>
                <Form onSubmit={handleSubmit(onvalid)}>
                    <Label for="text">To Do</Label>
                    <Input
                        id="text"
                        type="text"
                        {...register("text", {
                            required: "할 일을 입력해주세요!",
                        })}
                    />
                    {errors.text && <Error>{errors.text.message}</Error>}
                    <Label for="category">Categories</Label>
                    <RadioBox id="category">
                        {categories.map((category) => (
                            <RadioBox>
                                <Label for={category}>{category}</Label>
                                <Input
                                    id={category}
                                    type="radio"
                                    value={category}
                                    {...register("category", {
                                        required: "카테고리를 선택해주세요",
                                    })}
                                />
                            </RadioBox>
                        ))}
                    </RadioBox>
                    {errors.category && <Error>{errors.category.message}</Error>}
                    <Btn>click</Btn>
                </Form>

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
