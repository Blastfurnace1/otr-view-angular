import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SeriesService }  from '../series.service';

import { Series } from '../series';

@Component({
  selector: 'app-series-detail',
  templateUrl: './series-detail.component.html',
  styleUrls: ['./series-detail.component.css']
})
export class SeriesDetailComponent implements OnInit {

  @Input() seriesData: Series;
  
  constructor(
    private route: ActivatedRoute,
    private seriesService: SeriesService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getSeries();
  }

  getSeries(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.seriesService.getSer(id)
    .subscribe(ser => this.seriesData = ser);
  }
  
  save(): void {
   this.seriesService.updateSeries(this.seriesData)
     .subscribe(() => this.goBack());
 }
  
  goBack(): void {
    this.location.back();
  }
}
