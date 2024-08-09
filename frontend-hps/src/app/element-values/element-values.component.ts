import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddElementValueDialogComponent } from '../add-element-value-dialog/add-element-value-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EditElementValueDialogComponent } from '../edit-element-value-dialog/edit-element-value-dialog.component';

@Component({
  selector: 'app-element-values',
  templateUrl: './element-values.component.html',
  styleUrls: ['./element-values.component.css']
})
export class ElementValuesComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['position', 'description_p', 'code', 'description_c', 'action'];
  elementnumber: number | null = null;
  nomprotocole: string | null = null;
  positions: { position: string; description_p: string }[] = [];
  hidePositionFields: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ElementValuesComponent>
  ) {
    this.elementnumber = data.elementnumber;
    this.nomprotocole = data.nomprotocole;
    this.hidePositionFields = this.elementnumber === 24 || this.elementnumber === 25;

    if (this.hidePositionFields) {
      this.displayedColumns = this.displayedColumns.filter(column => column !== 'position' && column !== 'description_p');
    }
  }

  ngOnInit(): void {
    this.fetchElementValues();
    this.fetchPositions();
  }

  fetchElementValues(): void {
    if (this.elementnumber !== null && this.nomprotocole !== null) {
      this.http.get<any[]>(`http://localhost:8080/api/element-values?elementnumber=${this.elementnumber}&nomprotocole=${this.nomprotocole}`)
        .subscribe({
          next: data => {
            const uniqueData = this.removeDuplicates(data);
            this.sortElementValues(uniqueData);
            this.dataSource.data = uniqueData;
          },
          error: err => {
            console.error('Error fetching element values:', err);
          }
        });
    }
  }

  fetchPositions(): void {
    if (this.elementnumber !== null) {
      this.http.get<{ position: string; description_p: string }[]>(`http://localhost:8080/api/positions/descriptions?elementnumber=${this.elementnumber}`)
        .subscribe({
          next: data => {
            this.positions = Array.from(new Set(data.map(item => item.position)))
              .map(position => {
                return {
                  position: position,
                  description_p: data.find(item => item.position === position)?.description_p || ''
                };
              });
          },
          error: err => {
            console.error('Error fetching positions:', err);
          }
        });
    }
  }

  removeDuplicates(data: any[]): any[] {
    return data.filter((value, index, self) =>
        index === self.findIndex((t) => (
          t.position === value.position &&
          t.description_p === value.description_p &&
          t.code === value.code &&
          t.description_c === value.description_c &&
          t.nomprotocole === value.nomprotocole
        ))
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openAddElementValueDialog(): void {
    const dialogRef = this.dialog.open(AddElementValueDialogComponent, {
      width: '400px',
      data: {
        elementnumber: this.elementnumber,
        nomprotocole: this.nomprotocole,
        positions: this.positions
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addElementValue(result);
      }
    });
  }

  addElementValue(elementValue: any): void {
    this.http.post(`http://localhost:8080/api/element-values?elementnumber=${this.elementnumber}&position=${elementValue.position}&description_p=${elementValue.description_p}`, elementValue)
      .subscribe({
        next: response => {
          console.log('Element Value added:', response);
          this.fetchElementValues();
        },
        error: err => {
          console.error('Error adding element value:', err);
        }
      });
  }

  deleteElementValue(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.http.delete(`http://localhost:8080/api/element-values/${id}`)
          .subscribe({
            next: () => {
              console.log('Element Value deleted');
              this.fetchElementValues();
            },
            error: err => {
              console.error('Error deleting element value:', err);
            }
          });
      }
    });
  }

  confirmDeleteElementValue(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteElementValue(id);
      }
    });
  }

  openEditElementValueDialog(element: any): void {
    const dialogRef = this.dialog.open(EditElementValueDialogComponent, {
      width: '400px',
      data: {
        ...element,
        positions: this.positions
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateElementValue(result);
      }
    });
  }

  updateElementValue(elementValue: any): void {
    this.http.put(`http://localhost:8080/api/element-values/${elementValue.id}`, elementValue)
      .subscribe({
        next: response => {
          console.log('Element Value updated:', response);
          this.fetchElementValues();
        },
        error: err => {
          console.error('Error updating element value:', err);
        }
      });
  }

  private sortElementValues(elementValues: any[]): void {
    elementValues.sort((a, b) => {
      if (a.elementnumber === 24 || a.elementnumber === 25) {
        if (a.elementnumber === b.elementnumber) {
          return a.code - b.code; // Sort by code if both elementnumbers are 24 or 25
        }
        return a.elementnumber - b.elementnumber; // Sort by elementnumber if they are different
      } else {
        const posA = a.position.split('--').map(Number);
        const posB = b.position.split('--').map(Number);
        for (let i = 0; i < Math.max(posA.length, posB.length); i++) {
          if (posA[i] !== posB[i]) {
            return (posA[i] || 0) - (posB[i] || 0);
          }
        }
        return 0;
      }
    });
  }
}
