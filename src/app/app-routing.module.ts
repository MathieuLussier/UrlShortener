import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {environment} from '../environments/environment';
import {AppComponent} from './app.component';


const routes: Routes = [
  {path: '', component: AppComponent, data: { externalUrl: environment.backendUrl }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
