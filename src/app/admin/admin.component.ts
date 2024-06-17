import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { discoModel, usuarioModel } from './model/model';
import { DiscoService } from './service/admin.service';
import { UsuarioService } from './service/admin.usuarioService';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{

  key?: string;

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

  editFormDisco = new FormGroup({
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

  formUsuario = new FormGroup({
    nome: new FormControl('', 
      [Validators.required]
    ),
    senha: new FormControl('', 
      [Validators.required]
    ),
    email: new FormControl('', 
      [Validators.required]
    ),
    sexo: new FormControl('', 
      [Validators.required]
    ),
    dataNascimento: new FormControl('', 
      [Validators.required]
    ),
    cpf: new FormControl('', 
      [Validators.required]
    ),
  })

  constructor(private discoService: DiscoService,
    private router: ActivatedRoute, private usuarioService: UsuarioService
  ) { }

  salvarDisco(): void{
    if(this.formDisco.invalid){
      alert("Formulário inválido!");
      this.formDisco.markAllAsTouched();
      return
    }

    var disco = new discoModel();
    if(this.formDisco.controls.preco.value != null){
      disco.preco = parseFloat(this.formDisco.controls.preco.value);
    }
    disco.titulo = this.formDisco.controls.titulo.value?.toString();
    disco.artista = this.formDisco.controls.artista.value?.toString();
    disco.capa = this.formDisco.controls.capa.value?.toString();
    disco.musicas= this.formDisco.controls.musicas.value?.toString();

    
    
    this.discoService.salvarDisco(disco).then(result => {
      console.log("tentou salvar");
      alert("Cadastrado com sucesso!")
      // result.ref.getDownloadURL().then(url => {
        // this.formDisco.controls.capa.patchValue(url);
      // })      
    });

    }

    alterarDisco(): void{
      if(this.formDisco.invalid){
        alert("Formulário inválido!");
        this.formDisco.markAllAsTouched();
        return
      }
  
      var disco = new discoModel();
      if(this.formDisco.controls.preco.value != null){
        disco.preco = parseFloat(this.formDisco.controls.preco.value);
      }
      disco.titulo = this.formDisco.controls.titulo.value?.toString();
      disco.artista = this.formDisco.controls.artista.value?.toString();
      disco.capa = this.formDisco.controls.capa.value?.toString();
      disco.musicas= this.formDisco.controls.musicas.value?.toString();
      
      this.discoService.salvarDisco(disco).then(result => {
        console.log("tentou salvar");
        alert("Cadastrado com sucesso!")
        // result.ref.getDownloadURL().then(url => {
          // this.formDisco.controls.capa.patchValue(url);
        // })      
      });
  
      }

    excluirDisco(key: any): void{
      this.discoService.excluirDisco(key).then(result =>{
        alert("Excluido!")
      })
    }

    editarDisco(value: any): void {
      this.discoService.editarDisco(value.key, value.titulo , value.artista , value.capa , value.musicas , value.preco).then(result =>{
        alert("Editado!")
      })
    }

    salvarUsuario(): void {
      if(this.formUsuario.invalid){
        alert("Formulário inválido!");
        this.formUsuario.markAllAsTouched();
        return
      }



      var usuario = new usuarioModel;

      usuario.nome = this.formUsuario.controls.nome.value?.toString();
      usuario.email = this.formUsuario.controls.email.value?.toString();
      usuario.cpf = this.formUsuario.controls.cpf.value?.toString();
      usuario.sexo = this.formUsuario.controls.sexo.value?.toString();
      usuario.senha = this.formUsuario.controls.senha.value?.toString();

      this.usuarioService.salvarUsuario(usuario).then(result => {
        alert("Cadastrado com sucesso!")
      });
    }

    excluirUsuario(key: any): void{
      this.usuarioService.excluirUsuario(key).then(result =>{
        alert("Excluido!")
      })
    }

    public discos: any;
    public usuarios: any;

    ngOnInit(): void {
      this.discoService.listarDisco().subscribe(discos => {
        this.discos = discos;
      });

      this.usuarioService.listarUsuario().subscribe(usuarios => {
        console.log(usuarios)
        this.usuarios = usuarios;
      })
    }
}
