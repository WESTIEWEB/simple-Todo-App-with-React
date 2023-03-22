import { Id } from "react-toastify";

export interface ITodo {
  title: string;
  done: boolean;
  description?: string;
  _id: string;
}
export interface ContextProps {
  deleteTodo: (id:string) => void;
  todoTodos: Array<ITodo>;
  doneTodos: Array<ITodo>;
  isEditOpen: boolean;
  isOpen : boolean
  openUpdate: (value: boolean) => void;
  closeUpdate: (e: any) => void;
  showModal: (id:string) => {};
  modal: boolean;
  handleRestore: (id:string, obj: Object) => void;
  handleDoneBtn: (id:string, obj: Object) => void;
}