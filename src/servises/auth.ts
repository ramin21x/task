import { API } from "./api";

export const login = (data: {
  username: string;
  email: string;
  password: string;
}) => API.post<{ key: string }>("users/auth/login/", data);

export const signup = (data: {
  username: string;
  email: string;
  password1: string;
  password2: string;
}) => API.post<{ key: string }>("users/auth/register/", data);
