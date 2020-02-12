import { TestBed, async } from '@angular/core/testing';

import { UserService } from './user.service';
import { User } from '../entities/user';
import { of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('UserService', () => {
  let userService: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ]
      })
        .compileComponents();
  }));

  beforeEach(() => {
    userService = TestBed.get(UserService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('addUser', () => {
    let rep : User;
    let user = new User(1, 'saif', 'saif@mail.com');

    userService.addUser(user).subscribe(res => {
      rep = res;
    })
    const req = httpTestingController.expectOne('http://localhost:8000/user');
    req.flush(user);
    expect(rep).toEqual(user);
    expect(req.request.method).toBe('POST');
  })

  it('editUser', () => {
    let rep : User;
    let user = new User(1, 'saif', 'saif@mail.com');

    userService.editUser(user).subscribe(res => {
      rep = res;
    })
    const req = httpTestingController.expectOne('http://localhost:8000/user/edit/'+user.id);
    req.flush(user);
    expect(rep).toEqual(user);
    expect(req.request.method).toBe('PUT');
  })

  it('getUser', () => {
    let rep : User;
    let user = new User(1, 'saif', 'saif@mail.com');

    userService.getUser(1).subscribe(res => {
      rep = res;
    })
    const req = httpTestingController.expectOne('http://localhost:8000/user/1');
    req.flush(user);
    expect(rep).toEqual(user);
    expect(req.request.method).toBe('GET');
  })

  it('getAllUser', () => {
    let rep : User[];
    let users : User[] = [
      new User(1, 'saif1', 'saif1@mail.com'),
      new User(2, 'saif2', 'saif2@mail.com'),
      new User(3, 'saif3', 'saif3@mail.com')
    ];

    userService.getAllUser().subscribe(res => {
      rep = res;
    })
    const req = httpTestingController.expectOne('http://localhost:8000');
    req.flush(users);
    expect(rep).toEqual(users);
    expect(req.request.method).toBe('GET');
  })

  it('deleteser', () => {
    let id = 1;
    let rep;
    userService.deleteUser(id).subscribe(res => {
      rep = res;
    })
    const req = httpTestingController.expectOne('http://localhost:8000/user/delete/'+id);
    expect(req.request.method).toBe('DELETE');
  })
});
