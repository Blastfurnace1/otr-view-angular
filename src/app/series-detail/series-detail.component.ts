import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SeriesService }  from '../series.service';

import { Series } from '../series';
import { SeriesSummary } from '../seriesSummary';
import { Response } from '../response';

import { SeriesDataWrapper } from '../seriesdatawrapper';

@Component({
  selector: 'app-series-detail',
  templateUrl: './series-detail.component.html',
  styleUrls: ['./series-detail.component.css']
})
export class SeriesDetailComponent implements OnInit {

  seriesData: Series;
  seriesSummary: SeriesSummary[];
  
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
    .subscribe(seriesData => this.bindSeriesData(seriesData));
  }
  
  bindSeriesData(response:Response<SeriesDataWrapper>) : void {
    this.seriesData = response.payload.series;
    this.seriesSummary = response.payload.seriesSummary;
  }
  
  save(): void {
   this.seriesService.updateSeries(this.seriesData)
     .subscribe(() => this.goBack());
 }
  
  goBack(): void {
    this.location.back();
  }
}
