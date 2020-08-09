import { Component, OnInit, OnDestroy,ViewChild } from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { BackendServiceService } from '../service/backend-service.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NewInventoryComponent } from '../new-inventory/new-inventory.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit, OnDestroy {

  private querySubscription;

  error: boolean = false;
  dataLoading: boolean = false;
  success: boolean = false;

  errorMessage : String = '';
  fetchData: any = { 'tblData':'' };
  sentParmas: any = new Object();

  displayedColumns: string[] = ['col1','col2', 'part_no', 'part_name', 'category', 'part_desc', 'cost_price', 'quantity', 'col9'];
  dataSource : MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

 constructor(private route: Router, private fb: FormBuilder, private backendservice: BackendServiceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllInventoryPage();
    this.dataSource = new MatTableDataSource(this.fetchData.tblData);

    this.backendservice.userObs$.subscribe(()=> {
      this.getAllInventoryPage();
    });

  }


  getAllInventoryPage(){
    this.querySubscription = this.backendservice.getAllInventoryPage().subscribe((res) => {
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

  openDialog(): void {
    const dialogRef = this.dialog.open(NewInventoryComponent,{
      disableClose: true,
      autoFocus: false,
      width: '40%'
    });
    
    dialogRef.afterOpened().subscribe(result => {
      document.getElementById("blurBackground").className = "blur-background";
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.getAllInventoryPage();
    });
}


applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


updateInventoryStatus(event,req1,req2){
    this.dataLoading = true;                         
    this.sentParmas = { "param1": req1, "param2": req2 };
    this.querySubscription = this.backendservice.updateInventoryStatus(this.sentParmas).subscribe(
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



  ngOnDestroy(): void {
    if(this.querySubscription){
      this.querySubscription.unsubscribe();
    }
  }

}
