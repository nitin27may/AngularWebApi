import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { StorageService } from '../services/storage.service';
import { StorageType } from '../model/storage.enum';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private storageService: StorageService, private router: Router) { }

    canActivate() {
        if (this.storageService.get(StorageType.session, "jwtToken")) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}