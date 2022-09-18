import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { categoriesState, toDoState } from "../atom";
import { DelBtn } from "./DragabbleCard";

const Container = styled.div`
    position: relative;
    width: 250px;
    padding: 6px 30px;
    background-color: white;
`;
const Title = styled.h1`
    font-size: 12px;
    margin: 10px 0px;
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
const RadioContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const RadioBox = styled(RadioContainer)`
    margin: 0px 10px;
    flex-direction: column;
`;
const Label = styled.label<{ for: string }>`
    font-size: 12px;
    margin: 7px 0px;
`;
const Input = styled.input`
    border: none;
    padding: 5px;
    outline: none;
    background-color: #dfe6e9;
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
const CreateFormDelBtn = styled(DelBtn)`
    position: absolute;
    right: 10px;
    top: 10px;
`;

interface IForm {
    text: string;
    category: string;
}
interface CreateFormProps {
    setOnCreateForm: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function CreateToDo({ setOnCreateForm }: CreateFormProps) {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const [categories, setCategories] = useRecoilState(categoriesState);
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<IForm>();

    const onvalid = ({ text, category }: IForm) => {
        setToDos((prev) => {
            return { ...prev, [category]: [...prev[category], { text, id: Date.now() }] };
        });
        reset();
    };
    return (
        <Container>
            <Title>할 일 추가하기</Title>
            <CreateFormDelBtn onClick={() => setOnCreateForm((cur) => !cur)}>X</CreateFormDelBtn>
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
                <RadioContainer id="category">
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
                </RadioContainer>
                {errors.category && <Error>{errors.category.message}</Error>}
                <Btn>click</Btn>
            </Form>
        </Container>
    );
}
