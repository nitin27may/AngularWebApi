import { Injectable } from '@angular/core';
import { StorageType } from '../model/storage.enum';


@Injectable()
export class StorageService {

    prefix: string = "nav";

    save(type: StorageType, key: string, value: string) {
        if (type === StorageType.local) {
            localStorage.setItem(this.prefix + key, this.encryptBase64(value));
        }
        if (type === StorageType.session) {
            sessionStorage.setItem(this.prefix + key, this.encryptBase64(value));
        }
    }

    get(type: StorageType, key: string) {
        if (type === StorageType.local) {
            if (localStorage.getItem(this.prefix + key)) {
                return this.decryptBase64(localStorage.getItem(this.prefix + key));
            }
            return;
        }
        if (type === StorageType.session) {
            if (sessionStorage.getItem(this.prefix + key)) {
                return this.decryptBase64(sessionStorage.getItem(this.prefix + key));
            }
            return;
        }
    }

    remove(type: StorageType, key: string) {
        if (type === StorageType.local) {
            localStorage.removeItem(this.prefix + key);
        }
        if (type === StorageType.session) {
            sessionStorage.removeItem(this.prefix + key);
        }
    }

    encryptBase64(stringData: string) {
        return btoa(stringData);
    }
    decryptBase64(stringData: string) {
        return atob(stringData);
    }
}