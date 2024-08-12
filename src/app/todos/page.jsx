 "use client"
 export const runtime = 'edge';

 import { useState } from "react"
 import { Input } from "@/components/ui/Input"
 import { Button } from "@/components/ui/Button"
 import { Card } from "@/components/ui/Card"
 import { useEffect } from "react"
 import { validateToken } from "@/lib/auth"
 import { customredirect, deletetodo, gettodo, patchtodo, posttodo, toggletodo } from "@/lib/serverfn"
 import { logout } from "@/lib/auth"
import { ToastContainer,toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image"

 export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: "",
  });
  const [editingTodo, setEditingTodo] = useState(null);
  const [token, setToken] = useState('')
  const [name, setName] = useState('');
  
  useEffect(() => {
    validateToken().then(
      (res) => {
        if(!res?.ok) { 
          customredirect('/login');
        }else{
          setName(res?.data.username);
          setToken(res.token)
          gettodo(res?.data.username,res?.token).then((resp)=>{
            setTodos(resp.data);
            console.log('todos=',resp.data);
            setIsLoading(false);
          })
        }
      }
    )
  }, [])
  const handleAddTodo = async () => {
    if(newTodo.title == ''){
      toast.warn('Title is empty');
      return;
    }
    else{ 
      const resp = await posttodo(name.trim(),newTodo.title,token);
      if(resp.ok){
        setNewTodo({title:''});
        console.log('fromtodo',resp);
        toast.success('New todo added');
        setTodos(prevData => [...prevData,resp.data[0]])
      }
    }
  }
  const handleUpdate = async () =>{
    if(editingTodo){
      if (newTodo.title.trim() !== "") {
        const resp = await patchtodo(name,newTodo.title,editingTodo.id,token);
        if(resp.ok){
          if (newTodo.title.trim() !== "") {
          setTodos(todos.map((todo) => todo.id === editingTodo.id ? { ...todo, desc: newTodo.title } : todo ));
          setEditingTodo(null)
          setNewTodo({ title: "" })
          toast.success('Todo updated');
          } 
        }
      }
  }}

  const toggle = async (tid) =>{
    const resp = await toggletodo(name,tid,token);
    if(resp.ok){
      setTodos(todos.map((todo) => todo.id === tid ? { ...todo, completed: !todo.completed } : todo ));
      toast.success('Todo updated');
    }
  }

   if (isLoading) {
    return <div className="flex h-screen justify-center items-center">
      <Image
        src="/loading.gif"
        alt="Loading..."
        className="dark:invert"
        width={50}
        height={24}
        priority
      />
  </div>; // Or any loading indicator
  }
   return (
     <div className="bg-background text-foreground min-h-screen flex flex-col items-center justify-center p-4">
        <div className="relative bottom-10 md:bottom-20">Hello, {name}</div>
        <ToastContainer/>
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
              // put onclick here
               <Button 
               onClick={handleUpdate}
               className="w-full"> 
                 Update Todo
               </Button>
             ) : (
              //put onclick here
               <Button
               onClick={handleAddTodo}
               className="w-full">
                 Add Todo
               </Button>
             )}
           </div>
         </div>
         <div className="space-y-4">
           {todos.length>0 && todos.map((todo) => (
             <Card key={todo.id} className="p-4">
               <div className="flex flex-col sm:flex-row justify-between items-center mb-2">
                 <h3 className="text-lg font-medium">{todo.desc}</h3>
                 <div className="flex gap-2 mt-2 sm:mt-0">
                   <Button
                     size="sm"
                     onClick={()=> toggle(todo.id)}
                     className={`${todo.completed ? "bg-green-500 text-green-50" : "bg-gray-500 text-white"}`}
                   >
                     {todo.completed ? "Completed" : "Incomplete"}
                   </Button>
                   <Button size="sm" 
                   //put onclick here
                   onClick={() => {
                    setNewTodo({title:todo.desc});
                    setEditingTodo(todo);
                  }}
                     className="bg-blue-500 text-blue-50">
                     Edit
                   </Button>
                   <Button size="sm"
                   onClick={() => {
                    deletetodo(name,todo.id,token).then(()=>{
                      setTodos(prevData => prevData.filter(item => item.id  !== todo.id ));
                      toast.success('Deleted!');
                    })
                  }}
                   className="bg-red-500 text-red-50">
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
            setTimeout(() => {
              customredirect('/login');
            }, 700);
          } else{
            toast.error('Logout Failed');
          }
        })
       }}>logout</div>
     </div>
   )
 }