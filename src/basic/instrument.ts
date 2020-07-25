/* jsnbs
 *
 * Copyright (c) 2018 Valentin Berlier
 * Copyright (c) 2020 KadMuffin
 *
 * Copyrights licensed under the MIT License.
 *
 * See the accompanying LICENSE file for terms.
 */

interface InstrumentSettings {
  id: number;
  name: string;
  file: string;
  pitch: number;
  press_key: boolean;
}

class Instrument {
  /** Stores a Custom Instrument settings
   *
   * @param id The Instrument ID (This number will determinate the Instrument position)
   * @param name Name of the instrument
   * @param file The name of the sound file
   * @param pitch The pitch of the sound file (from 0-87, Defaults to 45)
   * @param press_key Whether the piano should press keys when the marker passes them
   */
  constructor(
    public id: number,
    public name: string,
    public file: string,
    public pitch: number,
    public press_key: boolean
  ) {}

  static named({
    id,
    name,
    file,
    pitch = 45,
    press_key = false,
  }: InstrumentSettings): Instrument {
    return new Instrument(id, name, file, pitch, press_key);
  }
}

export { Instrument };
