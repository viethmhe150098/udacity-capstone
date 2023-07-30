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
const TYPE = "UPDATE"
export default function EditTodoModal(props: EditTodoModalProps) {

  const handleSubmit = async (updateTodoReq: UpdateTodoRequest, file: any) => {
    const { idToken, todo } = props
    console.log(todo);
    
    if(!todo) return
    
    await patchTodo(idToken, todo.todoId, updateTodoReq)
    if(!file) {
      props.updateTodo({...todo, ...updateTodoReq})
      return;
    }
    
    const response = await getUploadUrl(idToken, todo.todoId);
    console.log(response);
    
    try{
      await uploadFile(response.uploadUrl, file)
      todo.attachmentUrl = response.imageUrl
      console.log("Attachment URL: "+todo.attachmentUrl);
      
    } catch (e) {
      console.log(e)
    } finally {
      props.updateTodo(todo)
    }

  }

  return <TodoModal 
    {...props}
    header="Update TODO"
    onSubmit={handleSubmit}
    type={TYPE}
  />
}