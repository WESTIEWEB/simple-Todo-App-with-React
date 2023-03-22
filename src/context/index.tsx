import React, { ReactNode, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ITodo } from '../types.dto';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2';


interface ButtonProps {
    children: ReactNode  }
// type ButtonProps = {//     children: ReactNode;// }
const AppContext = React.createContext<unknown | undefined>(undefined);
const AppProvider = ({ children }:ButtonProps) => {
  const [todoTodos, setTodoTodos] = useState<Array<ITodo>>([]);
  const [todoList , setTodoList] = useState<Array<ITodo>>([])
  const [doneTodos, setDoneTodos] = useState<Array<ITodo>>([]);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState("");
  const [modal, setModal] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    done: false,
  });

  async function deleteTodo(id: string) {
     const confirm = await Swal.fire({
      icon: 'warning',
      showCancelButton: true,
      title: 'Are you sure?',
      text: 'Your data will be permanently deleted',
      confirmButtonText: 'Yes, detete',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, cancel'
     })

     if(confirm.isConfirmed) {
      try{
        await axios.delete(`http://localhost:3000/todo/${id}`);
        await Swal.fire({
          icon: 'success',
          text: 'Your task has been deleted successfully',
         })
      } catch(err:any) {
        await Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: err.message,
        })
      }
     }
     window.location.reload()
  }

  const openUpdate = async (value: boolean) => {
    setIsEditOpen(true)
  }
  //======================= handle change function for todoDorm ======================= //
  const handleAddTodoChange = (e:any) => { 
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const handleAddTodoSubmit = (Data: Object) => {
    setTimeout( async ()=> {
      axios.post("http://localhost:3000/todo", Data)
      await Swal.fire({
        text: "Your task has been added successfully",
        icon: 'success',
        timer: 2000
      })
    setFormData({ title: "", description: "", done: false });
    window.location.reload()
    },1000)
  }
  // ======================create todo function==================== //
  const createTodoConfig = async (dto: Record<string,any>) => {
    const requestObj = {
      title: dto.title,
      description: dto.description
    }
    setTimeout( async()=> {
      await axios.post('http://localhost:3000/todo',requestObj)
    setFormData({ title: "", description: "", done: false });
    window.location.reload()
    },1000);
  }
  const showModal = (id: string) => {
    setIsEditOpen(!isEditOpen)
   
    localStorage.setItem('id', id)
  }
  const closeUpdate = (e:any) => {
    setIsEditOpen(false)
  }
  
  // ======== handle restore tode function ===== //
  const handleRestore = async(id: string, obj: Object) => {
    const confirm = await Swal.fire({
      icon: 'warning',
      showCancelButton: true,
      title: 'Are you sure?',
      text: 'Your tsk will be restored to Todo!',
      confirmButtonText: 'Yes, Restore',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, cancel'
     })
     if(confirm.isConfirmed) {
      try {
        await axios.patch(`http://localhost:3000/todo/${id}`, obj)
        await Swal.fire({
          icon: 'success',
          text: 'Your task has been returned to Todo successfully',
         })

      }catch(err:any) {
        await Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: err.message,
        })
      }
     }
    setTimeout(() => {
      window.location.reload()
    }, 1000);
  }

  // ======== handle restore tode function ===== //
  const handleDoneBtn = async(id: string, obj: Object) => {
    await axios.patch(`http://localhost:3000/todo/${id}`, obj)
    setTimeout(() => {
      window.location.reload()
    }, 500);
  }
  useEffect(() => {
    //fetch todos from backend and set them to local storage
    const getTodos = async (url: string) => {
     try {
      const res = await axios.get(url)
      if(res.status === 200) {
        setTodoList(res.data)
        setTodoTodos(res.data.filter((todo: Record<string,any>) => todo.done === false))
        setDoneTodos(res.data.filter((todo : Record<string,any>) => todo.done === true));
        console.log(res.data)
        console.log(todoList, "todoList")
        // window.location.href = '/'
        // window.location.reload()
        
      }
     }catch(err:any) {
      console.log(err)
     }
    } 
    getTodos('http://localhost:3000/todo')
    // window.location.href = '/'
  }, []);
    
  return (
    <AppContext.Provider value={{
      deleteTodo,
      todoTodos,
      doneTodos,
      isEditOpen,
      openUpdate,
      closeUpdate,
      showModal,
      createTodoConfig,
      handleAddTodoSubmit,
      handleRestore,
      handleDoneBtn
      }}>
      {children}
    </AppContext.Provider>
      )
}
export default AppProvider;
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within a AppProvider');
    }
    return context;
};