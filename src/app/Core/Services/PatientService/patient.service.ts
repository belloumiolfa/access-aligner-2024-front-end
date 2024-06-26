import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { Observable, map } from "rxjs";
import { loggedInUser } from "../../Helpers/utils";

@Injectable({
  providedIn: "root",
})
export class PatientService {
  apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {

  }

  addPatient(patientData: any, id: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiBaseUrl}/api/private/add-patient?doctorId=` + id,
        patientData,
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
  getPatients(): Observable<any> {
    return this.http
      .get<any>(`${this.apiBaseUrl}/api/private/get-patients`, {
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

  getPatient(id: any): Observable<any> {
    return this.http
      .get<any>(`${this.apiBaseUrl}/api/private/get-patient?id=` + id, {
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

  updatePatient(patientData: any, id: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiBaseUrl}/api/private/update-patient?id=` + id,
        patientData,
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

  deletePatient(id: any): Observable<any> {
    return this.http
      .delete<any>(`${this.apiBaseUrl}/api/private/delete-patient?id=` + id, {
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
