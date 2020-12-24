import {Config} from 'bili';

const config: Config = {
  plugins: {
    typescript2: {
      tsconfigOverride: {
        include: ['src'],
      },
      useTsconfigDeclarationDir: true,
    },
  },

  externals: ['buffer'],

  globals: {
    buffer: 'buffer',
  },
  input: 'src/index.ts',

  banner:
    '/* jsnbs\n * \n * Copyright (c) 2018 Valentin Berlier\n * Copyright (c) 2020 KadMuffin\n * \n * Copyrights licensed under the MIT License.\n * \n * See the accompanying LICENSE file for terms.\n*/\n',
  output: {
    format: ['cjs', 'cjs-min', 'esm', 'umd', 'umd-min'],
    moduleName: 'jsnbs',
    sourceMap: true,
  },
};

export default config;
