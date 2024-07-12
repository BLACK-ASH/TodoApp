import generateUniqueId from 'generate-unique-id'
import { useEffect, useState } from 'react'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(() => {
      let initialTodos = JSON.parse(localStorage.getItem("todos"))
      setTodos(initialTodos)
  }, [])

  const setItem = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  const input = (e) => {
    setTodo(e.target.value)
  }
  const check = (e) => {
    let id = e.target.name
    let i = todos.findIndex(item => {
      return item.id === id;
    })
    let newtodos = [...todos];
    newtodos[i].iscompleted = !newtodos[i].iscompleted;
    setTodos(newtodos)
  }
  const delTodo =  (e) => {
    let id = e.target.name
    let newtodos = todos.filter((item) => {
      return item.id !== id
    })
    setTodos(newtodos)
    setItem()
  }

  const inputAdd =  () => {
    setTodos([...todos, { todo, iscompleted: false, id: generateUniqueId() }])
    setTodo("")
    setItem()
  }
  const editTodo =  (e) => {
    let id = e.target.name
    let newtodo = todos.filter((item) => {
      return item.id == id
    })
    let newtodos = todos.filter((item) => {
      return item.id !== id
    })
    setTodos(newtodos)
    setTodo(newtodo[0].todo)
    setItem()
  }


  return (
    <>
      <div className='bg-gradient-to-r from-green-400 to-blue-500 w-[100vw] h-[100vh] py-[4vh]' >
        <div className="container mx-auto w-[50vw] max-sm:w-[95vw] bg-sky-100 h-[90vh] rounded-md p-4">
          <h1 className='font-bold text-5xl p-8'>Todo List</h1>
          <div className='bg-slate-200 w-full p-2 rounded-lg flex gap-3 ' >
            <input className='w-full rounded-[10px]' value={todo} type="text" onChange={input} />
            <button className='p-2 bg-sky-600 text-2xl font-bold rounded-[10px]' onClick={inputAdd} >Save</button>
          </div>
          <div className=' flex flex-col gap-3 pt-2 overflow-auto h-[78%] '>
            {/* this is the todo element */}
            {todos.map((item) => {
              return <div key={item.id} className='flex justify-between bg-slate-100 w-full rounded-lg p-3' >
                <div className='flex gap-2' >
                  <input type="checkbox" name={item.id} id="" value={item.iscompleted} onChange={check} />
                  <p className={(item.iscompleted) ? "line-through" : ""} > {item.todo}</p>
                </div>
                <div className='flex gap-2 '>
                  <button onClick={editTodo} name={item.id} className=' bg-sky-600 p-1 px-2 font-bold rounded-[10px] ' >Edit</button>
                  <button onClick={delTodo} name={item.id} className=' bg-sky-600 p-1 px-2 font-bold rounded-[10px] ' >Delete</button>
                </div>
              </div>

            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
