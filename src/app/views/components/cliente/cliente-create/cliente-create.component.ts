import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.scss']
})
export class ClienteCreateComponent implements OnInit {

  cliente:Cliente = new Cliente();
  
  constructor(private service:ClienteService, private router:Router) { }

  ngOnInit(): void {
  
  }


  retornaLista():void{
    this.router.navigate(['/clientes'])
  }

  salvarCliente():void{
  this.service.postCliente(this.cliente).subscribe(()=>{
    
    this.retornaLista();
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: this.cliente.nome+ ' Criado com Sucesso!'
    })
  }, err =>{
    console.log(err);
    if(err.error.message=='CPF JÁ EXISTE NA BASE DE DADOS!'){
   
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Cliente não pode ser Cadastrado!',
      footer: err.error.message
      
    })

  }else if(err.error.cpf== 'CPF inválido!'){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Cliente não pode ser Cadastrado!',
      footer: err.error.cpf
  
 })
  }
} 
  )
}
}
