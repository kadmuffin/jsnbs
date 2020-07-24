import { BinaryWrite } from './wrappers/jbinary_wrap';
import { NBSFile } from './nbsfile';

class Writer {
  /** Holds the writes functions and runs them
   *
   * @param
   * buffer: Takes a BinaryWrite class that wraps jBinary write methods (see 'src/wrappers/jbinary')
   */
  constructor(public buffer: BinaryWrite) {}

  /** Runs all write functions in order */
  encode_file(nbs_file: NBSFile, target: number): void {
    this.write_header(nbs_file, target);
    this.write_notes(nbs_file, target);
    this.write_layers(nbs_file, target);
    this.write_instruments(nbs_file);
  }

  /** Writes the header format based on target number */
  write_header(nbs_file: NBSFile, target: number): void {
    let header = nbs_file.header;

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
  write_notes(nbs_file: NBSFile, target: number): void {
    let current_tick = -1;

    if (nbs_file.notes.length > 0) {
      for (const { tick, notes } of nbs_file.chords()) {
        this.buffer.uint16(tick - current_tick);
        current_tick = tick;
        let current_layer = -1;

        for (const note of notes) {
          this.buffer.uint16(note.layer - current_layer);
          current_layer = note.layer;

          this.buffer.uint8(note.instrument);
          this.buffer.uint8(note.key);

          if (target >= 4) {
            this.buffer.uint8(note.velocity);
            this.buffer.uint8(note.panning + 100);
            this.buffer.uint16(note.pitch);
          }
        }
        this.buffer.uint16(0);
      }
    }
    this.buffer.uint16(0);
  }

  /** Writes layers (run after write_notes()) */
  write_layers(nbs_file: NBSFile, target: number): void {
    for (const layer of nbs_file.layers.sort((a, b) => a.id - b.id)) {
      this.buffer.string(layer.name);
      if (target >= 4) this.buffer.uint8(layer.lock ? 1 : 0);

      this.buffer.uint8(layer.volume);

      if (target >= 2) this.buffer.uint8(layer.panning + 100);
    }
  }

  /** Writes custom instruments (run after write_layers()) */
  write_instruments(nbs_file: NBSFile): void {
    this.buffer.uint8(nbs_file.instruments.length);

    for (const instrument of nbs_file.instruments.sort((a, b) => a.id - b.id)) {
      this.buffer.string(instrument.name);
      this.buffer.string(instrument.file);
      this.buffer.uint8(instrument.pitch);
      this.buffer.uint8(Number(instrument.press_key));
    }
  }
}

export { Writer };
