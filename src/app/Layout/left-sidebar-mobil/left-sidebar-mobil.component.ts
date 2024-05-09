import { Component, Input } from "@angular/core";
import { LeftSidebarComponent } from "../left-sidebar/left-sidebar.component";
import { CommonModule } from "@angular/common";
import { MenuItem } from "../layout-container/layout-container.component";
import { MENU_ITEMS } from "../Shared/Config/menu-meta";
import {
  isTitleItem,
  hasSubmenu,
  hasGrandChildren,
  findAllParent,
} from "../Shared/Helpers/Utils";
import { RouterModule } from "@angular/router";
import { NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-left-sidebar-mobil",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgbCollapseModule,
    LeftSidebarComponent,
  ],
  templateUrl: "./left-sidebar-mobil.component.html",
  styleUrl: "./left-sidebar-mobil.component.css",
})
export class LeftSidebarMobilComponent {
  @Input() action!: any;
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
