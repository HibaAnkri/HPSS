import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  public dataSource = new MatTableDataSource<Element>();
  public displayedColumns: string[] = ['position', 'description_p', 'code', 'description_c', 'elementnumber', 'in_message'];
  public elementnumber: number | null = null;
  public code: string | null = null;
  public position: string | null = null;

  public elementNumbers: number[] = [3, 22, 24, 25, 39, 53, 54, 56, 60];
  public codes: string[] = ['1100', '1110', '1120', '1121', '1130', '1200', '1210', '1220', '1221', '1230', '1420', '1421', '1430', '1422', '1423', '1432', '1520', '1521', '1522', '1523', '1530', '1532', '1304', '1314', '1324', '1334', '1604', '1614', '1720', '1722', '1730', '1732', '1804', '1814'];
  public positions: string[] = [];

  private excludedElementsForCode: { [key: string]: number[] } = {
    // Votre logique pour exclure des éléments spécifiques
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.http.get<Element[]>('http://localhost:8080/api/element-values').subscribe({
      next: data => {
        this.dataSource.data = this.groupElementValues(this.applyExclusions(data));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
      params = params.set('code', `H_${this.code}`);
    }
    if (this.position) {
      params = params.set('position', this.position);
    }

    // Vérifier si au moins un paramètre est fourni
    if (!params.keys().length) {
      console.error('At least one filter must be provided');
      return;
    }

    this.http.get<Element[]>(`http://localhost:8080/api/element-values`, { params }).subscribe({
      next: data => {
        this.dataSource.data = this.groupElementValues(this.applyExclusions(data));
        this.dataSource.paginator = this.paginator;
        this.updateDisplayedColumns(this.dataSource.data);
      },
      error: err => {
        console.error('Error fetching filtered element values:', err);
      }
    });
  }

  applyExclusions(data: Element[]): Element[] {
    const codeWithPrefix = `H_${this.code ?? ''}`;  // Coalescence null pour éviter les erreurs
    if (this.excludedElementsForCode[codeWithPrefix]) {
      return data.filter(item => !this.excludedElementsForCode[codeWithPrefix].includes(item.elementnumber));
    }
    return data;
  }

  groupElementValues(data: Element[]): Element[] {
    const groupedData: Element[] = [];
    let lastPosition = '';
    let lastDescriptionP = '';

    data.forEach(item => {
      const group = {
        ...item,
        showPosition: item.position !== lastPosition,
        showDescriptionP: item.description_p !== lastDescriptionP
      };

      if (group.showPosition) {
        lastPosition = item.position ?? '';  // Assurez-vous que lastPosition est toujours une chaîne
      }

      if (group.showDescriptionP) {
        lastDescriptionP = item.description_p ?? '';  // Assurez-vous que lastDescriptionP est toujours une chaîne
      }

      groupedData.push(group);
    });

    return groupedData;
  }

  updateDisplayedColumns(data: Element[]): void {
    const columns = ['position', 'description_p', 'code', 'description_c', 'elementnumber', 'in_message'];
    this.displayedColumns = columns.filter(column => data.some(element => element[column as keyof Element] !== null && element[column as keyof Element] !== ''));
  }

  onElementNumberChange() {
    if (this.elementnumber !== null) {
      this.http.get<string[]>(`http://localhost:8080/api/positions`, { params: new HttpParams().set('elementnumber', this.elementnumber.toString()) })
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
      const codeWithPrefix = `H_${this.code}`;
      this.elementNumbers = [3, 22, 24, 25, 39, 53, 54, 56, 60].filter(
        num => !this.excludedElementsForCode[codeWithPrefix]?.includes(num)
      );
    } else {
      this.elementNumbers = [3, 22, 24, 25, 39, 53, 54, 56, 60];
    }
    // Réinitialiser les options de position lorsque le code change
    this.positions = [];
    this.elementnumber = null;
  }

  refreshPage() {
    this.code = null;  // Réinitialiser avec null
    this.elementnumber = null;
    this.position = null;  // Réinitialiser avec null
    this.positions = [];
    this.fetchData();
  }
}
