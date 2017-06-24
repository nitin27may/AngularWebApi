import { Injectable } from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Injectable()
export class CustomToasterService {
    //toastOptions: any;
    constructor(private toastyService: ToastyService,
        private toastyConfig: ToastyConfig) {
        // Assign the selected theme name to the `theme` property of the instance of ToastyConfig. 
        // Possible values: default, bootstrap, material
        this.toastyConfig.theme = 'bootstrap';
    }
           


    addToast(toastOption: any) {
            // Or create the instance of ToastOptions
            var toastOptions: ToastOptions = {
                title: toastOption.title,
                msg: toastOption.msg,
                showClose: true,
                timeout: 50000,
                theme: 'bootstrap',
                onAdd: (toast: ToastData) => {
                    //console.log('Toast ' + toast.id + ' has been added!');
                },
                onRemove: function (toast: ToastData) {
                    //console.log('Toast ' + toast.id + ' has been removed!');
                }
            };
            // Add see all possible types in one shot
            if (toastOption.type == "info") {
                this.toastyService.info(toastOptions);
            }
            if (toastOption.type == "success") {
                this.toastyService.success(toastOptions);
            }
            if (toastOption.type == "wait") {
                this.toastyService.wait(toastOptions);
            }
            if (toastOption.type == "error") {
                this.toastyService.error(toastOptions);
            }
            if (toastOption.type == "warning") {
                this.toastyService.warning(toastOptions);
            }    
            
    }
    clearToast() {
        this.toastyService.clearAll();
    }

}