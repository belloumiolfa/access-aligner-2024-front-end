import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from "@angular/router";
import { NgbCollapseModule, NgbDropdown } from "@ng-bootstrap/ng-bootstrap";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { MiniLeftbarComponent } from "../mini-leftbar/mini-leftbar.component";
import { LeftSidebarComponent } from "../left-sidebar/left-sidebar.component";
import { loggedInUser } from "../../Core/Helpers/utils";
import { UtilsService } from "../../Auth/Helpers/utils.service";
import { NgxSpinnerService } from "ngx-spinner";
import { HandleErrorsService } from "../../Core/Helpers/handle-errors.service";
import { AuthService } from "../../Core/Services/AuthService/auth.service";
import { User } from "../../Core/Models/user.models";
import { AppService } from "../../Core/Services/app.service";
export interface MenuItem {
  id?: number;
  key?: string;
  label?: string;
  icon?: string;
  url?: string;
  collapsed?: boolean;
  children?: any;
  isTitle?: boolean;
  badge?: any;
  parentKey?: number;
  class?: string;
}

@Component({
  selector: "app-layout-container",
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    AccordionModule,
    MiniLeftbarComponent,
    NgbCollapseModule,
    NgbDropdown,
    RouterModule,
    LeftSidebarComponent,
  ],
  templateUrl: "./layout-container.component.html",
  styleUrl: "./layout-container.component.css",
})
export class LayoutContainerComponent {
  showMobileMenu: boolean = true;

  menuItems: MenuItem[] = [];
  activeMenuItems: string[] = [];
  chunkSize: number = 7;
  div: HTMLElement | null | undefined;
  isCollapsed: any = true;

  user$!: User;
  errors!: any;

  constructor(
    private route: ActivatedRoute,
    private utils: UtilsService,
    private authService: AuthService,
    private handleErrors: HandleErrorsService,
    private spinner: NgxSpinnerService,
    private appService: AppService
  ) {
    this.appService.getUser$.subscribe((data) => (this.user$ = data));
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.spinner.show();
    this.authService
      .getUserById(this.utils.getDecodedAccessToken(loggedInUser()).userId)
      .subscribe(
        (data) => {
          this.spinner.hide();
          this.appService.setUser$(data);
        },
        (err) => {
          this.spinner.hide();
          this.errors = this.handleErrors.handleError(err);
        }
      );
  }
}
