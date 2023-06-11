import { Component } from '@angular/core';
import { Person } from 'src/app/models/person.model';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css'],
})
export class AddPersonComponent {
  person: Person = {
    nome: '',
    rg: '',
    cpf: ''
  };
  submitted = false;

  constructor(private personService: PersonService) {}

  savePerson(): void {
    const data = {
      nome: this.person.nome,
      rg: this.person.rg
    };

    this.personService.create(data).subscribe({
      next: (res:any) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e:any) => console.error(e)
    });
  }

  newPerson(): void {
    this.submitted = false;
    this.person = {
      nome: '',
      rg: '',
      cpf: ''
    };
  }
}
