import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { APIService } from '../../../core/services/api.service';
import { LoaderService } from '../../../shared/services/loader.service';
import { CustomToasterService } from '../../../shared/services/custom-toaster.service';
import { ValidationService } from '../../../shared/services/validation.service';

import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'role-add-component',
    templateUrl: 'role-add.component.html'
})

export class RoleAddComponent implements OnInit {
    roleForm: any;
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

   
    GetRole(id: any) {
        this.apiService.GetRole(id).subscribe(
            data => {
                this.loaderService.changePage(false);
                (<FormGroup>this.roleForm)
                    .patchValue(data, { onlySelf: true });
            },
            error => {

                this.loaderService.changePage(false);
            }
        );
    }

    saveRole(role: any) {
        let displayMessage: string, messgeKey: string;
        if (this.Id) {
            role.Id = this.Id;
            messgeKey = 'COMMON.UPSUCCESS';
        } else {
            messgeKey = 'COMMON.ADDSUSCESS';
        }
        this.loaderService.changePage(true);
        this.apiService.AddUpdateRole(role.value).subscribe(
            data => {
                this.loaderService.changePage(false);
                this.translate.get(messgeKey).subscribe((res: string) => {
                    displayMessage = res;
                });
                this.customToasterService.addToast({ title: "", msg: displayMessage, type: "success" });
                this.router.navigate(['/admin/roles']);

            },
            error => {

                this.loaderService.changePage(false);
            }
        );
    }

    ngOnInit() {
        this.Id = +this.route.snapshot.params['id'];
        if (this.Id) {
            this.GetRole(this.Id);
        }
        this.roleForm = this.formBuilder.group({
            'Name': ['', [Validators.required, Validators.minLength(2)]]
            
        });

    }


}
