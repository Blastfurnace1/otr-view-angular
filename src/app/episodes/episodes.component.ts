import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { EpisodeService }  from '../service/episode.service';

import { Series } from '../model/series';

import { Episode } from '../model/episode';
import { EpisodeSummary } from '../model/episodeSummary';
import { Response } from '../model/response';

import { EpisodeDataWrapper } from '../model/episodedatawrapper';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css']
})
export class EpisodesComponent implements OnInit {

  @Input() boundSeries: Series;
  
  episodes: EpisodeDataWrapper[];
  
  selectedEpisode: EpisodeDataWrapper;
  
  onSelect(episode:EpisodeDataWrapper): void {
    this.selectedEpisode = episode;
  }
  
  constructor(
    private route: ActivatedRoute,
    private episodeService: EpisodeService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getEpisodes();
  }

  getEpisodes(): void {
    this.episodeService.getSeriesEpisodes(this.boundSeries.id)
    .subscribe(episodeData => this.bindEpisodeData(episodeData));
  }
  
  bindEpisodeData(response:Response<EpisodeDataWrapper[]>) : void {
    this.episodes = response.payload;
  }
  
  getMoreResults():void {
    
  }

}
