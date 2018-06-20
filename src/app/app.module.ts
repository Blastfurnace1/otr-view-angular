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

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
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
    AppRoutingModule,
    
  // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
  // and returns simulated server responses.
  // Remove it when a real server is ready to receive requests.
  HttpClientInMemoryWebApiModule.forRoot(
    InMemoryDataService, { dataEncapsulation: false }
)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
