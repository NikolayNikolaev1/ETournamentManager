import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-e-table',
  templateUrl: './e-table.component.html',
  styleUrl: './e-table.component.scss',
})
export class ETableComponent implements OnChanges {
  @Input() data: any = [];
  @Input() header: string[] = [];
  @Output() rowClicked = new EventEmitter<string>();
  filteredData: any[] = [];
  paginatedData: any[] = [];
  filterText = '';
  sortOrder = 1; // 1 for ascending, -1 for descending
  currentPage = 1;
  pageSize = 5; // Number of rows per page
  totalPages = 1;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.applyFilter();
    }
  }

  applyFilter() {
    this.filteredData = this.data.filter((item: any) =>
      Object.values(item).some((val: any) =>
        val.toString().toLowerCase().includes(this.filterText.toLowerCase())
      )
    );
    this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
    this.currentPage = 1;
    this.updatePaginatedData();
  }

  updatePaginatedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.filteredData.slice(startIndex, endIndex);
  }

  sortData(column: string) {
    this.filteredData.sort((a, b) => {
      if (a[column] > b[column]) {
        return this.sortOrder;
      } else if (a[column] < b[column]) {
        return -this.sortOrder;
      } else {
        return 0;
      }
    });
    this.sortOrder = -this.sortOrder; // Toggle sort order
    this.updatePaginatedData();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedData();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedData();
    }
  }

  onRowClick(id: string) {
    this.rowClicked.emit(id);
  }
}
