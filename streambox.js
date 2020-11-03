const fs = require('fs')
const path = require('path')
const { Transform } = require('stream')

function duplicate(filename) {
  const { name, ext } = path.parse(filename)

  const readStream = fs.createReadStream(filename)
  const writeStream = fs.createWriteStream(`${name}.copy${ext}`)

  readStream.pipe(writeStream)
}

function transform(filename, re, fn, in_stdout = true) {
  const transformer = new Transform({
    transform(chunk, _, callback) {
      this.push(chunk.toString().replace(re, fn))

      callback()
    }
  })

  const readStream = fs.createReadStream(filename)
  
  if (in_stdout) {
    readStream
      .pipe(transformer)
      .pipe(process.stdout)
  } else {
    const writeStream = fs.createWriteStream('./output.txt')

    readStream
      .pipe(transformer)
      .pipe(writeStream)
  }
}

module.exports = {
  duplicate,
  transform,
}