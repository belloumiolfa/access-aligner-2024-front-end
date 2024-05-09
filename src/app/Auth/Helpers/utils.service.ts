import { Injectable } from "@angular/core";
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class UtilsService {
  observableHandling: any;

  constructor() {}
  getDecodedAccessToken(token: any): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }

  getToken() {
    return this.getDecodedAccessToken(localStorage.getItem("access_token"));
  }

  getExpiration() {
    return this.observableHandling.interval(
      new Date(this.getToken()?.expirDate).valueOf() - new Date().valueOf()
    );
  }
}
