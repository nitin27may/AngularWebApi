import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { UserAddComponent } from './components/user/user-add.component';
import { UserListComponent } from './components/user/user-list.component';
import { RoleListComponent } from './components/role/role-list.component';
import { RoleAddComponent } from './components/role/role-add.component';
import { EventListComponent } from './components/events/event-list.component';
import { EventAddComponent } from './components/events/event-add.component';
import { AuthGuard } from '../shared/utils/auth.guard';


const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            {
                path: '',
                children: [
                    {
                        path: 'users',
                        component: UserListComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'adduser/:id',
                        component: UserAddComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'roles',
                        component: RoleAddComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'addrole/:id',
                        component: RoleAddComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'events',
                        component: EventListComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'addevent/:id',
                        component: EventAddComponent,
                        //canActivate: [AuthGuard]
                    }
                ]
            },

            ]
    }
   
];

export const AdminRoutes = RouterModule.forChild(routes);