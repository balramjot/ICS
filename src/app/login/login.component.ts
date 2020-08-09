import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { BackendServiceService } from '../service/backend-service.service';
import * as jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private querySubscription;

  userLoginForm: FormGroup;
  error: boolean = false;
  dataLoading: boolean = false;
  success: boolean = false;
  errorMessage : String = '';

  constructor(private route: Router, private fb: FormBuilder, private backendservice: BackendServiceService) { }

  ngOnInit(): void {

    this.userLoginForm = this.fb.group({
      username : [null, Validators.required],
      password: [null, Validators.required]
    });
  }


  userLogin(formData: any){
    this.dataLoading = true;                                                                          // starting data loader
      this.querySubscription = this.backendservice.loginUser(formData).subscribe(
        (res)=> {
          if (res['Code'] > 0)                                                                          // no error found
          {
            this.error = false;
            this.errorMessage = res['Message'];                                                         // message to display
            this.dataLoading = false;                                                                   // data loader set to off
            this.success = true;                                                                        // showing sucess to change class
            this.userLoginForm.reset();                                                                   // resetting the form
            
            localStorage.setItem('token', res['data'].token);
            var decoded = jwt_decode(res['data'].token);
            console.log(decoded);
            // resetting validation errors
            this.userLoginForm.controls.username.setErrors(null);                      
            this.userLoginForm.controls.password.setErrors(null);
            this.route.navigate(['/users']);
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


  ngOnDestroy(): void {
    if(this.querySubscription){
      this.querySubscription.unsubscribe();
    }
  }


}
