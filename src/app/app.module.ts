import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { SeriesDetailComponent } from './series-detail/series-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AppRoutingModule } from './/app-routing.module';

import { EpisodesComponent } from './episodes/episodes.component';
import { DefaultPipe } from './default.pipe';
import { AudioFilesComponent } from './audio-files/audio-files.component';
import { EpisodeDetailComponent } from './dashboard/episode-detail/episode-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    SeriesDetailComponent,
    MessagesComponent,
    DashboardComponent,
    EpisodesComponent,
    DefaultPipe,
    AudioFilesComponent,
    EpisodeDetailComponent
  ],
  imports: [HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
