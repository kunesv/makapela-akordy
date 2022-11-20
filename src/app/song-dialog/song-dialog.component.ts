import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Song } from "../song/song";
import { SongDialogData } from './song-dialog-data';

@Component({
  selector: 'app-song-dialog',
  templateUrl: './song-dialog.component.html',
  styleUrls: ['./song-dialog.component.css']
})
export class SongDialogComponent implements OnInit {

  private backupSong: Partial<Song> = { ...this.data.song }

  constructor(public dialogRef: MatDialogRef<SongDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: SongDialogData) { }

  cancel(): void {
    this.data.song.title = this.backupSong.title
    this.data.song.text = this.backupSong.text
    this.dialogRef.close(this.data)
  }

  ngOnInit(): void {
  }

}
