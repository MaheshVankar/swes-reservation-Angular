import { Injectable } from '@angular/core';
import { of, delay } from 'rxjs';
import { EquipmentHistory } from '../models/equipment-history.model';

const EQUIPMENT_HISTORY_DATA: EquipmentHistory[] = [
  {
    employeeId: 'E001',
    employeeName: 'John Doe',
    itemId: 'BOOT-01',
    itemType: 'Boots',
    status: 'Returned',
    date: '2025-01-05',
    returnDate: '2025-01-10'
  },
  {
    employeeId: 'E002',
    employeeName: 'Jane Smith',
    itemId: 'HELM-02',
    itemType: 'Helmet',
    status: 'Pending',
    date: '2025-01-12',
    //returnDate: null
  },
  {
    employeeId: 'E003',
    employeeName: 'Mike Brown',
    itemId: 'VEST-03',
    itemType: 'Vest',
    status: 'Overdue',
    date: '2025-01-01',
    //returnDate: null
  },
  {
    employeeId: 'E001',
    employeeName: 'John Doe',
    itemId: 'BOOT-04',
    itemType: 'Boots',
    status: 'Returned',
    date: '2024-12-15',
    returnDate: '2024-12-20'
  }
];

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // getEquipmentHistory() {
  //   return of(EQUIPMENT_HISTORY_DATA).pipe(delay(500));
  // }
getEquipmentHistory() {
return of(EQUIPMENT_HISTORY_DATA).pipe(delay(500));
}

  createReservation(payload: any) {
    return of(payload).pipe(delay(400));
  }

  sendNotification() {
    return of(true).pipe(delay(300));
  }
}
