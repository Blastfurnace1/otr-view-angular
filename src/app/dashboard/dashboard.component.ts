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
      term:string = "";
     
      constructor(private seriesService: SeriesService) { }
     
      ngOnInit() {
        this.getSeries();
      }
     
      getSeries(): void {
        this.seriesService.getSeries(true)
          .subscribe(series => this.series = series[0].payload);
      }
      
      getMoreResults(): void {
          this.seriesService.getMoreResults(this.term).subscribe(series => this.series = this.series.concat(series[0].payload));
      }
      
      searchSeries (term: string):void {
         this.term = term;
         if (term.length == 0) {
           this.getSeries();
         }
         this.seriesService.searchSeries(term).subscribe(series => this.series = series[0].payload);
      }
  }
