import { Header, Note, Layer, Instrument } from "./helpers/exports";

interface Chord {
  tick: number;
  notes: Array<Note>;
}

class NBSFile {
  constructor(
    public header: Header,
    public notes: Array<Note>,
    public layers: Array<Layer>,
    public instruments: Array<Instrument>
  ) {}

  update_header(version: number) {
    this.header.version = version;
    if (this.notes) {
      this.header.song_length = this.notes[-1].tick;
    }
    this.header.song_layers = this.layers.length;
  }

  *chords(): Generator<Chord> {
    if (!this.notes) return;

    let chord: Array<Note> = [];
    let current_tick = this.notes[0].tick;

    for (const note of this.notes.sort((a: Note, b: Note) => a.tick - b.tick)) {
      if (note.tick == current_tick) {
        chord.push(note);
      } else {
        chord = chord.sort((a: Note, b: Note) => a.layer - b.layer);

        yield { tick: current_tick, notes: chord };

        current_tick = note.tick;
        chord = [note];
      }
    }

    yield { tick: current_tick, notes: chord };
  }
}

export { NBSFile, Chord };
