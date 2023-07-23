import TodoModal from "../components/TodoModal";
import { CreateTodoRequest } from "../types/CreateTodoRequest";
import { createTodo, getUploadUrl, uploadFile } from "../api/todos-api";
import { Todo } from "../types/Todo";

type AddTodoModalProps = {
  open: boolean
  onOpen: () => void
  onClose: () => void
  addTodo: (todo: Todo) => void
  idToken: string
}

export default function AddTodoModal(props: AddTodoModalProps) {

  const handleSubmit = async (createTodoReq: CreateTodoRequest, file: any) => {
    const idToken = props.idToken
    const todo = await createTodo(idToken, createTodoReq)
    if(!file) {
      props.addTodo(todo)
      return;
    }
  }

  return <TodoModal 
    {...props}
    header="Create TODO"
    onSubmit={handleSubmit}
  />
}