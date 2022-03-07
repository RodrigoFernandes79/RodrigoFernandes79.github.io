import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-read',
  templateUrl: './cliente-read.component.html',
  styleUrls: ['./cliente-read.component.scss']
})
export class ClienteReadComponent implements AfterViewInit {

  clientes:Cliente[]=[];
  cliente:Cliente =new Cliente();
  

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'telefone','action'];
  dataSource = new MatTableDataSource<Cliente>(this.clientes);
  
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service:ClienteService, private router:Router, ){}

  
id:number;

  ngAfterViewInit() {
    
    this.listarClientes();
    
  }
  ngOnInit(): void {
    

   
    
    
  }

  listarClientes():void{
      this.service.getCliente().subscribe(resposta=>{
      this.clientes =resposta;
      this.dataSource = new MatTableDataSource<Cliente>(this.clientes);
      this.dataSource.paginator = this.paginator;
    })
     
    
    }

    criarCliente():void{
      this.router.navigate(['clientes/create'])
    }
    apagarCliente(cliente:Cliente):void{
      this.cliente = cliente;
      this.service.getClienteById(this.cliente.id).subscribe((resposta)=>{
        this.cliente = resposta;
        Swal.fire({
         title: 'Você tem certeza que quer apagar o Cliente '+  this.cliente.nome +' ?',
         text: "Você não poderá mais reverter isso!",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Sim, quero apagar!'
       }).then((result) => {
         if (result.isConfirmed) {
           this.service.deleteClienteById(this.cliente.id)
   .subscribe(() =>{
           Swal.fire(
            'Apagado!',
             'Cliente ' + this.cliente.nome + ' foi deletado.',
             'success'
             
             
            )
            this.listarClientes();
   
           },     
           err=> err.error(Swal.fire({
             icon: 'error',
             title: 'Oops...',
             text: 'Cliente não Deletado! Possui Ordens de Serviço associados.',
           
           })))
     }
     
       
      
       this.listarClientes();
     })
    
     
       
    } )
     }
    
 
 
 
   }
 


