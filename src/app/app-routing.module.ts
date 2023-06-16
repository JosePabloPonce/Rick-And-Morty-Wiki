import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'home',
    loadChildren: () => import('@homepage/homepage.module').then(m => m.HomepageModule)
  },
  {
    path:'',
    redirectTo:'home',
    pathMatch: 'full'
  },
  {
    path:'character-details/:id',
    loadChildren: () => import('@character-details/character-details.module').then(m => m.CharacterDetailsModule)
  },
  {
    path:'**',
    loadChildren: () => import('@page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
