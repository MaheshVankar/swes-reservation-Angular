import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private isSidebarVisible = new BehaviorSubject<boolean>(false);
  isSidebarVisible$ = this.isSidebarVisible.asObservable();

  toggle() {
    this.isSidebarVisible.next(!this.isSidebarVisible.value);
  }
}
