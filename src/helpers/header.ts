import { Binary } from "../wrappers/jbinary";

const CURRENT_NBS_VERSION = 4;

class Header {
  version: number = CURRENT_NBS_VERSION;
  default_instruments: number = 16;
  song_length: number = 0;
  song_layers: number = 0;
  song_name: string = "";
  song_author: string = "";
  original_author: string = "";
  description: string = "";

  tempo: number = 10.0;
  auto_save: boolean = false;
  auto_save_duration: number = 10;
  time_signature: number = 4;

  minutes_spent: number = 0;
  left_clicks: number = 0;
  right_clicks: number = 0;
  blocks_added: number = 0;
  blocks_removed: number = 0;
  song_origin: string = "";
  loop: boolean = false;
  max_loop_count: number = 0;
  loop_start: number = 0;

  constructor() {}
}

export { Header };
