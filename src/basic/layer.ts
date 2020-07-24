interface LayerSettings {
  id: number;
  name?: string;
  lock?: boolean;
  volume?: number;
  panning?: number;
}

class Layer {
  /** Stores a layer settings
   *
   * @param id The number ID for the layer (This number will determinate the layer position)
   * @param name The name for the layer
   * @param lock Sets if the layer was marked as locked
   * @param volume Changes the volume of layer (from 0-100)
   * @param panning Changes how much the layer is panned to the left/right (-100 is 2 blocks right; 0 is center; 100 is 2 blocks left)
   */
  constructor(
    public id: number,
    public name: string = '',
    public lock: boolean = false,
    public volume: number = 100,
    public panning: number = 0
  ) {}

  /** Emulates named parameters for the Layer class
   *
   * @param LayerSettings An Object holding the Layer parameters:
   * ```javascript
   * Layer.named({
   *  id: 0,
   *  name: "Drums",
   *  lock: false,
   *  volume: 100,
   *  panning: 0,
   * }) // Returns a Layer
   * ```
   */
  static named({
    id,
    name = '',
    lock = false,
    volume = 100,
    panning = 0,
  }: LayerSettings): Layer {
    return new Layer(id, name, lock, volume, panning);
  }
}

export { Layer };
