import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../entities/user';


const API_URL = "http://localhost:8000";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}


@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }

  addUser (user: User) {
    return this.http.post<User>(API_URL + '/user', JSON.stringify(user), httpOptions);
  }
  getUsers () {
    return this.http.get<JSON>(API_URL);
  }

  getUser (id) {
    return this.http.get<JSON>(API_URL + '/user/' + id);
  }

  editUser (user: User) {
    return this.http.put<User>(API_URL + '/user/edit/' + user.id, JSON.stringify(user), httpOptions);
  }

  deleteUser (id) {
    return this.http.delete<JSON>(API_URL + '/user/delete/' + id);
  }

}
