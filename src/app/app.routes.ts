import { Routes } from "@angular/router";
import { LayoutContainerComponent } from "./Layout/layout-container/layout-container.component";
import { PublicLayoutComponent } from "./Layout/public-layout/public-layout.component";
import { ForgetPasswordComponent } from "./Auth/forget-password/forget-password.component";
import { SignInComponent } from "./Auth/sign-in/sign-in.component";
import { SignUpComponent } from "./Auth/sign-up/sign-up.component";
import { UpdatePasswordComponent } from "./Auth/update-password/update-password.component";
import { WaitingComponent } from "./Auth/waiting/waiting.component";
import { AuthGuard } from "./Core/Guards/auth.guard";
import { AdminDecisionComponent } from "./Auth/admin-decision/admin-decision.component";
import { ConfirmationComponent } from "./Auth/confirmation/confirmation.component";
import { OfflineComponent } from "./Shared/Pages/offline/offline.component";
import { LockedScreenComponent } from "./Shared/Pages/locked-screen/locked-screen.component";
import { Error403Component } from "./Shared/Pages/error403/error403.component";
import { Error500Component } from "./Shared/Pages/error500/error500.component";
import { Error503Component } from "./Shared/Pages/error503/error503.component";
import { AsckConfirmComponent } from "./Auth/asck-confirm/asck-confirm.component";
export const routes: Routes = [
  {
    path: "",
    component: LayoutContainerComponent,
    canActivate: [AuthGuard],
    children: [],
  },
  {
    path: "",
    component: PublicLayoutComponent,
    children: [
      /*       { path: "", redirectTo: "sign-in", pathMatch: "full" },
       */ {
        path: "sign-in",
        title: "Sign In page. ",
        component: SignInComponent,
      },
      {
        path: "sign-up",
        title: "Sign up page. ",
        component: SignUpComponent,
      },
      {
        path: "go-to-confirm",
        title: "Go to confirmation. ",
        component: AsckConfirmComponent,
      },
      {
        path: "waiting",
        title: "Waiting page. ",
        component: WaitingComponent,
      },
      {
        path: "forgot-password",
        title: "ForgetPassword page. ",
        component: ForgetPasswordComponent,
      },

      {
        path: "update-password",
        title: "Update password  page. ",
        component: UpdatePasswordComponent,
      },
      {
        path: "confirm/:token",
        title: "Confirmation page. ",
        component: ConfirmationComponent,
      },
      {
        path: "decision/:token/:user",
        title: "Administration page. ",
        component: AdminDecisionComponent,
      },
      {
        path: "403",
        title: "FORBIDDON. ",
        component: Error403Component,
      },
      {
        path: "500",
        title: "ERROR 500. ",
        component: Error500Component,
      },
      {
        path: "503",
        title: "ERROR 503. ",
        component: Error503Component,
      },
      {
        path: "offline",
        title: "SHUTDOWN. ",
        component: OfflineComponent,
      },
      {
        path: "locked",
        title: "LOCKED. ",
        component: LockedScreenComponent,
      },
    ],
  },
];
