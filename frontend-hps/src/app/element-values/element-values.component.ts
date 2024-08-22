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
  displayedColumns: string[] = [];
  elementnumber: number | null = null;
  nomprotocole: string | null = null;
  columns: string[] = [];
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
    this.columns = data.columns;

    this.displayedColumns = this.columns;
    this.hidePositionFields = this.elementnumber === 24 || this.elementnumber === 25 || this.elementnumber === 39;

    if (this.elementnumber === 55 || this.elementnumber === 61 || this.elementnumber === 62) {
      this.displayedColumns = this.displayedColumns.filter(column => column !== 'nom');
    }

    if (this.elementnumber === 61 || this.elementnumber === 62) {
      this.displayedColumns = this.displayedColumns.filter(column => column !== 'format');
    }
    if (this.hidePositionFields) {
      this.displayedColumns = this.displayedColumns.filter(column => column !== 'position' && column !== 'description_p');
    }
  }

  ngOnInit(): void {
    this.fetchElementValues();
    this.fetchPositions();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchElementValues(): void {
    if (this.elementnumber !== null && this.nomprotocole !== null) {
      let apiUrl = `http://localhost:8080/api/element-values?elementnumber=${this.elementnumber}&nomprotocole=${this.nomprotocole}`;

      if ([55, 48, 61, 62, 127].includes(this.elementnumber)) {
        apiUrl = `http://localhost:8080/api/element-values/tags?elementnumber=${this.elementnumber}&code=${this.nomprotocole === 'HSID' ? 'H_1200' : 'M_1200'}`;
      }

      this.http.get<any[]>(apiUrl).subscribe({
        next: data => {
          this.dataSource.data = this.groupElementValues(data);
          this.sortElementValues(this.dataSource.data);
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
    const elementnumber = this.elementnumber ?? 0;
    elementValue.elementNumber = elementnumber;
    elementValue.nomprotocole = this.nomprotocole;

    if ([48, 55, 61, 62, 127].includes(elementnumber)) {
      this.http.post(`http://localhost:8080/api/tags`, elementValue)
        .subscribe({
          next: response => {
            console.log('Element Value added:', response);
            this.fetchElementValues();
          },
          error: err => {
            console.error('Error adding element value:', err);
          }
        });
    } else {
      const position = elementValue.position ? elementValue.position : '';
      const description_p = elementValue.description_p ? elementValue.description_p : '';

      this.http.post(`http://localhost:8080/api/element-values?elementnumber=${elementnumber}&position=${position}&description_p=${description_p}`, elementValue)
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

  openEditElementValueDialog(element: any): void {
    const dialogRef = this.dialog.open(EditElementValueDialogComponent, {
      width: '400px',
      data: { ...element }
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

  private groupElementValues(data: any[]): any[] {
    const groupedData: any[] = [];
    let lastPosition = '';
    let lastDescriptionP = '';

    data.forEach(item => {
      const group = {
        ...item,
        showPosition: item.position !== lastPosition,
        showDescriptionP: item.description_p !== lastDescriptionP
      };

      if (group.showPosition) {
        lastPosition = item.position;
      }

      if (group.showDescriptionP) {
        lastDescriptionP = item.description_p;
      }

      groupedData.push(group);
    });

    return groupedData;
  }

  private sortElementValues(elementValues: any[]): void {
    elementValues.sort((a, b) => {
      if (a.elementnumber === 24 || a.elementnumber === 25) {
        if (a.elementnumber === b.elementnumber) {
          return a.code.localeCompare(b.code);
        }
        return a.elementnumber - b.elementnumber;
      } else if (![39, 24, 25, 48, 55, 61, 62, 127].includes(a.elementnumber)) {
        if (a.position && b.position) {
          const posA = a.position.split('--').map(Number);
          const posB = b.position.split('--').map(Number);

          for (let i = 0; i < Math.max(posA.length, posB.length); i++) {
            if (posA[i] !== posB[i]) {
              return (posA[i] || 0) - (posB[i] || 0);
            }
          }
        } else if (!a.position && b.position) {
          return 1;
        } else if (a.position && !b.position) {
          return -1;
        }
      }

      return 0;
    });
  }
}
