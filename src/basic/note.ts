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
  tick: number;
  layer: number;
  key: number;
  instrument: number;
  velocity: number;
  panning: number;
  pitch: number;

  /** Stores the note properties.
   * @class
   * @param {Object.<string,any>} note  The object with the note settings.
   * @param {number}  note.tick         The tick where the note is played.
   * @param {number}  note.layer        The layer where the note is stored.
   * @param {number}  note.key          The tone of the note (where 0 is A0 & 87 is C8; 33-57 is within the 2-octave limit).
   * @param {number}  [note.instrument] The instrument of the note (Vanilla: 0-15).
   * @param {number}  [note.velocity]   The velocity/volume of the note (from 0-100).
   * @param {number}  [note.panning]    The stereo position of the note (from -100 to 100; 0 is center panning).
   * @param {number}  [note.pitch]      The fine pitch of the note (from -1200 to 1200).
   */
  constructor({
    tick,
    layer,
    key,
    instrument = 0,
    velocity = 100,
    panning = 0,
    pitch = 0,
  }: NoteSettings) {
    this.tick = tick;
    this.layer = layer;
    this.key = key;
    this.instrument = instrument;
    this.velocity = velocity;
    this.panning = panning;
    this.pitch = pitch;
  }
}

export {Note};
