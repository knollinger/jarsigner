import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignerComponent } from './components/signer/signer.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/signer',
    pathMatch: 'full'
  },
  {
    path: 'signer',
    component: SignerComponent
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
