import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {HttpClient, HttpParams} from "@angular/common/http";
interface Element {
  id: number;
  elementnumber: number;
  position: string | null;
  description_p: string | null;
  code: string | null;
  description_c: string | null;
  in_message: string | null;
  nomprotocole: string | null;
}
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {
  public dataSource = new MatTableDataSource<Element>();
  public displayedColumns: string[] = ['elementnumber', 'position', 'description_p', 'code', 'description_c', 'in_message'];
  public elementnumber: number | null = null;
  public code: string = '';
  public position: string = '';

  public elementNumbers: number[] = [3, 22, 24, 25, 39, 53, 54, 56,48, 60];
  public codes: string[] = [ '1200', '1210', '1220','1420','1421','1422','1423','1430','1432','1804','1814'];
  public positions: string[] = [];

  private excludedElementsForCode: { [key: string]: number[] } = {

    'M_1200': [3,56, 39, 54, 56],
    'M_1210': [56, 53, 56],
    'M_1220': [ 25,53,54],
    'M_1420': [ 25,53,54],
    'M_1421': [ 25,53,54],
    'M_1422': [ 25,53,54],
    'M_1423': [48,54],
    'M_1430': [22,24,25,48,54,56],
    'M_1432':[22,24,25,48,54,56],
    'M_1804': [3,22,39,53,56],
    'M_1814': [3,22,48,53,54,56],




  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.http.get<Element[]>('http://localhost:8080/api/element-values').subscribe({
      next: data => {
        this.dataSource.data = this.applyExclusions(data);
        this.dataSource.paginator = this.paginator;  // Bind paginator to data source
        this.dataSource.sort = this.sort;  // Bind sort to data source
      },
      error: err => {
        console.error('Error fetching element values:', err);
      }
    });
  }

  filterData() {
    let params = new HttpParams();
    if (this.elementnumber !== null) {
      params = params.set('elementnumber', this.elementnumber.toString());
    }
    if (this.code) {
      params = params.set('code', `M_${this.code}`);
    }
    if (this.position) {
      params = params.set('position', this.position);
    }

    // Check if at least one parameter is provided
    if (!params.keys().length) {
      console.error('At least one filter must be provided');
      return;
    }

    this.http.get<Element[]>(`http://localhost:8080/api/element-values`, {params}).subscribe({
      next: data => {
        this.dataSource.data = this.applyExclusions(data);
        this.dataSource.paginator = this.paginator;  // Bind paginator to data source
        this.updateDisplayedColumns(this.dataSource.data);
      },
      error: err => {
        console.error('Error fetching filtered element values:', err);
      }
    });
  }

  applyExclusions(data: Element[]): Element[] {
    const codeWithPrefix = `M_${this.code}`;
    if (this.excludedElementsForCode[codeWithPrefix]) {
      return data.filter(item => !this.excludedElementsForCode[codeWithPrefix].includes(item.elementnumber));
    }
    return data;
  }

  updateDisplayedColumns(data: Element[]): void {
    const columns = ['elementnumber', 'position', 'description_p', 'code', 'description_c', 'in_message'];
    this.displayedColumns = columns.filter(column => data.some(element => element[column as keyof Element] !== null && element[column as keyof Element] !== ''));
  }

  removePrefix(code: string | null): string {
    return code ? code.replace(/^M_/, '') : '';
  }

  onElementNumberChange() {
    if (this.elementnumber !== null) {
      this.http.get<string[]>(`http://localhost:8080/api/positions`, {params: new HttpParams().set('elementnumber', this.elementnumber.toString())})
        .subscribe({
          next: positions => {
            this.positions = positions;
          },
          error: err => {
            console.error('Error fetching positions:', err);
            this.positions = [];
          }
        });
    } else {
      this.positions = [];
    }
  }

  onCodeChange() {
    if (this.code) {
      const codeWithPrefix = `M_${this.code}`;
      this.elementNumbers = [3, 22, 24, 25, 39, 53, 54, 56, 60].filter(
        num => !this.excludedElementsForCode[codeWithPrefix]?.includes(num)
      );
    } else {
      this.elementNumbers = [3, 22, 24, 25, 39, 53, 54, 56, 60];
    }
    // Reset the position options when the code changes
    this.positions = [];
    this.elementnumber = null;
  }

  refreshPage() {
    this.code = '';
    this.elementnumber = null;
    this.position = '';
    this.positions = [];
    this.fetchData();
  }
}
