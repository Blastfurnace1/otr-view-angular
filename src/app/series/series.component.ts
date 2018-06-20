import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Series } from '../series';
import { SeriesService } from '../series.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

  series: Series[];
  
  selectedSeries: Series;

  constructor(private location: Location,
              private seriesService: SeriesService) { }
  
  ngOnInit() {
    this.getSeries();
  }
  
  getSeries(): void {
    // observable
    this.seriesService.getSeries().subscribe(series => this.series = series);
  }
  
  goBack(): void {
    this.location.back();
  }
  
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    let dev = new Series();
    dev.title = name;
    this.seriesService.addSeries(dev)
    .subscribe(series => {
      this.series.push(series);
    });

  }
  
  delete(ser: Series): void {
    this.series = this.series.filter(h => h !== ser);
    this.seriesService.deleteSeries(ser).subscribe();
  }
  

}
