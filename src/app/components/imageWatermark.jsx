'use client'
export const runtime = "edge";

import watermark from 'watermarkjs'

export default function ImageWatermarker() {


  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        return(e.target?.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const addWatermark = () => {
    if (originalImage) {
      watermark([originalImage])
        .image(watermark.text.lowerRight('Watermark', '40px serif', '#fff', 0.5))
        .then((img) => {
          return(img.src)
        })
    }
  }
}