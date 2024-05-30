import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { loggedInUser } from "../../Helpers/utils";

@Injectable({
  providedIn: "root",
})
export class UserService {
  apiBaseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  updateSetting(
    userName: string,
    currentPassword: string,
    newPassword: string
  ): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiBaseUrl}/api/private/securitySettings`,
        { userName, currentPassword, newPassword },
        {
          headers: new HttpHeaders().set(
            "Authorization",
            `Bearer ${loggedInUser()}`
          ),
        }
      )
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  updateProfile(data: any, id: any): Observable<any> {
    console.log(data);

    return this.http
      .post<any>(
        `${this.apiBaseUrl}/api/private/updateProfile?userId=` + id,
        { ...data },
        {
          headers: new HttpHeaders().set(
            "Authorization",
            `Bearer ${loggedInUser()}`
          ),
        }
      )
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  updatePhoto(file: File, id: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("file", file);

    return this.http
      .post(
        this.apiBaseUrl + "/api/private/updatePhoto?userId=" + id,
        formData,
        {
          responseType: "blob",
          headers: new HttpHeaders().set(
            "Authorization",
            `Bearer ${loggedInUser()}`
          ),
        }
      )
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  getPhoto(id: any): Observable<any> {
    return this.http
      .get(this.apiBaseUrl + "/api/private/getPhoto?id=" + id, {
        responseType: "blob",
        headers: new HttpHeaders().set(
          "Authorization",
          `Bearer ${loggedInUser()}`
        ),
      })
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }
}
