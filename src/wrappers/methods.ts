/* jsnbs: Port of pynbs for the web!
 *
 * Copyright (c) 2020 KadMuffin
 * Copyright (c) 2018 Valentin Berlier
 *
 * Copyrights licensed under the MIT License.
 *
 * See the accompanying LICENSE file for terms.
 */

import jBinary from 'jbinary';
import { NBSFile } from '../nbsfile';
import { Parser } from '../parser';
import { Header, Layer } from '../basic/exports';

/** Reads a Note Block Studio file from the specified source
 *
 * @param source Any jBinary supported source, usually: a `File()` object or a string with the file path.
 *
 * @returns Promise with a NBSFile object.
 */
const load = (source: any): Promise<NBSFile> =>
  new Promise((resolve, reject) => {
    jBinary
      .load(source, {
        'jBinary.littleEndian': true,
      })
      .then((binary: any) => {
        let parser = new Parser(binary);

        try {
          resolve(parser.read_file());
        } catch (e) {
          reject(e);
        }
      })
      .catch((err: any) => reject(err));
  });

/** Creates a new NBSFile with the provided header settings.
 *
 * @param header A Header class that specifies the NBS project settings.
 *
 * @returns NBSFile object.
 */
const new_file = (header: Header): NBSFile => {
  let file = new NBSFile(
    header,
    [],
    [
      Layer.named({
        id: 0,
        name: '',
        lock: false,
        volume: 100,
        panning: 0,
      }),
    ],
    []
  );

  file.header.song_layers = 1;
  return file;
};

export { load, new_file };
