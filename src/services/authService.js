import http from "./httpService";
import jwtDecode from "jwt-decode";
import { apiEndpoint } from "./config.json";

const serviceUrl = `${apiEndpoint}/Auth`;
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const { headers: jwt } = await http.post(serviceUrl, { email, password });
  localStorage.setItem(tokenKey, jwt["x-auth-token"]);
}

export async function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {}
  return null;
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
