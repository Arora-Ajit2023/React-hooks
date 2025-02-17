import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useReducer } from "react";
import { counterReducer, initialState } from "./reducers/counterReducer";
import { initialUserData, userReducer } from "./reducers/userReducer";
import { useEffect, useState } from "react";
import Details from "./Details";
import axios from "axios";
import Billing from "./Billing";

// function App() {
//   const [value, setValue] = useState(0);
//   const [userData, setUserData] = useState({
//     body: "",
//     title: "",
//   });

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const getData = async () => {
//     try {
//       const response = await axios(
//         "https://jsonplaceholder.typicode.com/posts"
//       );
//       const data = response?.data[0];
//       setUserData((prvData) => {
//         const updatedUserData = { ...prvData };
//         // updatedUserData(...prvData,body:data.body,title:data.title)
//         updatedUserData.body = data.body;
//         updatedUserData.title = data.title;
//         return updatedUserData;
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getData();
//   }, []);
//   return (
//     <Box>
//       <Tabs
//         value={value}
//         onChange={handleChange}
//         TabIndicatorProps={{ style: { display: "none" } }}
//         textColor="inherit"
//         variant="fullWidth"
//       >
//         <Tab label="Details" value={0} />
//         <Tab label="Billing" value={1} />
//         <Tab label="Treatment" value={2} />
//         <Tab label="Team" value={3} />
//         <Tab label="Facility" value={4} />
//         <Tab label="Document" value={5} />
//       </Tabs>

//       {value === 0 && (
//         <Details userData={userData} editUserDetail={setUserData} />
//       )}
//       {value === 1 && <Billing userData={userData} />}
//     </Box>
//   );
// }

// export default App;

const App = () => {
  const [counterState, counterDispatch] = useReducer(
    counterReducer,
    initialState
  );

  const [userState, userDispatch] = useReducer(userReducer, initialUserData);

  const handleChange = (event: React.SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    userDispatch({
      type: "SET_HOBBIES",
      payload:
        typeof value === "string" ? value.split(",") : (value as string[]),
    });
  };

  return (
    <Box>
      <Button
        size="small"
        onClick={() => counterDispatch({ type: "INCREMENT" })}
      >
        +
      </Button>
      {counterState.count}
      <Button
        size="small"
        onClick={() => counterDispatch({ type: "DECREMENT" })}
      >
        -
      </Button>

      <Box sx={{ mt: 10 }}>
        <Box>
          <TextField
            type="text"
            size="small"
            variant="standard"
            label="first Name"
            value={userState.firstName}
            onChange={(e) => {
              userDispatch({ type: "SET_FIRSTNAME", payload: e.target.value });
            }}
          />
        </Box>

        <Box sx={{ pt: 2 }}>
          <TextField
            type="text"
            size="small"
            variant="standard"
            label="Last Name"
            value={userState.lastName}
            onChange={(e) => {
              userDispatch({ type: "SET_LASTNAME", payload: e.target.value });
            }}
          />
        </Box>

        <Box sx={{ pt: 2 }}>
          <TextField
            type="text"
            size="small"
            variant="standard"
            label="Phone"
            value={userState.phone}
            onChange={(e) => {
              userDispatch({ type: "SET_PHONE", payload: e.target.value });
            }}
          />
        </Box>
        <Box sx={{ pt: 2 }}>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={userState.hobbies}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              // MenuProps={MenuProps}
            >
              {["Reading", "Gaming", "Sports", "Cooking", "Traveling"].map(
                (name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={userState.hobbies.includes(name)} />
                    <ListItemText primary={name} />
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Typography>firstName:{userState.firstName}</Typography>
      <Typography>lastName:{userState.lastName}</Typography>
      <Typography>Typographyhone:{userState.phone}</Typography>

      <Typography>Hobbies: {userState.hobbies.join(", ")}</Typography>
    </Box>
  );
};

export default App;
