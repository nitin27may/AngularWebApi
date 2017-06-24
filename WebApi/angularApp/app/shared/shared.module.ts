import { CustomFooterComponent } from './components/customfooter/customfooter.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SidebarComponent } from './components/sidebar/siderbar.component';
import { ControlMessagesComponent } from './components/validation/control-message.component';
import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule, Http } from '@angular/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { ToastyModule } from 'ng2-toasty';
import { DataTableModule } from 'primeng/primeng';
import { ModalModule } from 'ngx-bootstrap';


export function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
        ToastyModule.forRoot(),
        ModalModule.forRoot(),
        DataTableModule,
        NKDatetimeModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [Http]
            }
        })
    ],

    declarations: [
        NavigationComponent,
        CustomFooterComponent,
        SidebarComponent,
        ControlMessagesComponent
    ],

    exports: [
        FormsModule,
        ReactiveFormsModule,
        NavigationComponent,
        CustomFooterComponent,
        SidebarComponent,
        NKDatetimeModule,
        ControlMessagesComponent,
        ToastyModule,
        ModalModule,
        DataTableModule,
        TranslateModule
    ]
})

export class SharedModule { }