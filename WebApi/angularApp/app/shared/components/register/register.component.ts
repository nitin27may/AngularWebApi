import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { APIService } from '../../../core/services/api.service';
import { LoaderService } from '../../services/loader.service';
import { StorageService } from '../../services/storage.service';
import { StorageType } from '../../model/storage.enum';
import { CustomToasterService } from '../../../shared/services/custom-toaster.service';
import { ValidationService } from '../../../shared/services/validation.service';

@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html',
    providers: [APIService, StorageService]
})

export class RegisterComponent implements OnInit {
    userForm: any;
    constructor(private formBuilder: FormBuilder,
        private apiService: APIService,
        private router: Router,
        private loaderService: LoaderService,
        private validationService: ValidationService,
        private translate: TranslateService,
        private customToasterService: CustomToasterService,
        private storageService: StorageService) {

    }
    registerUser(User: any) {
        let displayMessage: string, messgeKey: string;
        messgeKey = 'COMMON.ADDSUSCESS';

        this.loaderService.changePage(true);
        this.apiService.AddUpdateUser(User.value).subscribe(
            data => {
                this.loaderService.changePage(false);
                this.translate.get(messgeKey).subscribe((res: string) => {
                    displayMessage = res;
                });
                this.customToasterService.addToast({ title: "", msg: displayMessage, type: "success" });
                this.router.navigate(['/login']);

            },
            error => {

                this.loaderService.changePage(false);
            }
        );
    }

    ngOnInit() {
        this.userForm = this.formBuilder.group({
            'FirstName': ['', [Validators.required, Validators.minLength(2)]],
            'LastName': ['', [Validators.required]],
            'UserName': ['', [Validators.required]],
            'Email': ['', [Validators.required, this.validationService.emailValidator]],
            'Password': ['', [Validators.required]],
            'Mobile': ['', [Validators.required]]
        });

    }
}
