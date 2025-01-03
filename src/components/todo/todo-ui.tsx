'use client';

import  './todo-ui.css'
// import todoCss from './todo-ui.css'

import { useTodoProgram } from './todo-data-access'

export function TodoCreate() {
  const { createTodo } = useTodoProgram();

  return (
    <button
      className="btn btn-xs lg:btn-md btn-primary"
      onClick={() => createTodo.mutateAsync()}
      disabled={createTodo.isPending}
    >
      Run program{createTodo.isPending && '...'}
    </button>
  );
}

export function TodoInitiate() {
  const { initializeTodo } = useTodoProgram();

  return (
    <button
      className="bg-white/50 px-3 py-2 rounded-xl"
      onClick={() => initializeTodo.mutateAsync()}
      disabled={initializeTodo.isPending}
    >
      Create your Bucket {initializeTodo.isPending && '...'}
    </button>
  );
}

export function TodoProgram() {
  const { getProgramAccount } = useTodoProgram();

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

  const { getUserTodoList } = useTodoProgram();

  if (getUserTodoList.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (getUserTodoList.data) {
    return (
        <div className="flex flex-col">
          <span>
            eheh
          </span>
          <div className="flex items-center">
              <TodoInitiate />
          </div>
        </div>
    );
  }

  return (
      <div className="">

        <div className="flex flex-col gap-2">
          <div id="checklist" className="flex flex-col gap-3">
            {
              getUserTodoList.data.todoTasks.map(task => {
                return <div className="flex flex-col p-3 rounded-md bg-white/10">
                  <div className="flex items-center">
                    <input value="2" name="r" type="checkbox" id={task.id}/>
                    <label htmlFor={task.id}>{task.description}</label>
                  </div>
                  <div className="pl-9 text-xs">
                    Due On: <span className="font-bold">{task.dueDate}</span>
                  </div>
                </div>
              })
            }
          </div>
        </div>
      </div>
  )
}
