import { Component, Input, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css'],
})
export class PersonDetailsComponent {
  @Input() viewMode = false;

  @Input() currentPerson: Person = {
    nome: '',
    rg: '',
    cpf: ''
  };

  message = '';

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getPerson(this.route.snapshot.params['id']);
    }
  }

  getPerson(id: string): void {
    this.personService.get(id).subscribe({
      next: (data) => {
        this.currentPerson = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  // updatePublished(status: boolean): void {
  //   const data = {
  //     title: this.currentPerson.nome,
  //     description: this.currentPerson.rg,
  //     cpf: this.currentPerson.cpf
  //   };

  //   this.message = '';

  //   this.personService.update(this.currentPerson.id, data).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       this.currentPerson.cpf = status;
  //       this.message = res.message
  //         ? res.message
  //         : 'The status was updated successfully!';
  //     },
  //     error: (e) => console.error(e)
  //   });
  // }

  updatePerson(): void {
    this.message = '';

    this.personService
      .update(this.currentPerson.id, this.currentPerson)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'This tutorial was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deletePerson(): void {
    this.personService.delete(this.currentPerson.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/tutorials']);
      },
      error: (e) => console.error(e)
    });
  }
}
