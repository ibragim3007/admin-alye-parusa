import { BuildOptions } from "../types/types";
import { removeDataTestIdBabelPlugin } from "./removeDataTestIdBabelPlugin";


export function babelBuildLoader (options: BuildOptions) {
  const isDev = options.mode === 'development';
  const isProd = options.mode === 'production';

  const plugins = [];

  if (isProd) {
    plugins.push([
      removeDataTestIdBabelPlugin, {
        props: ['data-testId']
      }
    ])
  }

  return {
    test: /\.m?tsx$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [
          "@babel/preset-env",
          "@babel/preset-typescript",
          [
            "@babel/preset-react",
            {
              runtime:  isDev ? "automatic" : "classic"
            }
          ],
        ],
        plugins: plugins.length ? plugins : undefined
      }
    }
  }
}