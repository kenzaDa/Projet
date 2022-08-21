import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private http: HttpClient) {}

exportfile():Observable <any>
  { 

      return this.http.get<any>('http://127.0.0.1:8000/api/cooptation/export', { responseType: 'blob' as 'json',    })
  }
}
