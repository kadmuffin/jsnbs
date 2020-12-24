/* eslint-disable @typescript-eslint/naming-convention */
interface InstrumentSettings {
  id: number;
  name: string;
  file: string;
  pitch: number;
  press_key: boolean;
}

class Instrument {
  id: number;
  name: string;
  file: string;
  pitch: number;
  press_key: boolean;

  /** Stores a Custom Instrument settings.
   * @class
   * @param {Object.<string, any>} instrument The object with the instrument settings.
   * @param {number}  instrument.id        The Instrument ID (This number will determinate the Instrument position).
   * @param {string}  instrument.name      Name of the instrument.
   * @param {string}  instrument.file      The name of the sound file.
   * @param {number}  instrument.pitch     The pitch of the sound file (from 0-87, Defaults to 45).
   * @param {boolean} instrument.press_key Whether the piano should press keys when the marker passes them.
   */
  constructor({
    id,
    name,
    file,
    pitch = 45,
    press_key = false,
  }: InstrumentSettings) {
    this.id = id;
    this.name = name;
    this.file = file;
    this.pitch = pitch;
    this.press_key = press_key;
  }
}

export {Instrument};
