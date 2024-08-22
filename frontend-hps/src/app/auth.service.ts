import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public username: string | undefined;
  public userId: number | undefined;
  public roles: string[] = [];
  public authenticated: boolean = false;
  public loginDate: Date | undefined;

  constructor(private router: Router, private http: HttpClient) {
    setInterval(() => {
      this.checkAuthentication();
    }, 1000);
  }

  createUser(userDto: any): Observable<any> {
    return this.http.post(BASIC_URL + "api/users", userDto);
  }

  loginUser(userDto: any): Observable<any> {
    return this.http.post<any>(BASIC_URL + "api/users/login", userDto).pipe(
      map(response => {
        this.username = userDto.username;
        this.userId = response.id;
        this.roles = response.roles;
        this.authenticated = true;
        this.loginDate = new Date();
        return response;
      })
    );
  }

  getAllUsers(): Observable<any> {
    return this.http.get(BASIC_URL + "api/users");
  }

  updateUserStatus(userId: number): Observable<any> {
    return this.http.put(BASIC_URL + `api/users/update-status/${userId}`, {});
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(BASIC_URL + `api/users/${userId}`, {});
  }

  setUserInactive(userId: number): Observable<any> {
    return this.http.put(BASIC_URL + `api/users/set-inactive/${userId}`, {});
  }

  changeUserRole(userId: number): Observable<any> {
    return this.http.put(BASIC_URL + `api/users/change-role/${userId}`, {});
  }

  public login(username: string, password: string): Observable<boolean> {
    return this.loginUser({ username, password }).pipe(
      map(response => {
        if (response) {
          return true;
        } else {
          this.authenticated = false;
          this.username = undefined;
          this.userId = undefined;
          this.roles = [];
          return false;
        }
      })
    );
  }

  logout() {
    this.authenticated = false;
    this.username = undefined;
    this.userId = undefined;
    this.roles = [];
    this.router.navigateByUrl("/login");
  }

  checkAuthentication() {
    if (this.loginDate) {
      const currentTime = new Date().getTime();
      const loginTime = new Date(this.loginDate).getTime();
      const fiveMinutesInMs = 30 * 60 * 1000;

      if (currentTime - loginTime > fiveMinutesInMs) {
        if (this.roles.includes('USER') && this.userId !== undefined) {
          this.setUserInactive(this.userId).subscribe(() => {
            this.logout();
          });
        }
      }
    }}}
