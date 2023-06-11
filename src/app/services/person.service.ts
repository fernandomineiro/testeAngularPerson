import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/person.model';

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Person[]> {
    return this.http.get<Person[]>(`${baseUrl}/api/person`);
  }

  get(id: any): Observable<Person> {
    return this.http.get<Person>(`${baseUrl}/api/person/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/api/person`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/api/person`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/api/person/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${baseUrl}/api/person`);
  }

  findByNome(nome: any): Observable<Person[]> {
    return this.http.get<Person[]>(`${baseUrl}/api/person?nome=${nome}`);
  }
}
