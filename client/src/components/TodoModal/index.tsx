import React, { useEffect, useState } from "react";
import { Button, Image, Input, Modal } from "semantic-ui-react";
import { InputGroup, InputLabel } from "./styles";
import { Todo } from "../../types/Todo";

type TodoModalProps = {
  onOpen: () => void
  onClose: () => void
  onSubmit: (data: any, file ?: any) => Promise<any>
  open: boolean
  header: string
  todo?: Todo
  type: String 
}

export default function TodoModal(props: TodoModalProps){
 
  const {
    open, 
    onOpen, 
    onClose,
    onSubmit,
    header,
    todo,
    type
  } = props;
  
  const [task, setTask] = useState('')
  const [dueDate, setDueDate] = useState(() => new Date().toISOString().substring(0, 10))
  const [submitStatus, setSubmitStatus] = useState(false)
  const [image, setImage] = useState("")
  const handleSubmit = async () => {
    setSubmitStatus(true)
    try{
      const data : {name: string, dueDate: string, done?: number} = { name: task, dueDate }
      if(todo) {
        data.done = todo.done
      }

      await onSubmit(data, image)
    } catch (e) {
      console.log(e)
    } finally {
      setSubmitStatus(false)
    }
    onClose()
  }


  useEffect(() => {
    if(open) return;

    setTask('')
    setDueDate(new Date().toISOString().substring(0, 10))
  }, [open])

  useEffect(() => {
    if(!todo) return;

    setTask(todo.name)
    setDueDate(todo.dueDate)
  }, [todo])

  const handleUploadImage = (e: any) => {
    
    if(!e.target.files || e.target.files.length === 0) {
      setImage("")
      return;
    }

    setImage(e.target.files[0])
    
  }
  return (
    <Modal 
      open={open}
      onClose={onClose}
      onOpen={onOpen}
    >
      <Modal.Header>{header}</Modal.Header>
      
      <Modal.Content>
        <InputGroup>
          <InputLabel>To do here</InputLabel>
          <Input 
            placeholder="To change the world..."
            fluid
            value={task}
            onChange={e => setTask(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <InputLabel>Due Date</InputLabel>
          <input 
            type="date" 
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </InputGroup>
        {
        type === "UPDATE" && 
         <InputGroup>
          <InputLabel>Image</InputLabel>
          <input type="file"accept="image/*" onChange={handleUploadImage}/>
        </InputGroup>
        }
      </Modal.Content>

      <Modal.Actions>
        <Button color='black' onClick={onClose}>
          Cancel
        </Button>
        <Button
          content="Submit"
          onClick={handleSubmit}
          positive
          loading={submitStatus}
          disabled={submitStatus}
        />
      </Modal.Actions>
    </Modal>
  )
}