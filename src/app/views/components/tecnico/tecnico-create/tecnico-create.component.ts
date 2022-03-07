import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.scss']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico:Tecnico = new Tecnico();
  
  constructor(private service:TecnicoService, private router:Router) { }

  ngOnInit(): void {
  
  }


  retornaLista():void{
    this.router.navigate(['/tecnicos'])
  }

  criarTecnico():void{
  this.service.postTecnico(this.tecnico).subscribe(()=>{
    
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
      title: this.tecnico.nome+ ' Criado com Sucesso!'
    })
  }, err =>{
    console.log(err);
    if(err.error.message=='CPF Já EXISTE!'){
   
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Técnico não pode ser Cadastrado!',
      footer: err.error.message
      
    })

  }else if(err.error.cpf== 'CPF inválido!'){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Técnico não pode ser Cadastrado!',
      footer: err.error.cpf
  
 })
  }
} 
  )
}
}

  

