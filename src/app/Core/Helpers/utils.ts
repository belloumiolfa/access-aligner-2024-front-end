function loggedInUser(): any {
  let user = sessionStorage.getItem("currentUser")!;
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

function getDate(date: any) {
  let result = "";
  if (date)
    result =
      new Date(date).getUTCDate() +
      "/" +
      new Date(date).getUTCMonth() +
      "/" +
      new Date(date).getUTCFullYear();
  return result;
}
function getTime(date: any) {
  let result = "";
  if (date) new Date(date).getHours() + ":" + new Date(date).getMinutes();

  return result;
}

export { loggedInUser, signInUser, logOut, getDate, getTime };
