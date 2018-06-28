import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AudioFileService }  from '../service/audiofile.service';

import { Episode } from '../model/episode';
import { AudioFile } from '../model/audiofile';
import { Response } from '../model/response';
import { PayloadWithCount } from '../model/payloadwithcount';

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.css']
})
export class EpisodeDetailComponent implements OnInit {

  @Input() boundEpisode: Episode;
  
  audioFiles: AudioFile[];
  
  selectedAudioFile: AudioFile;
  
  onSelect(episode:AudioFile): void {
    if (episode === this.selectedAudioFile) {
      this.selectedAudioFile = null;
    } else {
      this.selectedAudioFile = episode;
    }
  }
  
  constructor(
    private route: ActivatedRoute,
    private audioFileService: AudioFileService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getAudioFiles();
  }

  getAudioFiles(): void {
    this.audioFileService.getAudioFiles(this.boundEpisode.id,true)
    .subscribe(audioFileData => this.bindAudioFileData(audioFileData[0], false));
  }
  
  getMoreResults(): void {
      this.audioFileService.getMoreResults(this.boundEpisode.id).subscribe(audioFileData => this.bindAudioFileData(audioFileData[0], true));
  }
  
  bindAudioFileData(response:Response<PayloadWithCount<AudioFile[]>>, add:boolean) : void {
    if (add) {
        this.audioFiles =  this.audioFiles.concat(response.payload.payload);
    } else {
        this.audioFiles = response.payload.payload;
    }
  }
  
  }