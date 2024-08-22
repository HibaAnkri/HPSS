import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { HSIDComponent } from './hsid/hsid.component';
import { HLISComponent } from './hlis/hlis.component';
import { HomeComponent } from './home/home.component';
import { MSIDComponent } from './msid/msid.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ElementComponent } from './element/element.component';
import { SignupComponent } from './signup/signup.component';

import { AuthGuard } from './guards/auth.guard';
import { ElementValuesComponent } from './element-values/element-values.component';
import { MatExpansionModule } from "@angular/material/expansion";
import { ServiceComponent } from './service/service.component';
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { ServicesComponent } from './services/services.component';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { AddCustomerDialogComponent } from './add-customer-dialog/add-customer-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { EditMessageDialogComponent } from './edit-message-dialog/edit-message-dialog.component';
import { AddProtocoleDialogComponent } from './add-protocole-dialog/add-protocole-dialog.component';
import { EditProtocoleDialogComponent } from './edit-protocole-dialog/edit-protocole-dialog.component';
import { ServiceesComponent } from './servicees/servicees.component';

import { IsoMessageService } from "./iso-message.service";
import { DecoderComponent } from "./decoder/decoder.component";
import {AuthorizationGuard} from "./guards/authorization.guard";
import { TimerComponent } from './timer/timer.component';
import { PasswordComponent } from './password/password.component';
import { FilterpageComponent } from './filterpage/filterpage.component';
import { AccesspanelComponent } from './accesspanel/accesspanel.component';
import { AddElementValueDialogComponent } from './add-element-value-dialog/add-element-value-dialog.component';
import { EditElementValueDialogComponent } from './edit-element-value-dialog/edit-element-value-dialog.component';
import { UpdateRequirementDialogComponent } from './update-requirement-dialog/update-requirement-dialog.component';

import { TagManagementComponent } from './tag-management/tag-management.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminTemplateComponent,
    HSIDComponent,
    HLISComponent,
    HomeComponent,
    MSIDComponent,
    DashboardComponent,
    LoginComponent,
    ElementComponent,
    SignupComponent,
    ElementValuesComponent,
    ServiceComponent,
    ServicesComponent,
    AddCustomerDialogComponent,
    ConfirmDialogComponent,
    EditMessageDialogComponent,
    AddProtocoleDialogComponent,
    EditProtocoleDialogComponent,
    ServiceesComponent,
    DecoderComponent,
    TimerComponent,
    PasswordComponent,
    FilterpageComponent,
    AccesspanelComponent,
    AddElementValueDialogComponent,
    EditElementValueDialogComponent,
   UpdateRequirementDialogComponent,
   TagManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSortModule,
    MatExpansionModule,
    MatOptionModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule
  ],
  providers: [AuthGuard, IsoMessageService,AuthorizationGuard],
  bootstrap: [AppComponent],

})
export class AppModule { }
