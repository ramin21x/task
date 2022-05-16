import { Button, CircularProgress, styled, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { login } from "../../servises/auth";

const schema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
});

export const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({ resolver: yupResolver(schema), mode: "onBlur" });
  const [error, setError] = useState<string>();

  const onSubmit = (data: any) => {
    setLoading(true);
    setError(undefined);
    login(data)
      .then((res) => {
        localStorage.setItem("key", res.data.key);
        localStorage.setItem("username", getValues("username"));
        navigate("/");
      })
      .catch(() => {
        setError("Username or Password incorrect!");
      })
      .finally(() => setLoading(false));
  };

  return (
    <Container>
      <div className="title">Login</div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          className="input"
          type="text"
          id="outlined-basic"
          autoComplete="off"
          fullWidth
          required
          label="Username"
          variant="outlined"
          error={!!errors.username}
          helperText={errors.username?.message}
          {...register("username")}
        />
        <TextField
          className="input"
          type="email"
          fullWidth
          required
          id="outlined-basic"
          label="Email"
          variant="outlined"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email")}
        />
        <TextField
          className="input"
          type="password"
          fullWidth
          required
          id="outlined-basic"
          label="Password"
          variant="outlined"
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register("password")}
        />
        <input type="submit" className="hidden-input" />
        <Button
          disabled={loading}
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          {!loading ? "Login" : <CircularProgress size={26} />}
        </Button>
      </form>
      {error && <div className="error">{error}</div>}

      <div className="signup">
        <div className="des">Don't have an account?</div>
        <Link className="signup-link" to="/auth/signup">
          Signup
        </Link>
      </div>
    </Container>
  );
};

const Container = styled("div")(({ theme }) => ({
  padding: theme.spacing(4),
  width: "83%",
  maxWidth: theme.spacing(40),
  margin: "auto",
  "& .title": {
    ...theme.typography.h4,
    marginBottom: theme.spacing(1.77),
  },
  "& .input": {
    margin: `${theme.spacing(0.7)} auto !important`,
  },
  "&  Button": {
    marginTop: theme.spacing(1.7),
    width: "100%",
  },
  "& .hidden-input": { display: "none" },
  "& .signup": {
    display: "flex",
    flexDirection: "row",
    marginTop: theme.spacing(2),
    "& .signup-link": {
      textDecoration: "none",
      color: theme.palette.info.main,
      marginInlineStart: theme.spacing(1),
    },
  },
  "& .error": {
    color: theme.palette.error.main,
    marginBlock: theme.spacing(3),
  },
}));
