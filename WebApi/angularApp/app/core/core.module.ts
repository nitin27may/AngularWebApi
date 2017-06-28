import { APIService } from './services/api.service';
import { AuthGuard } from '../shared/utils/auth.guard';
import { LoaderService } from '../shared/services/loader.service';
import { StorageService } from '../shared/services/storage.service';
import { CustomToasterService } from '../shared/services/custom-toaster.service';
import { ValidationService } from '../shared/services/validation.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Configuration } from '../app.constants';
import { BrowserModule,Title } from '@angular/platform-browser';

@NgModule({
    imports: [
        CommonModule
    ]
})

export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                APIService,
                AuthGuard,
                LoaderService,
                StorageService,
                CustomToasterService,
                ValidationService,
                AuthGuard,
                Configuration,
                Title
            ]
        };
    }
}