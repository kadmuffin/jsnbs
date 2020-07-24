> This repository is a typescript port of the python library [pynbs](https://github.com/vberlier/pynbs) made by [@vberlier](https://github.com/vberlier).

# jsnbs

`jsnbs` brings the power of `pynbs` to the web, letting you iterate over Note Block Studio songs.

```javascript
const jsnbs = require("jsnbs");

jsnbs.load("demo_song.nbs").then((song) => {
  for (const chord in song.chords()) {
    console.log(chord);
  }
});
```

You can also use `jsnbs` to modify or create new songs.

```javascript
const jsnbs = require("jsnbs");

jsnbs.load("demo_song.nbs").then((song) => {

  song.notes.push(..[
    jsnbs.Note({
      tick: 0,
      layer: 0,
      instrument: 0,
      key: 35
    })
  ])

  song.save('new_song.nbs')

});
```

## Installation

The package can be installed with `npm` or `yarn`.

```bash
$ npm i jsnbs
# or with yarn
$ yarn add jsnbs
```

The latest release follows the latest version of the NBS file format
[specification](https://hielkeminecraft.github.io/OpenNoteBlockStudio/nbs)
(version 4). However, it also allows you to load and save files in any of
the older versions.

## Basic usage

### Reading files

You can use the `read()` function to read and parse a specific NBS file.

```python
jsnbs.read('demo_song.nbs')
```

The `read()` function returns a `jsnbs` file object. These objects have several
attributes that mirror the binary structure of NBS files.

#### Header

The first attribute is `header`, the file header. It contains information about
the file.

```javascript
let header = demo_song.header;
```

| Attribute                    | Type    | Details                                                       |
| :--------------------------- | :------ | :------------------------------------------------------------ |
| `header.version`             | `int`   | The NBS version this file was saved on.                       |
| `header.default_instruments` | `int`   | The amount of instruments from vanilla Minecraft in the song. |
| `header.song_length`         | `int`   | The length of the song, measured in ticks.                    |
| `header.song_layers`         | `int`   | The ID of the last layer with at least one note block in it.  |
| `header.song_name`           | `str`   | The name of the song.                                         |
| `header.song_author`         | `str`   | The author of the song.                                       |
| `header.original_author`     | `str`   | The original song author of the song.                         |
| `header.description`         | `str`   | The description of the song.                                  |
| `header.tempo`               | `float` | The tempo of the song.                                        |
| `header.auto_save`           | `bool`  | Whether auto-saving has been enabled.                         |
| `header.auto_save_duration`  | `int`   | The amount of minutes between each auto-save.                 |
| `header.time_signature`      | `int`   | The time signature of the song.                               |
| `header.minutes_spent`       | `int`   | The amount of minutes spent on the project.                   |
| `header.left_clicks`         | `int`   | The amount of times the user has left-clicked.                |
| `header.right_clicks`        | `int`   | The amount of times the user has right-clicked.               |
| `header.blocks_added`        | `int`   | The amount of times the user has added a block.               |
| `header.blocks_removed`      | `int`   | The amount of times the user has removed a block.             |
| `header.song_origin`         | `str`   | The file name of the original MIDI or schematic.              |
| `header.loop`                | `bool`  | Whether the song should loop back to the start after ending.  |
| `header.max_loop_count`      | `int`   | The amount of times to loop. 0 = infinite.                    |
| `header.loop_start`          | `int`   | The tick the song will loop back to at the end of playback.   |

> For more information about all these fields, check out the [official specification](https://hielkeminecraft.github.io/OpenNoteBlockStudio/nbs).

#### Notes

The `notes` attribute holds a list of all the notes of the song in order.

```javascript
let first_note = demo_song.notes[0];
```

| Attribute         | Type  | Details                                                    |
| :---------------- | :---- | :--------------------------------------------------------- |
| `note.tick`       | `int` | The tick at which the note plays.                          |
| `note.layer`      | `int` | The ID of the layer in which the note is placed.           |
| `note.instrument` | `int` | The ID of the instrument.                                  |
| `note.key`        | `int` | The key of the note. (between 0 and 87)                    |
| `note.velocity`   | `int` | The velocity of the note. (between 0 and 100)              |
| `note.panning`    | `int` | The stereo panning of the note. (between -100 and 100)     |
| `note.pitch`      | `int` | The detune of the note, in cents. (between -1200 and 1200) |

#### Layers

The `layers` attribute holds a list of all the layers of the song in order.

```javascript
let first_layer = demo_song.layers[0];
```

| Attribute       | Type   | Details                          |
| :-------------- | :----- | :------------------------------- |
| `layer.id`      | `int`  | The ID of the layer.             |
| `layer.name`    | `str`  | The name of the layer.           |
| `layer.lock`    | `bool` | Whether the layer is locked.     |
| `layer.volume`  | `int`  | The volume of the layer.         |
| `layer.panning` | `int`  | The stereo panning of the layer. |

#### Instruments

The `instruments` attribute holds a list of all the custom instruments of the
song in order.

```javascript
let first_custom_instrument = demo_song.instruments[0];
```

| Attribute              | Type   | Details                                                                                            |
| :--------------------- | :----- | :------------------------------------------------------------------------------------------------- |
| `instrument.id`        | `int`  | The ID of the instrument.                                                                          |
| `instrument.name`      | `str`  | The name of the instrument.                                                                        |
| `instrument.file`      | `str`  | The name of the sound file of the instrument.                                                      |
| `instrument.pitch`     | `int`  | The pitch of the instrument. (between 0 and 87)                                                    |
| `instrument.press_key` | `bool` | Whether the piano should automatically press keys with the instrument when the marker passes them. |

### Iterating over songs

Iterating over a `jsnbs` file object yields consecutively all the chords of the song with
the associated tick.

```javascript
for (const chord in demo_song.chords()){
    const { tick, notes } = chord;
    ...
}
```

`chord` is a list of all the notes that play during the tick `tick`.

### Creating new files

You can create new files using the `new_file()` function. The function lets
you specify header attributes with keyword arguments.

```javascript
let new_file = jsnbs.new_file((song_name = "Hello world"));
```

The function returns a new `jsnbs` file object that you can now edit
programmatically.

### Saving files

You can use the `save()` method to encode and write the file to a specified
location.

```javascript
new_file.save("new_file.nbs");
```

By default, the file will be saved in the latest NBS version available.
To save the file in an older version, you can use the `version` parameter:

```javascript
# This will save the song in the classic format.
new_file.save('new_file.nbs', version=0)
```

(Keep in mind some of the song properties may be lost when saving in older versions.)

---

License - [MIT](https://github.com/vberlier/jsnbs/blob/master/LICENSE)