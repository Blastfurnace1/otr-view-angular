    import { Component, OnInit } from '@angular/core';
    import { Series } from '../series';
    import { SeriesService } from '../series.service';
     
    @Component({
      selector: 'app-dashboard',
      templateUrl: './dashboard.component.html',
      styleUrls: [ './dashboard.component.css' ]
    })
    export class DashboardComponent implements OnInit {
      series: Series[] = [];
     
      constructor(private seriesService: SeriesService) { }
     
      ngOnInit() {
        this.getHeroes();
      }
     
      getHeroes(): void {
        this.seriesService.getSeries()
          .subscribe(series => this.series = series.slice(1, 5));
      }
    }
