import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate } from './services/auth.guard';
import { adminCanActivate } from './services/admin.guard';


const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule) },
  { path: 'clubs/:id', loadChildren: () => import('./modules/clubs/clubs.module').then(m => m.ClubsModule), canActivate: [canActivate] },
  { path: 'admin/:id', loadChildren: () => import('./modules/administrator/administrator.module').then(m => m.AdministratorModule), canActivate: [adminCanActivate] },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
