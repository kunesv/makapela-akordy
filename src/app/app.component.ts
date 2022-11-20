import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SongDialogResult } from './song-dialog/song-dialog-result';
import { SongDialogComponent } from './song-dialog/song-dialog.component';
import { Song } from './song/song';
import { CdkDragDrop, transferArrayItem, moveItemInArray } from "@angular/cdk/drag-drop";
import { MatDialog } from "@angular/material/dialog";

import { AngularFirestore } from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  songs = this.store.collection('songs').valueChanges({idField: 'id'}) as Observable<Song[]>
  play = this.store.collection('play').valueChanges({idField: 'id'}) as Observable<Song[]>

  constructor(private dialog: MatDialog, private store: AngularFirestore) {}

  drop(event: CdkDragDrop<Song[]|null>): void {
    if (!event.container.data || !event.previousContainer.data) {
      return
    }

    const item = event.previousContainer.data[event.previousIndex]
    this.store.firestore.runTransaction(()=>{
      const promise = Promise.all([
        this.store.collection(event.previousContainer.id).doc(item.id).delete(),
        this.store.collection(event.container.id).add(item)
      ])
      return promise
    })

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex)
    }
  }

  newSong(): void {
    const dialogRef = this.dialog.open(SongDialogComponent, {
      data: {
        width: '90vw',
        song: {}
      }
    })
    dialogRef.afterClosed().subscribe((result: SongDialogResult | undefined) => {
      if (!result || !result.song || !result.song.title) {
        return
      }
      this.store.collection('songs').add(result.song)
    })
  }

  editSong(list: 'songs' | 'play', song: Song): void {
    const dialogRef = this.dialog.open(SongDialogComponent, {
      width: '100vw',
      height: '95vh',
      data: {
        song,
        enableDelete: true
      }
    })
    dialogRef.afterClosed().subscribe((result: SongDialogResult | undefined) => {
      if (!result) {
        return
      }
      if (result.delete) {
        this.store.collection(list).doc(song.id).delete()
      } else {
        this.store.collection(list).doc(song.id).update(song)
      }
    })
  }
}
