import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentHistoryView } from '../features/equipment-history/equipment-history';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, EquipmentHistoryView],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  stats = [
    { label: 'Total Bookings', value: '28,345' },
    { label: 'Pending Approval', value: '120', danger: true },
    { label: 'New Clients this month', value: '89', trend: 'up', increase: true, icon: 'increase.svg' },
    { label: 'Returning Clients', value: '46%', trend: 'down', icon: 'decrease.svg' }
  ];

  reservations = [
    { name: 'Amanda Chavez', service: 'Boots', status: 'Pending' },
    { name: 'Fionna Wade', service: 'Helmet', status: 'Pending' },
    { name: 'Beatrice Carrol', service: 'Vest', status: 'Pending' },
    { name: 'Jasmine Palmer', service: 'Helmet', status: 'Returned' },
    { name: 'Randy Elliot', service: 'Boots', status: 'Overdue' },
    { name: 'Christine Powell', service: 'Boots', status: 'Returned' }
  ];
}