import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HandleErrorsService {
  errors: any = {};
  constructor(private router: Router) {}

  handleError(err: any) {
    switch (err.status) {
      case 400:
        for (let error of err.error.errors) {
          this.errors[Object.keys(error)[0]] = error[Object.keys(error)[0]];
        }
        break;
      case 500:
        console.log(err);
        //this.router.navigate(["/500"]);

        break;

      case 503:
        console.log(err);
        // this.router.navigate(["/503"]);

        break;
      case 403:
        console.log(err);
        // this.router.navigate(["/locked"]);
        break;

      default:
        console.log(err);
        this.errors = {};
        break;
    }
    return this.errors;
  }
}
