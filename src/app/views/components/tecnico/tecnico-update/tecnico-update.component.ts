import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.scss']
})
export class TecnicoUpdateComponent implements OnInit {

  constructor(private router:Router, private service:TecnicoService , private route:ActivatedRoute) { }
 
  id:number;
  tecnico:Tecnico;
  
    


 

  ngOnInit(): void {
    this.tecnico;
    this.id =this.route.snapshot.params['id'];
    this.encontrarTecnicoPorId();
    
  }

  retornaLista():void{
    this.router.navigate(['/tecnicos'])
  }

  encontrarTecnicoPorId():void{
    this.service.getTecnicoById(this.id).subscribe(resposta=>
    this.tecnico= resposta);
    
  }


  alterarTecnicoPorId():void{
this.service.updateTecnicoByID(this.tecnico, this.id).subscribe((resposta)=>{
  this.tecnico =resposta;
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
    title: this.tecnico.nome+ ' Atualizado com Sucesso!'
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

