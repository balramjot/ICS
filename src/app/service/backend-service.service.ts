import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AsyncValidatorFn,AbstractControl,ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {

constructor(private http: HttpClient) { }

private _userObs$ = new Subject<void>();                         // creating a new observable



// ****************** Service - Observable To Fetch All Users Data ************************//

get userObs$(){
  return this._userObs$;
}


// ****************** Service - Fetching All Roles ************************//

getAllRoles(){
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get("http://localhost:3000/getAllRoles_db/", httpOptions);
}





// ****************** Service - Fetching All Users ************************//

getAllUsers(){
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get("http://localhost:3000/getAllUsers_db/", httpOptions);
}





// ****************** Service - Checking If Account Name Already Exists or Not ************************//

accountNameExistsOrNot(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    var obj = new Object({ accountName: control.value });
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post("http://localhost:3000/asynCheckUsers_db",obj, httpOptions).pipe(
      map(res => {
        return res['Code'] == 0 ? { asynerror: true } : null;       
      })
    );
  };
}





// ****************** Service - Adding a New User ************************//

addUser(formData: any){
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.post("http://localhost:3000/addUser_db/", formData, httpOptions)
  .pipe(
    tap(()=>{
    this._userObs$.next();
    })
  );
}





// ****************** Service - Update User Status ************************//

updateStatus(formData: any){
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.post("http://localhost:3000/updateStatus_db/", formData, httpOptions)
  .pipe(
    tap(()=>{
    this._userObs$.next();
    })
  );
}





// ****************** Service - Edit User Information ************************//

editUser(formData: any, userId: number){
  let newFormData = Object.assign(formData, {"userId": userId.toString()});
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.post("http://localhost:3000/editUser_db/", newFormData, httpOptions)
  .pipe(
    tap(()=>{
    this._userObs$.next();
    })
  );
}


// ****************** Service - User Login Information ************************//

loginUser(formData: any){
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.post("http://localhost:3000/userLogin_db/",formData, httpOptions);
}

loggedIn(){
  return !!localStorage.getItem('token');
}

getToken() {
  return localStorage.getItem('token');
}


// ****************** Service - Add New Role ************************//

addRole(formData: any){
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.post("http://localhost:3000/addRole_db/", formData, httpOptions)
  .pipe(
    tap(()=>{
    this._userObs$.next();
    })
  );
}


// ****************** Service - Checking If Role Already Exists or Not ************************//

roleExistsOrNot(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    var obj = new Object({ roles: control.value });
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post("http://localhost:3000/asynCheckRole_db",obj, httpOptions).pipe(
      map(res => {
        return res['Code'] == 0 ? { asynerror: true } : null;       
      })
    );
  };
}



// ****************** Service - Fetching All Roles for Role Page ************************//

getAllRolesPage(){
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get("http://localhost:3000/getAllRolesPage_db/", httpOptions);
}



// ****************** Service - Update Role Status ************************//

updateRoleStatus(formData: any){
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.post("http://localhost:3000/updateRoleStatus_db/", formData, httpOptions)
  .pipe(
    tap(()=>{
    this._userObs$.next();
    })
  );
}



// ****************** Service - Edit Role Information ************************//

editRole(formData: any, roleId: number){
  let newFormData = Object.assign(formData, {"roleId": roleId.toString()});
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.post("http://localhost:3000/editRole_db/", newFormData, httpOptions)
  .pipe(
    tap(()=>{
    this._userObs$.next();
    })
  );
}



// ****************** Service - Add New Category ************************//

addCategory(formData: any){
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.post("http://localhost:3000/addCategory_db/", formData, httpOptions)
  .pipe(
    tap(()=>{
    this._userObs$.next();
    })
  );
}


// ****************** Service - Checking If Category Already Exists or Not ************************//

categoryExistsOrNot(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    var obj = new Object({ category: control.value });
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post("http://localhost:3000/asynCheckCategory_db",obj, httpOptions).pipe(
      map(res => {
        return res['Code'] == 0 ? { asynerror: true } : null;       
      })
    );
  };
}



// ****************** Service - Fetching All Category for Category Page ************************//

getAllCategoryPage(){
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get("http://localhost:3000/getAllCategoryPage_db/", httpOptions);
}



// ****************** Service - Update Category Status ************************//

updateCategoryStatus(formData: any){
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.post("http://localhost:3000/updateCategoryStatus_db/", formData, httpOptions)
  .pipe(
    tap(()=>{
    this._userObs$.next();
    })
  );
}



// ****************** Service - Edit Category Information ************************//

editCategory(formData: any, catId: number){
  let newFormData = Object.assign(formData, {"catId": catId.toString()});
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.post("http://localhost:3000/editCategory_db/", newFormData, httpOptions)
  .pipe(
    tap(()=>{
    this._userObs$.next();
    })
  );
}



// ****************** Service - Fetching All Category ************************//

getAllCategory(){
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get("http://localhost:3000/getAllCategory_db/", httpOptions);
}




// ****************** Service - Fetching All Inventory for Inventory Page ************************//

getAllInventoryPage(){
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get("http://localhost:3000/getAllInventoryPage_db/", httpOptions);
}



// ****************** Service - Image Upload ************************//

uploadImage(formData: any){
  let httpOptions = { headers: new HttpHeaders({ 'Accept': 'application/json' }) };
  return this.http.post("http://localhost:3000/uploadImage_db/", formData, httpOptions);
}



// ****************** Service - Checking If Part Number Already Exists or Not ************************//

partnoExistsOrNot(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    var obj = new Object({ partno: control.value });
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post("http://localhost:3000/asynCheckPartno_db",obj, httpOptions).pipe(
      map(res => {
        return res['Code'] == 0 ? { asynerror: true } : null;       
      })
    );
  };
}



// ****************** Service - Add Inventory ************************//

addInventory(formData: any){
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.post("http://localhost:3000/addInventory_db/", formData, httpOptions);
}



// ****************** Service - Update Inventory Status ************************//

updateInventoryStatus(formData: any){
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.post("http://localhost:3000/updateInventoryStatus_db/", formData, httpOptions)
  .pipe(
    tap(()=>{
    this._userObs$.next();
    })
  );
}

}
