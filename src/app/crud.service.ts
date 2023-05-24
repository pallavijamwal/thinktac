import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private fireService: AngularFirestore) { }

  getEmployee() {
    return this.fireService.collection('Employees').valueChanges();
  }

  createEmployees(empValue:any) {
    return this.fireService.collection('Employees').doc(empValue.id).set(empValue);
  }

  updateEmployee(empValue: any) {
   return this.fireService.collection('Employees').doc(empValue.id).update(empValue);
  }

  deleteEmp(empid: string) {
    this.fireService.doc("Employees/" + empid).delete()
  }
}
