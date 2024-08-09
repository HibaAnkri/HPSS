import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface UserData {
  no: number;
  firstName: string;
  mail: string;
  access: boolean;
}

const ELEMENT_DATA: UserData[] = [
  { no: 1, firstName: 'Salma', mail: 'SalmaElMarbouh@hps-worldwide.com', access: true },
  { no: 2, firstName: 'hiba', mail: 'hibaankri@hps-worldwide.com', access: false },
  { no: 3, firstName: 'Ahmed', mail: 'AhmedCharif@hps-worldwide.com', access: true },
  { no: 4, firstName: 'Mohamed', mail: 'Mohamedjifani@hps-worldwide.com', access: false },
  { no: 5, firstName: 'Amine', mail: 'AmineBenmousa@hps-worldwide.com', access: true },
  { no: 6, firstName: 'hajar', mail: 'Hajar_12.bilmousa@hps-worldwide.com', access: false },


];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['no', 'firstName', 'mail', 'access', 'delete'];
  dataSource = new MatTableDataSource<UserData>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data: UserData, filter: string) => data.firstName.trim().toLowerCase().indexOf(filter) !== -1;
  }

  deleteElement(element: UserData) {
    this.dataSource.data = this.dataSource.data.filter(e => e !== element);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
