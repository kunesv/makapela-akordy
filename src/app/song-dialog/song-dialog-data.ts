import { Song } from './../song/song';

export interface SongDialogData {
  song: Partial<Song>
  enableDelete: boolean
}
