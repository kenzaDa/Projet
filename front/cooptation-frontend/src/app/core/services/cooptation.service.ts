import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Cooptations } from 'src/app/cooptations';

@Injectable({
  providedIn: 'root'
})
export class CooptationService {

  constructor(private http: HttpClient) { }

  getCooptation():Observable<Cooptations[]>
  {
    return this.http.get<Cooptations[]>('http://localhost:8000/api/cooptation/user');
  }
  deleteCooptations(id:number)
  {
    return this.http.delete('http://localhost:8000/api/cooptation/'+id);
  }

    getUserName():Observable<any>
  {
    return this.http.get<any>('http://localhost:8000/api/userName/');
  }

  getCooptationByManager(){
    return this.http.get<Cooptations[]>('http://127.0.0.1:8000/api/roles/manager');
  }

  postCooptation(formData:FormData,form1:FormGroup,form2:FormGroup,form3:FormGroup, status: "save" | "submit"){

  }

  getCooptationById(id: number){
    return this.http.get<Cooptations[]>(`http://localhost:8000/api/cooptation/${id}`);
  }
}


