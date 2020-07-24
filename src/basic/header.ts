import { Binary } from '../wrappers/jbinary_wrap';

interface HeaderSettings {
  version?: number;
  default_instruments?: number;
  song_length?: number;
  song_layers?: number;
  song_name?: string;
  song_author?: string;
  original_author?: string;
  description?: string;

  tempo?: number;
  auto_save?: boolean;
  auto_save_duration?: number;
  time_signature?: number;

  minutes_spent?: number;
  left_clicks?: number;
  right_clicks?: number;
  blocks_added?: number;
  blocks_removed?: number;
  song_origin?: string;
  loop?: boolean;
  max_loop_count?: number;
  loop_start?: number;
}

class Header {
  static readonly CURRENT_NBS_VERSION: number = 4;

  version: number;
  default_instruments: number;
  song_length: number;
  song_layers: number;
  song_name: string;
  song_author: string;
  original_author: string;
  description: string;

  tempo: number;
  auto_save: boolean;
  auto_save_duration: number;
  time_signature: number;

  minutes_spent: number;
  left_clicks: number;
  right_clicks: number;
  blocks_added: number;
  blocks_removed: number;
  song_origin: string;
  loop: boolean;
  max_loop_count: number;
  loop_start: number;

  constructor({
    version = Header.CURRENT_NBS_VERSION,
    default_instruments = 16,
    song_length = 0,
    song_layers = 0,
    song_name = '',
    song_author = '',
    original_author = '',
    description = '',

    tempo = 10.0,
    auto_save = false,
    auto_save_duration = 10,
    time_signature = 4,

    minutes_spent = 0,
    left_clicks = 0,
    right_clicks = 0,
    blocks_added = 0,
    blocks_removed = 0,
    song_origin = '',
    loop = false,
    max_loop_count = 0,
    loop_start = 0,
  }: HeaderSettings = {}) {
    this.version = version;
    this.default_instruments = default_instruments;
    this.song_length = song_length;
    this.song_layers = song_layers;
    this.song_name = song_name;
    this.song_author = song_author;
    this.original_author = original_author;
    this.description = description;

    this.tempo = tempo;
    this.auto_save = auto_save;
    this.auto_save_duration = auto_save_duration;
    this.time_signature = time_signature;

    this.minutes_spent = minutes_spent;
    this.left_clicks = left_clicks;
    this.right_clicks = right_clicks;
    this.blocks_added = blocks_added;
    this.blocks_removed = blocks_removed;
    this.song_origin = song_origin;
    this.loop = loop;
    this.max_loop_count = max_loop_count;
    this.loop_start = loop_start;
  }
}

export { Header };
