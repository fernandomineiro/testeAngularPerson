import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css'],
})
export class PersonListComponent {
  persons?: Person[];
  currentPerson: Person = {};
  currentIndex = -1;
  nome = '';

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.retrievePersons();
  }

  retrievePersons(): void {
    this.personService.getAll().subscribe({
      next: (data) => {
        this.persons = data;
    
      },
      error: (e) => console.error(e)
    });
  }

  refreshList(): void {
    this.retrievePersons();
    this.currentPerson = {};
    this.currentIndex = -1;
  }

  setActivePerson(tutorial: Person, index: number): void {
    this.currentPerson = tutorial;
    this.currentIndex = index;
  }

  removeAllPersons(): void {
    this.personService.deleteAll().subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }

  searchNome(): void {
    this.currentPerson = {};
    this.currentIndex = -1;

    this.personService.findByNome(this.nome).subscribe({
      next: (data) => {
        this.persons = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
}
