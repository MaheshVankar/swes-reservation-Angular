import { Component, OnInit,   AfterViewInit,
  ElementRef,
  HostListener,
  ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';
import { EquipmentHistory } from '../../models/equipment-history.model';
import { ReservationCreate } from '../reservation-create/reservation-create';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Import NgbModal and NgbModule

type SortColumn = 'date' | 'itemId' | 'status' | 'returnDate' | 'employeeName' | 'employeeId';

@Component({
  standalone: true,
  selector: 'app-equipment-history',
  imports: [CommonModule, ReservationCreate, NgbModule], // Add NgbModule here
  templateUrl: './equipment-history.html',
  styleUrls: ['./equipment-history.scss']
})
export class EquipmentHistoryView implements AfterViewInit  {
  @ViewChild('tableWrapper') tableWrapper!: ElementRef<HTMLDivElement>;
  @ViewChild('modalContent') modalContent!: TemplateRef<any>; // Reference to ng-template

ngAfterViewInit(): void {
  setTimeout(() => {
    this.adjustTableHeight();
  }, 1500);
}
@HostListener('window:resize')
onResize() {
  this.adjustTableHeight();
}

openReservationModal() {
  this.modalService.open(this.modalContent, { ariaLabelledBy: 'modal-basic-title' });
}

private adjustTableHeight(): void {
  if (!this.tableWrapper) return;

  const wrapper = this.tableWrapper.nativeElement;

  const viewportHeight = window.innerHeight;
  const topOffset = wrapper.getBoundingClientRect().top;

  // Space for pagination + padding
  const bottomBuffer = 140;

  const availableHeight = viewportHeight - topOffset - bottomBuffer;

  wrapper.style.maxHeight = `${availableHeight}px`;
  wrapper.style.overflowY = 'auto';
}


  all: EquipmentHistory[] = [];
  filtered: EquipmentHistory[] = [];
  paged: EquipmentHistory[] = [];
  loading = false
  error: string | null = null;

  //loading = true;

  filters = {
    search: '',
    itemType: '',
    statuses: [] as string[],
    start: null as Date | null,
    end: null as Date | null
  };

  sort: { column: SortColumn; direction: 'asc' | 'desc' } = {
    column: 'date',
    direction: 'asc'
  };

  page = 1;
  pageSize = 10;

  constructor(private api: ApiService, private modalService: NgbModal) {}

ngOnInit() {
  this.loading = true;
  this.error = null;
  this.filtered = [];
  this.paged = [];

this.api.getEquipmentHistory().subscribe({
  next: (data: EquipmentHistory[]) => {
    this.all = data;
    this.page = 1;
    this.applyFilters();
    this.loading = false;

    // ✅ WAIT FOR TABLE TO RENDER, THEN CALCULATE
    setTimeout(() => {
      this.adjustTableHeight();
    });
  },
  error: () => {
    this.loading = false;
    this.error = 'Failed to load equipment history.';
  }
});
}








  get isEmpty(): boolean {
    return !this.loading && this.filtered.length === 0;
  }

  applyFilters() {
    this.filtered = this.all.filter(r => {

      if (this.filters.search) {
        const t = this.filters.search.toLowerCase();
        if (!r.employeeName.toLowerCase().includes(t) &&
            !r.itemId.toLowerCase().includes(t)) return false;
      }

      if (this.filters.itemType && r.itemType !== this.filters.itemType) {
        return false;
      }

      if (this.filters.statuses.length &&
          !this.filters.statuses.includes(r.status)) {
        return false;
      }

      if (this.filters.start && new Date(r.date) < this.filters.start) {
        return false;
      }

      if (this.filters.end && new Date(r.date) > this.filters.end) {
        return false;
      }

      return true;
    });

    this.applySorting();
  }

  applySorting() {
    const dir = this.sort.direction === 'asc' ? 1 : -1;
    const col = this.sort.column;

    this.filtered.sort((a, b) => {
      const av = a[col] ?? '';
      const bv = b[col] ?? '';
      return av < bv ? -1 * dir : av > bv ? 1 * dir : 0;
    });

    this.applyPagination();
  }

applyPagination() {
  const start = (this.page - 1) * this.pageSize;
  this.paged = this.filtered.slice(start, start + this.pageSize);
  setTimeout(() => this.adjustTableHeight());

}

  resetPage() {
  this.page = 1;
}
onSearch(value: string) {
  this.filters.search = value;
  this.resetPage();
  this.applyFilters();
}
onItemTypeChange(value: string) {
  this.filters.itemType = value;
  this.resetPage();
  this.applyFilters();
}
onStatusToggle(status: string, checked: boolean) {
  if (checked) {
    this.filters.statuses.push(status);
  } else {
    this.filters.statuses = this.filters.statuses.filter(s => s !== status);
  }

  this.resetPage();
  this.applyFilters();
}
onStartDateChange(value: string) {
  this.filters.start = value ? new Date(value) : null;
  this.resetPage();
  this.applyFilters();
}

onEndDateChange(value: string) {
  this.filters.end = value ? new Date(value) : null;
  this.resetPage();
  this.applyFilters();
}
onPageSizeChange(value: string) {
  this.pageSize = Number(value);
  this.resetPage();
  this.applyPagination();
}

goToPage(page: number) {
  this.page = page;
  this.applyPagination();
}

}
