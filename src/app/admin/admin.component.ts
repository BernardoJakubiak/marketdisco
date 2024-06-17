import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DiscoService } from './service/admin.service';
import { UsuarioService } from './service/admin.usuarioService';
import { ArtistaService } from './service/admin.artistaService';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  isEditing: boolean = false;
  formDisco: FormGroup;
  formUsuario: FormGroup;
  formArtista: FormGroup;
  disco: any;
  discos: any[] = [];
  usuario: any;
  usuarios: any[] = [];
  artista: any;
  artistas: any[] = [];
  vendidos: any[] = [];
  showModalDiscoEdit = false;
  showModalUsuarioEdit = false;
  showModalArtistaEdit = false;

  constructor(
    private fb: FormBuilder,
    private discoService: DiscoService,
    private usuarioService: UsuarioService,
    private artistaService: ArtistaService
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

    this.formArtista = this.fb.group({
      nome: ['', Validators.required],
      albuns: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.listarDiscos();
    this.listarUsuarios();
    this.listarArtistas();
    this.listarVendidos();
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

  listarArtistas(): void {
    this.artistaService.listarArtista().subscribe(
    artistas => {
      this.artistas = artistas;
    });
  }

  listarVendidos(): void {
    this.discoService.listarVendidos().subscribe(
    vendidos => {
      this.vendidos = vendidos;
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

  editarArtista(key: any): void {
    this.artistaService.getArtistaByKey(key).subscribe(
      artista => {
        this.artista = artista;

        this.formArtista.patchValue({
          nome: this.artista.nome,
          albuns: this.artista.albuns
        });
        
        this.isEditing = true;
        this.showModalArtistaEdit = true; // Show the edit modal
      }
    )
  }

  fecharModalArtistaEdit(): void {
    this.showModalArtistaEdit = false; // Fecha o modal do usuario
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
    }).catch(error => {
      console.error("Erro ao excluir usuário:", error);
      alert("Erro ao excluir usuário!");
    });
  }

  salvarArtista(): void {
    if (this.formArtista.invalid) {
      alert("Formulário de usuário inválido!");
      this.formArtista.markAllAsTouched();
      return;
    }

    const artista = this.formArtista.value;

    if (this.isEditing && this.artista.key) {
      // Update existing artista
      this.artistaService.editarArtista(this.artista.key, artista.nome, artista.albuns)
        .then(() => {
          this.listarArtistas(); // Refresh artistas list
          this.cleanUp();
        })
        .catch(error => {
          console.error("Erro ao atualizar artista:", error);
          alert("Erro ao atualizar artista!");
        });
    } else {
      // Save new artista
      this.artistaService.salvarArtista(artista).then(result => {
        this.listarArtistas(); // Atualiza a lista de usuários após salvar
        this.cleanUp();
      }).catch(error => {
        console.error("Erro ao salvar usuário:", error);
        alert("Erro ao salvar usuário!");
      });
    }
  }

  excluirArtista(key: string): void {
    this.artistaService.excluirArtista(key).then(result => {
      this.listarArtistas(); // Atualiza a lista de usuários após excluir
    }).catch(error => {
      console.error("Erro ao excluir usuário:", error);
      alert("Erro ao excluir usuário!");
    });
  }

  cleanUp(): void {
    this.isEditing = false;
    this.disco = null;
    this.usuario = null;
    this.artista = null;
    this.showModalDiscoEdit = false;
    this.showModalUsuarioEdit = false;
    this.showModalArtistaEdit = false;
    this.formDisco.reset();
    this.formUsuario.reset();
    this.formArtista.reset();
  }
}
