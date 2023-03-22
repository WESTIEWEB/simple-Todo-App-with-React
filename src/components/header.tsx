import { useEffect, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import AddTodoModal from "./AddTodoModal";
import Button from "./Button";

function Header() {
  const [date, setDate] = useState(new Date().toLocaleTimeString("en-US"));
  const [showTodo, setShowTodo] = useState<"todo" | "trash" | "done">("todo");
  const [showDone, setShowDone] = useState<"todo" | "trash" | "done">("todo");
  const [isOpen, setIsOpen] = useState(false);
  // const [todoTodos, setTodoTodos] = useState<Array<ITodo>>([]);
  // const [todoList , setTodoList] = useState<Array<ITodo>>([])
  // const [doneTodos, setDoneTodos] = useState<Array<ITodo>>([]);
  // const [trashTodos, setTrashTodos] = useState<Array<ITodo>>([]);
  const navigate = useNavigate();

  const openAddTodoModal = () => {
    setIsOpen(true);
  };
  // function to navigate to todo
  const navigateToToDo = (e: any) => {
    e.preventDefault();
    setShowTodo('todo')
    // setShowDone(!showDone)
    navigate('/todo')
  }


  const tick = () => {
    setDate(new Date().toLocaleTimeString("en-US"));
  };
  // function to navigate to done
  const navigateToDone = (e: any) => {
    e.preventDefault();
    setShowDone('done')
    // setShowTodo(!showTodo)
    navigate('/done')
  } 
  
  //timer effect
  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(timerID);
    };
  }, []);
  return (
    <div className="App">
      <header className="top">
        <h1>Welcome</h1>
        <h3>{date}</h3>
      </header>
      <main>
        <div className="buttons-div">
          <Button
            text="Todo"
            className={`${'switch'} ${showTodo === 'todo'? "active": ""}`}
            onClick={(e: any) => navigateToToDo(e)}
          />
          <Button
            text="Done"
            className={`${'switch'} ${showDone === 'done'? "active": ""}`}
            onClick={(e: any) => navigateToDone(e)}
          />
          <AiFillPlusCircle
            className="add-btn"
            size={30}
            onClick={() => openAddTodoModal()}
          />
        </div>
        <AddTodoModal
          isOpen={isOpen}
          changeIsOpen={(value: boolean) => {
            setIsOpen(value);
          }}
        />
      </main>
    </div>
  );
}

export default Header;
