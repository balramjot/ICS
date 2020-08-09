import { Component, OnInit, OnDestroy,ViewChild } from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { BackendServiceService } from '../service/backend-service.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit, OnDestroy {

  private querySubscription;

  addRoleForm: FormGroup;
  error: boolean = false;
  dataLoading: boolean = false;
  success: boolean = false;

  errorMessage : String = '';
  fetchData: any = { 'tblData':'' };
  sentParmas: any = new Object();

  editForm: boolean = false;
  editRoleForm: FormGroup;

   // ****************** For Data Table ************************//

   displayedColumns: string[] = ['col1','roles', 'col2'];
   dataSource : MatTableDataSource<any>;
   @ViewChild(MatSort, {static: true}) sort: MatSort;
   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private route: Router, private fb: FormBuilder, private backendservice: BackendServiceService) { }

  ngOnInit(): void {

    this.addRoleForm = this.fb.group({
      roles: new FormControl(null, { validators: [Validators.required],  asyncValidators: [this.backendservice.roleExistsOrNot()],  updateOn: 'blur'}),
  });
  
   this.backendservice.userObs$.subscribe(()=> {
    this.getAllRolesPage();
  });

  this.getAllRolesPage();                                                                 
  this.dataSource = new MatTableDataSource(this.fetchData.tblData);

  this.editForm = false;

  this.editRoleForm = this.fb.group({
    roles: new FormControl(null, { validators: [Validators.required] })
});

}

  addRole(formData: any){
    this.dataLoading = true;              
    this.querySubscription = this.backendservice.addRole(formData).subscribe(
      (res)=> {
        if (res['Code'] > 0)                        
        {
          this.error = false;
          this.errorMessage = res['Message'];                                    
          this.dataLoading = false;                                              
          this.success = true;                                              
          this.addRoleForm.reset();                                          
          this.addRoleForm.controls.roles.setErrors(null);                                       
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

// ****************** Method - Fetching All Users ************************//

getAllRolesPage(){
  this.querySubscription = this.backendservice.getAllRolesPage().subscribe((res) => {
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


// ****************** Method - Filtering Table Data ************************//

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


 // ****************** Method - Updating Status of User ************************//

 updateRoleStatus(event,req1,req2){
  this.dataLoading = true;                         
  this.sentParmas = { "param1": req1, "param2": req2 };
  this.querySubscription = this.backendservice.updateRoleStatus(this.sentParmas).subscribe(
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



getRoleInfo(event,req){
  this.editForm = true;    
  this.editRoleForm.controls['roles'].setValue(req.roles);                                        
  this.sentParmas = { 'roleId': req.id };
}


editRole(formData: any, roleId : number){
  this.dataLoading = true;                                      
  this.querySubscription = this.backendservice.editRole(formData, roleId).subscribe(
    (res)=> {
      if (res['Code'] > 0)                           
      {
        this.error = false;
        this.errorMessage = res['Message'];                                    
        this.dataLoading = false;                                               
        this.success = true;                                          
        this.editRoleForm.reset();                  

        this.editRoleForm.controls.roles.setErrors(null);                            
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


ngOnDestroy(): void {
  if(this.querySubscription){
    this.querySubscription.unsubscribe();
  }
}

}
