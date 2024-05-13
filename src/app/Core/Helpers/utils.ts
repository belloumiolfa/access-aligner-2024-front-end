function loggedInUser(): any {
  let user = sessionStorage.getItem("currentUser");
 
  return user;
}

function signInUser(token: string, keepLoggedIn: boolean) {
  if (keepLoggedIn) localStorage.setItem("currentUser", token);
  else sessionStorage.setItem("currentUser", token);
}

function logOut() {
  sessionStorage.removeItem("currentUser");
  localStorage.removeItem("currentUser");
}
export { loggedInUser, signInUser, logOut };
