import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { Observable, map } from "rxjs";
import { loggedInUser } from "../../Helpers/utils";

@Injectable({
  providedIn: "root",
})
export class TreatmentService {
  apiBaseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  addTreatInfo(data: any, patientId: any, doctorId: any): Observable<any> {
    console.log(patientId, doctorId);

    return this.http
      .post<any>(
        `${this.apiBaseUrl}/api/private/add-information?patientId=` +
          patientId +
          "&doctorId=" +
          doctorId,
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

  getTreatmentById(id: any): Observable<any> {
    return this.http
      .get<any>(`${this.apiBaseUrl}/api/private/get-treatment?id=` + id, {
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

  getInitPaatientTreat(id: any): Observable<any> {
    return this.http
      .get<any>(`${this.apiBaseUrl}/api/private/get-init-treatment?patientId=` + id, {
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
