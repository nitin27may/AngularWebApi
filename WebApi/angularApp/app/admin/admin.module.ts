import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
//import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { AdminRoutes } from './admin.routes';
import { AdminComponent } from './admin.component';

import { UserListComponent } from './components/user/user-list.component';
import { UserAddComponent } from './components/user/user-add.component';
import { RoleListComponent } from './components/role/role-list.component';
import { RoleAddComponent } from './components/role/role-add.component';
import { EventListComponent } from './components/events/event-list.component';
import { EventAddComponent } from './components/events/event-add.component';


@NgModule({
    imports: [
        CommonModule,
        //FormsModule,
        HttpModule,
        AdminRoutes,
        SharedModule
    ],

    declarations: [
        AdminComponent,
        UserListComponent,
        UserAddComponent,
        RoleListComponent,
        RoleAddComponent,
        EventListComponent,
        EventAddComponent
    ],

    exports: [
        AdminComponent
    ]
})

export class AdminModule { }