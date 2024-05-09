import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { User } from "../Models/user.models";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { UtilsService } from "../../Auth/Helpers/utils.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  apiBaseUrl = environment.apiBaseUrl;
  user$: User | null = null;

  constructor(private http: HttpClient) {}

  getUserById(id: any) {
    return this.http
      .get<User>(`${this.apiBaseUrl}/api/getById?id=${id}`)
      .pipe(map((user: any) => user));
  }

  updateStatus(userId: any, statusId: any, adminId: any): Observable<User> {
    return this.http
      .post<User>(`${this.apiBaseUrl}/api/auth/updateStatus`, {
        userId,
        statusId,
        adminId,
      })
      .pipe(map((user: any) => user));
  }
}
