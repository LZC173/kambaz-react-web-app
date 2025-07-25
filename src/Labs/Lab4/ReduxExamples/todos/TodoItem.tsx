// src/Labs/Lab4/ReduxExamples/todos/TodoItem.tsx

import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

//I need this , i need to wrote todo explicityly, if not, the complier would complain

interface TodoItemProps {
  todo: { id: string; title: string };
}

export default function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useDispatch();

  return (
    <ListGroup.Item key={todo.id}>
      <Button
        variant="danger"
        onClick={() => dispatch(deleteTodo(todo.id))}
        id="wd-delete-todo-click"
      >
        Delete
      </Button>
      <Button
        variant="primary"
        onClick={() => dispatch(setTodo(todo))}
        id="wd-set-todo-click"
      >
        Edit
      </Button>
      {todo.title}
    </ListGroup.Item>
  );
}
