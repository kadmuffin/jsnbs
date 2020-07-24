interface NoteSettings {
  tick: number;
  layer: number;
  key: number;
  instrument?: number;
  velocity?: number;
  panning?: number;
  pitch?: number;
}

class Note {
  /** Stores the note properties
   *
   *  @param
   *  tick: The tick where the note is played.
   *
   *  @param
   *  layer: The layer where the note is stored.
   *
   *  @param
   *  key: The tone of the note (where 0 is A0 & 87 is C8; 33-57 is within the 2-octave limit).
   *
   *  @param
   *  instrument: The instrument of the note (Vanilla: 0-15).
   *
   *  @param
   *  velocity: The velocity/volume of the note (from 0-100).
   *
   *  @param
   *  panning: The stereo position of the note (from -100 to 100; 0 is center panning).
   *
   *  @param
   *  pitch: The fine pitch of the note (from -32768 to 32767; NBS is limited from -1200 to 1200).
   */
  constructor(
    public tick: number,
    public layer: number,
    public key: number,
    public instrument: number = 0,
    public velocity: number = 100,
    public panning: number = 0,
    public pitch: number = 0
  ) {}

  /** Custom constructor for using "named" parameters
   *
   * @param NoteSettings Object that holds Note parameters:
   *
   * ```javascript
   * Note.named({
   *  tick: 0,
   *  layer: 0,
   *  key: 35,
   *  instrument: 14, // Optional from here
   *  velocity: 100,
   *  panning: 0,
   *  pitch: 0,
   * }); // Returns a Note object
   * ```
   */
  static named({
    tick,
    layer,
    key,
    instrument = 0,
    velocity = 100,
    panning = 0,
    pitch = 0,
  }: NoteSettings): Note {
    return new Note(tick, layer, key, instrument, velocity, panning, pitch);
  }
}

export { Note };
