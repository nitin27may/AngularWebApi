import { Component,OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {StorageService} from '../../services/storage.service';
import {StorageType} from '../../model/storage.enum';
import {TranslateService} from '@ngx-translate/core';
@Component({
    selector: 'customfooter',
    templateUrl: 'customfooter.component.html'
})

export class CustomFooterComponent implements OnInit {
    public currentYear: number = new Date().getFullYear();
     footerForm: any;
    constructor(private translate: TranslateService,
        private formBuilder: FormBuilder,     
        private storageService: StorageService) {
         this.translate.use("fr");
    };

    selectedLanguage(lang: any) {
        this.storageService.save(StorageType.local, "language", lang);
        this.translate.use(lang);
    };
     ngOnInit() {
        
        this.footerForm = this.formBuilder.group({
            'language': this.storageService.get(StorageType.local, "language") ? this.storageService.get(StorageType.local, "language") : null
        });
     
    };
}