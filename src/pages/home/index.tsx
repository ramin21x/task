import { Button, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("key");
    localStorage.removeItem("username");
    navigate("/auth/login");
  };

  return (
    <Container>
      <div className="hello">Hello, {localStorage.getItem("username")}! </div>
      <Button onClick={onLogout} variant="contained">
        Logout
      </Button>
    </Container>
  );
};

const Container = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(4),
  width: "83%",
  maxWidth: theme.spacing(40),
  "& .hello": {
    color: theme.palette.success.main,
    ...theme.typography.h5,
    marginBottom: theme.spacing(5),
  },
}));
