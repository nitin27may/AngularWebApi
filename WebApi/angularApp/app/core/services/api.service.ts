import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { Configuration } from './../../app.constants';
import { StorageService } from '../../shared/services/storage.service';
import { StorageType } from '../../shared/model/storage.enum';

@Injectable()
export class APIService {
    private actionUrl: string;
    private headers: Headers;

    constructor(private http: Http,
        private configuration: Configuration,
        private storageService: StorageService) {
        this.actionUrl = configuration.Server + 'api/';
    }
    GetConfirmation(strToken: string) {
        let uri = this.actionUrl + 'Confirmation?authenticationToken=' + strToken;
        return this.ExecuteGetApiService(uri);
    }

    AddUpdateRole(role: any) {
        let uri;
        if (role.Id) {
            uri = this.actionUrl + 'UpdateRole';
        } else {
            uri = this.actionUrl + 'AddRole';
        }
        return this.ExecuteApiService(uri, role);
    }
    GetRoles() {
        let uri = this.actionUrl + 'GetRoles';
        return this.ExecuteGetApiService(uri);
    }
    GetRole(id: any) {
        let uri = this.actionUrl + 'GetRole?Id=' + id;
        return this.ExecuteGetApiService(uri);
    }
    DeleteRole(role: any) {
        let uri = this.actionUrl + 'DeleteRole';
        return this.ExecuteApiService(uri, role);
    }


    Reset(user: any) {
        let uri = this.actionUrl + 'PasswordReset';
        return this.ExecuteApiService(uri, user);
    }
    GetUsers() {
        let uri = this.actionUrl + 'GetUsers';
        return this.ExecuteGetApiService(uri);
    }
    GetUser(id:any) {
        let uri = this.actionUrl + 'GetUser?Id=' + id;
        return this.ExecuteGetApiService(uri);
    }
    AddUpdateUser(user: any) {
        let uri: any;
        if (user.Id) {
            uri = this.actionUrl + 'UpdateUser';
        } else {
            uri = this.actionUrl + 'AddUser';
        }
        return this.ExecuteApiService(uri, user);
    }
    DeleteUser(user: any) {
        let uri = this.actionUrl + 'DeleteUser';
        return this.ExecuteApiService(uri, user);
    }
    UpdatePassword(user: any) {
        let uri = this.actionUrl + 'PasswordUpdate';
        return this.ExecuteApiService(uri, user);
    }
    Login(user: any) {
        let uri = this.actionUrl + 'Login';
        return this.ExecuteApiService(uri, user);
    }

    AddUpdateEvents(event: any) {
        let uri;
        if (event.Id) {
            uri = this.actionUrl + 'UpdateEvent';
        } else {
            uri = this.actionUrl + 'AddEvent';
        }
        return this.ExecuteApiService(uri, event);
    }
    GetEvents() {
        let uri = this.actionUrl + 'GetEvents';
        return this.ExecuteGetApiService(uri);
    }
    GetEvent(id: any) {
        let uri = this.actionUrl + 'GetEvent?Id=' + id;
        return this.ExecuteGetApiService(uri);
    }
    DeleteEvent(role: any) {
        let uri = this.actionUrl + 'DeleteEvent';
        return this.ExecuteApiService(uri, role);
    }
  
    ExecuteApiService(uri: string, postdata: any) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if (this.storageService.get(StorageType.session, 'jwtToken')) {
            headers.append('authenticationToken', this.storageService.get(StorageType.session, 'jwtToken')); 
        }       
        //const headres = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(uri, postdata, {
            headers: headers
        })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }
    ExecuteGetApiService(uri: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if (this.storageService.get(StorageType.session, 'jwtToken')) {
            headers.append('authenticationToken', this.storageService.get(StorageType.session, 'jwtToken'));
        }
        return this.http.get(uri,  {
            headers: headers
        })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.log(error);
        return Observable.throw(error)
    }
}