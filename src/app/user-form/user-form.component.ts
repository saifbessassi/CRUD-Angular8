import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../entities/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  onAddUser (f) {
    let user = new User(null, f.username, f.mail);
    this.userService.addUser(user)
    .subscribe(
      (response: any) => {
        this.router.navigate(['/users']);
      }
    );
  }

}
