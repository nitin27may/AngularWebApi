# Angular with Visual Studio, using Web Api and Code First Entity Framework

This Example's basic focus is, realtime implementation of the Angular code, I have just started it but focus is to implement Complete Project Exmaple:

* Register
* Login
* JWT Authentication
* CRUD operation Examples
* Language Support 
* Use of shared module

Default Login :

user: admin
password: admin

## Getting Started

Download or clone the above repositiory on your local machine.
```
https://github.com/nitin27may/AngularWebApi.git
```

### Prerequisites

Latest Nodejs  and NPM
Command for check version of node and npm (if installed)
```
node -v 
npm -v
```

### Installing

Folder Structure:

![Folder Structure](https://github.com/nitin27may/Repository/blob/master/Images/FolderStructure.png)
1. Change connection string details in your config files (For SQL Server)
![configUpdate](https://github.com/nitin27may/Repository/blob/master/Images/WebConfigUpdate.png)

2. Add user name and password for sending Email for reset password. (In web Config)

3. Update seed data for login if you want to changes username and password for login in ![UpdateSeedData](https://github.com/nitin27may/Repository/blob/master/Images/UpdateSeedData.png)



4. Install below Visual Studio Extension for Webpack Task run (It will help to run Application in debug mode)

    https://marketplace.visualstudio.com/items?itemName=MadsKristensen.WebPackTaskRunner

5. Navigate to WebApi folder And run below commands in order to run the App

```
npm install
```

6. And for running the App

```
npm start
```

7. Run Visual Studio

8. Make sure that server base url is same on which port visual studio is working (Or where the service is hosted) in below file 

![ServerUrlChange](https://github.com/nitin27may/Repository/blob/master/Images/ServerBaseUrl.png)
## Built With

* [Angular](https://angular.io/) - The web framework used


## Angular Components Used

* [PRIMENG](https://www.primefaces.org/primeng/#/) - We used the datatable from primeng
* [ng-xbootstrap](http://valor-software.com/ngx-bootstrap/#/) - Bootstrap Components build with Angular
* [ngx-translate](https://github.com/ngx-translate/core/) - Used for implementation for translation
* [ng2-toasty](https://github.com/akserg/ng2-toasty/) - Toast messages for alert etc.
