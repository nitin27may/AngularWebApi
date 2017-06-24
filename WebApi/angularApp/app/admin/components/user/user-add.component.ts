import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { APIService } from '../../../core/services/api.service';
import { LoaderService } from '../../../shared/services/loader.service';
import { CustomToasterService } from '../../../shared/services/custom-toaster.service';
import { ValidationService } from '../../../shared/services/validation.service';

import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'user-add-component',
    templateUrl: 'user-add.component.html'
})

export class UserAddComponent implements OnInit {
    userForm: any;
    Id: any;
    exapnd: boolean = false;
    show: boolean = true;
    roleList: any;
    constructor(private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private apiService: APIService,
        private validationService: ValidationService,
        private translate: TranslateService,
        private loaderService: LoaderService,
        private customToasterService: CustomToasterService) {

    }

    GetRoles() {
        this.loaderService.changePage(true);
        this.apiService.GetRoles().subscribe(
            data => {
                this.loaderService.changePage(false);
                this.roleList = data;
            },
            error => {

                this.loaderService.changePage(false);
            }
        );
    }

    GetUser(id: any) {
        this.apiService.GetUser(id).subscribe(
            data => {
                this.loaderService.changePage(false);
                (<FormGroup>this.userForm)
                    .patchValue(data, { onlySelf: true });
                this.userForm.controls['Password'].setValue(null);
            },
            error => {

                this.loaderService.changePage(false);
            }
        );
    }

    saveUser(User: any) {
        let displayMessage: string, messgeKey: string;
        if (this.Id) {
            User.value.Id = this.Id;
            messgeKey = 'COMMON.UPSUCCESS';
        } else {
            messgeKey = 'COMMON.ADDSUSCESS';
        }
        this.loaderService.changePage(true);
        this.apiService.AddUpdateUser(User.value).subscribe(
            data => {
                this.loaderService.changePage(false);
                this.translate.get(messgeKey).subscribe((res: string) => {
                    displayMessage = res;
                });
                this.customToasterService.addToast({ title: "", msg: displayMessage, type: "success" });
                this.router.navigate(['/admin/users']);

            },
            error => {

                this.loaderService.changePage(false);
            }
        );
    }

    ngOnInit() {
        this.Id = +this.route.snapshot.params['id'];
        if (this.Id) {
            this.GetUser(this.Id);
        }
        this.userForm = this.formBuilder.group({
            'FirstName': ['', [Validators.required, Validators.minLength(2)]],
            'LastName': ['', [Validators.required]],
            'Email': ['', [Validators.required, this.validationService.emailValidator]],
            'Password': ['', [Validators.required]],
            'Mobile': ['', [Validators.required]],
            'RoleId': [0, [Validators.required]],
            'Status': [false]
        });
        this.GetRoles();

    }


}
