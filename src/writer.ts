// eslint-disable-next-line import/no-cycle
import {NBSFile} from './nbsfile';
import {WriteBuffer} from './wrappers/buffer';

class Writer {
  readonly buffer: WriteBuffer;

  constructor(buffer: WriteBuffer) {
    this.buffer = buffer;
  }

  /** Runs all write functions in order */
  encodeFile(nbsFile: NBSFile, target: number): void {
    this.writeHeader(nbsFile, target);
    this.writeNotes(nbsFile, target);
    this.writeLayers(nbsFile, target);
    this.writeInstruments(nbsFile);
  }

  /** Writes the header format based on target number */
  writeHeader(nbsFile: NBSFile, target: number): void {
    const header = nbsFile.header;

    if (target > 0) {
      this.buffer.uint16(0);
      this.buffer.uint8(target);
      this.buffer.uint8(header.default_instruments);
    } else {
      this.buffer.uint16(header.song_length);
    }

    if (target >= 3) {
      this.buffer.uint16(header.song_length);
    }
    this.buffer.uint16(header.song_layers);
    this.buffer.string(header.song_name);
    this.buffer.string(header.song_author);
    this.buffer.string(header.original_author);
    this.buffer.string(header.description);

    this.buffer.uint16(Math.round(header.tempo * 100));
    this.buffer.uint8(Number(header.auto_save));
    this.buffer.uint8(header.auto_save_duration);
    this.buffer.uint8(header.time_signature);

    this.buffer.uint32(header.minutes_spent);
    this.buffer.uint32(header.left_clicks);
    this.buffer.uint32(header.right_clicks);
    this.buffer.uint32(header.blocks_added);
    this.buffer.uint32(header.blocks_removed);
    this.buffer.string(header.song_origin);

    if (target >= 4) {
      this.buffer.uint8(Number(header.loop));
      this.buffer.uint8(header.max_loop_count);
      this.buffer.uint16(header.loop_start);
    }
  }

  /** Writes notes & add zeros where needed (for jumps) */
  writeNotes(nbsFile: NBSFile, target: number): void {
    let currentTick = -1;

    if (nbsFile.notes.length > 0) {
      for (const {tick, notes} of nbsFile.chords()) {
        this.buffer.uint16(tick - currentTick);
        currentTick = tick;
        let currentLayer = -1;

        for (const note of notes) {
          this.buffer.uint16(note.layer - currentLayer);
          currentLayer = note.layer;

          this.buffer.uint8(note.instrument);
          this.buffer.uint8(note.key);

          if (target >= 4) {
            this.buffer.uint8(note.velocity);
            this.buffer.uint8(note.panning + 100);
            this.buffer.int16(note.pitch);
          }
        }
        this.buffer.uint16(0);
      }
    }
    this.buffer.uint16(0);
  }

  /** Writes layers (run after writeNotes()) */
  writeLayers(nbsFile: NBSFile, target: number): void {
    for (const layer of nbsFile.layers.sort(
      (layerA, layerB) => layerA.id - layerB.id,
    )) {
      this.buffer.string(layer.name);
      if (target >= 4) this.buffer.uint8(layer.lock ? 1 : 0);

      this.buffer.uint8(layer.volume);

      if (target >= 2) this.buffer.uint8(layer.panning + 100);
    }
  }

  /** Writes custom instruments (run after writeLayers()) */
  writeInstruments(nbsFile: NBSFile): void {
    this.buffer.uint8(nbsFile.instruments.length);

    for (const instrument of nbsFile.instruments.sort(
      (instrumentA, instrumentB) => instrumentA.id - instrumentB.id,
    )) {
      this.buffer.string(instrument.name);
      this.buffer.string(instrument.file);
      this.buffer.uint8(instrument.pitch);
      this.buffer.uint8(Number(instrument.press_key));
    }
  }
}

export {Writer};
