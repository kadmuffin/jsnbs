import * as jsnbs from '../src/index';
import fs from 'fs';

test('NBSFile: Save Function & Buffer Alloc', () => {
  let header = new jsnbs.Header({
    song_name: 'TEST FILE',
    song_author: 'TEST',
    auto_save: true,
  });
  let song = jsnbs.new_file(header);

  song.notes.push(
    ...[
      new jsnbs.Note(0, 0, 25),
      new jsnbs.Note(2, 0, 25),
      new jsnbs.Note(4, 0, 25),
    ]
  );

  song.instruments.push(new jsnbs.Instrument(0, 'test', 'test', 45, false));

  return song.save('write_test.nbs');
});

test('NBSFile: Load Saved File', () => {
  let header = new jsnbs.Header({
    song_name: 'TEST FILE',
    song_author: 'TEST',
    auto_save: true,
  });
  let song = jsnbs.new_file(header);

  song.notes.push(
    ...[
      new jsnbs.Note(0, 0, 25),
      new jsnbs.Note(2, 0, 25),
      new jsnbs.Note(4, 0, 25),
    ]
  );

  song.instruments.push(new jsnbs.Instrument(0, 'test', 'test', 45, false));

  song.update_header();

  return jsnbs.load('write_test.nbs').then((write_test) => {
    expect(write_test).toEqual(song);
  });
});

test('NBSFile: Save Function [No Instruments]', () => {
  let header = new jsnbs.Header({
    song_name: 'TEST FILE',
    song_author: 'TEST',
    auto_save: true,
  });
  let song = jsnbs.new_file(header);

  song.notes.push(
    ...[
      new jsnbs.Note(0, 0, 25),
      new jsnbs.Note(2, 0, 25),
      new jsnbs.Note(4, 0, 25),
    ]
  );

  return song.save('write_test.nbs');
});

test('NBSFile: Load Saved File [ No Instruments ]', () => {
  let header = new jsnbs.Header({
    song_name: 'TEST FILE',
    song_author: 'TEST',
    auto_save: true,
  });
  let song = jsnbs.new_file(header);

  song.notes.push(
    ...[
      new jsnbs.Note(0, 0, 25),
      new jsnbs.Note(2, 0, 25),
      new jsnbs.Note(4, 0, 25),
    ]
  );

  song.update_header();

  return jsnbs.load('write_test.nbs').then((write_test) => {
    expect(write_test).toEqual(song);
  });
});

test('NBSFile: Save Function [ No Notes ]', () => {
  let header = new jsnbs.Header({
    song_name: 'TEST FILE',
    song_author: 'TEST',
    auto_save: true,
  });
  let song = jsnbs.new_file(header);

  return song.save('write_test.nbs');
});

test('NBSFile: Load Saved File [ No Notes ]', () => {
  let header = new jsnbs.Header({
    song_name: 'TEST FILE',
    song_author: 'TEST',
    auto_save: true,
  });
  let song = jsnbs.new_file(header);

  song.update_header();

  return jsnbs.load('write_test.nbs').then((write_test) => {
    expect(write_test).toEqual(song);
  });
});
