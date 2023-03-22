import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useAppContext } from "../context";
import { ContextProps } from "../types.dto";
import TodoForm from "./TodoForm";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios";
import EditForm from "./EditForm";

interface IProps {
  changeIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
}

const EditTodoModal = ({ isOpen, changeIsOpen }: IProps) => {
  const handleUpdateTodo = async (formData: Object) => {
    //MAKE API CALL TO ADD TODO
    const id = localStorage.getItem('id')
    setTimeout( async ()=> {
      try {
         await axios.patch(`http://localhost:3000/todo/${id}`, formData)
         console.log(id)
 
         
      }catch(err) {
         console.log(err)
      }
     window.location.reload()
     },1000)

  };

  // geting state from contex
  const {isEditOpen, closeUpdate} = useAppContext() as unknown as ContextProps;

  const handleCloseModal = (e: any) => {
    closeUpdate(e)
  };
  


  return (
    <div>
      {isEditOpen === true && (
        <div className="full-overlay">
          <div className="modal">
            <div className="todo-head">
              <h1> Update Todo</h1>
              <AiOutlineClose
                className="icon"
                size={20}
                onClick={handleCloseModal}
              />
            </div>
            <div>
              <EditForm onSubmit={(formData) => handleUpdateTodo(formData)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditTodoModal;