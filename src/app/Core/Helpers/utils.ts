import { Router } from "express";
import { User } from "../Models/user.models";

function loggedInUser(): User | null {
  let user: User | null = {};
  user = JSON.parse(sessionStorage.getItem("currentUser")!);
  return user;
}

 export { loggedInUser,   };
