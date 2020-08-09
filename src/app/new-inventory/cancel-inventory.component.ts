import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {MatDialogRef,MatDialog} from '@angular/material/dialog';
import { NewInventoryComponent } from '../new-inventory/new-inventory.component';

@Component({
  selector: 'app-cancel-inventory',
  templateUrl: './cancel-inventory.component.html',
  styleUrls: ['./cancel-inventory.component.css']
})
export class CancelInventoryComponent implements OnInit {

  

  constructor(private fb: FormBuilder, private dialog: MatDialog, private dialogRef: MatDialogRef<CancelInventoryComponent>) { }
  
  ngOnInit(): void {
  }

  public cancel(): void { // To cancel the dialog window
    this.dialogRef.close();
    } 
    
  public cancelN(): void { 
    this.dialog.closeAll();
  }

}
