import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { SecurityFormComponent } from "../../Components/security-form/security-form.component";
import { AccountFormComponent } from "../../Components/account-form/account-form.component";
import { PhotoFormComponent } from "../../Components/photo-form/photo-form.component";

@Component({
  selector: "app-rigth-sidebar",
  standalone: true,
  imports: [
    CommonModule,
    SecurityFormComponent,
    AccountFormComponent,
    PhotoFormComponent,
  ],
  templateUrl: "./rigth-sidebar.component.html",
  styleUrl: "./rigth-sidebar.component.css",
})
export class RigthSidebarComponent {
  @Input() action!: any;
  actSet: any = true;
}
