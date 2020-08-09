import { Component, OnInit, OnDestroy,ViewChild } from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { BackendServiceService } from '../service/backend-service.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {

  private querySubscription;

  addCategoryForm: FormGroup;
  error: boolean = false;
  dataLoading: boolean = false;
  success: boolean = false;

  errorMessage : String = '';
  fetchData: any = { 'tblData':'' };
  sentParmas: any = new Object();

  editForm: boolean = false;
  editCategoryForm: FormGroup;

   // ****************** For Data Table ************************//

   displayedColumns: string[] = ['col1','category', 'col2'];
   dataSource : MatTableDataSource<any>;
   @ViewChild(MatSort, {static: true}) sort: MatSort;
   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private route: Router, private fb: FormBuilder, private backendservice: BackendServiceService) { }

  ngOnInit(): void {

    this.addCategoryForm = this.fb.group({
      category: new FormControl(null, { validators: [Validators.required],  asyncValidators: [this.backendservice.categoryExistsOrNot()],  updateOn: 'blur'}),
  });
  
   this.backendservice.userObs$.subscribe(()=> {
    this.getAllCategoryPage();
  });

  this.getAllCategoryPage();                                                                 
  this.dataSource = new MatTableDataSource(this.fetchData.tblData);

  this.editForm = false;

  this.editCategoryForm = this.fb.group({
    category: new FormControl(null, { validators: [Validators.required] })
});

  }

  addCategory(formData: any){
    this.dataLoading = true;              
    this.querySubscription = this.backendservice.addCategory(formData).subscribe(
      (res)=> {
        if (res['Code'] > 0)                        
        {
          this.error = false;
          this.errorMessage = res['Message'];                                    
          this.dataLoading = false;                                              
          this.success = true;                                              
          this.addCategoryForm.reset();                                          
          this.addCategoryForm.controls.category.setErrors(null);                                       
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

getAllCategoryPage(){
  this.querySubscription = this.backendservice.getAllCategoryPage().subscribe((res) => {
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

 updateCategoryStatus(event,req1,req2){
  this.dataLoading = true;                         
  this.sentParmas = { "param1": req1, "param2": req2 };
  this.querySubscription = this.backendservice.updateCategoryStatus(this.sentParmas).subscribe(
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



getCategoryInfo(event,req){
  this.editForm = true;    
  this.editCategoryForm.controls['category'].setValue(req.category);                                        
  this.sentParmas = { 'catId': req.id };
}


editCategory(formData: any, catId : number){
  this.dataLoading = true;                                      
  this.querySubscription = this.backendservice.editCategory(formData, catId).subscribe(
    (res)=> {
      if (res['Code'] > 0)                           
      {
        this.error = false;
        this.errorMessage = res['Message'];                                    
        this.dataLoading = false;                                               
        this.success = true;                                          
        this.editCategoryForm.reset();                  

        this.editCategoryForm.controls.category.setErrors(null);                            
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
