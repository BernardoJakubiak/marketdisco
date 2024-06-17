import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { discoModel } from './model/model';
import { DiscoService } from './service/admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  formDisco = new FormGroup({
    titulo: new FormControl('', 
      [Validators.required]
    ),
    artista: new FormControl('', 
      [Validators.required]
    ),
    capa: new FormControl('', 
      [Validators.required]
    ),
    musicas: new FormControl('', 
      [Validators.required]
    ),
    preco: new FormControl('', 
      [Validators.required, Validators.min(1.1)]
    )
    
  })

  constructor(private discoService: DiscoService,
    private router: ActivatedRoute
  ) { }

  salvarDisco(): void{
    if(this.formDisco.invalid){
      alert("Formulário inválido!");
      this.formDisco.markAllAsTouched();
      return
    }

    var disco = new discoModel();
    if(this.formDisco.controls.preco.value != null){
      disco.preco = parseInt(this.formDisco.controls.preco.value);
    }
    disco.titulo = this.formDisco.controls.titulo.value?.toString();
    disco.artista = this.formDisco.controls.artista.value?.toString();
    disco.capa = this.formDisco.controls.capa.value?.toString();
    disco.musicas= this.formDisco.controls.musicas.value?.toString();
    console.log(disco.titulo);
    console.log(disco.artista);
    console.log(disco.capa);
    console.log(disco.musicas);
    console.log(disco.preco);
    

    this.discoService.salvarDisco(disco).then(result => {
      console.log("tentou salvar");
      alert("Cadastrado com sucesso!")
      // result.ref.getDownloadURL().then(url => {
        // this.formDisco.controls.capa.patchValue(url);
      // })      
    });

    }

    listarDisco(): void{

    }

    public discos: any;

    ngOnInit(): void {
      this.discoService.listarDisco().subscribe(discos => {
        console.log(discos)
        this.discos = discos;
      });
    }
}
