import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-disco',
  templateUrl: './disco.component.html',
  styleUrl: './disco.component.css'
})
export class DiscoComponent {
  titulo: FormControl = new FormControl('', 
    [Validators.required]
  );
  artista: FormControl = new FormControl('', 
    [Validators.required]
  );
  capa: FormControl = new FormControl('', 
    [Validators.required]
  );
  musicas: FormControl = new FormControl('', 
    [Validators.required]
  );
  preco: FormControl = new FormControl('', 
    [Validators.required, Validators.min(1.1)]
  );


  
}
