import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RotaComponent } from './pages/rota/rota.component';

const routes: Routes = [
  { path: 'rota', component: RotaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
