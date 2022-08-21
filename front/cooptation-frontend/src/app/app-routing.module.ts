import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './pages/error404/error404.component';
import { LoginUserComponent } from './core/login/login.component';
import { CooptationListComponent } from './core/cooptation-list/cooptation-list.component';              
import { AuthGuardService as AuthGuard  } from './core/services/auth-guard.service';
import { CooptationRequestComponent } from './components/cooptation-request/cooptation-request.component';
import { ManagerCooptationComponent } from './core/manager-cooptation/manager-cooptation.component';
import { RoleGuardService as RoleGuard } from './core/services/role-guard.service';
import { CooptationEditComponent } from './components/cooptation-edit/cooptation-edit.component';

const routes: Routes = [
  { path: '', component: LoginUserComponent },
  { path:'cooptation/:id' , component:CooptationEditComponent, canActivate:[AuthGuard]  },
  { path:'cooptation', component:CooptationRequestComponent ,
  canActivate: [AuthGuard] },
  { path:'cooptation-list', component:CooptationListComponent  ,
  canActivate: [AuthGuard]},
  { path:'manager', component:ManagerCooptationComponent  ,
  canActivate: [RoleGuard] ,data: { 
    expectedRole: 'ROLE_MANAGER'
  }},
  {path: '**', component: Error404Component},   
              ];
@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
