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
  
  episodes: Episode[];
  
  selectedEpisode: EpisodeDataWrapper;
  
  onSelect(episode:EpisodeDataWrapper): void {
    if (episode === this.selectedEpisode) {
      this.selectedEpisode = null;
    } else {
      this.selectedEpisode = episode;
    }
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
    this.episodeService.getEpisodes(this.boundSeries.id,false)
    .subscribe(episodeData => this.bindEpisodeData(episodeData[0], false));
  }
  
  getMoreResults(): void {
      this.episodeService.getMoreResults(this.boundSeries.id).subscribe(episodeData => this.bindEpisodeData(episodeData[0], true));
  }
  
  bindEpisodeData(response:Response<Episode[]>, add:boolean) : void {
    if (add) {
        this.episodes =  this.episodes.concat(response.payload);
    } else {
        this.episodes = response.payload;
    }
  }

}
