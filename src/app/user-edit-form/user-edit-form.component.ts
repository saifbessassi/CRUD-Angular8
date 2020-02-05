import { Component, OnInit } from '@angular/core';
import { User } from '../entities/user';
import { UserService } from '../services/user.service';
import { FormGroup, FormBuilder, Form, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrls: ['./user-edit-form.component.css']
})
export class UserEditFormComponent implements OnInit {

  user: any = {};
  constructor(private userService: UserService, 
    private route: ActivatedRoute, 
    private router: Router,
    ) {  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userService.getUser(params['id']).subscribe(res => {
        this.user = res;
    });
  });
  }

  onEditUser (f) {
    let user = new User(this.user.id, f.username, f.mail);
    this.userService.editUser(user)
    .subscribe(
      (response: any) => {
        this.router.navigate(['/users']);
      }
    );
  }
}
