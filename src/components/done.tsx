import { useState } from "react";
import { useAppContext } from "../context";
import { ContextProps } from "../types.dto";
import Button from "./Button";
import Header from "./header";

function Done() {

  // states from globalcontext module

  const { doneTodos, handleRestore } = useAppContext() as unknown as ContextProps;


  //pagination
  const items_per_pg = 3;
  const [currentPage, setCurrentPage] = useState<number>(1)
  const totalPages_done = Math.ceil(doneTodos.length / items_per_pg)

  // handle page change function
  const handleTodoPageChage = (pageNum: number) => {
    setCurrentPage(pageNum)
  }

  const startIndex = (currentPage -1) * items_per_pg;
  const endIndex = startIndex + items_per_pg;

  const currentDoneTodos = doneTodos.slice(startIndex, endIndex)

  


  return (
    
          <div className="done-div">
            <Header />
            <h1>Done</h1>
            {currentDoneTodos.map((todo) => {
              return (
                <div key={todo._id} className="todo-item">
                  <div className="todo-text">
                    <h3>{todo.title}</h3>
                    <div style={{display:'flex'}}>
                        <input disabled type='checkbox' checked={todo.done}/>
                        <p>{todo.description}</p>
                    </div>
                  </div>
                  <div className="todo-actions">
                    <Button text="Restore" onClick={async() => handleRestore(todo._id, {done:false}) } />
                  </div>
                </div>
              );
            })}
            <nav className='pagination'>
              <ul>
                {Array.from({ length: totalPages_done}).map((_, index) => (
                  <li  key={index} onClick={() => handleTodoPageChage(index+1)} className={currentPage === index+1 ? "selected" : ""}>
                    {index + 1}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
  );
}

export default Done;
