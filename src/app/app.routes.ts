import { Routes } from '@angular/router';
import { LayoutContainerComponent } from './Layout/layout-container/layout-container.component';
import { PublicLayoutComponent } from './Layout/public-layout/public-layout.component';
import { ForgetPasswordComponent } from './Auth/forget-password/forget-password.component';
import { SignInComponent } from './Auth/sign-in/sign-in.component';
import { SignUpComponent } from './Auth/sign-up/sign-up.component';
import { UpdatePasswordComponent } from './Auth/update-password/update-password.component';
import { WaitingComponent } from './Auth/waiting/waiting.component';
import { AuthGuard } from './Core/Guards/auth.guard';
import { AdminDecisionComponent } from './Auth/admin-decision/admin-decision.component';
import { ConfirmationComponent } from './Auth/confirmation/confirmation.component';
import { OfflineComponent } from './Shared/Pages/offline/offline.component';
import { LockedScreenComponent } from './Shared/Pages/locked-screen/locked-screen.component';
import { Error403Component } from './Shared/Pages/error403/error403.component';
import { Error500Component } from './Shared/Pages/error500/error500.component';
import { Error503Component } from './Shared/Pages/error503/error503.component';
import { profile } from 'console';
import { ProfileComponent } from './Pages/profile/profile.component';
import { OverviewComponent } from './Pages/overview/overview.component';
import { ScheduleComponent } from './Pages/schedule/schedule.component';
import { SettingsComponent } from './Pages/settings/settings.component';
import { PatientListComponent } from './Pages/patient-list/patient-list.component';
import { PatientComponent } from './Pages/patient/patient.component';
import { PatientDetailComponent } from './Pages/patient-detail/patient-detail.component';
import { AddNewPatientComponent } from './Pages/add-new-patient/add-new-patient.component';
import { UpdatePatientComponent } from './Pages/update-patient/update-patient.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { TreatmentComponent } from './Pages/treatment/treatment.component';
import { AddNewTreatmentComponent } from './Pages/add-new-treatment/add-new-treatment.component';
import { NewTreatPatientComponent } from './Components/new-treat-patient/new-treat-patient.component';
import { NewTreatGeneralComponent } from './Components/new-treat-general/new-treat-general.component';
import { NewTreatPhotosComponent } from './Components/new-treat-photos/new-treat-photos.component';
import { NewTreatClinicsComponent } from './Components/new-treat-clinics/new-treat-clinics.component';
import { NewTreatTeethComponent } from './Components/new-treat-teeth/new-treat-teeth.component';
import { TimelineTreatmentsComponent } from './Components/timeline-treatments/timeline-treatments.component';
import { ComingPageComponent } from './Shared/Pages/coming-page/coming-page.component';
export const routes: Routes = [
  {
    path: '',
    component: LayoutContainerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        title: 'Dashboard page. ',
        component: DashboardComponent,
      },

      { path: 'coming', component: ComingPageComponent },

      {
        path: 'profile/:id',
        title: 'User Profile page. ',
        component: ProfileComponent,
        children: [
          {
            path: 'overview',
            title: 'Overview page. ',
            component: OverviewComponent,
          },
          {
            path: 'schedule',
            title: 'Schedule page. ',
            component: ScheduleComponent,
          },
          {
            path: 'settings',
            title: 'Settings page. ',
            component: SettingsComponent,
          },
          { path: '', redirectTo: 'overview', pathMatch: 'full' },
        ],
      },
      {
        path: 'patients',
        title: 'Patient page. ',
        component: PatientComponent,
        children: [
          {
            path: '',
            title: 'Patient List page. ',
            component: PatientListComponent,
          },
          {
            path: 'detail/:id',
            title: 'Patient Detail page. ',
            component: PatientDetailComponent,
          },
          {
            path: 'update/:id',
            title: 'UpdatePatient page. ',
            component: UpdatePatientComponent,
          },
          {
            path: 'new-patient',
            title: 'New Patient page. ',
            component: AddNewPatientComponent,
          },
        ],
      },
      {
        path: 'treatment',
        title: 'Treatment page. ',
        component: TreatmentComponent,
        children: [
          {
            path: 'new-treatment/:id',
            title: 'New Treatment page. ',
            component: AddNewTreatmentComponent,
            children: [
              {
                path: 'patient',
                title: 'Patient Infos page. ',
                component: NewTreatPatientComponent,
              },
              {
                path: 'general',
                title: 'Treatment Infos page. ',
                component: NewTreatGeneralComponent,
              },
              {
                path: 'teeth',
                title: 'Teeth Infos page. ',
                component: NewTreatTeethComponent,
              },
              {
                path: 'photos',
                title: 'Photographes page. ',
                component: NewTreatPhotosComponent,
              },
              {
                path: 'clinics',
                title: 'Clinics page. ',
                component: NewTreatClinicsComponent,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      /*       { path: "", redirectTo: "sign-in", pathMatch: "full" },
       */
      {
        path: 'sign-in',
        title: 'Sign In page. ',
        component: SignInComponent,
      },
      {
        path: 'sign-up',
        title: 'Sign up page. ',
        component: SignUpComponent,
      },

      {
        path: 'waiting',
        title: 'Waiting page. ',
        component: WaitingComponent,
      },
      {
        path: 'forgot-password',
        title: 'ForgetPassword page. ',
        component: ForgetPasswordComponent,
      },

      {
        path: 'update-password/:token',
        title: 'Update password  page. ',
        component: UpdatePasswordComponent,
      },
      {
        path: 'confirm/:token',
        title: 'Confirmation page. ',
        component: ConfirmationComponent,
      },
      {
        path: 'decision/:token/:user',
        title: 'Administration page. ',
        component: AdminDecisionComponent,
      },
      {
        path: '403',
        title: 'FORBIDDON. ',
        component: Error403Component,
      },
      {
        path: '500',
        title: 'ERROR 500. ',
        component: Error500Component,
      },
      {
        path: '503',
        title: 'ERROR 503. ',
        component: Error503Component,
      },
      {
        path: 'offline',
        title: 'SHUTDOWN. ',
        component: OfflineComponent,
      },
      {
        path: 'locked',
        title: 'LOCKED. ',
        component: LockedScreenComponent,
      },
    ],
  },
  // for testing
  { path: 'timeline', component: TimelineTreatmentsComponent },
];
