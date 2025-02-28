import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { RegisterComponent } from './components/register/register.component';
import { EditComponent } from './components/edit/edit.component';
import { RegisterCttComponent } from './components/register-ctt/register-ctt.component';

const routes: Routes = [
  {
    path: '', component: ListComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'edit/:id', component: EditComponent
  },
  {
    path: 'register-ctt/:id', component: RegisterCttComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
