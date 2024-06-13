import { Component } from "@angular/core";
import { teeth } from "../../Shared/Static Data/teeth";
import { CommonModule } from "@angular/common";
import { AppService } from "../../Core/Services/app.service";
import { TreatmentService } from "../../Core/Services/TreatService/treatment.service";
import { error } from "console";
import { NgxSpinnerService } from "ngx-spinner";
import { HandleAlertsService } from "../../Core/Helpers/handle-alerts.service";
import { HandleErrorsService } from "../../Core/Helpers/handle-errors.service";

@Component({
  selector: "app-new-treat-teeth",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./new-treat-teeth.component.html",
  styleUrl: "./new-treat-teeth.component.css",
})
export class NewTreatTeethComponent {
  data: any[] = [];
  colors = [
    { id: 0, color: "#FFFFFF", class: "btn-simple", label: "undo" },

    { id: 1, color: "#3F51B5", class: "bg-indigo", label: "Missing" },
    { id: 2, color: "#009688", class: "bg-teal", label: "No moving" },
    { id: 3, color: "#FFC107", class: "bg-amber", label: "Implant" },
    { id: 4, color: "#F44336", class: "bg-red", label: "Crown" },
  ];

  color: any = {};
  teeth = teeth;
  treatment$!: any;
  errors: any;

  constructor(
    private appService: AppService,
    private treatmentService: TreatmentService,
    private handleErrors: HandleErrorsService,
    private handleAlerts: HandleAlertsService,
    private spinner: NgxSpinnerService
  ) {
    this.appService.getTreatment$.subscribe((data) => {
      console.log(data);
      
      this.treatment$ = data;
      this.treatment$.teeth?.forEach((element: any) => {
        this.changeColor(element.num, this.colors[element.action]);
      });
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    teeth.forEach((element) => {
      let t = { num: element.id, status: element.status };
      this.data.push(t);
    });
  }

  pickColor(color: any) {
    this.color = color;
  }

  changeColor(id: number, color: any) {

    this.teeth.find((currentItem) => {
      if (currentItem.id === id) {
        currentItem.color = color.color;
      }
    });
    this.data.find((currentItem) => {
      if (currentItem.num === id) {
        currentItem.status = this.colors.indexOf(color);
      }
    });
  }

  onSubmit() {
    let data = this.data.filter((x) => x.status != 0);
    console.log(data);

    this.treatmentService.addTreatTeeth(data, this.treatment$.id).subscribe(
      (data) => {
        this.spinner.hide();

        console.log(data);

        // set treatment
        this.handleAlerts.handleSweetAlert(
          "Treatment information successfully added. ",
          "success",
          false
        );

        this.appService.setTreatment(data);
      },
      (err) => {
        this.errors = this.handleErrors.handleError(err);
        this.spinner.hide();

        this.handleAlerts.handleSweetAlert(
          "Check your data input carefully.",
          "error",
          false
        );
      }
    );
  }

  onReset() {
    /* this.teeth = teeth;

    teeth.forEach((element) => {
      let t = { num: element.id, status: element.status };
      this.data.push(t);
    }); */
    this.treatment$.teeth?.forEach((element: any) => {
      this.changeColor(element.num, this.colors[element.action]);
    });
  }
}
