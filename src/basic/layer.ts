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

  /** Stores a layer settings.
   * @class
   * @param {Object.<string,any>} layer The object with the layer settings.
   * @param {number}  layer.id      The number ID for the layer (This number will determinate the layer position).
   * @param {string}  layer.name    The name for the layer.
   * @param {boolean} layer.lock    Sets if the layer was marked as locked.
   * @param {number}  layer.volume  Changes the volume of layer (from 0-100).
   * @param {number}  layer.panning Changes how much the layer is panned to the left/right (-100 is 2 blocks right; 0 is center; 100 is 2 blocks left).
   */
  constructor({
    id,
    name = '',
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

export {Layer};
