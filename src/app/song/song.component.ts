import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Song } from './song';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {
  @Input() song: Song | null = null
  @Output() edit = new EventEmitter<Song>()

  constructor() { }

  ngOnInit(): void {
  }

}
