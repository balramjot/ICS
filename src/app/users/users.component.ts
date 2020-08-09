import { Component, OnInit, OnDestroy,ViewChild } from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatch } from '../validator/password-match.validator';
import { BackendServiceService } from '../service/backend-service.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  private querySubscription;

  addUserForm: FormGroup;
  editUserForm: FormGroup;

  error: boolean = false;
  dataLoading: boolean = false;
  success: boolean = false;
  editForm: boolean = false;
  viewPasswordControlsEdit: boolean = false;

  errorMessage : String = '';

  fetchData: any = { 'rolesData':'', 'tblData':'', 'extractData':'' };
  sentParmas: any = new Object();
  
  // ****************** For Data Table ************************//

  displayedColumns: string[] = ['col1','a_name', 'f_name', 'e_address', 'roles', 'date_time', 'col2'];
  dataSource : MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  constructor(private route: Router, private fb: FormBuilder, private backendservice: BackendServiceService) { }





  // ****************** Method - On Page Load Function ************************//

  ngOnInit(): void {

     // ****************** Add User - Form Controls ************************//

    this.addUserForm = this.fb.group({
      account_name: new FormControl(null, { validators: [Validators.required],  asyncValidators: [this.backendservice.accountNameExistsOrNot()],  updateOn: 'blur'}),
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      email: [null, [Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirm_password: [null, Validators.required],
      role: [null, Validators.required]
  },{
    validator: passwordMatch('password', 'confirm_password')
});
    
      this.getAllRoles();                                                                   // fetching all roles to be displayed in select tag

      // subscribing to get all users service via observables (runs after creating a new user)
      this.backendservice.userObs$.subscribe(()=> {
        this.getAllUsers();
      });

      this.getAllUsers();                                                                   // fetching all users to be displayed in table
      this.dataSource = new MatTableDataSource(this.fetchData.tblData);

      this.editForm = false;                                                                // edit form is set false on page load
      
      // ****************** Edit User - Form Controls ************************//

      this.editUserForm = this.fb.group({
        account_name: new FormControl(null, { validators: [Validators.required] }),
        first_name: [null, Validators.required],
        last_name: [null, Validators.required],
        email: [null, [Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        confirm_password: [null, Validators.required],
        role: [null, Validators.required],
        passwordReader: [null]
    },{
      validator: passwordMatch('password', 'confirm_password')
  });

  }





  // ****************** Method - Fetching All Roles ************************//

  getAllRoles(){
    this.querySubscription = this.backendservice.getAllRoles().subscribe((res) => {
    this.fetchData.rolesData = res['data'];              
  },
      (error) => {
          this.error = true;
          this.errorMessage = error.message;
          this.success = false;
      },
      () => {
      }
    );
  }





  // ****************** Method - Fetching All Users ************************//

  getAllUsers(){
    this.querySubscription = this.backendservice.getAllUsers().subscribe((res) => {
    this.fetchData.tblData = res['data'];
    this.dataSource = new MatTableDataSource(this.fetchData.tblData);
    this.dataSource.sort = this.sort;      
    this.dataSource.paginator = this.paginator;     
  },
      (error) => {
          this.error = true;
          this.errorMessage = error.message;
          this.success = false;
      },
      () => {
      }
    );
  }





   // ****************** Method - Inserting a New User ************************//

   addUser(formData: any){
      this.dataLoading = true;                                                                          // starting data loader
      this.querySubscription = this.backendservice.addUser(formData).subscribe(
        (res)=> {
          if (res['Code'] > 0)                                                                          // no error found
          {
            this.error = false;
            this.errorMessage = res['Message'];                                                         // message to display
            this.dataLoading = false;                                                                   // data loader set to off
            this.success = true;                                                                        // showing sucess to change class
            this.addUserForm.reset();                                                                   // resetting the form

            // resetting validation errors
            this.addUserForm.controls.account_name.setErrors(null);                      
            this.addUserForm.controls.first_name.setErrors(null);                      
            this.addUserForm.controls.last_name.setErrors(null);                      
            this.addUserForm.controls.email.setErrors(null);                      
            this.addUserForm.controls.password.setErrors(null);                   
            this.addUserForm.controls.confirm_password.setErrors(null);          
            this.addUserForm.controls.role.setErrors(null);                   
          }
          else                                                                                            // in case of error from query
          {
            this.error = true;
            this.success = false;
            this.errorMessage = res['Message'];
            this.dataLoading = false;
          }
        },
        (error)=>{                                                                                        // in case of error from server
          this.error = true;
          this.success = false;
          this.errorMessage = error.message;
          this.dataLoading = false;
        },
        ()=>{
          this.dataLoading = false;
        }
    ); 
  }
  




  // ****************** Method - Filtering Table Data ************************//

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }





  // ****************** Method - Updating Status of User ************************//

  updateStatus(event,req1,req2){
      this.dataLoading = true;                         
      this.sentParmas = { "param1": req1, "param2": req2 };
      this.querySubscription = this.backendservice.updateStatus(this.sentParmas).subscribe(
        (res)=> {
          if (res['Code'] > 0)                
          {
            this.error = false;
            this.errorMessage = res['Message'];               
            this.dataLoading = false;                          
            this.success = true;                               
          }
          else                                             
          {
            this.error = true;
            this.success = false;
            this.errorMessage = res['Message'];
            this.dataLoading = false;
          }
        },
        (error)=>{                                        
          this.error = true;
          this.success = false;
          this.errorMessage = error.message;
          this.dataLoading = false;
        },
        ()=>{
          this.dataLoading = false;
        }
    );
  }
  




  // ****************** Method - Fetching User Information after clicking on edit button ************************//

  getUserInfo(event,req){
   

    this.editForm = true;                                                                         // set edit form parameter to true
    this.viewPasswordControlsEdit = false;                                                        // set password controls to false

    // Initializing form control values
    this.editUserForm.controls['account_name'].setValue(req.a_name);
    this.editUserForm.controls['first_name'].setValue(req.f_name);
    this.editUserForm.controls['last_name'].setValue(req.l_name);
    this.editUserForm.controls['email'].setValue(req.e_address);
    this.editUserForm.controls['role'].setValue(req.usr_role.toString());

    // disabling form control to false
    this.editUserForm.controls['password'].disable();
    this.editUserForm.controls['confirm_password'].disable();  
    
    this.sentParmas = { 'userId': req.id };
  }
  




  // ****************** Method - Editing a User ************************//

  editUser(formData: any, userId : number){
      this.dataLoading = true;                                                                          // starting data loader
      this.querySubscription = this.backendservice.editUser(formData, userId).subscribe(
        (res)=> {
          if (res['Code'] > 0)                                                                          // no error found
          {
            this.error = false;
            this.errorMessage = res['Message'];                                                         // message to display
            this.dataLoading = false;                                                                   // data loader set to off
            this.success = true;                                                                        // showing sucess to change class
            this.editUserForm.reset();                                                                   // resetting the form

            // resetting validation errors
            this.editUserForm.controls.account_name.setErrors(null);                      
            this.editUserForm.controls.first_name.setErrors(null);                      
            this.editUserForm.controls.last_name.setErrors(null);                      
            this.editUserForm.controls.email.setErrors(null);                      
            this.editUserForm.controls.password.setErrors(null);                   
            this.editUserForm.controls.confirm_password.setErrors(null);          
            this.editUserForm.controls.role.setErrors(null);                   
          }
          else                                                                                            // in case of error from query
          {
            this.error = true;
            this.success = false;
            this.errorMessage = res['Message'];
            this.dataLoading = false;
          }
        },
        (error)=>{                                                                                        // in case of error from server
          this.error = true;
          this.success = false;
          this.errorMessage = error.message;
          this.dataLoading = false;
        },
        ()=>{
          this.dataLoading = false;
        }
    );
  }





  // ****************** Method - Toggle Password on Button Click ************************//

  togglePasswordControl(){
    if (this.editUserForm.controls['password'].disabled) {
      this.viewPasswordControlsEdit = true;
      this.editUserForm.controls['password'].enable();
      this.editUserForm.controls['confirm_password'].enable();
     } else {
       this.viewPasswordControlsEdit = false;
       this.editUserForm.controls['password'].disable();
       this.editUserForm.controls['confirm_password'].disable();
     }
  }





  // ****************** Method - Unsubscribing service after success ************************//

  ngOnDestroy(): void {
    if(this.querySubscription){
      this.querySubscription.unsubscribe();
    }
  }

}
