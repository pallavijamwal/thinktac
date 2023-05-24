import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../crud.service';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.scss']
})
export class EmployeeDialogComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private fireService: AngularFirestore,
    private crudService: CrudService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  empForm = this.fb.group({
    email: ["", [Validators.email]],
    name: ["", [Validators.required]],
    id: [this.fireService.createId()]
  });
  ngOnInit(): void {
    console.log(this.data)
    if (this.data) {
      this.empForm.patchValue({
        name: this.data.name,
        email: this.data.email,
        id: this.data.id
      })
    }
  }
  onSubmit() {
    console.log(this.empForm.value);
    if (this.data) {
      this.crudService.updateEmployee(this.empForm.value).then(()=>{
        this.dialog.closeAll()
        alert('Employee Updated successfully')
        
      })
    }
    if (!this.data) {
      this.crudService.createEmployees(this.empForm.value).then(() => {
        this.dialog.closeAll()
        alert('Employee created successfully')
      })
    }
  }
}
