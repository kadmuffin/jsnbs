import fs from 'fs';

import * as jsnbs from '../src/index';

test('NBSFile: Chords Function', () => {
  const expectedNotes = [
    {
      tick: 0,
      notes: [
        new jsnbs.Note({
          tick: 0,
          layer: 0,
          key: 45,
          instrument: 0,
          velocity: 100,
          panning: 0,
          pitch: 0,
        }),
      ],
    },
    {
      tick: 2,
      notes: [
        new jsnbs.Note({
          tick: 2,
          layer: 0,
          key: 45,
          instrument: 0,
          velocity: 100,
          panning: 0,
          pitch: 0,
        }),
      ],
    },
    {
      tick: 4,
      notes: [
        new jsnbs.Note({
          tick: 4,
          layer: 0,
          key: 45,
          instrument: 0,
          velocity: 100,
          panning: 0,
          pitch: 0,
        }),
      ],
    },

    {
      tick: 6,
      notes: [
        new jsnbs.Note({
          tick: 6,
          layer: 0,
          key: 45,
          instrument: 0,
          velocity: 100,
          panning: 0,
          pitch: 0,
        }),
      ],
    },

    {
      tick: 8,
      notes: [
        new jsnbs.Note({
          tick: 8,
          layer: 0,
          key: 45,
          instrument: 0,
          velocity: 100,
          panning: 0,
          pitch: 0,
        }),
      ],
    },
  ];

  return fs.readFile('test/samples/test_song.nbs', (err, data) => {
    if (err) throw err;

    return jsnbs
      .load(data)
      .then((song) => {
        expect(Array.from(song.chords())).toEqual(expectedNotes);
      })
      .catch((error) => {
        throw error;
      });
  });
});
