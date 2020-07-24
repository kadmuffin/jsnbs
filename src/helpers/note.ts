interface NoteSettings {
  tick: number;
  key: number;
  layer?: number;
  instrument?: number;
  velocity?: number;
  panning?: number;
  pitch?: number;
}

class Note {
  tick: number;
  key: number;
  layer: number;
  instrument: number;
  velocity: number;
  panning: number;
  pitch: number;
  /** Stores the note properties
   *
   *  @parameter
   *  tick: The tick where the note is played.
   *
   *  @parameter
   *  layer: The layer where the note is stored.
   *
   *  @parameter
   *  instrument: The instrument of the note (Vanilla: 0-15).
   *
   *  @parameter
   *  key: The tone of the note (0 is A0 & 80 is A8).
   *
   *  @positional
   *  velocity: The playback speed of the note.
   *
   *  @positional
   *  panning: The 3D position of the sound (NBS >= 4.0).
   *
   *  @positional
   *  pitch: The raw pitch of the note (NBS >= 4.0).
   */

  constructor({
    tick,
    key,
    layer = 0,
    instrument = 0,
    velocity = 100,
    panning = 0,
    pitch = 0,
  }: NoteSettings) {
    this.tick = tick;
    this.layer = layer;
    this.instrument = instrument;
    this.key = key;
    this.velocity = velocity;
    this.panning = panning;
    this.pitch = pitch;
  }
}

export { Note };
