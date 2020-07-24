import { Binary } from './wrappers/jbinary_wrap';
import { Header, Note, Layer, Instrument } from './basic/exports';
import { NBSFile } from './nbsfile';

class Parser {
  public buffer: Binary;
  constructor(binary: any) {
    this.buffer = new Binary(binary);
  }

  /** Returns a NBSFile instance from the buffer */
  read_file(): NBSFile {
    let header = this.parse_header();
    return new NBSFile(
      header,
      Array.from(this.parse_notes(header.version)),
      Array.from(this.parse_layers(header.song_layers, header.version)),
      Array.from(this.parse_instruments())
    );
  }

  /** Retrieves the header on the buffer
   *
   *  @returns
   *  Header class
   */
  parse_header(): Header {
    let song_length = this.buffer.uint16();
    let version = 0;

    if (!song_length) version = this.buffer.uint8();

    let header = new Header();

    header.version = version;
    header.default_instruments = version > 0 ? this.buffer.uint8() : 10;
    header.song_length = version > 0 ? this.buffer.uint16() : song_length;
    header.song_layers = this.buffer.uint16();
    header.song_name = this.buffer.string();
    header.song_author = this.buffer.string();
    header.original_author = this.buffer.string();
    header.description = this.buffer.string();

    header.tempo = this.buffer.uint16() / 100.0;
    header.auto_save = this.buffer.uint8() == 1;
    header.auto_save_duration = this.buffer.uint8();
    header.time_signature = this.buffer.uint8();

    header.minutes_spent = this.buffer.uint32();
    header.left_clicks = this.buffer.uint32();
    header.right_clicks = this.buffer.uint32();
    header.blocks_added = this.buffer.uint32();
    header.blocks_removed = this.buffer.uint32();
    header.song_origin = this.buffer.string();
    header.loop = version >= 4 ? this.buffer.uint8() == 1 : false;
    header.max_loop_count = version >= 4 ? this.buffer.uint8() : 0;
    header.loop_start = version >= 4 ? this.buffer.uint16() : 0;

    return header;
  }

  /** Loops through the buffer and returns notes
   *
   *  @returns
   *  Generator -> Note
   */
  *parse_notes(version: number): Generator<Note> {
    for (const tick of this.buffer.jump()) {
      for (const layer of this.buffer.jump()) {
        yield Note.named({
          tick: tick,
          layer: layer,
          instrument: this.buffer.uint8(),
          key: this.buffer.uint8(),
          velocity: version >= 4 ? this.buffer.uint8() : 100,
          panning: version >= 4 ? this.buffer.uint8() - 100 : 0,
          pitch: version >= 4 ? this.buffer.uint16() : 0,
        });
      }
    }
  }

  /** Loops through the buffer and retrieves the layers
   *
   *  @returns
   *  Generator -> Layer
   */
  *parse_layers(layers_count: number, version: number): Generator<Layer> {
    for (let i = 0; i < layers_count; i++) {
      yield Layer.named({
        id: i,
        name: this.buffer.string(),
        lock: version >= 4 ? this.buffer.uint8() == 1 : false,
        volume: this.buffer.uint8(),
        panning: version >= 2 ? this.buffer.uint8() - 100 : 0,
      });
    }
  }

  /** Loops through the buffer and returns custom instruments
   *
   *  @returns
   *  Generator -> Instrument
   */
  private *parse_instruments(): Generator<Instrument> {
    let instruments = this.buffer.uint8();
    for (let i = 0; i < instruments; i++) {
      yield Instrument.named({
        id: i,
        name: this.buffer.string(),
        file: this.buffer.string(),
        pitch: this.buffer.uint8(),
        press_key: this.buffer.uint8() == 1,
      });
    }
  }
}

export { Parser };
