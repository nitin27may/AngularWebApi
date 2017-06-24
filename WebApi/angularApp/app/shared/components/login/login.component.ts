import { Component, NgModule, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate } from '@angular/router';
import { APIService } from '../../../core/services/api.service';
import { LoaderService } from '../../services/loader.service';
import { StorageService } from '../../services/storage.service';
import { CustomToasterService } from '../../services/custom-toaster.service';
import { StorageType } from '../../model/storage.enum';

import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    providers: [APIService, StorageService]
})

export class LoginComponent implements OnInit {
    public user: any = { Email: '', Password: '' };
    loginForm: any;
    constructor(private translate: TranslateService,
        private formBuilder: FormBuilder,
        private apiService: APIService,
        private router: Router,
        private loaderService: LoaderService,
        private customToasterService: CustomToasterService,
        private storageService: StorageService) {
        translate.addLangs(["en", "fr"]);
        translate.setDefaultLang('en');
        let browserLang: string = translate.getBrowserLang();
        translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');

    }
    Login(user: any) {
        //this.router.navigate(['location/details']);
        this.loaderService.changePage(true);
        this.apiService.Login(user).subscribe(
            data => {
                this.loaderService.changePage(false);
                this.storageService.save(StorageType.session, "jwtToken", data.token);
                this.storageService.save(StorageType.session, "userDetails", JSON.stringify(data));
                this.router.navigate(['admin/users']);
            },
            error => {
                this.customToasterService.addToast({ title: 'Message', msg: error._body, type: 'error' });
                this.loaderService.changePage(false);
            }
        );
    }
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            'Email': ['', [Validators.required, Validators.minLength(3)]],
            'Password': ['', [Validators.required, Validators.minLength(5)]]
        });

    }
}