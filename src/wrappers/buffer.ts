class ReadBuffer {
  private buffer: Buffer;
  private index = 0;

  constructor(buffer: Buffer) {
    this.buffer = buffer;
  }

  /** Returns a uint8 and moves the pointer.
   *
   * @returns {number} Unsigned byte number
   */
  uint8(): number {
    const value = this.buffer.readUInt8(this.index);
    this.index += 1;

    return value;
  }

  /** Returns a int8 and moves the pointer.
   *
   * @returns {number} Signed byte number
   */
  int8(): number {
    const value = this.buffer.readInt8(this.index);
    this.index += 1;

    return value;
  }

  /** Returns a uint16 and moves the pointer.
   *
   * @returns {number} Unsigned short number
   */
  uint16(): number {
    const value = this.buffer.readUInt16LE(this.index);
    this.index += 2;

    return value;
  }

  /** Returns a int16 and moves the pointer.
   *
   * @returns {number} Signed short number
   */
  int16(): number {
    const value = this.buffer.readInt16LE(this.index);
    this.index += 2;

    return value;
  }

  /** Returns a uint32 and moves the pointer.
   *
   * @returns {number} Unsigned integer number
   */
  uint32(): number {
    const value = this.buffer.readUInt32LE(this.index);
    this.index += 4;

    return value;
  }

  /** Returns a int32 and moves the pointer.
   *
   * @returns {number} Signed integer number
   */
  int32(): number {
    const value = this.buffer.readInt32LE(this.index);
    this.index += 4;

    return value;
  }

  /** Returns a string and moves the pointer.
   *
   * @returns {string} String
   */
  string(): string {
    const length = this.int32();
    const string = this.buffer.toString(
      'utf-8',
      this.index,
      length + this.index,
    );
    this.index += length;

    return string;
  }
}

class WriteBuffer {
  private buffer: Buffer;
  private index = 0;

  constructor(buffer: Buffer) {
    this.buffer = buffer;
  }

  /** Access method for the buffer data
   *
   * @returns Buffer instance
   */
  get data(): Buffer {
    return this.buffer;
  }

  /** Returns a uint8 and moves the pointer.
   *
   * @param {number} write Number to write as Unsigned byte.
   */
  uint8(write: number): void {
    this.buffer.writeUInt8(write, this.index);
    this.index += 1;
  }

  /** Returns a int8 and moves the pointer.
   *
   * @param {number} write Number to write as Signed byte.
   */
  int8(write: number): void {
    this.buffer.writeInt8(write, this.index);
    this.index += 1;
  }

  /** Returns a uint16 and moves the pointer.
   *
   * @param {number} write Number to write as Unsigned short.
   */
  uint16(write: number): void {
    this.buffer.writeUInt16LE(write, this.index);
    this.index += 2;
  }

  /** Returns a int16 and moves the pointer.
   *
   * @param {number} write Number to write as Signed short.
   */
  int16(write: number): void {
    this.buffer.writeInt16LE(write, this.index);
    this.index += 2;
  }

  /** Returns a uint32 and moves the pointer.
   *
   * @param {number} write Number to write as Unsigned integer.
   */
  uint32(write: number): void {
    this.buffer.writeUInt32LE(write, this.index);
    this.index += 4;
  }

  /** Returns a int32 and moves the pointer.
   *
   * @param {number} write Number to write as Signed integer.
   */
  int32(write: number): void {
    this.buffer.writeInt32LE(write, this.index);
    this.index += 4;
  }

  /** Returns a string and moves the pointer.
   *
   * @param {string} write String to write in buffer.
   */
  string(write: string): void {
    this.int32(write.length);
    this.buffer.write(write, this.index);
    this.index += write.length;
  }
}

export {ReadBuffer, WriteBuffer};
