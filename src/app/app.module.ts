import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { SeriesComponent } from './series/series.component';
import { SeriesDetailComponent } from './series-detail/series-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AppRoutingModule } from './/app-routing.module';

import { SeriesSearchComponent } from './series-search/series-search.component';

@NgModule({
  declarations: [
    AppComponent,
    SeriesComponent,
    SeriesDetailComponent,
    MessagesComponent,
    DashboardComponent,
    SeriesSearchComponent
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
