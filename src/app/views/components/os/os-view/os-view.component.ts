import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OS } from 'src/app/models/os';
import { OsService } from 'src/app/services/os.service';

@Component({
  selector: 'app-os-view',
  templateUrl: './os-view.component.html',
  styleUrls: ['./os-view.component.scss']
})
export class OsViewComponent implements OnInit {

  os:OS ={
    tecnico:'',
    cliente:'',
    status:'',
    prioridade:'',
    observacoes:''
  };
  constructor(private osService:OsService, private route:ActivatedRoute, private router:Router){ }

  ngOnInit(): void {
    this.os.id =this.route.snapshot.params['id'];
    this.findById();
  }


  findById():void{
    this.osService.getOSById(this.os.id).subscribe(resposta=>{
      this.os =resposta;
    })
  }

  retornaLista(){
    this.router.navigate(['os']);
  }
}
