import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {environment} from '../environments/environment';
import {RedirectGuard} from './redirect.guard';
import {AppComponent} from './app.component';


const routes: Routes = [
  {path: '', component: AppComponent, data: { externalUrl: environment.backendUrl }},
  {path: ':id', component: RedirectGuard, canActivate: [RedirectGuard], data: { externalUrl: environment.backendUrl }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
