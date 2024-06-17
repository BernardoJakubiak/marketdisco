import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DiscoService } from './service/admin.service';
import { UsuarioService } from './service/admin.usuarioService';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  isEditing: boolean = false;
  formDisco: FormGroup;
  formUsuario: FormGroup;
  disco: any;
  discos: any[] = [];
  usuario: any;
  usuarios: any[] = [];
  showModalDiscoEdit = false; // Variável para controlar a exibição do modal
  showModalUsuarioEdit = false; // Variável para controlar a exibição do modal

  constructor(
    private fb: FormBuilder,
    private discoService: DiscoService,
    private usuarioService: UsuarioService
  ) {
    this.formDisco = this.fb.group({
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
      });
  }

  listarUsuarios(): void {
    this.usuarioService.listarUsuario().subscribe(
    usuarios => {
      this.usuarios = usuarios;
    });
  }

  editarDisco(key: any): void {
    this.discoService.getDiscoByKey(key).subscribe(
      disco => {
        this.disco = disco;
  
        // Update the form fields with disco data once it's available
        this.formDisco.patchValue({
          titulo: this.disco.titulo,
          artista: this.disco.artista,
          capa: this.disco.capa,
          musicas: this.disco.musicas,
          preco: this.disco.preco
        });
  
        this.isEditing = true;
        this.showModalDiscoEdit = true; // Show the edit modal
      }
    );
  }
  

  fecharModalDiscoEdit(): void {
    this.showModalDiscoEdit = false; // Fecha o modal de edição
  }

  editarUsuario(key: any): void {
    this.usuarioService.getUsuarioByKey(key).subscribe(
      usuario => {
        this.usuario = usuario;

        this.formUsuario.patchValue({
          nome: this.usuario.nome,
          senha: this.usuario.senha,
          email: this.usuario.email,
          sexo: this.usuario.sexo,
          cpf: this.usuario.cpf
        });
  
        this.isEditing = true;
        this.showModalUsuarioEdit = true; // Show the edit modal
      }
    )
  }

  fecharModalUsuarioEdit(): void {
    this.showModalUsuarioEdit = false; // Fecha o modal do usuario
  }

  salvarDisco(): void {
    if (this.formDisco.invalid) {
      alert("Formulário de disco inválido!");
      this.formDisco.markAllAsTouched();
      return;
    }

    const disco = this.formDisco.value;

    if (this.isEditing && this.disco.key) {
      // Update existing disco
      this.discoService.editarDisco(this.disco.key, disco.titulo, disco.artista, disco.capa, disco.musicas, disco.preco)
        .then(() => {
          this.listarDiscos(); // Refresh discos list
          alert("Disco atualizado com sucesso!");
          this.cleanUp();
        })
        .catch(error => {
          console.error("Erro ao atualizar disco:", error);
          alert("Erro ao atualizar disco!");
        });
    } else {
      // Save new disco
      this.discoService.salvarDisco(disco)
        .then(() => {
          this.listarDiscos(); // Refresh discos list
          alert("Disco cadastrado com sucesso!");
          this.cleanUp();
        })
        .catch(error => {
          console.error("Erro ao salvar disco:", error);
          alert("Erro ao salvar disco!");
        });
    }
  }

  excluirDisco(key: string): void {
    this.discoService.excluirDisco(key).then(result => {
      this.listarDiscos(); // Atualiza a lista de discos após excluir
      alert("Disco excluído!");
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

    const usuario = this.formUsuario.value;

    if (this.isEditing && this.usuario.key) {
      // Update existing usuario
      this.usuarioService.editarUsuario(this.usuario.key, usuario.nome, usuario.senha, usuario.email, usuario.sexo, usuario.cpf)
        .then(() => {
          this.listarUsuarios(); // Refresh usuarios list
          alert("Usuario atualizado com sucesso!");
          this.cleanUp();
        })
        .catch(error => {
          console.error("Erro ao atualizar usuario:", error);
          alert("Erro ao atualizar usuario!");
        });
    } else {
      // Save new usuario
      this.usuarioService.salvarUsuario(usuario).then(result => {
        this.listarUsuarios(); // Atualiza a lista de usuários após salvar
        alert("Usuário cadastrado com sucesso!");
        this.cleanUp();
      }).catch(error => {
        console.error("Erro ao salvar usuário:", error);
        alert("Erro ao salvar usuário!");
      });
    }
  }

  excluirUsuario(key: string): void {
    this.usuarioService.excluirUsuario(key).then(result => {
      this.listarUsuarios(); // Atualiza a lista de usuários após excluir
      alert("Usuário excluído!");
    }).catch(error => {
      console.error("Erro ao excluir usuário:", error);
      alert("Erro ao excluir usuário!");
    });
  }

  cleanUp(): void {
    this.isEditing = false;
    this.disco = null;
    this.usuario = null;
    this.showModalDiscoEdit = false;
    this.showModalUsuarioEdit = false;
    this.formDisco.reset();
    this.formUsuario.reset();
  }
}
