import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { CoreModule } from './core/core.module';
import { AdminModule } from './admin/admin.module';

import { Configuration } from './app.constants';
import { AppRoutes } from './app.routes';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './shared/components/login/login.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { ConfirmationComponent } from './shared/components/confirmation/confirmation.component';
import { ResetComponent } from './shared/components/reset/reset.component';
import { ForgetComponent } from './shared/components/reset/forget.component';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutes,
        FormsModule,
        SharedModule,
        CoreModule.forRoot(),
        AdminModule
    ],

    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        ConfirmationComponent,
        ResetComponent,
        ForgetComponent
    ],

    bootstrap: [AppComponent],
})

export class AppModule { }