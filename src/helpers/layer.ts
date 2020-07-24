interface LayerSettings {
  id: number;
  name?: string;
  lock?: boolean;
  volume?: number;
  panning?: number;
}

class Layer {
  id: number;
  name: string;
  lock: boolean;
  volume: number;
  panning: number;
  constructor({
    id,
    name = "",
    lock = false,
    volume = 100,
    panning = 0,
  }: LayerSettings) {
    this.id = id;
    this.name = name;
    this.lock = lock;
    this.volume = volume;
    this.panning = panning;
  }
}

export { Layer };
