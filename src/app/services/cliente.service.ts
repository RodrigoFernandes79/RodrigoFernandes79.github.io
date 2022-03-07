import { BasePortalOutlet } from '@angular/cdk/portal';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  private clienteUrl:string= 'https://ordem-servico-spring-boot.herokuapp.com/clientes';

constructor(private http:HttpClient) { }

getCliente():Observable<Cliente[]>{
  return this.http.get<Cliente[]>(this.clienteUrl);
  }

postCliente(cliente:Cliente):Observable<Cliente>{
  return  this.http.post<Cliente>(this.clienteUrl, cliente);
  
}

getClienteById(id:number):Observable<Cliente>{
  return this.http.get<Cliente>(`${this.clienteUrl}/${id}`);
}

deleteClienteById( id:number):Observable<Cliente>{

  return this.http.delete<Cliente>(`${this.clienteUrl}/${id}`);
}

updateClienteByID(cliente:Cliente, id:number):Observable<Cliente>{

  return this.http.put<Cliente>(`${this.clienteUrl}/${id}`,cliente);
}
}
