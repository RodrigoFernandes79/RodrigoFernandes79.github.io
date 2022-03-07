import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tecnico-read',
  templateUrl: './tecnico-read.component.html',
  styleUrls: ['./tecnico-read.component.scss']
})
export class TecnicoReadComponent implements AfterViewInit {

  tecnicos:Tecnico[]=[];
  tecnico:Tecnico = new Tecnico();

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'telefone','action'];
  dataSource = new MatTableDataSource<Tecnico>(this.tecnicos);
  
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service:TecnicoService, private router:Router, ){}

  
id:number;

  ngAfterViewInit() {
    
    this.listarTecnicos();
    
  }
  ngOnInit(): void {
    

   
    
    
  }

  listarTecnicos():void{
      this.service.getTecnico().subscribe(resposta=>{
      this.tecnicos =resposta;
      this.dataSource = new MatTableDataSource<Tecnico>(this.tecnicos);
      this.dataSource.paginator = this.paginator;
    })
     
    
    }
    criaTecnico():void{
      this.router.navigate(['/tecnicos/create']);
  }
 
   apagarTecnico(tecnico:Tecnico):void{
     this.tecnico = tecnico;
     this.service.getTecnicoById(this.tecnico.id).subscribe((resposta)=>{
       this.tecnico = resposta;
       Swal.fire({
        title: 'Você tem certeza que quer apagar o Técnico '+  this.tecnico.nome +' ?',
        text: "Você não poderá mais reverter isso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, quero apagar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.deleteTecnicoById(this.tecnico.id)
  .subscribe(() =>{
          Swal.fire(
           'Apagado!',
            'Técnico' + this.tecnico.nome + ' foi deletado.',
            'success'
            
            
           )
           this.listarTecnicos();
  
          },     
          err=> err.error(Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Técnico não Deletado! Possui Ordens de Serviço associados.',
          
          })))
    }
    
      
     
      this.listarTecnicos();
    })
   
    
      
   } )
    }
   



  }
