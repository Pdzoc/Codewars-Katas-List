import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Katas } from './katas';

@Injectable({
  providedIn: 'root',
})
export class LoadService {
  constructor(private http: HttpClient) {}

  getData(name, page) {
    return this.http.get<Katas>(
      'https://www.codewars.com/api/v1/users/' +
        name +
        '/code-challenges/completed?page=' +
        page
    );
  }

  getUser(name) {
    return this.http.get('https://www.codewars.com/api/v1/users/' + name);
  }
}
