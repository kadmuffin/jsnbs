import {Buffer} from 'buffer';

import {NBSFile} from '../nbsfile';
import {Parser} from '../parser';
import {Header, Layer} from '../basic/exports';

/** Reads a Note Block Studio file.
 *
 * @param {Buffer} buffer The Buffer object containing the file.
 *
 * @returns {Promise.<NBSFile>} NBSFile object promise.
 */
function load(buffer: Buffer) {
  return new Promise<NBSFile>((resolve) => {
    const file = new Parser(buffer).readFile();
    resolve(file);
  });
}

/** Creates a new NBSFile with the provided header settings.
 *
 * @param {Object} header The class that specifies the NBS project settings.
 *
 * @returns {NBSFile}  NBSFile object.
 */
function newFile(header: Header): NBSFile {
  const file = new NBSFile(
    header,
    [],
    [
      new Layer({
        id: 0,
        name: '',
        lock: false,
        volume: 100,
        panning: 0,
      }),
    ],
    [],
  );

  file.header.song_layers = 1;
  return file;
}

export {load, newFile};
