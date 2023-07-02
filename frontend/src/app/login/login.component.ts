import { Component } from '@angular/core';
import {FeathersService} from "../feathers.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private feathersService: FeathersService,
    private router: Router
  ) {}

  username: string = ''
  password: string = ''

  async login(): Promise<void> {
    try {
      await this.feathersService.client.authenticate({
        strategy: 'local',
        email: this.username,
        password: this.password
      });
      await this.router.navigate(['/'])
    } catch (error) {
      console.log(error)
    }
  }
}
