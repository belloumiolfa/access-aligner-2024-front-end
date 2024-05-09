import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { OverlayMenuComponent } from "../overlay-menu/overlay-menu.component";
import { MenuAppComponent } from "../menu-app/menu-app.component";
import { NotifMenuComponent } from "../notif-menu/notif-menu.component";
import { TaskMenuComponent } from "../task-menu/task-menu.component";
import { RigthSidebarComponent } from "../rigth-sidebar/rigth-sidebar.component";
import { TabsetComponent } from "ngx-bootstrap/tabs";
import { LeftSidebarMobilComponent } from "../left-sidebar-mobil/left-sidebar-mobil.component";

@Component({
  selector: "app-mini-leftbar",
  standalone: true,
  imports: [
    CommonModule,
    OverlayMenuComponent,
    MenuAppComponent,
    NotifMenuComponent,
    TaskMenuComponent,
    RigthSidebarComponent,
    LeftSidebarMobilComponent,
  ],
  templateUrl: "./mini-leftbar.component.html",
  styleUrl: "./mini-leftbar.component.css",
})
export class MiniLeftbarComponent {
  search = false;
  app = false;
  notif = false;
  task = false;
  activity = false;
  mobile = false;
}
