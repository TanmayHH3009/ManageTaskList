import "./App.css";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from 'uuid';
import { useState,useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

function App() {

const [todo, setTodo] = useState("")
const [todos, setTodos] = useState([])
const [ShowFinished, setShowFinished] = useState(false)

useEffect(() => {
  let todoString = localStorage.getItem("todos")
  if(todoString){
  let todos = JSON.parse(localStorage.getItem("todos"))

  setTodos(todos)
}
 
}, [])




const saveToLS =()=>{
  localStorage.setItem("todos", JSON.stringify(todos))


}

  function handleAdd(){
setTodos([...todos,{todo,id:uuidv4(),isCompleted:false}])
setTodo("");
saveToLS();
  }

  function handleEdit(id){
    //let res = confirm("Are you sure to remove Task from the list")
  //  if(res==false)return;
let t  = todos.filter(i=>i.id ===id);
setTodo(t[0].todo);
let newTodos = todos.filter(item=>{
  return item.id!==id
  });
setTodos(newTodos)
saveToLS();

  }

  function handleDelete(e,id){
    let res = confirm("Are you sure to remove Task from the list")
    if(res==false)return;
    let index = todos.findIndex(item=>{
      return item.id === id
    })
    let newTodos =[...todos];
    newTodos.splice(index,1);
    setTodos(newTodos)
    saveToLS();
  }


  function handleChange(e){
  setTodo(e.target.value)
  }



  function handleCheckBox(e){
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id
    })
let newTodos =[...todos];
newTodos[index].isCompleted = !newTodos[index].isCompleted;
setTodos(newTodos)
saveToLS();

      }
    


function toggleFinished(){
setShowFinished(!ShowFinished)
}


  return (
    <>
      <Navbar title="MyTodoList" />


      <div className="md:container mx-auto bg-violet-100 my-5 rounded p-5 min-h-[80vh] md:w-2/3">

        <h1 className="text-2xl text-center font-extrabold  font-serif text-pretty">My Task Manager DashBoard</h1>
        <div className="addTodo">
          <h2 className="text-xl font-bold "> Add Task</h2>
          <input onChange={handleChange} value={todo}
            type="text"
            className="border-2 rounded p-2 w-full"
            placeholder="Add-Task"
          ></input>
          <button onClick={handleAdd}  disabled={todo.length<=3} className="w-20 h-10 bg-violet-700  relative top-3 rounded-lg hover:bg-violet-300 text-white  disabled:bg-violet-300 mb-4 w-full">
            Add
          </button>
          <br/>
          <input onChange={toggleFinished} type="checkbox" checked={ShowFinished} />Show Finished
        </div>
        <div>
          <h1 className=" text-xl font-bold mt-5 mx-5">Your List</h1>
       
          <div className="todos">
            {todos.length==0 && <div className="text-gray-400 mx-5"> No Todos Yet added </div>}
           {todos.map(item=>{
            return (ShowFinished || item.isCompleted) && <div  key={item.id} className="todo flex justify-between md:w-2/3">
              <div className="flex gap-5">
              <input type="checkbox" name={item.id} onChange={handleCheckBox} value ={item.isCompleted} id="" className="w-4 relative " />
            <div className={`relative  top-4 ${item.isCompleted ? 'line-through' : ''}`}>{item.todo}</div>

              </div>
           
       
            <div className="buttons relative -top-1 flex h-full">
              <button onClick={()=>{handleEdit(item.id)}} className="flex justify-center items-center w-12 bg-violet-700 mx-2 relative top-3 rounded-lg text-white hover:bg-violet-300 mb-4 text-center">
             <FaEdit/>
              </button>
              <button onClick={()=>{handleDelete(item.id)} }className="flex justify-center items-center w-12 h-10 bg-violet-700 mx-2 relative top-3 rounded-lg text-white hover:bg-violet-300 mb-4 text-center">
              <MdDeleteSweep />
              </button>
            </div>
          </div>
           })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
