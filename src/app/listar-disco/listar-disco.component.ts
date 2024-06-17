import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { discoModel } from '../admin/model/model';
import { DiscoComponent } from '../disco/disco.component'; 
import { DiscoService } from '../admin/service/admin.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-listar-disco',
  templateUrl: './listar-disco.component.html',
  styleUrl: './listar-disco.component.css'
})
export class ListarDiscoComponent implements OnInit {

  public discos: any;

  constructor(private discoService: DiscoService) { }

  ngOnInit(): void {
    this.discoService.listarDisco().subscribe(discos => {
      console.log(discos)
      this.discos = discos;
    });
  }

}

