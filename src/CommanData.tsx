import { Typography } from "@mui/material";

const CommanData = ({ userData }) => {
  return (
    <div>
      <Typography>body: {userData.body}</Typography>
      <Typography>title: {userData.title}</Typography>
    </div>
  );
};

export default CommanData;
