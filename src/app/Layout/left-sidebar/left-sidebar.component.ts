import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterModule } from "@angular/router";
import {
  NgbAccordionModule,
  NgbCollapseModule,
  NgbDropdown,
} from "@ng-bootstrap/ng-bootstrap";
import { MENU_ITEMS } from "../Shared/Config/menu-meta";
import { MenuItem } from "../Shared/Models/menu.model";
import {
  hasGrandChildren,
  hasSubmenu,
  isTitleItem,
  findAllParent,
} from "../Shared/Helpers/Utils";
import { User } from "../../Core/Models/user.models";

@Component({
  selector: "app-left-sidebar",
  standalone: true,
  imports: [
    CommonModule,
    NgbAccordionModule,
    NgbCollapseModule,
    NgbDropdown,
    RouterModule,
  ],
  templateUrl: "./left-sidebar.component.html",
  styleUrl: "./left-sidebar.component.css",
})
export class LeftSidebarComponent {

  @Input() user!:User;

  menuItems: MenuItem[] = [];
  activeMenuItems: string[] = [];
  chunkSize: number = 7;
  isCollapsed: any = true;

  ngOnInit(): void {
    this.menuItems = MENU_ITEMS;
  }
  isTitleItem(item: MenuItem): any {
    return isTitleItem(item);
  }
  hasSubmenu(item: MenuItem): any {
    return hasSubmenu(item);
  }
  hasGrandChildren(item: MenuItem) {
    return hasGrandChildren(item);
  }
  /**
   *  Toggle the dropdown menu
   */
  toggleMenuItem(menuItem: MenuItem, collapse: any): void {
    menuItem.collapsed = !menuItem.collapsed;

    let openMenuItems: string[];
    if (!menuItem.collapsed) {
      openMenuItems = [
        menuItem["key"],
        ...findAllParent(this.menuItems, menuItem),
      ];

      // close other open menu
      this.menuItems.forEach((menu: MenuItem) => {
        if (!openMenuItems.includes(menu.key!)) {
          menu.collapsed = true;
        }
      });
    }
    collapse.toggle();
  }
}