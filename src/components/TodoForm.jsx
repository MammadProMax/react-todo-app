import { useState } from "react";

import { useDispatch } from "react-redux";
import { addTodo } from "../app/slices/todoSlice";

export default function TodoForm() {
  const dispatch = useDispatch();
  const [stateValue, setInputValue] = useState("");

  const inputHandler = (e) => {
    setInputValue(e.target.value);
  };

  const formHandler = (e) => {
    try {
      e.preventDefault();
      dispatch(addTodo(stateValue));
    } catch (error) {
      console.log(error);
      alert("it must contain characters [a-z] and numbers");
    } finally {
      setInputValue("");
    }
  };

  return (
    <form action="Post" onSubmit={(e) => formHandler(e)}>
      <div className="flex mt-4">
        <input
          type="text"
          onChange={inputHandler}
          value={stateValue}
          className="input-todo shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-800"
          placeholder="Add Todo"
        />
        <button
          type="submit"
          className="p-2 border-2 rounded text-teal-500 border-teal-500  hover:text-white hover:bg-teal-500 submitBtn"
        >
          Add
        </button>
      </div>
    </form>
  );
}
