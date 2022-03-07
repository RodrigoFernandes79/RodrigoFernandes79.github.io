import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OS } from 'src/app/models/os';
import { OsService } from 'src/app/services/os.service';

@Component({
  selector: 'app-os-closed',
  templateUrl: './os-closed.component.html',
  styleUrls: ['./os-closed.component.scss']
})
export class OsClosedComponent implements AfterViewInit {

  OrdemServico:OS[]=[];
  

  displayedColumns: string[] = ['tecnico','cliente','abertura', 'fechamento','prioridade','status','action'];
  dataSource = new MatTableDataSource<OS>(this.OrdemServico);
  
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service:OsService, private router:Router, ){}

  
id:number;

  ngAfterViewInit() {
    
    this.listarOrdemServico();
    
  }
  ngOnInit(): void {
    

   
    
    
  }

  listarOrdemServico():void{
      this.service.getOS().subscribe(resposta =>{
        resposta.forEach(x =>{
          if(x.status == 'ENCERRADO'){
            this.OrdemServico.push(x);
          }
        })
      
      this.dataSource = new MatTableDataSource<OS>(this.OrdemServico);
      this.dataSource.paginator = this.paginator;
    })
     
    
    }
    
 
  prioridade(x:any){
    if(x=='BAIXA')
      return 'baixa';
    else if(x=='MEDIA')
      return 'media';
    else
      return 'alta';
    
  }

}

  