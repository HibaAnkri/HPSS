import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MSIDComponent } from './msid/msid.component';
import { HSIDComponent } from './hsid/hsid.component';
import { HLISComponent } from './hlis/hlis.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { AuthGuard } from './guards/auth.guard';
import { ElementComponent } from './element/element.component';
import { ElementValuesComponent } from './element-values/element-values.component';
import { ServiceComponent } from './service/service.component';
import {SignupComponent} from "./signup/signup.component";
import {ServicesComponent} from "./services/services.component";
import {ServiceesComponent} from "./servicees/servicees.component";
import {DecoderComponent} from "./decoder/decoder.component";
import {AuthorizationGuard} from "./guards/authorization.guard";
import {PasswordComponent} from "./password/password.component";
import {FilterpageComponent} from "./filterpage/filterpage.component";
import { AccesspanelComponent } from './accesspanel/accesspanel.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {path:'signup',component:SignupComponent},
  { path: 'admin', component: AdminTemplateComponent, canActivate: [AuthGuard], children: [
      { path: 'home', component: HomeComponent },
      {path:'servicees',component:ServiceesComponent},
      {path:'decoder',component:DecoderComponent},
      { path: 'MSID', component: MSIDComponent },
      { path: 'HSID', component: HSIDComponent },
      { path: 'MSID/service', component: ServicesComponent },
      { path: 'HSID/service', component: ServiceComponent },
      { path: 'HLIS', component: HLISComponent },
      { path: 'dashboard', component: DashboardComponent,
      canActivate:[AuthorizationGuard],data:{roles:['ADMIN']}
      },
      { path: 'elements', component: ElementComponent },
      { path: 'element-values', component: ElementValuesComponent },
      {path : "password", component : PasswordComponent},
      {path : "filter", component : FilterpageComponent},
      {path : "panel", component : AccesspanelComponent}

    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
