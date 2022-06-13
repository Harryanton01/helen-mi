import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, tap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user: Observable<any | null>;

  constructor(private afauth: AngularFireAuth) {
    this.user = this.afauth.authState
      .pipe(switchMap(user => {
        if (user) {
          return of(user);
          } else {
            return of(null);
          }
        }));
  }

  login(email: string, password: string) {
    this.afauth.auth.signInWithEmailAndPassword(email, password).catch(error => {
      alert('please input a valid email and password');
    });
  }

  logout() {
    this.afauth.auth.signOut();
  }

}
