import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignerComponent } from './components/signer/signer.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/signer',
    pathMatch: 'full',
  },
  {
    path: 'signer',
    component: SignerComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
