import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { categoriesState, toDoState } from "../atom";
import { DelBtn } from "./DragabbleCard";

export const Container = styled.div`
    position: absolute;
    place-self: start center;
    width: 400px;
    padding: 6px 30px;
    background-color: white;
`;
export const Title = styled.h1`
    font-size: 26px;
    margin-top: 15px;
    margin-bottom: 20px;
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
const RadioContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;
const RadioBox = styled(RadioContainer)`
    margin-right: 10px;
    flex-direction: column;
    background-color: #636e72;
    padding: 5px;
    color: white;
`;
const Label = styled.label<{ for: string }>`
    font-size: 18px;
    margin: 7px 0px;
`;
const Input = styled.input`
    border: none;
    padding: 5px;
    outline: none;
    background-color: #dfe6e9;
    margin-bottom: 20px;
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
    font-size: 16px;
    background-color: ${(props) => props.theme.btnColor};
    color: ${(props) => props.theme.btnTextColor};
`;
const CreateFormDelBtn = styled(DelBtn)`
    position: absolute;
    right: 10px;
    top: 10px;
`;

interface IForm {
    category: string;
}
interface CreateFormProps {
    setOnCreateCategoryForm: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function CreateCategory({ setOnCreateCategoryForm }: CreateFormProps) {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const [categories, setCategories] = useRecoilState(categoriesState);
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
        setError,
    } = useForm<IForm>();

    const onvalid = ({ category }: IForm) => {
        if (categories.includes(category)) {
            setError("category", {
                message: "이미 존재하는 카테고리 입니다.",
            });
        } else {
            setToDos((prev) => {
                return { ...prev, [category]: [] };
            });
            setCategories((prev) => {
                return [...prev, category];
            });
            reset();
        }
    };
    return (
        <Container>
            <Title>Add Category</Title>
            <CreateFormDelBtn onClick={() => setOnCreateCategoryForm((cur) => !cur)}>
                X
            </CreateFormDelBtn>
            <Form onSubmit={handleSubmit(onvalid)}>
                <Label for="category">Category</Label>
                <Input
                    id="category"
                    type="text"
                    {...register("category", {
                        required: "카테고리를 입력해주세요!",
                    })}
                />
                {errors.category && <Error>{errors.category.message}</Error>}
                <Label for="category">Current Categories List</Label>
                <RadioContainer id="category">
                    {categories.map((category) => (
                        <RadioBox>{category}</RadioBox>
                    ))}
                </RadioContainer>
                <Btn>click</Btn>
            </Form>
        </Container>
    );
}
