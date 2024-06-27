import { Injectable } from "@angular/core";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class HandleAlertsService {
  constructor() {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  handleSweetAlert(title: any, icon: any, showConfirmButton: any) {
    Swal.fire({
      title: title,
      icon: icon,
      toast: true,
      timerProgressBar: true,
      timer: 2000,
      /* timerProgressBar: !showConfirmButton,
      timer: !showConfirmButton ? 2000 : 0, */
      showConfirmButton: showConfirmButton,
      customClass: {
        container: "",
        popup: "",
        title: "",
        closeButton: "",
        icon: "",
        image: "",
        htmlContainer: "",
        input: "",
        inputLabel: "",
        validationMessage: "",
        actions: "",
        confirmButton: "",
        denyButton: "",
        cancelButton: "",
        loader: "",
        footer: "",
        timerProgressBar: "",
      },

      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    });
  }


  handleConfirmAlert(title: any, icon: any, showConfirmButton: any) {
    Swal.fire({
      title: title,
      icon: icon,
      toast: true,
      
      /* timerProgressBar: !showConfirmButton,
      timer: !showConfirmButton ? 2000 : 0, */
      showConfirmButton: showConfirmButton,
      customClass: {
        container: "",
        popup: "",
        title: "",
        closeButton: "",
        icon: "",
        image: "",
        htmlContainer: "",
        input: "",
        inputLabel: "",
        validationMessage: "",
        actions: "",
        confirmButton: "",
        denyButton: "",
        cancelButton: "",
        loader: "",
        footer: "",
        timerProgressBar: "",
      },

      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    });
  }
}
