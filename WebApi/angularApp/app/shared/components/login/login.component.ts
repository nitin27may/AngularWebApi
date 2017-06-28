import {
    Component,
    NgModule,
    OnInit
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
    FormGroup,
    FormBuilder,
    Validators
} from '@angular/forms';
import {
    Router,
    CanActivate
} from '@angular/router';
import {
    APIService
} from '../../../core/services/api.service';
import {
    LoaderService
} from '../../services/loader.service';
import {
    StorageService
} from '../../services/storage.service';
import {
    CustomToasterService
} from '../../services/custom-toaster.service';
import {
    StorageType
} from '../../model/storage.enum';

import {
    TranslateService
} from '@ngx-translate/core';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    providers: [APIService, StorageService]
})

export class LoginComponent implements OnInit {
    public user: any = {
        Email: '',
        Password: ''
    };
    loginForm: any;
    constructor(private translate: TranslateService,
        private formBuilder: FormBuilder,
        private titleService: Title,
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
                if (user.RememberMe) {
                    this.storageService.save(StorageType.local, "RememberMe", user.RememberMe);
                    this.storageService.save(StorageType.local, "UserEmail", user.Email);
                }else{
                    this.storageService.remove(StorageType.local, "RememberMe");
                    this.storageService.remove(StorageType.local, "UserEmail");
                }
                this.loaderService.changePage(false);
                this.storageService.save(StorageType.session, "jwtToken", data.token);
                this.storageService.save(StorageType.session, "userDetails", JSON.stringify(data));
                this.router.navigate(['admin/users']);
            },
            error => {
                this.customToasterService.addToast({
                    title: 'Message',
                    msg: error._body,
                    type: 'error'
                });
                this.loaderService.changePage(false);
            }
        );
    }
    selectLanguage(lang: any) {
        this.storageService.save(StorageType.local, "language", lang);
        this.translate.use(lang);
        this.setTitle('PAGE.LOGIN');
    }
   public setTitle(newTitle: string) {
        this.translate.get(newTitle).subscribe((res: string) => {
           this.titleService.setTitle(res);
        });
  }
    ngOnInit() {
        this.setTitle('PAGE.LOGIN');
        this.loginForm = this.formBuilder.group({
            'Email': [this.storageService.get(StorageType.local, "UserEmail") ? this.storageService.get(StorageType.local, "UserEmail") : null, [Validators.required, Validators.minLength(3)]],
            'Password': ['', [Validators.required, Validators.minLength(5)]],
            'RememberMe': (Boolean)(this.storageService.get(StorageType.local, "RememberMe")),
            'language': this.storageService.get(StorageType.local, "language") ? this.storageService.get(StorageType.local, "language") : null
        });
        this.translate.use(this.storageService.get(StorageType.local, "language") ? this.storageService.get(StorageType.local, "language") : 'en');
    }
}