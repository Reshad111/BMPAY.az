const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const tailwind = require('tailwindcss');
const autoprefixer = require('autoprefixer');

const inputPath = path.resolve(__dirname, '../src/index.css');
const outDir = path.resolve(__dirname, '../build');
const outPath = path.join(outDir, 'tailwind.css');

async function build() {
  try {
    const css = fs.readFileSync(inputPath, 'utf8');
    const result = await postcss([tailwind, autoprefixer]).process(css, { from: inputPath });
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
    fs.writeFileSync(outPath, result.css, 'utf8');
    console.log('Wrote compiled CSS to', outPath);
  } catch (err) {
    console.error('Build failed:', err);
    process.exitCode = 1;
  }
}

build();
