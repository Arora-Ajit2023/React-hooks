import { Box, Button, Stack, TextField } from "@mui/material";
import { useReducer, useState } from "react";
import { initialTODoState, useTodoReducer } from "../reducers/TodoReducer";

const ToDo = () => {
  const [state, dispatch] = useReducer(useTodoReducer, initialTODoState);
  const [inputValue, setInputValue] = useState("");
  const [editValue, setEditValue] = useState("");
  const [editTodoIndex, setEditTodoIndex] = useState(null);
  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <TextField
          variant="standard"
          value={inputValue}
          onChange={(e) => {
            const { value } = e.target;
            setInputValue(value);
          }}
        />
        <Button
          variant="outlined"
          onClick={() => {
            dispatch({ type: "ADD_TODO", text: inputValue });
            setInputValue(" ");
          }}
        >
          Add Todo
        </Button>

        <Button
          variant="outlined"
          onClick={() => {
            dispatch({ type: "CLEAR_COMPLETED" });
          }}
        >
          Clear Completed Task
        </Button>
      </Stack>

      <ul>
        {state.todos?.map((todo) => {
          return (
            <Box
              key={todo.id}
              sx={{ pt: 1, display: "flex", gap: 2, alignItems: "center" }}
            >
              {editTodoIndex === todo.id ? (
                <TextField
                  value={editValue}
                  onChange={(e) => {
                    const { value } = e.target;
                    dispatch({ type: "EDIT_TODO", editText: value });
                  }}
                />
              ) : (
                <li style={{ color: todo.completed ? "red" : "" }}>
                  {todo.text}
                </li>
              )}
              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  dispatch({ type: "REMOVE_TODO", id: todo.id });
                }}
              >
                Remove
              </Button>

              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  dispatch({ type: "TOGGLE_TODO", id: todo.id });
                }}
              >
                toggle
              </Button>

              {editTodoIndex === todo.id ? (
                <Button variant="contained" size="small" onClick={() => {}}>
                  save
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    setEditTodoIndex(todo.id);
                  }}
                >
                  Edit
                </Button>
              )}
            </Box>
          );
        })}
      </ul>
    </Box>
  );
};

export default ToDo;
