import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack, { Configuration, DefinePlugin } from "webpack";
import { BuildOptions } from "./types/types";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import path from "path";
import ESLintPlugin from 'eslint-webpack-plugin';
import CopyPlugin  from "copy-webpack-plugin";



export function buildPlugins ({ mode, paths, analyzer }: BuildOptions): Configuration['plugins'] {
  const isDev = mode === 'development';
  const isProd = mode === 'production';




  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({ template: paths.html, favicon: path.resolve(paths.public, 'favicon.ico') }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }),
    new DefinePlugin({
      __ENV__: JSON.stringify(mode),
      'process.env': JSON.stringify(process.env)
    }),

    
  ]

  if (isDev) {
    plugins.push(new webpack.ProgressPlugin());
    // plugins.push(new ESLintPlugin({ eslintPath: paths.eslintPath }));
    // Вынесли проверку типов
    plugins.push(new ForkTsCheckerWebpackPlugin());
    plugins.push(new ReactRefreshWebpackPlugin());

  }

  if (isProd) {
    // plugins.push(new CopyPlugin({
    //   patterns: [
    //     { from: path.resolve(paths.public, 'locales'), to: path.resolve(paths.output, 'locales') },
    //   ],
    // }),)
  }

  if (analyzer) {
    plugins.push(new BundleAnalyzerPlugin())
    
  }

  return plugins

}

