'use client';

import './todo-ui.css'
// import todoCss from './todo-ui.css'
import {useTodoProgram} from './todo-data-access'
import {faShoppingBasket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Input} from "@nextui-org/input";

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
      <div className="mt-24 flex gap-4 flex-col items-center bg-primary-50/60 p-8 rounded-xl">
          <div className="text-center flex flex-col gap-4">
              <span className="font-extrabold text-2xl">
                  SOL.DO bucket.
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

  if (getUserTodoList.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (!getUserTodoList.data) {
    return (
      <TodoInitiate />
    );
  }

  return (
        <div className="flex flex-col gap-2 mt-4">

            <div className="!font-bold">
                SOL.DO Bucket
            </div>

          <div id="checklist" className="flex flex-col gap-3">
            {
              getUserTodoList.data.todoTasks.map(task => {
                  return <div className="border border-primary p-0.5 rounded-lg" key={task.id}>
                    <div
                        className="flex flex-col  p-3 rounded-md bg-gradient-to-tl from-primary/70 to-secondary/70 text-white">
                        <div className="flex items-center">
                            <input checked={task?.isCompleted}
                                   onChange={() => {
                                       changeTodoStatus.mutateAsync(task?.id?.toNumber())
                                   }} value="2" name="r" type="checkbox" id={task.id}/>
                            <label htmlFor={task.id} className="!flex !justify-between !items-center gap-8">
                                <span>
                                    {task.description}
                                </span>
                                <span className="text-xs mt-0.5">
                                    Due On: <span className="font-bold">{task.dueDate}</span>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
              })
            }
          </div>
        </div>
  )
}


export function TodoInput() {

    const {createTodo, todoDescription, setTodoDescription} = useTodoProgram();


    return (
        <div>
            <div className="relative w-full flex-wrap md:flex-nowrap gap-4">

                <form onSubmit={(e) => {
                    e.preventDefault()
                    createTodo.mutateAsync(todoDescription);
                }}>
                    <Input label="Enter Your Todo..." multiple={true} type="text" value={todoDescription}
                           onValueChange={setTodoDescription} className="rounded-xl shadow-lg shadow-gray-200"/>
                    <div
                        className={`absolute top-0 -right-8 mt-2 ${todoDescription === '' ? '' : 'hover:border transition-all ease-in-out delay-150 duration-300'} border-primary/80 p-[1px] rounded-xl`}>
                        <button
                            disabled={todoDescription === '' || createTodo.isPending}
                            className={`${todoDescription === '' ? 'bg-primary-100 text-gray-400' : 'bg-primary/80 text-white'} rounded-xl p-2`}>
                            {!createTodo.isPending ? <div>Create</div> : <div>Creating ...</div>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
