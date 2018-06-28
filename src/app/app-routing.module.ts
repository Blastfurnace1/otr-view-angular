import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EpisodesComponent }      from './episodes/episodes.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { SeriesDetailComponent }  from './series-detail/series-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: SeriesDetailComponent },
  { path: 'episode', component: EpisodesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}