import { Button, CircularProgress, styled, TextField } from "@mui/material";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signup } from "../../servises/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const schema = Yup.object().shape({
  username: Yup.string().required(),
  email: Yup.string().email().required(),
  password1: Yup.string().required().min(8),
  password2: Yup.string()
    .required()
    .oneOf([Yup.ref("password1")], "Passwords must match"),
});

export const Signup: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({ resolver: yupResolver(schema), mode: "onBlur" });
  const [error, setError] = useState<{ [key: string]: string[] }>();
  const onSubmit = (data: any) => {
    setLoading(true);
    setError(undefined);
    signup(data)
      .then((res) => {
        localStorage.setItem("key", res.data.key);
        localStorage.setItem("username", getValues("username"));
        navigate("/");
      })
      .catch((error) => {
        setError(error.response.data);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Container>
      <div className="title">Sign up</div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          className="input"
          type="text"
          id="outlined-basic"
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
          error={!!errors.password1}
          helperText={errors.password1?.message}
          {...register("password1")}
        />
        <TextField
          className="input"
          type="password"
          fullWidth
          required
          id="outlined-basic"
          label="Confirm Password"
          variant="outlined"
          error={!!errors.password2}
          helperText={errors.password2?.message}
          {...register("password2")}
        />
        <input type="submit" className="hidden-input" />
        <Button
          disabled={loading}
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          {!loading ? "Signup" : <CircularProgress size={26} />}
        </Button>
      </form>
      {error && (
        <ul>
          Please fix the errors:{" "}
          {Object.keys(error).map((key) => (
            <li>{error[key].toString()}</li>
          ))}
        </ul>
      )}
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
  "& .hidden-input": {
    display: "none",
  },
  "& > ul": {
    color: theme.palette.error.main,
    "& > li": {
      marignLinlineStart: theme.spacing(3),
    },
  },
}));
