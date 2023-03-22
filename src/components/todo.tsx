import { useEffect, useState } from "react";
import { useAppContext } from "../context";
import { ContextProps } from "../types.dto";
import Button from "./Button";
import EditTodoModal from "./EditTodoModal";
import Header from "./header";

function TodoComponent() {
  const [isEditOpen, setIsEditOpen] = useState(false)

  // states from globalcontext module

  const { deleteTodo, todoTodos, showModal, handleDoneBtn } = useAppContext() as unknown as ContextProps;


  //pagination
  const items_per_pg = 3;
  const [currentPage, setCurrentPage] = useState<number>(1)
  const totalPages_todo = Math.ceil(todoTodos.length / items_per_pg)

  // handle page change function
  const handleTodoPageChage = (pageNum: number) => {
    setCurrentPage(pageNum)
  }

  const startIndex = (currentPage -1) * items_per_pg;
  const endIndex = startIndex + items_per_pg;

  const currentTodoData = todoTodos.slice(startIndex, endIndex);
  // const [todoTodos, setTodoTodos] = useState<Array<ITodo>>([]);
  // const [todoList , setTodoList] = useState<Array<ITodo>>([])
  // const [doneTodos, setDoneTodos] = useState<Array<ITodo>>([]);
  // const [trashTodos, setTrashTodos] = useState<Array<ITodo>>([]);
  
  //function to show edit moday
  const handleEdit = (id:string) => {
    showModal(id)
  }

  //function to mark done
  const handleDone = (todoId: string) => {
    const checkbox = document.getElementById(`${todoId}-checkbox`) as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = true;
    }
    handleDoneBtn(todoId, {done: true});
  }

  //a function to delete todos

  const handleDelete = (id: any) => {
    console.log(id, typeof deleteTodo, 
      'debug')
    deleteTodo(id)
  }


  return (
          <div className="todo-div">
             <Header />
            <h1>Todo</h1>
            {
              currentTodoData.length > 0 &&
              currentTodoData.map((todo) => {
              return (
                
                  <div key={todo._id} className="todo-item">
                    <div className="todo-text">
                      <h3>{todo.title}</h3>
                      <div style={{display:'flex'}}>
                        <input type='checkbox' id={`${todo._id}-checkbox`} />
                        <p>{todo.description}</p>
                      </div>
                    </div>
                    <div className="todo-actions">
                      <Button text="Done" onClick={() => handleDone(todo._id)} />
                      <Button text="Edit" onClick={()=> handleEdit(todo._id)} />
                      <Button text="Delete" onClick={() => handleDelete(todo._id)} />
                    </div>
                  </div>
              );
            })
            
            }
            {
                currentTodoData.length === 0 && (
                    <div>
                        <h3>You currently have no Tasks</h3>
                    </div>
                )
            }
            <EditTodoModal 
                    isOpen={isEditOpen}
                    changeIsOpen={(value: boolean) => {
                      setIsEditOpen(value);
                    }}
                  />
            <nav className='pagination'>
                    <ul>
                      {Array.from({ length: totalPages_todo}).map((_, index) => (
                        <li key={index} onClick={() => handleTodoPageChage(index+1)} className={currentPage === index+1 ? "selected" : ""}>
                          {index + 1}
                        </li>
                      ))}
                    </ul>
            </nav>
    </div>
  );
}

export default TodoComponent;
