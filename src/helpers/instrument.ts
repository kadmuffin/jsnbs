interface InstrumentSettings {
  id: number;
  name: string;
  file: string;
  pitch: number;
  press_key: number;
}

class Instrument {
  id: number;
  name: string;
  file: string;
  pitch: number;
  press_key: number;
  constructor({ id, name, file, pitch, press_key }: InstrumentSettings) {
    this.id = id;
    this.name = name;
    this.file = file;
    this.pitch = pitch;
    this.press_key = press_key;
  }
}

export { Instrument };
