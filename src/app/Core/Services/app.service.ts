import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "../Models/user.models";

@Injectable({
  providedIn: "root",
})
export class AppService {
  private user$ = new BehaviorSubject({});

  constructor() {}

  getUser$ = this.user$.asObservable();
  
  setUser$(user: User) {
    this.user$.next(user);
  }
}
