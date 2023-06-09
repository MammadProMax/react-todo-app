import React, { Suspense } from "react";

import TodoForm from "./components/TodoForm";

const ListContainer = React.lazy(() => import("./components/listContainer"));

function App() {
  return (
    <>
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-3xl border overflow-hidden">
          <div className="mb-4">
            <h1 className="text-gray-700 text-3xl font-bold pl-1">Todo List</h1>
            <TodoForm />
          </div>
          <Suspense fallback={<p>loading ...</p>}>
            <ListContainer />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default App;
