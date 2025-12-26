import { Routes } from '@angular/router';                 // USED
import { Shell } from './layout/shell/shell';             // USED
import { ReservationCreate } from './features/reservation-create/reservation-create'; // USED
import { EquipmentHistoryView } from './features/equipment-history/equipment-history'; // USED
import { AvailabilityCalendarView } from './features/availability-calendar/availability-calendar'; // USED
import { EmailNotification } from './features/email-notification/email-notification'; // USED
export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
      { path: '', redirectTo: 'reserve', pathMatch: 'full' },
      { path: 'reserve', component: ReservationCreate },
      { path: 'history', component: EquipmentHistoryView },
      { path: 'calendar', component: AvailabilityCalendarView },
      { path: 'notify', component: EmailNotification },
    ]
  }
];
