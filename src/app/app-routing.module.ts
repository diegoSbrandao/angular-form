import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressFormComponent } from './address-form-component/address-form-component';

const routes: Routes = [
  { path: '', component: AddressFormComponent },
  // Outras rotas do seu aplicativo, se houver...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

