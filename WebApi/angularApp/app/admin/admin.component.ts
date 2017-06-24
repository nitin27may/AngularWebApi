import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIService } from './../core/services/api.service';
import { LoaderService } from '../shared/services/loader.service';


@Component({
    selector: 'admin-component',
    templateUrl: 'admin.component.html'
  
})

export class AdminComponent implements OnInit {   
    rebind: boolean = true;
    toggle: boolean = false;
    timeFrom: Date;
    timeTo: Date;
    deviceId: any;
    locationList: any;
    deviceList: any;

    constructor(private apiService: APIService,
        private loaderService: LoaderService) {
        //this.message = 'Things from the ASP.NET Core API';
        
    }

    ngOnInit() {
        // this.getAllThings();
    }
    

}
