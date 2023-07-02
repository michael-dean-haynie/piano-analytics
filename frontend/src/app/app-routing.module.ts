import {inject, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChildFn, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {FeathersService} from "./feathers.service";
import {Router} from "@angular/router";

const authGuard: CanActivateChildFn =
  async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);
    const feathersClient = inject(FeathersService).client;
    try {
      await feathersClient.reAuthenticate();
      return true;
    } catch (error) {
      console.log(error)
      return router.parseUrl('/login');
    }
  };

const routes: Routes = [
  { path : 'login', component: LoginComponent},
  { path: '', canActivateChild:[authGuard], children: [
      { path : '', component: HomeComponent }
    ]},
  { path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
