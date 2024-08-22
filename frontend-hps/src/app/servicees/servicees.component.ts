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
  service: string | null;
  servicecode: string | null;
  showElementNumber?: boolean;
  showPosition?: boolean;
  showDescriptionP?: boolean;
  selectedCodeDescription?: string;
  codeDescriptionOptions?: string[];
}

@Component({
  selector: 'app-servicees',
  templateUrl: './servicees.component.html',
  styleUrls: ['./servicees.component.css']
})
export class ServiceesComponent implements OnInit {
  public dataSource = new MatTableDataSource<Element>();
  public displayedColumns: string[] = ['elementnumber', 'position', 'description_p', 'code_description_c'];
  public nomprotocole: string = '';
  public service: string = '';
  public servicecode: string = '';

  public protocoles: string[] = ['HSID', 'MSID'];
  public services: string[] = [];
  public servicecodes: string[] = [];

  private serviceCodeMap: { [key: string]: string[] } = {
    'HSID': ['Purchase', 'Withdrawal', 'Refund', 'Casino purchase', 'Fees', 'Transferts'],
    'MSID': ['Purchase', 'Withdrawal']
  };

  private serviceCodeMapDetailed: { [key: string]: { [key: string]: string[] } } = {
    'HSID': {
      'Purchase': ['1200', '1100'],
      'Withdrawal': ['1200', '1100'],
      'Refund': ['1100'],
      'Casino purchase': ['1100'],
      'Fees': ['1100'],
      'Transferts': ['1100']
    },
    'MSID': {
      'Purchase': ['1200'],
      'Withdrawal': ['1200']
    }
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
        this.dataSource.data = this.groupElementValues(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: err => {
        console.error('Error fetching element values:', err);
      }
    });
  }

  groupElementValues(data: Element[]): Element[] {
    const groupedData: Element[] = [];
    let lastElementNumber = '';
    let lastPosition = '';
    let lastDescriptionP = '';
    let lastGroup: Element | null = null;

    data.forEach(item => {
      const elementnumberStr = item.elementnumber.toString();
      const positionStr = item.position ?? '';
      const descriptionPStr = item.description_p ?? '';
      const codeDescriptionStr = `${item.code ?? ''} - ${item.description_c ?? ''}`;

      if (groupedData.length > 0 && lastElementNumber === elementnumberStr && lastPosition === positionStr && lastDescriptionP === descriptionPStr) {
        if (lastGroup && lastGroup.codeDescriptionOptions) {
          lastGroup.codeDescriptionOptions.push(codeDescriptionStr);
        }
      } else {
        const group: Element = {
          ...item,
          showElementNumber: elementnumberStr !== lastElementNumber,
          showPosition: positionStr !== lastPosition,
          showDescriptionP: descriptionPStr !== lastDescriptionP,
          selectedCodeDescription: '',  // Initialize as empty string
          codeDescriptionOptions: [codeDescriptionStr]
        };

        lastElementNumber = elementnumberStr;
        lastPosition = positionStr;
        lastDescriptionP = descriptionPStr;
        lastGroup = group;
        groupedData.push(group);
      }
    });

    return groupedData;
  }

  filterData() {
    let params = new HttpParams();
    if (this.nomprotocole) {
      params = params.set('nomprotocole', this.nomprotocole);
    }
    if (this.service) {
      params = params.set('service', this.service);
    }
    if (this.servicecode) {
      params = params.set('servicecode', this.servicecode);
    }

    if (!params.keys().length) {
      console.error('At least one filter must be provided');
      return;
    }

    this.http.get<Element[]>(`http://localhost:8080/api/search`, { params }).subscribe({
      next: data => {
        this.dataSource.data = this.groupElementValues(data);
        this.dataSource.paginator = this.paginator;
        this.updateDisplayedColumns(this.dataSource.data);
      },
      error: err => {
        console.error('Error fetching filtered element values:', err);
      }
    });
  }

  updateDisplayedColumns(data: Element[]): void {
    const columns = ['elementnumber', 'position', 'description_p', 'code_description_c'];
    this.displayedColumns = columns.filter(column => data.some(element => element[column as keyof Element] !== null && element[column as keyof Element] !== ''));
  }

  refreshPage() {
    this.nomprotocole = '';
    this.service = '';
    this.servicecode = '';
    this.services = [];
    this.servicecodes = [];
    this.fetchData();
  }

  onNomprotocoleChange() {
    if (this.nomprotocole) {
      this.services = this.serviceCodeMap[this.nomprotocole] || [];
      this.service = '';
      this.servicecodes = [];
    } else {
      this.services = [];
      this.servicecodes = [];
    }
  }

  onServiceChange() {
    if (this.nomprotocole && this.service) {
      this.servicecodes = this.serviceCodeMapDetailed[this.nomprotocole][this.service] || [];
      if (!this.servicecodes.includes(this.servicecode)) {
        this.servicecode = '';
      }
    } else {
      this.servicecodes = [];
    }
  }

  onSelectionChange(element: Element, value: string) {
    element.selectedCodeDescription = value;
  }
}
