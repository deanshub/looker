import fs from 'fs-extra'
import path from 'path'

export default function(req, res) {
  console.log(req.body.image);
  res.end()
}

function dateToFileName(d) {
  return d.toJSON().replace(/-|:|\./g,'_').replace(/T/g,' ').replace('Z','')
}

export function saveImage(img) {
  const date = new Date()
  const filename = dateToFileName(date)
  return fs.writeFile(path.join(__dirname, `../../data/${filename}.png`), img, 'base64')
}
