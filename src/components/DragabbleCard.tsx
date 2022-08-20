import { Draggable } from "@hello-pangea/dnd";

export default function DragabbleCard() {
    return (
        <Draggable key={item} draggableId={item} index={index}>
            {(magic) => (
                <Card ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>
                    {item}
                    <Btn>Click!</Btn>
                </Card>
            )}
        </Draggable>
    );
}
