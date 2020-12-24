// eslint-disable-next-line import/no-cycle
import {Writer} from './writer';
import {WriteBuffer} from './wrappers/buffer';
import {Header, Note, Layer, Instrument} from './basic/exports';

interface Chord {
  tick: number;
  notes: Note[];
}

class NBSFile {
  constructor(
    public header: Header,
    public notes: Note[],
    public layers: Layer[],
    public instruments: Instrument[],
  ) {}

  /** Allocates a buffer and Writes a NBS File in it.
   *
   *  @param {number} version The target version to export.
   *
   *  @returns {Promise.<Buffer>} Buffer Promise.
   */
  writeBuffer(version: number = Header.CURRENT_NBS_VERSION) {
    this.updateHeader(version);
    return new Promise<Buffer>((resolve) => {
      const writer = new Writer(new WriteBuffer(this.allocateBuffer()));

      writer.encodeFile(this, version);

      resolve(writer.buffer.data);
    });
  }

  /** Function for looping thought notes.
   *
   *  @generator Loops thought Notes.
   *  @returns {Object} Chord object.
   */
  *chords(): Generator<Chord> {
    if (this.notes.length <= 0) return;

    let chord: Note[] = [];
    let currentTick = this.notes[0].tick;

    for (const note of this.notes.sort(
      (noteA: Note, noteB: Note) => noteA.tick - noteB.tick,
    )) {
      if (note.tick === currentTick) {
        chord.push(note);
      } else {
        chord = chord.sort(
          (noteA: Note, noteB: Note) => noteA.layer - noteB.layer,
        );

        yield {tick: currentTick, notes: chord};

        currentTick = note.tick;
        chord = [note];
      }
    }

    yield {tick: currentTick, notes: chord};
  }

  /** Sets the header version.
   *
   * @param {number} version The target version to update the header.
   */
  updateHeader(version = -1): void {
    if (version >= 0) this.header.version = version;
    if (this.notes.length > 0) {
      this.header.song_length = this.notes[this.notes.length - 1].tick;
    }
    this.header.song_layers = this.layers.length;
  }

  /** Calculates and returns a buffer with the amount of bytes needed for writing */
  private allocateBuffer() {
    let headerBytes: number =
      this.header.song_name.length +
      2 +
      (this.header.song_author.length + 2) +
      (this.header.original_author.length + 2) +
      (this.header.description.length + 2) +
      (this.header.song_origin.length + 2);

    headerBytes /= 8;
    headerBytes += 37;

    let layoutSize = 3;
    let instrumentsSize = 2;

    this.layers.forEach((layer) => {
      layoutSize += (layer.name.length + 1) / 8;
    });

    this.instruments.forEach((instrument) => {
      instrumentsSize += (instrument.name.length + 1) / 8;
      instrumentsSize += (instrument.file.length + 1) / 8;
    });

    return Buffer.alloc(
      (14 * this.notes.length + headerBytes + layoutSize + instrumentsSize) * 2,
    );
  }
}

export {NBSFile, Chord};
