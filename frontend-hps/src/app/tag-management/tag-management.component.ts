import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tag-management',
  templateUrl: './tag-management.component.html',
  styleUrls: ['./tag-management.component.css']
})
export class TagManagementComponent {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['tag', 'nom', 'longueur', 'format', 'description'];

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<TagManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.fetchTags();
  }

  fetchTags(): void {
    const url = `http://localhost:8080/api/element-values/tags?elementnumber=${this.data.elementnumber}&code=${this.data.nomprotocole}`;
    this.http.get<any[]>(url).subscribe({
      next: (response) => {
        this.dataSource.data = response;
      },
      error: (err) => {
        console.error('Error fetching tags:', err);
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
