import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users = [];
  errorMessage: string;


  constructor(private userService: UserService, private http: HttpClient) { }

  ngOnInit() {
    this.userService.getAllUser()
    .subscribe(
      (response: any) => {
        this.users = response;
      }
    );
  }

  deleteUser (id, index) { 
    this.userService.deleteUser(id)
    .subscribe(
      (response: any) => {
        this.users.splice(index,1);
      }
    );
    
  }


 

}
