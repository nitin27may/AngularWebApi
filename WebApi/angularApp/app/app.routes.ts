import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { ConfirmationComponent } from './shared/components/confirmation/confirmation.component';
import { ResetComponent } from './shared/components/reset/reset.component';
import { ForgetComponent } from './shared/components/reset/forget.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: 'confimration/:id', component: ConfirmationComponent
    },
    {
        path: 'forget-password', component: ForgetComponent
    },
    {
        path: 'reset-password/:id', component: ResetComponent
    }
];

export const AppRoutes = RouterModule.forRoot(routes);
