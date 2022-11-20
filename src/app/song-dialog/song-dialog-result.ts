import { Song } from "../song/song"

export interface SongDialogResult {
  song: Song
  delete?: boolean
}
