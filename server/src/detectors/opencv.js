import cv from 'opencv'

export default async function detect(img) {
  return new Promise((resolve, reject)=>{
    // console.log(img);
    cv.readImage(img, (err, mat)=>{
      if (err) return reject(err)
      resolve(mat)
    })
  }).then((mat)=>{
    return new Promise((resolve, reject)=>{
      mat.detectObject(cv.FACE_CASCADE, {}, (err, faces)=>{
        if (err) return reject(err)
        resolve(faces)
      })
    })
  })
}
