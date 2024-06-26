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
  private treatments$ = new BehaviorSubject<any[]>([]);
  private treatPhotos$ = new BehaviorSubject<any[]>([]);
  private treatClinics$ = new BehaviorSubject([]);
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
  getTreatments$ = this.treatments$.asObservable();
  getTreatPhotos$ = this.treatPhotos$.asObservable();
  getTreatClinics$ = this.treatClinics$.asObservable();

  setUser$(user: User) {
    this.user$.next(user);
    // get user photo
    if (user.profile.photo !== null) {
      this.userService.getPhoto(user.profile.photo.id, "Profile").subscribe(
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
      if (element.doctor.profile.photo?.id) {
        this.userService
          .getPhoto(element.doctor.profile?.photo.id, "Profile")
          .subscribe(
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
    if (Object.values(data).length > 0)
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

  existedPhotos: any[] = [];
  setTreatment(data: any) {
    let treatment = {
      ...data,
      photos: this.getTreatPhotos(data?.photos, data.id),
    };
    console.log(treatment);

    this.treatment$.next(treatment);

    // this.setTreatPhotos(this.getTreatPhotos(data?.photos, data.id));
  }

  getTreatPhotos(files: any, treatId: any) {
    // Clear the existing photos
    this.existedPhotos = [];

    files?.forEach((file: any) => {
      this.treatmentService
        .getTreatPhoto(file.id, treatId)
        .subscribe((data) => {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            let photo = {
              resource: this.sanitizer.bypassSecurityTrustUrl(
                URL.createObjectURL(data)
              ),
              id: file.id,
              name: file.name,
              type: file.type,
            };

            this.existedPhotos.push(photo);
          };
          reader.readAsDataURL(data);
        });
    });
    return this.existedPhotos;
  }

  setTreatPhotos(photos: any) {
    this.treatPhotos$.next(photos);
  }

  setTreatments(data: any) {
    this.treatments$.next(data);
  }
}
