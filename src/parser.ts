import {ReadBuffer} from './wrappers/buffer';
import {Header, Note, Layer, Instrument} from './basic/exports';
import {NBSFile} from './nbsfile';

class Parser {
  public buffer: ReadBuffer;

  /** Parses a Buffer into a NBSFile.
   * @class
   * @param {Buffer} buffer The data in buffer form.
   */
  constructor(buffer: Buffer) {
    this.buffer = new ReadBuffer(buffer);
  }

  /** Returns a NBSFile instance from the buffer.
   *
   * @returns {Object} NBSFile instance.
   */
  readFile(): NBSFile {
    const header = this.parseHeader();
    return new NBSFile(
      header,
      Array.from(this.parseNotes(header.version)),
      Array.from(this.parseLayers(header.song_layers, header.version)),
      Array.from(this.parseInstruments()),
    );
  }

  /** Retrieves the header on the buffer.
   *
   *  @returns {Header} Header class.
   */
  parseHeader(): Header {
    const songLength = this.buffer.uint16();
    let version = 0;

    if (!songLength) version = this.buffer.uint8();

    const header = new Header();

    header.version = version;
    header.default_instruments = version > 0 ? this.buffer.uint8() : 10;
    header.song_length = version > 0 ? this.buffer.uint16() : songLength;
    header.song_layers = this.buffer.uint16();
    header.song_name = this.buffer.string();
    header.song_author = this.buffer.string();
    header.original_author = this.buffer.string();
    header.description = this.buffer.string();

    header.tempo = this.buffer.uint16() / 100.0;
    header.auto_save = this.buffer.uint8() === 1;
    header.auto_save_duration = this.buffer.uint8();
    header.time_signature = this.buffer.uint8();

    header.minutes_spent = this.buffer.uint32();
    header.left_clicks = this.buffer.uint32();
    header.right_clicks = this.buffer.uint32();
    header.blocks_added = this.buffer.uint32();
    header.blocks_removed = this.buffer.uint32();
    header.song_origin = this.buffer.string();
    header.loop = version >= 4 ? this.buffer.uint8() === 1 : false;
    header.max_loop_count = version >= 4 ? this.buffer.uint8() : 0;
    header.loop_start = version >= 4 ? this.buffer.uint16() : 0;

    return header;
  }

  /** Loops through the buffer and returns notes.
   * @generator
   * @returns {generator} Note Generator.
   */
  *parseNotes(version: number): Generator<Note> {
    for (const tick of this.jump()) {
      for (const layer of this.jump()) {
        yield new Note({
          tick,
          layer,
          instrument: this.buffer.uint8(),
          key: this.buffer.uint8(),
          velocity: version >= 4 ? this.buffer.uint8() : 100,
          panning: version >= 4 ? this.buffer.uint8() - 100 : 0,
          pitch: version >= 4 ? this.buffer.int16() : 0,
        });
      }
    }
  }

  /** Loops through the buffer and retrieves the layers.
   * @generator
   * @returns {generator} Layer Generator.
   */
  *parseLayers(layersCount: number, version: number): Generator<Layer> {
    for (let i = 0; i < layersCount; i++) {
      yield new Layer({
        id: i,
        name: this.buffer.string(),
        lock: version >= 4 ? this.buffer.uint8() === 1 : false,
        volume: this.buffer.uint8(),
        panning: version >= 2 ? this.buffer.uint8() - 100 : 0,
      });
    }
  }

  /** Loops through the buffer and returns custom instruments.
   * @generator
   * @returns {generator} Instrument Generator.
   */
  private *parseInstruments(): Generator<Instrument> {
    const instruments = this.buffer.uint8();
    for (let i = 0; i < instruments; i++) {
      yield new Instrument({
        id: i,
        name: this.buffer.string(),
        file: this.buffer.string(),
        pitch: this.buffer.uint8(),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        press_key: this.buffer.uint8() === 1,
      });
    }
  }

  /** Jumps the amount specified by a short at pointer.
   *
   * @generator
   */
  private *jump(): Generator<number> {
    let value = -1;

    while (true) {
      const jump = this.buffer.uint16();
      if (!jump) break;

      value += jump;
      yield value;
    }
  }
}

export {Parser};
