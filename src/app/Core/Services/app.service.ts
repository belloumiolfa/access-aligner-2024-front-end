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

  constructor(private sanitizer: DomSanitizer) {}

  getUser$ = this.user$.asObservable();
  getPhoto$ = this.photo$.asObservable();

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
}
