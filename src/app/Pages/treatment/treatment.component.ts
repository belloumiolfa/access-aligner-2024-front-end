import { Component } from "@angular/core";
import { BlockHeaderComponent } from "../../Shared/Elements/block-header/block-header.component";
import { RouterOutlet } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { HandleAlertsService } from "../../Core/Helpers/handle-alerts.service";
import { HandleErrorsService } from "../../Core/Helpers/handle-errors.service";
import { TreatmentService } from "../../Core/Services/TreatService/treatment.service";
import { AppService } from "../../Core/Services/app.service";

@Component({
  selector: "app-treatment",
  standalone: true,
  imports: [RouterOutlet, BlockHeaderComponent],
  templateUrl: "./treatment.component.html",
  styleUrl: "./treatment.component.css",
})
export class TreatmentComponent {
  errors: any;
  constructor(
    private treatmentService: TreatmentService,
    private handleErrors: HandleErrorsService,
    private handleAlerts: HandleAlertsService,
    private spinner: NgxSpinnerService,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.spinner.hide();

    this.treatmentService.getTreatments().subscribe(
      (data) => {
        this.spinner.hide();
        this.appService.setTreatments(data);
      },
      (err) => {
        this.spinner.hide();
        this.errors = this.handleErrors.handleError(err);
      }
    );
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
}
