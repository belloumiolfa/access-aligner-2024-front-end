import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "../Models/user.models";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

@Injectable({
  providedIn: "root",
})
export class AppService {
  private user$ = new BehaviorSubject({});
  private photo$ = new BehaviorSubject({});
  private patients$ = new BehaviorSubject({});
  private patient$ = new BehaviorSubject({});

  constructor(private sanitizer: DomSanitizer) {}

  getUser$ = this.user$.asObservable();
  getPhoto$ = this.photo$.asObservable();
  getPatients$ = this.patients$.asObservable();
  getPatient$ = this.patient$.asObservable();

  imageUrl!: SafeUrl;

  setUser$(user: User) {
    this.user$.next(user);
  }

  setPhoto$(photo: any) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(photo)
      );
      this.photo$.next(this.imageUrl);
    };
    reader.readAsDataURL(photo);
  }

  setPatients$(data: any) {
    this.patients$.next(data);
  }

  setPatient$(data: any) {
    this.patient$.next(data);
  }
}
