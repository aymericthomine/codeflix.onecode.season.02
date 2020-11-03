const fs = require('fs')
const path = require('path')
const readline = require('readline')

function csv2json(filename) {
  const input = fs.createReadStream(filename)
  const rl = readline.createInterface({ input })

  let headers = []
  let records = []

  let lineCount = 0

  rl.on('line', (line, i) => {
    if (lineCount === 0) {
      headers = line.split(';')
    } else {
      const record = {}

      line.split(';').forEach((value, i) => {
        const key = headers[i]

        if (value.includes(',')) {
          record[key] = value.split(',')
        } else {
          record[key] = value
        }
      })

      records.push(record)
    }

    lineCount++
  })

  rl.on('close', () => {
    const { name } = path.parse(filename)

    fs.writeFile(`${name}.json`, JSON.stringify(records, null, 2), (err) => {
      if(err) {
        return console.log(err);
      }

      console.log(`${filename} converted to json: ${name}.json`)
    })
  })
}

/**
 * Entrypoint
 */
csv2json('./Comp0ser.csv')