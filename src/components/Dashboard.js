import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";

import axios from "axios";
function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [completeTodos, setCompleteTodos] = useState([]);
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const base_URL = "https://todo-api-qru6.onrender.com";
  const getTodoList = async () => {
    let token;
    if (user) {
      token = await user.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(base_URL + "/api/todos/current", config);
      const newTODO = await response.data;
      setCompleteTodos(newTODO.complete);
      setIncompleteTodos(newTODO.incomplete);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    getTodoList();

    // eslint-disable-next-line
  }, [user, navigate, dispatch]);

  // to add new todo item
  function addTodo(todo) {
    if (todo.complete) {
      const newComplete = [...completeTodos, todo];
      setCompleteTodos(newComplete);
    } else {
      const newIncomplete = [...incompleteTodos, todo];
      setIncompleteTodos(newIncomplete);
    }
  }
  // to update todo mark status
  function updateStatus(todo) {
    if (todo.complete) {
      const newIncomplete = incompleteTodos.filter((item) => {
        return item._id !== todo._id;
      });
      setIncompleteTodos(newIncomplete);
      const newComplete = [...completeTodos, todo];
      setCompleteTodos(newComplete);
    } else {
      const newcomplete = completeTodos.filter((item) => {
        return item._id !== todo._id;
      });
      setCompleteTodos(newcomplete);
      const newIncomplete = [...incompleteTodos, todo];
      setIncompleteTodos(newIncomplete);
    }
  }

  // to delete todo from list
  function deleteTodo(todo) {
    if (todo.complete) {
      const newcomplete = completeTodos.filter((item) => {
        return item._id !== todo._id;
      });
      setCompleteTodos(newcomplete);
    } else {
      const newIncomplete = incompleteTodos.filter((item) => {
        return item._id !== todo._id;
      });
      setIncompleteTodos(newIncomplete);
    }
  }

  return (
    <div className="dashboard">
      <div className="dashboard-box">
        <div className="dashboard-header">
          <h3>
            Welcome{" "}
            {user && user.name
              ? user?.name.charAt(0).toUpperCase() + user?.name.slice(1)
              : user?.user?.name.charAt(0).toUpperCase() +
                user?.user?.name.slice(1)}
          </h3>
        </div>

        <TodoInput addTodo={addTodo} />

        <div className="todoItems">
          <div className="todo-box-incomplete">
            {incompleteTodos?.map((todo) => {
              return (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  updateStatus={updateStatus}
                  deleteTodo={deleteTodo}
                />
              );
            })}
          </div>

          <div className="todo-box-complete">
            <h3>Complete Todo's</h3>
            {completeTodos?.map((todo) => {
              return (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  updateStatus={updateStatus}
                  deleteTodo={deleteTodo}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
