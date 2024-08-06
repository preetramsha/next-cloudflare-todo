 "use client"

 import { useState } from "react"
 import { Input } from "@/components/ui/input"
 import { Button } from "@/components/ui/button"
 import { Card } from "@/components/ui/card"
 import { useEffect } from "react"
 import { validateToken } from "@/lib/auth"
 import { customredirect } from "@/lib/utils"
 import { logout } from "@/lib/auth"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

 export default function page() {
  const [name, setName] = useState('')
  useEffect(() => {
    validateToken().then(
      (res) => {
        console.log(res);
        if(!res?.ok) { 
          customredirect('/login');
        }else{
          setName(res?.data.username);
        }
      }
    )
  }, [])
  
   const [todos, setTodos] = useState([
     {
       id: 1,
       title: "Finish project proposal",
       completed: false,
     },
     {
       id: 2,
       title: "Grocery shopping",
       completed: false,
     },
     {
       id: 3,
       title: "Clean the house",
       completed: true,
     },
   ])
   const [newTodo, setNewTodo] = useState({
     title: "",
   })
   const [editingTodo, setEditingTodo] = useState(null)
   const handleAddTodo = () => {
     if (newTodo.title.trim() !== "") {
       setTodos([
         ...todos,
         {
           id: todos.length + 1,
           title: newTodo.title,
           completed: false,
         },
       ])
       setNewTodo({ title: "" })
     }
   }
   const handleToggleComplete = (id) => {
     setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
   }
   const handleEditTodo = (id) => {
     const todo = todos.find((t) => t.id === id)
     setEditingTodo(todo)
     setNewTodo({ title: todo.title })
   }
   const handleUpdateTodo = () => {
     if (newTodo.title.trim() !== "") {
       setTodos(todos.map((todo) => (todo.id === editingTodo.id ? { ...todo, title: newTodo.title } : todo)))
       setEditingTodo(null)
       setNewTodo({ title: "" })
     }
   }
   const handleDeleteTodo = (id) => {
     setTodos(todos.filter((todo) => todo.id !== id))
   }
   return (
     <div className="bg-background text-foreground min-h-screen flex flex-col items-center justify-center p-4">
        <div className="relative bottom-10 md:bottom-20">Hello, {name}</div>
       <div className="max-w-md w-full">
         <h1 className="text-3xl font-bold mb-4 sm:mb-2">Todo List</h1>
         <div className="mb-4 sm:mb-2 grid gap-2">
           <Input
             value={newTodo.title}
             onChange={(e) => setNewTodo({ title: e.target.value })}
             placeholder="Todo title"
             className="mb-2"
           />
           <div>
             {editingTodo ? (
               <Button onClick={handleUpdateTodo} className="w-full">
                 Update Todo
               </Button>
             ) : (
               <Button onClick={handleAddTodo} className="w-full">
                 Add Todo
               </Button>
             )}
           </div>
         </div>
         <div className="space-y-4">
           {todos.map((todo) => (
             <Card key={todo.id} className="p-4">
               <div className="flex flex-col sm:flex-row justify-between items-center mb-2">
                 <h3 className="text-lg font-medium">{todo.title}</h3>
                 <div className="flex gap-2 mt-2 sm:mt-0">
                   <Button
                     size="sm"
                     onClick={() => handleToggleComplete(todo.id)}
                     className={`${todo.completed ? "bg-green-500 text-green-50" : "bg-gray-500 text-white"}`}
                   >
                     {todo.completed ? "Completed" : "Incomplete"}
                   </Button>
                   <Button size="sm" onClick={() => handleEditTodo(todo.id)} className="bg-blue-500 text-blue-50">
                     Edit
                   </Button>
                   <Button size="sm" onClick={() => handleDeleteTodo(todo.id)} className="bg-red-500 text-red-50">
                     Delete
                   </Button>
                 </div>
               </div>
             </Card>
           ))}
         </div>
       </div>
       <div className="hover:cursor" onClick={()=> {
        logout().then(r => {
          if(r.ok){
            toast.success('Logout Success');
            customredirect('/login');
          } else{
            toast.error('Logout Failed');
          }
        })
       }}>logout</div>
     </div>
   )
 }