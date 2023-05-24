import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDialogComponent } from './employee-dialog/employee-dialog.component';
import { CrudService } from './crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  employees:any;
  constructor(
    public dialog: MatDialog,
    private crudService: CrudService,
    ) {

  }
  ngOnInit(): void {
    this.getEmployees()
  }
  title = 'thinktac';

  openDialog(employee?:any) {
    this.dialog.open(EmployeeDialogComponent, { data: employee })
  }

  getEmployees(){
    this.crudService.getEmployee().subscribe(response=>{
      this.employees=response
    })
  }
  deleteEmp(id:string){
   let deleteConfirm = confirm('Are you sure, you want to delete')
    if (deleteConfirm){
      this.crudService.deleteEmp(id)
    }
  }
}
