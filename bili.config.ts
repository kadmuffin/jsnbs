import { Config } from 'bili';

const config: Config = {
  plugins: {
    typescript2: {
      tsconfigOverride: {
        include: ['src'],
      },
      useTsconfigDeclarationDir: true,
    },
  },

  externals: ['jbinary'],

  input: 'src/index.ts',
  output: {
    format: ['cjs', 'esm', 'umd', 'umd-min'],
    moduleName: 'jsnbs',
    sourceMap: true,
  },
};

export default config;
