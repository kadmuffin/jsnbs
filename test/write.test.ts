/* eslint-disable @typescript-eslint/naming-convention */
import fs from 'fs';

import * as jsnbs from '../src/index';

test('NBSFile: Save Function & Buffer Alloc', () => {
  const header = new jsnbs.Header({
    song_name: 'TEST FILE',
    song_author: 'TEST',
    auto_save: true,
  });
  const song = jsnbs.newFile(header);

  song.notes.push(
    ...[
      new jsnbs.Note({
        tick: 0,
        layer: 0,
        key: 25,
      }),
      new jsnbs.Note({
        tick: 2,
        layer: 0,
        key: 25,
      }),
      new jsnbs.Note({
        tick: 4,
        layer: 0,
        key: 25,
      }),
    ],
  );

  song.instruments.push(
    new jsnbs.Instrument({
      id: 0,
      name: 'test',
      file: 'test',
      pitch: 0,
      press_key: false,
    }),
  );
  song
    .writeBuffer()
    .then((data) => {
      fs.writeFileSync('write_test.nbs', data);
    })
    .catch((error) => {
      throw error;
    });
});

test('NBSFile: Load Saved File', () => {
  const header = new jsnbs.Header({
    song_name: 'TEST FILE',
    song_author: 'TEST',
    auto_save: true,
  });
  const song = jsnbs.newFile(header);

  song.notes.push(
    ...[
      new jsnbs.Note({
        tick: 0,
        layer: 0,
        key: 25,
      }),
      new jsnbs.Note({
        tick: 2,
        layer: 0,
        key: 25,
      }),
      new jsnbs.Note({
        tick: 4,
        layer: 0,
        key: 25,
      }),
    ],
  );

  song.instruments.push(
    new jsnbs.Instrument({
      id: 0,
      name: 'test',
      file: 'test',
      pitch: 0,
      press_key: false,
    }),
  );

  song.updateHeader();

  fs.readFile('write_test.nbs', (err, data) => {
    if (err) throw err;

    jsnbs
      .load(data)
      .then((writeTest) => {
        expect(writeTest).toEqual(song);
      })
      .catch((error) => {
        throw error;
      });
  });
});
