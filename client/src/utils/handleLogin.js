import cookie from "js-cookie";
import { useContext } from "react";
import Context from "../context";

export function HandleLogin(token) {
  const { dispatch } = useContext(Context);

  cookie.set("token", token);
  dispatch({ type: "LOGIN_USER" });
  window.location.href = "/";
}

export function HandleLogout() {
  cookie.remove("token");
  const { dispatch } = useContext(Context);
  dispatch({ type: "LOGOUT_USER" });
  window.location.href = "/";
}
