import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { ElementValuesComponent } from '../element-values/element-values.component';
import {AddCustomerDialogComponent, DialogData} from "../add-customer-dialog/add-customer-dialog.component";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {EditMessageDialogComponent} from "../edit-message-dialog/edit-message-dialog.component";
import {Message} from "../hsid/hsid.component";
import {SelectionModel} from "@angular/cdk/collections";

import {AuthService} from "../auth.service";


@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<any>();
  public displayedColumns: string[] = ['select','elementNumber', 'attribute', 'description', 'specificAttributeValue', 'Element_Values'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  protected attribute: string | null;
  targetElementNumbers = [3, 22, 24, 25, 39, 48, 53, 54, 56, 60, 61, 62, 127];
  public selection = new SelectionModel<Message>(true, []);
  public searchCode: string = '';
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, public dialog: MatDialog,public authService: AuthService) {
    this.attribute = null;
  }

  ngOnInit(): void {
    this.attribute = this.route.snapshot.queryParamMap.get('attribute');
    this.http.get(`http://localhost:8080/attribute?attribute=${this.attribute}`).subscribe(data => {
      this.dataSource.data = data as any[];
    });
    if (this.authService.roles.includes('ADMIN')) {
      this.displayedColumns.push('Action');
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getCodeWithoutPrefix(attribute: any): String {
    return attribute.replace("H_", "");
  }

  goBack(): void {
    const attribute = this.attribute || '';
    const targetUrl = attribute.startsWith('H_') ? '/admin/HSID' : attribute.startsWith('M_') ? '/admin/MSID' : '';

    if (targetUrl) {
      console.log(`Navigating back to ${targetUrl}`);
      this.router.navigateByUrl(targetUrl).then(r => {
        console.log('Navigation result:', r);
        return true;
      }).catch(err => {
        console.error('Navigation error:', err);
      });
    } else {
      console.error('Invalid attribute, unable to determine target URL.');
    }
  }

  goToDetails(code: string) {
    this.router.navigate(['/admin/attribute'], { queryParams: { attribute: code } });
  }

  assignmentItem(element: any): void {
    const attribute = this.attribute || '';
    const nomprotocole = attribute.startsWith('H_') ? 'HSID' : attribute.startsWith('M_') ? 'MSID' : '';
    const dialogRef = this.dialog.open(ElementValuesComponent, {
      width: '990px',
      data: { elementnumber: element.elementNumber, nomprotocole: nomprotocole }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Redirection après la fermeture du dialogue
      this.router.navigate(['/admin/elements'], { queryParams: { attribute: this.attribute } });
    });
  }




  addItem(): void {
    const dialogRef = this.dialog.open(AddCustomerDialogComponent, {
      width: '400px',
      data: { id: null, nomprotocole: '', code: '', specification: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('Result:', result);
      if (result) {
        this.saveCustomer(result);
      }
    });
  }

  saveCustomer(data: DialogData) {
    this.http.post<Message>("http://localhost:8080/messages", data).subscribe({
      next: response => {
        console.log('Customer added:', response);
        this.fetchData(); // Recharge les données après l'ajout
      },
      error: err => {
        console.error('Error adding customer:', err);
      }
    });
  }

  deleteItem(element: Message): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      height:'300px',
      panelClass: 'large-dialog',
      data: { id: element.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.delete(`http://localhost:8080/messages/${element.id}`).subscribe({
          next: () => {
            console.log('Item deleted');
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
    console.log('Deleting items with ids:', selectedIds);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.post("http://localhost:8080/messages/delete", selectedIds).subscribe({
          next: response => {
            console.log('Items deleted');
            this.fetchData();
          },
          error: err => {
            console.error('Error deleting items:', err);
          }
        });
      }
    });
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
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
        console.log('Message updated:', response);
        this.fetchData(); // Recharge les données après la mise à jour
      },
      error: err => {
        console.error('Error updating message:', err);
      }
    });
  }
  fetchData() {
    this.http.get<Message[]>("http://localhost:8080/messages").subscribe({
      next: data => {
        const filteredData = data.filter(item => item.nomprotocole === "HSID");
        this.dataSource.data = filteredData;
        this.dataSource.paginator = this.paginator;
      },
      error: err => {
        console.error('Error fetching messages:', err);
      }
    });
  }

  search() {
    this.dataSource.filter = this.searchCode.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
