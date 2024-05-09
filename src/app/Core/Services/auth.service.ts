import { Injectable } from "@angular/core";
import { User } from "../Models/user.models";
import { Observable, map } from "rxjs";
import { loggedInUser } from "../Helpers/utils";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  apiBaseUrl = environment.apiBaseUrl;
  user: User | null = null;

  constructor(private http: HttpClient) {}

  public currentUser(): User | null {
    if (!this.user) {
      this.user = loggedInUser();
    }
 
    return this.user;
  }

  signup(data: any): Observable<User> {
    return this.http
      .post<User>(`${this.apiBaseUrl}/api/auth/signup`, data)
      .pipe(map((user: any) => user));
  }

  getById(id: any): Observable<User> {
    return this.http
      .get<User>(`${this.apiBaseUrl}/api/getById?id=${id}`)
      .pipe(map((user: any) => user));
  }

  login(email: string, password: string): Observable<User> {
    return this.http
      .post<User>(`${this.apiBaseUrl}/api/auth/login`, { email, password })
      .pipe(
        map((user) => {
          // login successful if there's a jwt token in the response
          if (user) {
            // && user.token
            this.user = user;
            // store user details and jwt in session
            sessionStorage.setItem("currentUser", JSON.stringify(user));
          }
          return user;
        })
      );
  }

  logout(): void {
    // remove user from session storage to log user out
    sessionStorage.removeItem("currentUser");
    this.user = null;
  }
}
