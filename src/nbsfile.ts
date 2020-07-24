import jBinary from "jbinary";
import { Header, Note, Layer, Instrument } from "./basic/exports";
import { Writer } from "./writer";
import { BinaryWrite } from "./wrappers/jbinary";

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

  /** Updates song_length & song_layers */
  update_header(version: number = -1) {
    if (version >= 0) this.header.version = version;
    if (this.notes.length > 0) {
      this.header.song_length = this.notes[this.notes.length - 1].tick;
    }
    this.header.song_layers = this.layers.length;
  }

  /** Allocates a buffer and Writes a NBS File
   *
   *  @returns
   *  Promise
   */
  save(dest: any, version: number = Header.CURRENT_NBS_VERSION) {
    this.update_header(version);
    return new Promise((resolve, reject) => {
      let jbinary = jBinary as any;

      jbinary = new jbinary(this.allocateBuffer(), {
        "jBinary.littleEndian": true,
      });

      try {
        let writer = new Writer(new BinaryWrite(jbinary));

        writer.encode_file(this, version);

        resolve(writer.buffer.buffer.saveAs(dest));
      } catch (e) {
        reject(e);
      }
    });
  }

  /** Sorts Notes & Returns a Generator<Chord> object*/
  *chords(): Generator<Chord> {
    if (this.notes.length <= 0) return;

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

  /** Calculates and returns a buffer with the amount of bytes needed for writing */
  private allocateBuffer() {
    let header_bytes: number =
      this.header.song_name.length +
      2 +
      (this.header.song_author.length + 2) +
      (this.header.original_author.length + 2) +
      (this.header.description.length + 2) +
      (this.header.song_origin.length + 2);

    header_bytes /= 8;
    header_bytes += 37;

    let layout_size = 3;
    let instruments_size = 2;

    for (let i = 0; i < this.layers.length; i++) {
      layout_size += (this.layers[i].name.length + 1) / 8;
    }

    for (let i = 0; i < this.instruments.length; i++) {
      layout_size += (this.instruments[i].name.length + 1) / 8;
      layout_size += (this.instruments[i].file.length + 1) / 8;
    }

    return Buffer.alloc(
      (14 * this.notes.length + header_bytes + layout_size + instruments_size) *
        3
    );
  }
}

export { NBSFile, Chord };
