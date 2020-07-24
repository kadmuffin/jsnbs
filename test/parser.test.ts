import * as jsnbs from '../src/index';

test('Parser: Header Parsing', () => {
  let expected_header = new jsnbs.Header({
    version: 4,
    default_instruments: 16,
    song_length: 8,
    song_layers: 1,
    song_name: 'foo',
    song_author: 'bar',
    blocks_added: 9000,
  });

  return jsnbs.load('test/samples/test_song.nbs').then((song) => {
    expect(song.header).toEqual(expected_header);
  });
});
test('Parser: Notes Parsing', () => {
  let expected_notes = [
    jsnbs.Note.named({
      tick: 0,
      layer: 0,
      key: 45,
      instrument: 0,
      velocity: 100,
      panning: 0,
      pitch: 0,
    }),
    jsnbs.Note.named({
      tick: 2,
      layer: 0,
      key: 45,
      instrument: 0,
      velocity: 100,
      panning: 0,
      pitch: 0,
    }),
    jsnbs.Note.named({
      tick: 4,
      layer: 0,
      key: 45,
      instrument: 0,
      velocity: 100,
      panning: 0,
      pitch: 0,
    }),
    jsnbs.Note.named({
      tick: 6,
      layer: 0,
      key: 45,
      instrument: 0,
      velocity: 100,
      panning: 0,
      pitch: 0,
    }),
    jsnbs.Note.named({
      tick: 8,
      layer: 0,
      key: 45,
      instrument: 0,
      velocity: 100,
      panning: 0,
      pitch: 0,
    }),
  ];

  return jsnbs.load('test/samples/test_song.nbs').then((song) => {
    expect(song.notes).toEqual(expected_notes);
  });
});

test('Parser: Layers Parsing', () => {
  let expected_layers = [new jsnbs.Layer(0)];

  return jsnbs.load('test/samples/test_song.nbs').then((song) => {
    expect(song.layers).toEqual(expected_layers);
  });
});

test('Parser: Instruments Parsing', () => {
  return jsnbs.load('test/samples/test_song.nbs').then((song) => {
    expect(song.instruments.length).toBe(0);
  });
});
