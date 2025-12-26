export interface EquipmentHistory {
  employeeId: string;
  employeeName: string;

  itemId: string;
  itemType: string;

  status: 'Returned' | 'Pending' | 'Overdue';

  date: string;        // reservation date
  returnDate?: string; // optional, omit if not returned
}
