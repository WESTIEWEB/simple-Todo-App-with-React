import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import Swal from "sweetalert2";
import TodoForm from "./TodoForm";

interface IProps {
  changeIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
}

const AddTodoModal = ({ isOpen, changeIsOpen }: IProps) => {
  const handleAddTodo = async (formData: Object) => {
    //MAKE API CALL TO ADD TODO
    
    await Swal.fire({
      text: "Your task has been added successfully",
      icon: 'success',
      timer: 2000
    })
    //ADD TODO TO LOCAL STORAGE
  };

  return (
    <div>
      {isOpen === true && (
        <div className="full-overlay">
          <div className="modal">
            <div className="todo-head">
              <h1> Add New Todo</h1>
              <AiOutlineClose
                className="icon"
                size={20}
                onClick={() => changeIsOpen(false)}
              />
            </div>
            <div>
              <TodoForm onSubmit={(formData) => handleAddTodo(formData)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTodoModal;
