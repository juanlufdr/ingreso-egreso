import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    public firestoreService: AngularFirestore
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe((fuser) => {
      console.log(fuser);
      console.log(fuser?.uid);
      console.log(fuser?.email);
    });
  }

  createUser(name: string, email: string, password: string) {
    // console.log({ name, email, password });
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        if (user) {
          const newUser = new User(user.uid, name, email);
          return this.firestoreService
            .doc(`${user.uid}/user`)
            .set({ ...newUser });
        }
        return;
      });
  }

  loginUser(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logOutUSer() {
    return this.auth.signOut();
  }

  isLogged() {
    return this.auth.authState.pipe(map((fUser) => fUser != null));
  }
}
