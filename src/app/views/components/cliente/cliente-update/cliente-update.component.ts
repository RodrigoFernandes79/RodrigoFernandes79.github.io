import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.scss']
})
export class ClienteUpdateComponent implements OnInit {

  constructor(private router:Router, private service:ClienteService , private route:ActivatedRoute) { }
 
  id:number;
  cliente:Cliente =new Cliente();

  ngOnInit(): void {
    this.cliente;
    this.id =this.route.snapshot.params['id'];
    this.encontrarClientePorId();
    
  }

  retornaLista():void{
    this.router.navigate(['/clientes'])
  }

  encontrarClientePorId():void{
    this.service.getClienteById(this.id).subscribe(resposta=>
    this.cliente= resposta);
    
  }


  alterarClientePorId():void{
this.service.updateClienteByID(this.cliente, this.id).subscribe((resposta)=>{
  this.cliente =resposta;
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
    title: this.cliente.nome+ ' Atualizado com Sucesso!'
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

