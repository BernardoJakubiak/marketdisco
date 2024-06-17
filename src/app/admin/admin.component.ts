import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DiscoService } from './service/admin.service';
import { UsuarioService } from './service/admin.usuarioService';
import { discoModel, usuarioModel } from './model/model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  formDisco: FormGroup;
  formUsuario: FormGroup;
  discos: any[] = [];
  usuarios: any[] = [];
  showModalDiscoEdit = false; // Variável para controlar a exibição do modal

  constructor(
    private fb: FormBuilder,
    private discoService: DiscoService,
    private usuarioService: UsuarioService
  ) {
    this.formDisco = this.fb.group({
      key: [''],
      titulo: ['', Validators.required],
      artista: ['', Validators.required],
      capa: ['', Validators.required],
      musicas: ['', Validators.required],
      preco: ['', [Validators.required, Validators.min(1.1)]]
    });

    this.formUsuario = this.fb.group({
      nome: ['', Validators.required],
      senha: ['', Validators.required],
      email: ['', Validators.required],
      sexo: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      cpf: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.listarDiscos();
    this.listarUsuarios();
  }

  listarDiscos(): void {
    this.discoService.listarDisco().subscribe(
      discos => {
        this.discos = discos;
      },
      error => {
        console.error('Erro ao listar discos:', error);
      }
    );
  }

  listarUsuarios(): void {
    this.usuarioService.listarUsuario().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

  editarDisco(disco: any): void {
    this.formDisco.patchValue({
      key: disco.key,
      titulo: disco.titulo,
      artista: disco.artista,
      capa: disco.capa,
      musicas: disco.musicas,
      preco: disco.preco
    });

    this.showModalDiscoEdit = true; // Mostra o modal de edição
  }

  fecharModalDiscoEdit(): void {
    this.showModalDiscoEdit = false; // Fecha o modal de edição
  }

  salvarDisco(): void {
    if (this.formDisco.invalid) {
      alert("Formulário de disco inválido!");
      this.formDisco.markAllAsTouched();
      return;
    }

    const disco = this.formDisco.value;

    if (disco.key) {
      // Update existing disco
      this.discoService.editarDisco(disco.key, disco.titulo, disco.artista, disco.capa, disco.musicas, disco.preco)
        .then(() => {
          alert("Disco atualizado com sucesso!");
          this.listarDiscos(); // Refresh discos list
        })
        .catch(error => {
          console.error("Erro ao atualizar disco:", error);
          alert("Erro ao atualizar disco!");
        });
    } else {
      // Save new disco
      this.discoService.salvarDisco(disco)
        .then(() => {
          alert("Disco cadastrado com sucesso!");
          this.listarDiscos(); // Refresh discos list
        })
        .catch(error => {
          console.error("Erro ao salvar disco:", error);
          alert("Erro ao salvar disco!");
        });
    }
  }

  excluirDisco(key: string): void {
    this.discoService.excluirDisco(key).then(result => {
      alert("Disco excluído!");
      this.listarDiscos(); // Atualiza a lista de discos após excluir
    }).catch(error => {
      console.error("Erro ao excluir disco:", error);
      alert("Erro ao excluir disco!");
    });
  }

  salvarUsuario(): void {
    if (this.formUsuario.invalid) {
      alert("Formulário de usuário inválido!");
      this.formUsuario.markAllAsTouched();
      return;
    }

    const usuario = this.formUsuario.value as usuarioModel;

    this.usuarioService.salvarUsuario(usuario).then(result => {
      alert("Usuário cadastrado com sucesso!");
      this.listarUsuarios(); // Atualiza a lista de usuários após salvar
    }).catch(error => {
      console.error("Erro ao salvar usuário:", error);
      alert("Erro ao salvar usuário!");
    });
  }

  excluirUsuario(key: string): void {
    this.usuarioService.excluirUsuario(key).then(result => {
      alert("Usuário excluído!");
      this.listarUsuarios(); // Atualiza a lista de usuários após excluir
    }).catch(error => {
      console.error("Erro ao excluir usuário:", error);
      alert("Erro ao excluir usuário!");
    });
  }

}
