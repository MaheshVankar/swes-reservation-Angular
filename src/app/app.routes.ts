import { Routes } from '@angular/router';
import { Shell } from './layout/shell/shell';
import { ReservationCreate } from './features/reservation-create/reservation-create';
import { EquipmentHistoryView } from './features/equipment-history/equipment-history';
import { AvailabilityCalendar } from './features/availability-calendar/availability-calendar';
import { EmailNotification } from './features/email-notification/email-notification';
import { Dashboard } from './dashboard/dashboard';
export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'reserve', component: ReservationCreate },
      { path: 'history', component: EquipmentHistoryView },
      { path: 'calendar', component: AvailabilityCalendar },
      { path: 'notify', component: EmailNotification },
    ]
  }
];
