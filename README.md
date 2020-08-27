# bundler

## Project bundler

## Installation

Install globally or as a development dependency

```sh
# Globally
npm install -g @akumzy/bundler

# or as devDependency
npm install @akumzy/bundler --dev
```

## Usage

Run `bundler --init` at your project root directory to create a configuration file

```json
{
  "dist": "", // path to place all the files in relative to your project root directory
  "files": [], // Files/folders to bundle
  "ignore": [], // Files/folders in `files` to ignore
  "plugins": {} // Plugins to extend the app
}
```
