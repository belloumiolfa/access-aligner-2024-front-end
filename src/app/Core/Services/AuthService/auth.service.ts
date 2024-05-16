import { Injectable } from "@angular/core";
import { User } from "../../Models/user.models";
import { Observable, map } from "rxjs";
import { logOut, loggedInUser } from "../../Helpers/utils";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment.development";

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
      .post<User>(`${this.apiBaseUrl}/api/public/signup`, data)
      .pipe(map((user: any) => user));
  }

  getUserById(id: any): Observable<User>{
    return this.http
      .get<User>(`${this.apiBaseUrl}/api/public/getById?id=${id}`)
      .pipe(map((user: any) => user));
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post(`${this.apiBaseUrl}/api/public/signin`, { email, password })
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

  updateStatus(userId: any, statusId: any, adminId: any): Observable<User> {
    return this.http
      .post<User>(`${this.apiBaseUrl}/api/public/updateStatus`, {
        userId,
        statusId,
        adminId,
      })
      .pipe(map((user: any) => user));
  }

  forgetPassword(email: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiBaseUrl}/api/public/forgetPassword`, { email })
      .pipe(map((data: any) => data));
  }

  updatePassword(
    userId: Number,
    password: String,
    confirmPassword: String
  ): Observable<any> {
    return this.http
      .post<any>(`${this.apiBaseUrl}/api/public/updatePassword`, {
        password,
        confirmPassword,
        userId,
      })
      .pipe(map((data: any) => data));
  }

  logout(): void {
    logOut();
    this.user = null;
  }
}
