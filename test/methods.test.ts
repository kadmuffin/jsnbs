import * as jsnbs from '../src/index';

test('Load: InstanceOf [ Latest Format ]', () => {
  return jsnbs.load('test/samples/test_song.nbs').then((song) => {
    expect(song).toBeInstanceOf(jsnbs.NBSFile);
  });
});

test('Load: InstanceOf [ Old Format ]', () => {
  return jsnbs.load('test/samples/old_format_song.nbs').then((song) => {
    expect(song).toBeInstanceOf(jsnbs.NBSFile);
  });
});

test('New File: InstanceOf & Header Configs', () => {
  let header = new jsnbs.Header({
    song_name: 'TEST FILE',
    song_author: 'TEST',
    auto_save: true,
  });
  let song = jsnbs.new_file(header);

  expect(song).toBeInstanceOf(jsnbs.NBSFile);
  expect(song.header).toEqual(header);
});
