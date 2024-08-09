import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { AddProtocoleDialogComponent, ProtocoleDialogData } from '../add-protocole-dialog/add-protocole-dialog.component';
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {EditProtocoleDialogComponent} from "../edit-protocole-dialog/edit-protocole-dialog.component";
import {AuthService} from "../auth.service";

export interface Protocole {
  id: number;
  nomprotocole: string;
  description: string;
  version: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public dataSource = new MatTableDataSource<Protocole>();
  public displayedColumns: string[] = ['select', 'nomprotocole', 'description', 'Version', 'Explore'];
  public searchCode: string = '';
  public selection = new SelectionModel<Protocole>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog,public authService: AuthService) {}

  ngOnInit() {
    this.http.get<Protocole[]>("http://localhost:8080/protocoles")
      .subscribe({
        next: data => {
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
        },
        error: err => {
          console.error('Error fetching protocoles:', err);
        }
      });
    if (this.authService.roles.includes('ADMIN')) {
      this.displayedColumns.push('Action');
    }
  }

  checkItem(item: Protocole) {
    if (item.nomprotocole.toLowerCase() === 'hsid') {
      this.router.navigate(['/admin/HSID']);
    } else if (item.nomprotocole.toLowerCase() === 'msid') {
      this.router.navigate(['/admin/MSID']);
    } else {
      console.log('Unknown protocol:', item.nomprotocole);
    }
  }

  search() {
    this.dataSource.filter = this.searchCode.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addItemPro(): void {
    const dialogRef = this.dialog.open(AddProtocoleDialogComponent, {
      width: '400px',
      data: { id: null, nomprotocole: '', description: '', version: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        delete result.id; // Supprimer l'ID avant d'envoyer les données au backend
        this.saveProtocole(result);
      }
    });
  }

  saveProtocole(data: ProtocoleDialogData) {
    this.http.post<Protocole>("http://localhost:8080/protocoles", data).subscribe({
      next: response => {
        console.log('Protocole added:', response);
        this.ngOnInit(); // Recharge les données après l'ajout
      },
      error: err => {
        console.error('Error adding protocole:', err);
      }
    });
  }

  deleteItemPro(element: Protocole): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      height:'300px',
      panelClass: 'large-dialog',
      data: { id: element.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.delete(`http://localhost:8080/protocoles/${element.id}`).subscribe({
          next: () => {
            console.log('Item deleted');
            this.ngOnInit();
          },
          error: err => {
            console.error('Error deleting item:', err);
          }
        });
      }
    });
  }

  deleteSelectedItemsPro() {
    const selectedIds = this.selection.selected.map(item => item.id);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.post("http://localhost:8080/protocoles/delete", selectedIds).subscribe({
          next: response => {
            console.log('Items deleted');
            this.ngOnInit();
          },
          error: err => {
            console.error('Error deleting items:', err);
          }
        });
      }
    });
  }

  editItemPro(item: Protocole): void {
    const dialogRef = this.dialog.open(EditProtocoleDialogComponent, {
      width: '400px',
      data: { id: item.id, nomprotocole: item.nomprotocole, description: item.description, version: item.version }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateProtocole(result);
      }
    });
  }

  updateProtocole(data: ProtocoleDialogData) {
    this.http.put<Protocole>(`http://localhost:8080/protocoles/${data.id}`, data).subscribe({
      next: response => {
        console.log('Protocole updated:', response);
        this.ngOnInit(); // Recharge les données après la mise à jour
      },
      error: err => {
        console.error('Error updating protocole:', err);
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
}
