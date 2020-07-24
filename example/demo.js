const jsnbs = require('jsnbs');

jsnbs
  .load('demo_song.nbs')
  .then((song) => {
    for (const { tick, notes } in song.chords()) {
      console.log(tick, notes);
    }
  })
  .catch((err) => {
    console.error(err);
  });
