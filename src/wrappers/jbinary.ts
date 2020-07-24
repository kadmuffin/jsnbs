/** Wraps the jBinary object and provides type checking
 *
 *  @param
 *  buffer: The jBinary bytes object.
 */
class Binary {
  write: BinaryWrite;

  constructor(public buffer: any) {
    this.write = new BinaryWrite(buffer);
  }

  /** Reads a unsigned byte at pointer.*/
  uint8(): number {
    return this.buffer.read("uint8");
  }

  /** Reads a signed byte at pointer.*/
  int8(): number {
    return this.buffer.read("int8");
  }

  /** Reads a unsigned short at pointer.*/
  uint16(): number {
    return this.buffer.read("uint16");
  }

  /** Reads a signed short at pointer.*/
  int16(): number {
    return this.buffer.read("int16");
  }

  /** Reads a unsigned integer at pointer.*/
  uint32(): number {
    return this.buffer.read("uint32");
  }

  /** Reads a signed integer at pointer.*/
  int32(): number {
    return this.buffer.read("int32");
  }

  /** Reads a string at pointer
   *
   * This functions gets the string length
   * and then retrieves the text.
   */
  string(): string {
    return this.buffer.read(["string", this.int32()]);
  }

  /** Jumps the amount specified by a short at pointer. */
  *jump(): Generator<number> {
    let value = -1;

    while (true) {
      let jump = this.uint16();
      if (!jump) break;

      value += jump;
      yield value;
    }
  }
}

class BinaryWrite {
  constructor(public buffer: any) {}

  /** Writes a unsigned byte at pointer.*/
  uint8(value: number): void {
    this.buffer.write("uint8", value);
  }

  /** Writes a signed byte at pointer.*/
  int8(value: number): void {
    this.buffer.write("int8", value);
  }

  /** Writes a unsigned short at pointer.*/
  uint16(value: number): void {
    this.buffer.write("uint16", value);
  }

  /** Writes a signed short at pointer.*/
  int16(value: number): void {
    this.buffer.write("int16", value);
  }

  /** Writes a unsigned integer at pointer.*/
  uint32(value: number): void {
    this.buffer.write("uint32", value);
  }

  /** Writes a signed integer at pointer.*/
  int32(value: number): void {
    this.buffer.write("int32", value);
  }

  /** Writes first the string length and then the text.*/
  string(value: string): void {
    this.int32(value.length);
    this.buffer.write("string", value);
  }
}

export { Binary, BinaryWrite };
