import { Box, Button, Stack, TextField } from "@mui/material";
import CommanData from "./CommanData";
import { useEffect, useState } from "react";
import axios from "axios";

const Details = ({ userData, editUserDetail }) => {
  const [isUserDetalClick, setUserDetailsClick] = useState(false);

  const [editedData, setEditedData] = useState({
    body: userData.body,
    title: userData.title,
  });
  console.log("userData", userData);
  let content = null;
  if (!isUserDetalClick) {
    content = (
      <>
        <CommanData userData={userData} />
        <Button
          onClick={() => {
            setUserDetailsClick((prevValue) => !prevValue); // Toggle the state
          }}
        >
          Edit
        </Button>
      </>
    );
  }

  const handleBodyChange = (e) => {
    setEditedData((prevData) => ({
      ...prevData,
      body: e.target.value,
    }));
  };

  const handleTitleChange = (e) => {
    setEditedData((prevData) => ({
      ...prevData,
      title: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const data = await axios.put(
        "https://jsonplaceholder.typicode.com/posts/1",
        {
          body: userData.body,
          title: userData.title,
        }
      );
      editUserDetail({
        body: editedData.body, // Update with edited values
        title: editedData.title, // Update with edited values
      });
      console.log("submitDtata", data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setEditedData({
      body: userData.body,
      title: userData.title,
    });
  }, [userData]);
  return (
    <Box>
      {content}

      {isUserDetalClick && (
        <Box>
          <TextField
            value={editedData.body}
            variant="outlined"
            fullWidth
            onChange={handleBodyChange}
          />
          <TextField
            value={editedData.title}
            variant="outlined"
            fullWidth
            onChange={handleTitleChange}
          />

          <Stack>
            <Button
              onClick={() => {
                setUserDetailsClick(false);
                setEditedData({
                  body: userData.body,
                  title: userData.title,
                });
              }}
            >
              cancle
            </Button>
            <Button onClick={handleSubmit}>submit</Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Details;
