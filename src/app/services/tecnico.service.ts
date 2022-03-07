import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tecnico } from '../models/tecnico';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  private tecnicoUrl:string='https://ordem-servico-spring-boot.herokuapp.com/tecnicos';

  constructor(private http:HttpClient) { }

  getTecnico():Observable<Tecnico[]>{
    return this.http.get<Tecnico[]>(this.tecnicoUrl);
    
  }

  postTecnico(tecnico:Tecnico):Observable<Tecnico>{

    return this.http.post<Tecnico>(this.tecnicoUrl,tecnico);
  }

  getTecnicoById(id:number):Observable<Tecnico>{

return this.http.get<Tecnico>(`${this.tecnicoUrl}/${id}`);
  }

  updateTecnicoByID(tecnico:Tecnico , id:number):Observable<Tecnico>{
    return this.http.put<Tecnico>(`${this.tecnicoUrl}/${id}`,tecnico);
  }

  deleteTecnicoById(id:number):Observable<Tecnico>{
    return this.http.delete<Tecnico>(`${this.tecnicoUrl}/${id}`);
  }
}
