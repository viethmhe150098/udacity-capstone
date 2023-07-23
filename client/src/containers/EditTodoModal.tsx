import TodoModal from "../components/TodoModal";
import { getUploadUrl, patchTodo, uploadFile } from "../api/todos-api";
import { Todo } from "../types/Todo";
import { UpdateTodoRequest } from "../types/UpdateTodoRequest";

type EditTodoModalProps = {
  open: boolean
  onOpen: () => void
  onClose: () => void
  updateTodo: (todo: Todo) => void
  idToken: string
  todo?: Todo
}

export default function EditTodoModal(props: EditTodoModalProps) {

  const handleSubmit = async (updateTodoReq: UpdateTodoRequest, file: any) => {
    const { idToken, todo } = props
    
    if(!todo) return
    
    await patchTodo(idToken, todo.todoId, updateTodoReq)
    if(!file) {
      props.updateTodo({...todo, ...updateTodoReq})
      return;
    }

  }

  return <TodoModal 
    {...props}
    header="Update TODO"
    onSubmit={handleSubmit}
  />
}