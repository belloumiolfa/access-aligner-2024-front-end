import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from "@angular/router";
import { NgbCollapseModule, NgbDropdown } from "@ng-bootstrap/ng-bootstrap";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { MiniLeftbarComponent } from "../mini-leftbar/mini-leftbar.component";
import { LeftSidebarComponent } from "../left-sidebar/left-sidebar.component";
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
  /*   @Input() showMobileMenu: boolean = true;
   */
  showMobileMenu: boolean = true;

  menuItems: MenuItem[] = [];
  activeMenuItems: string[] = [];
  chunkSize: number = 7;
  div: HTMLElement | null | undefined;
  isCollapsed: any = true;



 }
