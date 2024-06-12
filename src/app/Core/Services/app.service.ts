import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "../Models/user.models";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { HandleAlertsService } from "../Helpers/handle-alerts.service";
import { HandleErrorsService } from "../Helpers/handle-errors.service";
import { UserService } from "./UserService/user.service";
import { TreatmentService } from "./TreatService/treatment.service";

@Injectable({
  providedIn: "root",
})
export class AppService {
  imageUrl!: SafeUrl;

  private user$ = new BehaviorSubject({});
  private photo$ = new BehaviorSubject({});
  private patients$ = new BehaviorSubject({});
  private patient$ = new BehaviorSubject({});
  private treatment$ = new BehaviorSubject({});
  errors: any;

  constructor(
    private sanitizer: DomSanitizer,
    private userService: UserService,
    private handleErrors: HandleErrorsService,
    private handleAlerts: HandleAlertsService,
    private treatmentService: TreatmentService
  ) {}

  getUser$ = this.user$.asObservable();
  getPhoto$ = this.photo$.asObservable();
  getPatients$ = this.patients$.asObservable();
  getPatient$ = this.patient$.asObservable();
  getTreatment$ = this.treatment$.asObservable();

  setUser$(user: User) {
    this.user$.next(user);
    // get user photo
    if (user.profile.photo !== null) {
      this.userService.getPhoto(user.profile.photo.id).subscribe(
        (data: any) => {
          this.setPhoto$(data);
        },
        (err: any) => {
          this.errors = this.handleErrors.handleError(err);
          this.handleAlerts.handleSweetAlert(
            "Check your data input carefully.",
            "error",
            false
          );
        }
      );
    }
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
    let tab: any[] = [];
    data.forEach((element: any) => {
      if (element.doctor.profile.photo != null) {
        this.userService.getPhoto(element.doctor.profile?.photo.id).subscribe(
          (data: any) => {
            const reader = new FileReader();
            let imageUrl!: SafeUrl;

            reader.onload = (e: any) => {
              imageUrl = this.sanitizer.bypassSecurityTrustUrl(
                URL.createObjectURL(data)
              );
              element = {
                ...element,
                doctor: {
                  ...element.doctor,
                  profile: { ...element.doctor.profile, photo: imageUrl },
                },
              };
              tab.push(element);
            };

            reader.readAsDataURL(data);
          },
          (err: any) => {
            this.errors = this.handleErrors.handleError(err);
            this.handleAlerts.handleSweetAlert(
              "Check your data input carefully.",
              "error",
              false
            );
          }
        );
      } else {
        tab.push(element);
      }
    });

    this.patients$.next(tab);
  }

  setPatient$(data: any) {
    // get initial treatment
    this.treatmentService.getInitPaatientTreat(data.id).subscribe(
      (data) => {
        this.setTreatment(data);
      },
      (err: any) => {
        this.errors = this.handleErrors.handleError(err);
        this.handleAlerts.handleSweetAlert(
          "Check your data input carefully.",
          "error",
          false
        );
      }
    );
    this.patient$.next(data);
  }

  setTreatment(data: any) {
    this.treatment$.next({ ...this.getTreatment$, ...data });
  }
}
