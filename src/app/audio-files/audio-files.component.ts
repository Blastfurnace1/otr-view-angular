import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AudioFileService }  from '../service/audiofile.service';

import { AudioFile } from '../model/audiofile';
import { Response } from '../model/response';


@Component({
  selector: 'app-audio-files',
  templateUrl: './audio-files.component.html',
  styleUrls: ['./audio-files.component.css']
})
export class AudioFilesComponent implements OnInit {

  @Input() boundAudioFile: AudioFile;
  
  otrItem: AudioFile;
  
  constructor(
    private route: ActivatedRoute,
    private audioFileService: AudioFileService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getAudioFile();
  }

  getAudioFile(): void {
    this.audioFileService.getAudioFile(this.boundAudioFile.id)
    .subscribe(audioFileData => this.bindAudioFileData(audioFileData));
  }
  
 
  bindAudioFileData(response:Response<AudioFile>) : void {
    
        this.otrItem = response.payload;
  }

}
