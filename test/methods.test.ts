/* eslint-disable @typescript-eslint/naming-convention */
import fs from 'fs';

import * as jsnbs from '../src/index';

test('Load: InstanceOf [ Latest Format ]', () => {
  return fs.readFile('test/samples/test_song.nbs', (err, data) => {
    if (err) throw err;

    return jsnbs.load(data).then((song) => {
      expect(song).toBeInstanceOf(jsnbs.NBSFile);
    });
  });
});

test('Load: InstanceOf [ Old Format ]', () => {
  return fs.readFile('test/samples/old_format_song.nbs', (err, data) => {
    if (err) throw err;

    return jsnbs
      .load(data)
      .then((song) => {
        expect(song).toBeInstanceOf(jsnbs.NBSFile);
      })
      .catch((error) => {
        throw error;
      });
  });
});

test('New File: InstanceOf & Header Configs', () => {
  const header = new jsnbs.Header({
    song_name: 'TEST FILE',
    song_author: 'TEST',
    auto_save: true,
  });
  const song = jsnbs.newFile(header);

  expect(song).toBeInstanceOf(jsnbs.NBSFile);
  expect(song.header).toEqual(header);
});
