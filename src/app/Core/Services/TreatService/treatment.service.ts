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
      .get<any>(
        `${this.apiBaseUrl}/api/private/get-init-treatment?patientId=` + id,
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

  addTreatTeeth(data: any, id: any) {
    return this.http
      .post<any>(
        `${this.apiBaseUrl}/api/private/add-teeth?treatId=` + id,
        data,
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

  addTreatPhotos(data: any, id: any, role: string) {
    const photos: FileList = data;
    const formData = new FormData();

    if (data.length != 0) {
      for (let i = 0; i < photos.length; i++) {
        formData.append("photos", photos[i]);
      }
    }

    return this.http
      .post<any>(
        `${this.apiBaseUrl}/api/private/add-photographs?treatId=` +
          id +
          "&role=" +
          role,
        formData,
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

  getTreatPhoto(fileId: any, treatId: any): Observable<any> {
    return this.http
      .get(
        this.apiBaseUrl +
          "/api/private/getTreatPhoto?fileId=" +
          fileId +
          "&treatId=" +
          treatId,
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

  deleteFile(id: any): Observable<any> {
    return this.http
      .delete(this.apiBaseUrl + "/api/private/deleteFile?id=" + id, {
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
