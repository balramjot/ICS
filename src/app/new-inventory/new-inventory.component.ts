import { Component, OnInit, OnDestroy,ViewChild } from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { BackendServiceService } from '../service/backend-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CancelInventoryComponent } from '../new-inventory/cancel-inventory.component';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-new-inventory',
  templateUrl: './new-inventory.component.html',
  styleUrls: ['./new-inventory.component.css']
})
export class NewInventoryComponent implements OnInit, OnDestroy {

  private querySubscription;

  addInventoryForm: FormGroup;

  error: boolean = false;
  dataLoading: boolean = false;
  success: boolean = false;
  wasFormChanged: boolean = false;

  errorMessage : String = '';

  fetchData: any = { 'categoryData':'', 'tblData':''};

  fileData: File = null;
  previewUrl:any = null;
  uploadedFilePath: string = null;
  customImage: string = "assets/img/dummy.jpg";

  constructor(private route: Router, private fb: FormBuilder, private backendservice: BackendServiceService, public dialog: MatDialog, private http: HttpClient) { }
  
  ngOnInit(): void {

    this.addInventoryForm = this.fb.group({
      part_no: new FormControl(null, { validators: [Validators.required], asyncValidators: [this.backendservice.partnoExistsOrNot()],  updateOn: 'blur' }),
      category: [null, Validators.required],
      part_name: [null, Validators.required],
      part_desc: [null, Validators.required],
      price: [null, Validators.required],
      quantity: [null, Validators.required]
  });
      this.getAllCategory();
  }


  getAllCategory(){
    this.querySubscription = this.backendservice.getAllCategory().subscribe((res) => {
    this.fetchData.categoryData = res['data'];              
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


  addInventory(formData: any){
    this.dataLoading = true;                                                                      
    this.querySubscription = this.backendservice.addInventory(formData).subscribe(
      (res)=> {
        this.error = false;
        this.success = true;
        this.errorMessage = res['Message'];
        this.dataLoading = false;
        this.dialog.closeAll();
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

closeDialog(): void {  
  if(this.wasFormChanged){
    const dialogRef = this.dialog.open(CancelInventoryComponent, {
      width: '340px',
    });
  } else {
    this.dialog.closeAll();
  }
}

formChanged() {
  this.wasFormChanged = true;
}



preview(fileInput: any) {
  this.fileData = <File>fileInput.target.files[0];
  this.uploadedFilePath = this.fileData.name;
  var mimeType = this.fileData.type;
  if (mimeType.match(/image\/*/) == null) {
    this.previewUrl = this.customImage;
    return;
  }

  var reader = new FileReader();      
  reader.readAsDataURL(this.fileData); 
  reader.onload = (_event) => { 
    this.previewUrl = reader.result; 
  }
}



uploadFile() {     
    this.dataLoading = true;    
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.querySubscription = this.backendservice.uploadImage(formData).subscribe(
      (res)=> {
        this.error = false;
        this.success = true;
        this.errorMessage = res['Message'];
        this.dataLoading = false;
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
