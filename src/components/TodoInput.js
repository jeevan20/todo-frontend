import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function TodoInput(props) {
  const [todo, setTodo] = useState("");
  const { user } = useSelector((state) => state.auth);
  const base_URL = "https://todo-api-qru6.onrender.com";
  const onSubmit = async (e) => {
    e.preventDefault();
    const token = user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const todoItem = { content: todo };

    const response = await axios.post(
      base_URL + "/api/todos/new",
      todoItem,
      config
    );

    props.addTodo(response.data);
    setTodo("");
  };
  return (
    <div className="todo-add-item">
      <input
        type="text"
        name="todo"
        value={todo}
        onChange={(e) => {
          setTodo(e.target.value);
        }}
      />
      <button
        onClick={onSubmit}
        className="todo-add-btn"
        disabled={todo.length === 0}
      >
        ADD
      </button>
    </div>
  );
}

export default TodoInput;
