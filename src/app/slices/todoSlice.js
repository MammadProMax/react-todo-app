import { createSlice } from "@reduxjs/toolkit";
import Todo from "../../core/createTodo";
const initialState = {
  list: [],
};

const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    setNewTodo: (state, { payload }) => {
      state.list = payload;
    },
    addTodo: (state, action) => {
      let todoSubject = new Todo(action.payload).create();
      state.list.push(todoSubject);
    },
    removeTodo: (state, action) => {
      let newList = state.list.filter((data) => data.id !== action.payload);
      state.list = newList;
    },
    todosDone: (state, { payload }) => {
      state.list = state.list.map((todo) => {
        return todo.id === payload.id ? { ...todo, done: !todo.done } : todo;
      });
    },
  },
});

export const { addTodo, removeTodo, todosDone, setNewTodo } =
  todoListSlice.actions;

export default todoListSlice.reducer;
