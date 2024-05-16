import { ApplicationConfig, ModuleWithProviders } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideClientHydration } from "@angular/platform-browser";
import { provideHttpClient } from "@angular/common/http";
import { NgCircleProgressModule } from "ng-circle-progress";
import { CountToModule } from "angular-count-to";
 
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    (
      NgCircleProgressModule.forRoot(
        {}
      ) as ModuleWithProviders<NgCircleProgressModule>
    ).providers!,
    (CountToModule.forChild() as ModuleWithProviders<CountToModule>).providers!,
 
    /*   adding # in route   { provide: LocationStrategy, useClass: HashLocationStrategy },   */
  ],
};
