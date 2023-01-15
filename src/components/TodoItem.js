import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
const base_URL = "https://todo-api-qru6.onrender.com";
function TodoItem(props) {
  const { user } = useSelector((state) => state.auth);
  const token = user.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const [todocontent, setTodocontent] = useState(props.todo.content);
  const [editing, setEditing] = useState(false);
  function onEdit(e) {
    e.preventDefault();
    setEditing(!editing);
  }
  function cancelEdit(e) {
    if (e) {
      e.preventDefault();
    }
    setEditing(false);
    setTodocontent(props.todo.content);
  }
  function markAscomplete(e) {
    e.preventDefault();

    axios
      .put(`${base_URL}/api/todos/${props.todo._id}/complete`, {}, config)
      .then((res) => {
        props.updateStatus(res.data);
      });
  }
  function markAsIncomplete(e) {
    e.preventDefault();
    axios
      .put(`${base_URL}/api/todos/${props.todo._id}/incomplete`, {}, config)
      .then((res) => {
        props.updateStatus(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function updateTodo(e) {
    e.preventDefault();
    axios
      .put(
        `${base_URL}/api/todos/${props.todo._id}`,
        { content: todocontent },
        config
      )
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
    setEditing(false);
  }
  function deleteTodo(e) {
    e.preventDefault();
    axios
      .delete(`${base_URL}/api/todos/${props.todo._id}`, config)
      .then((res) => {
        props.deleteTodo(res.data);
      });
  }
  return (
    <div
      className={`todo-${props.todo.complete ? "complete" : ""}-item todo-item`}
    >
      <input
        type="checkbox"
        checked={props.todo.complete}
        name="iscomplete"
        id="iscomplete"
        onChange={!props.todo.complete ? markAscomplete : markAsIncomplete}
      />
      <input
        type="text"
        value={todocontent}
        readOnly={!editing}
        onChange={(e) => {
          setTodocontent(e.target.value);
        }}
      />

      {editing ? (
        <>
          <button className="todo-update-btn" onClick={updateTodo}>
            save
          </button>
          <button className="todo-delete-btn" onClick={cancelEdit}>
            cancel
          </button>
        </>
      ) : (
        <>
          {!props.todo.complete && (
            <button className="todo-update-btn" onClick={onEdit}>
              ✎
            </button>
          )}
          <button className="todo-delete-btn" onClick={deleteTodo}>
            X
          </button>
        </>
      )}
    </div>
  );
}

export default TodoItem;
