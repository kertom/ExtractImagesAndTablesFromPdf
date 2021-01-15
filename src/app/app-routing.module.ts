import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }//,
  //{ path: 'borders', loadChildren: './borders/borders.module#BordersPageModule' },
  //{ path: 'border', loadChildren: './border/border.component#BorderComponent' }
  //  { path: 'pop-over',
   //loadChildren: './pop-over/pop-over.module#PopOverPageModule' }
//,
  //{ path: 'home', 
  //loadChildren: './home/home.module#HomePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
