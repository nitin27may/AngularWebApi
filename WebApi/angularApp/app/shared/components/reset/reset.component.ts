import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { APIService } from '../../../core/services/api.service';
import { LoaderService } from '../../services/loader.service';
import { StorageService } from '../../services/storage.service';
import { StorageType } from '../../model/storage.enum';

@Component({
    selector: 'reset',
    templateUrl: 'reset.component.html',   
    providers: [APIService, StorageService]
})

export class ResetComponent implements OnInit{
    public user: any = { Password: ''};
    constructor(private apiService: APIService,
        private router: Router,
        private route: ActivatedRoute,
        private loaderService: LoaderService,
        private storageService: StorageService) {
  
    }
    Update() {
  
        this.loaderService.changePage(true);
        this.apiService.UpdatePassword(this.user).subscribe(            
            data => {
                this.loaderService.changePage(false);
                //this.router.navigate(['location/details']);
            },
                error => {
                    this.loaderService.changePage(false);
            }
        );
    }
    ngOnInit() {
        let id = this.route.snapshot.params['id'];


    }
}