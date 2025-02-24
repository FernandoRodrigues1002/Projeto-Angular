import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { RegisterComponent } from './components/register/register.component';
import { EditComponent } from './components/edit/edit.component';

const routes: Routes = [
  {
    path: '', component: ListComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'edit/:id', component: EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
