import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { HttpClient } from "@angular/common/http";

import {Router} from "@angular/router";
import {fromEvent} from "rxjs";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {SelectionModel} from "@angular/cdk/collections";
import {MatDialog} from "@angular/material/dialog";
import {AddCustomerDialogComponent, DialogData} from "../add-customer-dialog/add-customer-dialog.component";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {EditMessageDialogComponent} from "../edit-message-dialog/edit-message-dialog.component";
import {AuthService} from "../auth.service";

export interface Message {
  id: number;
  nomprotocole: string;
  code: string;
  specification: string;
}

@Component({
  selector: 'app-msid',
  templateUrl: './msid.component.html',
  styleUrls: ['./msid.component.css']
})
export class MSIDComponent implements OnInit {
  public dataSource = new MatTableDataSource<Message>();
  public displayedColumns: string[] = ['select', 'nomprotocole', 'code', 'specification', 'DataElement'];
  public searchCode: string = '';
  public selection = new SelectionModel<Message>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(private http: HttpClient,
              private router: Router,
              public dialog: MatDialog,public authService: AuthService) {}

  ngOnInit() {
    this.fetchData();
    this.setupSearch();
    if (this.authService.roles.includes('ADMIN')) {
      this.displayedColumns.push('Action');
    }
  }

  fetchData() {
    this.http.get<Message[]>("http://localhost:8080/messages")
      .subscribe({
        next: data => {
          const filteredData = data.filter(item => item.nomprotocole === "MSID");
          this.dataSource.data = filteredData;
          this.dataSource.paginator = this.paginator;
        },
        error: err => {
          console.error('Error fetching messages:', err);
        }
      });
  }

  removePrefix(code: string): string {
    return code.replace(/^M_/, '');
  }

  search() {
    if (this.searchCode.trim() === '') {
      this.fetchData();
    } else {
      this.dataSource.filter = this.searchCode.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  private setupSearch() {
    if (this.searchInput) {
      fromEvent(this.searchInput.nativeElement, 'input').pipe(
        debounceTime(300),
        distinctUntilChanged(),
      ).subscribe(() => {
        this.search();
      });
    }
  }

  navigateToElementPage() {
    this.router.navigate(['admin/elements']);
  }

  gotoDetails(code: string) {
    this.router.navigate(['/admin/elements'], { queryParams: { attribute: code } });
  }

  addItem(): void {
    const dialogRef = this.dialog.open(AddCustomerDialogComponent, {
      width: '400px',
      data: { id: null, nomprotocole: '', code: '', specification: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveCustomer(result);
      }
    });
  }

  deleteItem(element: Message): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      height: '300px',
      panelClass: 'large-dialog',
      data: { id: element.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.delete(`http://localhost:8080/messages/${element.id}`).subscribe({
          next: () => {
            this.fetchData();
          },
          error: err => {
            console.error('Error deleting item:', err);
          }
        });
      }
    });
  }

  deleteSelectedItems() {
    const selectedIds = this.selection.selected.map(item => item.id);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.post("http://localhost:8080/messages/delete", selectedIds).subscribe({
          next: response => {
            this.fetchData();
          },
          error: err => {
            console.error('Error deleting items:', err);
          }
        });
      }
    });
  }

  saveCustomer(data: DialogData) {
    this.http.post<Message>("http://localhost:8080/messages", data).subscribe({
      next: response => {
        this.fetchData();
      },
      error: err => {
        console.error('Error adding customer:', err);
      }
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  editItem(item: Message): void {
    const dialogRef = this.dialog.open(EditMessageDialogComponent, {
      width: '400px',
      data: { id: item.id, nomprotocole: item.nomprotocole, code: item.code, specification: item.specification }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateMessage(result);
      }
    });
  }

  updateMessage(data: DialogData) {
    this.http.put<Message>(`http://localhost:8080/messages/${data.id}`, data).subscribe({
      next: response => {
        this.fetchData();
      },
      error: err => {
        console.error('Error updating message:', err);
      }
    });
  }

  goBack() {
    this.router.navigate(['/admin/home']);
  }
}
