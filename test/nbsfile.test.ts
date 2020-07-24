import * as jsnbs from '../src/index';

test('NBSFile: Chords Function', () => {
  let expected_notes = [
    {
      tick: 0,
      notes: [
        jsnbs.Note.named({
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
        jsnbs.Note.named({
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
        jsnbs.Note.named({
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
        jsnbs.Note.named({
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
        jsnbs.Note.named({
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

  return jsnbs.load('test/samples/test_song.nbs').then((song) => {
    expect(Array.from(song.chords())).toEqual(expected_notes);
  });
});
