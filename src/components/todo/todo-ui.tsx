'use client';

import './todo-ui.css'
// import todoCss from './todo-ui.css'
import {useTodoProgram} from './todo-data-access'
import {faShoppingBasket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Input} from "@nextui-org/input";
import {Roboto} from 'next/font/google'

const roboto = Roboto({subsets: ['latin'], weight: '700'})

export function TodoCreate() {
  const { createTodo } = useTodoProgram();

  return (
    <button
      className="btn btn-xs lg:btn-md btn-primary"
      onClick={() => createTodo.mutateAsync('')}
      disabled={createTodo.isPending}
    >
      Run program{createTodo.isPending && '...'}
    </button>
  );
}

export function TodoInitiate() {
  const { initializeTodo } = useTodoProgram();

  return (
      <div className="mt-4 md:mt-24 flex gap-4 flex-col items-center bg-primary-50/60 p-8 rounded-xl">
          <div className="text-center flex flex-col gap-4">
              <span className={roboto.className+" font-extrabold text-2xl"}>
                  SOL.DO Bucket.
              </span>
              <div className="text-sm flex flex-col">
                  <span>Your account does not have SOL.DO bucket.</span>
                  <span>Create your bucket to start saving your todos.</span>
              </div>
          </div>
          <div className="">
              <button
                  className="bg-primary text-white px-3 py-2 rounded-xl flex gap-2 items-center"
                  onClick={() => initializeTodo.mutateAsync()}
                  disabled={initializeTodo.isPending}>
                  <FontAwesomeIcon className="text-white " icon={faShoppingBasket}/>
                  Create your Bucket {initializeTodo.isPending && '...'}
              </button>
          </div>
      </div>
  );
}

export function TodoProgram() {
    const {getProgramAccount} = useTodoProgram();

    if (getProgramAccount.isLoading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }
    if (!getProgramAccount.data?.value) {
    return (
      <div className="alert alert-info flex justify-center">
        <span>
          Program account not found. Make sure you have deployed the program and
          are on the correct cluster.
        </span>
      </div>
    );
  }
  return (
    <div className={'space-y-6'}>
      <pre>{JSON.stringify(getProgramAccount.data.value, null, 2)}</pre>
    </div>
  );
}


export function TodoList() {

    const {getUserTodoList, changeTodoStatus} = useTodoProgram();

    // if (getUserTodoList.isPending) {
    //   return <span className="loading loading-spinner loading-lg"></span>;
    // }

  if (!getUserTodoList.data) {
    return (
      <TodoInitiate />
    );
  }

  return (
        <div className="flex flex-col gap-2 mt-4">

            <div className={roboto.className + " text-xl mt-4"}>
                SOL.DO Bucket
            </div>

            {
                getUserTodoList.data?.todoTasks?.length ?
                    <div id="checklist" className="flex flex-col gap-3">
                        {
                            getUserTodoList.data.todoTasks.map(task => {
                                return <div className="border border-primary p-0.5 rounded-lg" key={task.id}>
                                    <div
                                        className="flex flex-col p-3 rounded-md bg-gradient-to-tl from-primary/70 to-secondary/70 text-white">
                                        <div className="flex items-center">
                                            <input checked={task?.isCompleted}
                                                   onChange={() => {
                                                       changeTodoStatus.mutateAsync(task?.id?.toNumber())
                                                   }} value="2" name="r" type="checkbox" id={task.id}/>
                                            <label htmlFor={task.id}
                                                   className="!flex !justify-between !items-center gap-8">
                                <span>
                                    {task.description}
                                </span>
                                                <span className="text-xs mt-0.5">
                                    Created On: <span className="font-bold">{task.dueDate}</span>
                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    :
                    <div className="flex flex-col items-center gap-4 mt-2 p-2 bg-primary-50/40 rounded-xl">
                        <div className="flex flex-col items-center gap-4 borde bg-primary-50/70 p-8 rounded-xl">
                            <span className="text-primary-700 text-6xl animate-pulse">
                                🪣
                            </span>
                            <span className="text-primary font-bold">Start by adding your very first todo task</span>
                            <span className="text-gray-500 font-bold">💥💥💥 Let's get things rolling! 💥💥💥</span>
                        </div>
                    </div>
            }

        </div>
  )
}


export function TodoInput() {

    const {createTodo, todoDescription, setTodoDescription} = useTodoProgram();


    return (
        <div>
            <div className="flex flex-col md:relative w-full">

                <form onSubmit={(e) => {
                    e.preventDefault()
                    createTodo.mutateAsync(todoDescription);
                }}>
                    <Input label="Enter Your Todo..." multiple={true} type="text" value={todoDescription}
                           onValueChange={setTodoDescription} className="rounded-xl shadow-lg shadow-gray-200"/>
                    <div
                        className={`w-full md:w-auto md:mt-2 md:absolute top-0 right-2 mt-3 ${todoDescription === '' ? '' : 'hover:border transition-all ease-in-out delay-150 duration-300'} border-primary/80 p-[1px] rounded-xl`}>
                        <button
                            disabled={todoDescription === '' || createTodo.isPending}
                            className={`${todoDescription === '' ? 'bg-primary-100 text-gray-400' : 'bg-primary/80 text-white'} w-full md:w-auto  rounded-xl p-2`}>
                            {!createTodo.isPending ? <div>Create</div> : <div>Creating ...</div>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
