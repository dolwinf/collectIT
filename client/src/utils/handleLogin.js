import cookie from "js-cookie";
import React from "react";

export function handleLogin(token) {
  cookie.set("token", token);
  window.location.href = "/";
}

export function handleLogout() {
  cookie.remove("token");
  window.location.href = "/";
}
