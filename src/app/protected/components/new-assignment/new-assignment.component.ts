import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EquiposService } from '../../services/equipos.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-new-assignment',
  templateUrl: './new-assignment.component.html',
  styleUrls: ['./new-assignment.component.css']
})
export class NewAssignmentComponent implements OnInit {

  types: string[] = ['Proyecto', 'Célula', 'Tribu'];
  projects: string[] = ['Proyecto 1', 'Proyecto 2', 'Proyecto 3', 'Proyecto 4', 'Proyecto 5', 'Proyecto 6'];

  newAssignmentForm: FormGroup = this.fb.group({

  });

  constructor(public dialogRef: MatDialogRef<NewAssignmentComponent>, private fb: FormBuilder) { }

  ngOnInit(): void {
    
  }

  close(): void {
    this.dialogRef.close();
  }

}